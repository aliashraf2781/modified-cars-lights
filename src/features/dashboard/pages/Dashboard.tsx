import { Link } from "react-router-dom";

export default function Dashboard() {
    return (
        <div className="p-6">
            <h2 className="text-3xl font-bold mb-8 text-white">Welcome to Dashboard</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Link to="/dashboard/categories" className="block p-6 bg-gray-800 rounded-lg border border-gray-700 hover:border-red-500 transition-colors group">
                    <h3 className="text-xl font-semibold text-red-400 group-hover:text-red-300 mb-2">Categories & SubCategories</h3>
                    <p className="text-gray-400">Manage all categories and their subcategories.</p>
                </Link>
                <Link to="/dashboard/topics" className="block p-6 bg-gray-800 rounded-lg border border-gray-700 hover:border-red-500 transition-colors group">
                    <h3 className="text-xl font-semibold text-red-400 group-hover:text-red-300 mb-2">Topics & Topic Types</h3>
                    <p className="text-gray-400">Manage topics and their types.</p>
                </Link>
            </div>
        </div>
    );
}
