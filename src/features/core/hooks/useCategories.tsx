import { useState, useEffect } from "react";
import { supabase } from "../lib/supabaseClient";
import type { Brand } from "../types/categories.";

export function useCategories(lang = "en") {
    const [categories, setCategories] = useState<Brand[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    // GET: Fetch categories
    const fetchCategories = async () => {
        setLoading(true);
        setError(null);

        const { data, error } = await supabase
            .from("categories")
            .select(
                lang === "en"
                    ? "id, name:name_en, logo"
                    : "id, name:name_ar, logo"
            );

        if (error) setError(error.message);
        else setCategories(data);

        setLoading(false);
    };

    useEffect(() => {
        /* eslint-disable */
        fetchCategories();
    }, [lang]);

    // POST: Create category
    const createCategory = async ({ name_en, name_ar, logo }: { name_en: string, name_ar: string, logo: string }) => {
        const { data, error } = await supabase
            .from("categories")
            .insert([{ name_en, name_ar, logo }])
            .select();

        if (error) throw new Error(error.message);

        fetchCategories();
        return data;
    };

    // PUT: Update category
    const updateCategory = async ({ id, name_en, name_ar, logo }: { id: string, name_en: string, name_ar: string, logo: string }) => {
        const { data, error } = await supabase
            .from("categories")
            .update({ name_en, name_ar, logo })
            .eq("id", id)
            .select();

        if (error) throw new Error(error.message);

        fetchCategories();
        return data;
    };

    // DELETE: Delete category
    const deleteCategory = async (id: string) => {
        const { data, error } = await supabase
            .from("categories")
            .delete()
            .eq("id", id)
            .select();

        if (error) throw new Error(error.message);

        fetchCategories();
        return data;
    };

    return {
        categories,
        loading,
        error,
        fetchCategories,
        createCategory,
        updateCategory,
        deleteCategory,
    };
}
