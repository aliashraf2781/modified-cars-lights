import { Outlet } from "react-router-dom";

export default function DashboardLayout() {
    return (
        <div className="min-h-screen bg-neutral-900">
            <header className="bg-white/5  shadow p-4">
                <h1 className="text-2xl text-red-500 font-bold">Dashboard</h1>
            </header>
            <main>
                <Outlet />
            </main>
        </div>
    );
}
