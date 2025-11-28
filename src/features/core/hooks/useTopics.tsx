import { useState, useEffect } from "react";
import { supabase } from "../lib/supabaseClient";
import { useTranslation } from "react-i18next";

// -------------------------
// Types
// -------------------------
export interface Topic {
    id: number;
    name: string;
    description: string | null;
    content: string | null;
    video: string | null;
    lights_category: { id: number; name: string }[] | null;
    car_category: { id: number; name: string }[] | null;
}

interface CreateTopic {
    name_en: string;
    name_ar: string;
    logo?: string;
}

interface UpdateTopic extends CreateTopic {
    id: number;
}



// -------------------------
// Hook
// -------------------------
export function useTopics({
    carCategory = null,
    lightsCategory = null,
}: {
    carCategory?: string | null;
    lightsCategory?: string | null;
}) {
    const  { i18n } = useTranslation();
    const lang = i18n.language;

    const [topics, setTopics] = useState<Topic[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    // -------------------------------------------
    // GET: Fetch Topics
    // -------------------------------------------
    const fetchTopics = async () => {
        setLoading(true);
        setError(null);

        const filters: Record<string, string | number> = {};


        if (carCategory) filters.category_id = carCategory;
        if (lightsCategory) filters.type_id = lightsCategory;

        const selectQuery =
            lang === "en"
                ? `id, name:name_en, description:des_en, content:content_en, video:video_url,
           lights_category:topic_type(id, name:name_en),
           car_category:sub_category(id, name:name_en)`
                : `id, name:name_ar, description:des_ar, content:content_ar, video:video_url,
           lights_category:topic_type(id, name:name_ar),
           car_category:sub_category(id, name:name_ar)`;

        const { data, error } = await supabase
            .from("topics")
            .select(selectQuery)
            .match(filters)
            .order("id", { ascending: true });
        if (error) setError(error.message);
        else setTopics(data);

        setLoading(false);
    };

    // Auto fetch when lang or filters change
    useEffect(() => {
        // eslint-disable-next-line
        fetchTopics();
        // eslint-disable-next-line
    }, [lang, carCategory, lightsCategory]);

    // -------------------------------------------
    // POST: Create Topic
    // -------------------------------------------
    const createTopic = async (payload: CreateTopic) => {
        const { data, error } = await supabase
            .from("topics")
            .insert([payload])
            .select();

        if (error) throw new Error(error.message);

        fetchTopics();
        return data;
    };

    // -------------------------------------------
    // PUT: Update Topic
    // -------------------------------------------
    const updateTopic = async (payload: UpdateTopic) => {
        const { id, ...rest } = payload;

        const { data, error } = await supabase
            .from("topics")
            .update(rest)
            .eq("id", id)
            .select();

        if (error) throw new Error(error.message);

        fetchTopics();
        return data;
    };

    // -------------------------------------------
    // DELETE: Delete Topic
    // -------------------------------------------
    const deleteTopic = async (id: number) => {
        const { data, error } = await supabase
            .from("topics")
            .delete()
            .eq("id", id)
            .select();

        if (error) throw new Error(error.message);

        fetchTopics();
        return data;
    };

    return {
        topics,
        loading,
        error,
        fetchTopics,
        createTopic,
        updateTopic,
        deleteTopic,
    };
}
