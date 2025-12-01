"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../core/lib/supabaseClient";
import type { LoginFormData } from "../types/dashboard";
import { useAuth } from "../../auth/hooks/useAuth";

export default function Login() {
    const navigate = useNavigate();
    const { session } = useAuth();
    const [serverError, setServerError] = useState("");

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<LoginFormData>();

    useEffect(() => {
        if (session) {
            navigate("/dashboard", { replace: true });
        }
    }, [session, navigate]);

    const onSubmit = async (data: LoginFormData) => {
        setServerError("");

        const { email, password } = data;

        const { error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });

        if (error) {
            setServerError(error.message);
            return;
        }

        navigate("/dashboard");
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-background px-4">
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="w-full max-w-sm bg-secondary rounded-xl p-6 shadow-lg space-y-6 border border-gray-800"
            >
                <h2 className="text-3xl font-bold text-center text-text">Login</h2>

                {serverError && (
                    <p className="text-red-500 text-center text-sm bg-red-500/10 p-2 rounded">
                        {serverError}
                    </p>
                )}

                <div className="space-y-4">
                    <div>
                        <input
                            type="email"
                            placeholder="Email"
                            className="w-full p-3 bg-background border border-gray-700 rounded-lg outline-none text-text placeholder-gray-500 focus:border-red-700 transition-colors"
                            {...register("email", { required: "Email is required" })}
                        />
                        {errors.email && (
                            <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
                        )}
                    </div>

                    <div>
                        <input
                            type="password"
                            placeholder="Password"
                            className="w-full p-3 bg-background border border-gray-700 rounded-lg outline-none text-text placeholder-gray-500 focus:border-red-700 transition-colors"
                            {...register("password", { required: "Password is required" })}
                        />
                        {errors.password && (
                            <p className="text-red-500 text-xs mt-1">
                                {errors.password.message}
                            </p>
                        )}
                    </div>
                </div>

                <button
                    disabled={isSubmitting}
                    className="w-full bg-red-700 text-white font-semibold p-3 rounded-xl hover:bg-red-700/90 transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {isSubmitting ? "Loading..." : "Login"}
                </button>
            </form>
        </div>
    );
}

