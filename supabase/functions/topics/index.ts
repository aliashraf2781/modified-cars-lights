import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*', // Allow all origins for development
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'GET, POST, PATCH, DELETE, OPTIONS',
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
      {
        global: {
          headers: { Authorization: req.headers.get('Authorization')! },
        },
      }
    )

    const { method } = req
    const url = new URL(req.url)
    const topicId = url.searchParams.get('id')

    switch (method) {
      case 'GET': {
        const { data, error } = await supabaseClient
          .from('topics')
          .select('*')
          .eq('id', topicId || '')
        
        if (error) throw error
        
        return new Response(JSON.stringify(data), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        })
      }

      case 'PATCH': {
        const body = await req.json()
        const { data, error } = await supabaseClient
          .from('topics')
          .update(body)
          .eq('id', topicId || '')
          .select()
        
        if (error) throw error
        
        return new Response(JSON.stringify(data), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        })
      }

      case 'DELETE': {
        const { data, error } = await supabaseClient
          .from('topics')
          .delete()
          .eq('id', topicId || '')
          .select()
        
        if (error) throw error
        
        return new Response(JSON.stringify(data), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        })
      }

      default:
        return new Response('Method not allowed', {
          status: 405,
          headers: corsHeaders,
        })
    }
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 400,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  }
})
