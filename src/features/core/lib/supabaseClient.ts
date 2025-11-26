import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://wyxygmxxebpicievxigt.supabase.co";
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Ind5eHlnbXh4ZWJwaWNpZXZ4aWd0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjE5MTQ3MjYsImV4cCI6MjA3NzQ5MDcyNn0.FjiZaJbBR-80mO3Y653CL6UGRtv-OHxNZ47HcFQWcAE";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
