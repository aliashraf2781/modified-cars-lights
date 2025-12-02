import { Outlet } from "react-router-dom";

export default function DashboardLayout() {
    return (
        <div className="min-h-screen bg-gray-100">
            <header className="bg-white shadow p-4">
                <h1 className="text-xl font-bold">Dashboard</h1>
            </header>
            <main className="p-4">
                <Outlet />
            </main>
        </div>
    );
}
