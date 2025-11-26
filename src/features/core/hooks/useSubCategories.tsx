import { useState, useEffect } from "react";
import { supabase } from "../lib/supabaseClient";
import type { subCategory } from "../types/subCategories";

export function useSubCategories(categoryId: string, lang = "ar" as string) {
    const [subCategories, setSubCategories] = useState<subCategory[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    // -----------------------------------------------------
    // GET: Fetch sub categories by category_id + lang
    // -----------------------------------------------------
    const fetchSubCategories = async () => {
        if (!categoryId) return;

        setLoading(true);
        setError(null);

        const { data, error } = await supabase
            .from("sub_category")
            .select(
                lang === "en"
                    ? "id, name:name_en, category_id"
                    : "id, name:name_ar, category_id"
            )
            .eq("category_id", categoryId);

        if (error) setError(error.message);
        else setSubCategories(data);

        setLoading(false);
    };

    // auto fetch when category or lang change
    useEffect(() => {
        /* eslint-disable */
        fetchSubCategories();
    }, [categoryId, lang]);

    // -----------------------------------------------------
    // POST: Create a sub category
    // -----------------------------------------------------
    const createSubCategory = async ({ name_en, name_ar, category_id }: { name_en: string, name_ar: string, category_id: string }) => {
        const { data, error } = await supabase
            .from("sub_category")
            .insert([{ name_en, name_ar, category_id }])
            .select();

        if (error) throw new Error(error.message);

        fetchSubCategories();
        return data;
    };

    // -----------------------------------------------------
    // PUT: Update a sub category
    // -----------------------------------------------------
    const updateSubCategory = async ({ id, name_en, name_ar }: { id: string, name_en: string, name_ar: string }) => {
        const { data, error } = await supabase
            .from("sub_category")
            .update({ name_en, name_ar })
            .eq("id", id)
            .select();

        if (error) throw new Error(error.message);

        fetchSubCategories();
        return data;
    };

    // -----------------------------------------------------
    // DELETE: Delete a sub category
    // -----------------------------------------------------
    const deleteSubCategory = async (id: string) => {
        const { data, error } = await supabase
            .from("sub_category")
            .delete()
            .eq("id", id)
            .select();

        if (error) throw new Error(error.message);

        fetchSubCategories();
        return data;
    };

    return {
        subCategories,
        loading,
        error,
        fetchSubCategories,
        createSubCategory,
        updateSubCategory,
        deleteSubCategory,
    };
}
