import { Link } from "react-router-dom";

export default function Dashboard() {
    return (
        <div className="min-h-screen bg-neutral-900 text-gray-100 p-8">
            <div className="max-w-6xl mx-auto">
                <h1 className="text-4xl font-bold mb-2 bg-linear-to-r from-gray-100 to-gray-400 bg-clip-text text-transparent">
                    Welcome to Dashboard
                </h1>
                <p className="text-gray-500 mb-12">Manage your content efficiently</p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Categories Card */}
                    <Link
                        to="categories"
                        className="group relative bg-linear-to-br from-neutral-800 to-black border border-neutral-800 rounded-xl p-8 hover:border-red-400 transition-all duration-300 overflow-hidden"
                    >
                        <div className="absolute inset-0 bg-linear-to-br from-gray-800/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                        <div className="relative z-10">
                            <div className="w-12 h-12 bg-linear-to-br from-gray-700 to-gray-900 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                                <svg className="w-6 h-6 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                                </svg>
                            </div>

                            <h2 className="text-2xl font-bold text-gray-100 mb-2 group-hover:text-white transition-colors">
                                Categories & SubCategories
                            </h2>
                            <p className="text-gray-500 group-hover:text-gray-400 transition-colors">
                                Manage all categories and their subcategories.
                            </p>

                            <div className="mt-6 flex items-center text-gray-400 group-hover:text-gray-300 transition-colors">
                                <span className="text-sm font-medium">Manage</span>
                                <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                            </div>
                        </div>
                    </Link>

                    {/* Topics Card */}
                    <Link
                        to="topics"
                        className="group relative bg-linear-to-br from-neutral-800 to-black border border-neutral-800 rounded-xl p-8 hover:border-red-400 transition-all duration-300 overflow-hidden"

                    >
                        <div className="absolute inset-0 bg-linear-to-br from-gray-800/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                        <div className="relative z-10">
                            <div className="w-12 h-12 bg-linear-to-br from-gray-700 to-gray-900 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                                <svg className="w-6 h-6 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                                </svg>
                            </div>

                            <h2 className="text-2xl font-bold text-gray-100 mb-2 group-hover:text-white transition-colors">
                                Topics & Topic Types
                            </h2>
                            <p className="text-gray-500 group-hover:text-gray-400 transition-colors">
                                Manage topics and their types.
                            </p>

                            <div className="mt-6 flex items-center text-gray-400 group-hover:text-gray-300 transition-colors">
                                <span className="text-sm font-medium">Manage</span>
                                <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                            </div>
                        </div>
                    </Link>
                </div>
            </div>
        </div>
    );
}