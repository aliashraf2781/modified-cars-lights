import { useState, useEffect } from "react";
import { supabase } from "../lib/supabaseClient";

export interface TopicType {
    id: number;
    name: string;
    logo: string | null;
}

interface CreateTopicType {
    name_en: string;
    name_ar: string;
    logo?: string;
}

interface UpdateTopicType extends CreateTopicType {
    id: number;
}

export function useTopicTypes(lang: "ar" | "en" = "ar") {
    const [types, setTypes] = useState<TopicType[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    // -----------------------------------------------------
    // GET: Fetch topic types
    // -----------------------------------------------------
    const fetchTopicTypes = async () => {
        setLoading(true);
        setError(null);

        const query =
            lang === "en"
                ? "id, name:name_en, logo"
                : "id, name:name_ar, logo";

        const { data, error } = await supabase
            .from("topic_type")
            .select(query)
            .order("id", { ascending: true });

        if (error) setError(error.message);
        else setTypes(data);

        setLoading(false);
    };

    // Auto fetch when lang changes
    useEffect(() => {
        // eslint-disable-next-line
        fetchTopicTypes();
        // eslint-disable-next-line
    }, [lang]);

    // -----------------------------------------------------
    // POST: Create topic type
    // -----------------------------------------------------
    const createTopicType = async (payload: CreateTopicType) => {
        const { data, error } = await supabase
            .from("topic_type")
            .insert([payload])
            .select();

        if (error) throw new Error(error.message);

        fetchTopicTypes();
        return data;
    };

    // -----------------------------------------------------
    // PUT: Update topic type
    // -----------------------------------------------------
    const updateTopicType = async (payload: UpdateTopicType) => {
        const { id, ...rest } = payload;

        const { data, error } = await supabase
            .from("topic_type")
            .update(rest)
            .eq("id", id)
            .select();

        if (error) throw new Error(error.message);

        fetchTopicTypes();
        return data;
    };

    // -----------------------------------------------------
    // DELETE: Delete topic type
    // -----------------------------------------------------
    const deleteTopicType = async (id: number) => {
        const { data, error } = await supabase
            .from("topic_type")
            .delete()
            .eq("id", id)
            .select();

        if (error) throw new Error(error.message);

        fetchTopicTypes();
        return data;
    };

    return {
        types,
        loading,
        error,
        fetchTopicTypes,
        createTopicType,
        updateTopicType,
        deleteTopicType,
    };
}
