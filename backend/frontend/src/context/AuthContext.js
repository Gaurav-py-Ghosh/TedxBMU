"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const router = useRouter();
    const pathname = usePathname();
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);
    const [adminData, setAdminData] = useState(null);

    useEffect(() => {
        const checkAuth = () => {
            const token = localStorage.getItem("admin_token");
            setIsAuthenticated(!!token);
            setLoading(false);

            // Redirect unauthenticated users away from protected routes
            if (!token && isProtectedRoute(pathname)) {
                router.push("/admin/login");
            }
        };

        // Small delay to ensure localStorage is available
        const timer = setTimeout(checkAuth, 100);
        return () => clearTimeout(timer);
    }, [pathname, router]);

    const login = (token, data = null) => {
        localStorage.setItem("admin_token", token);
        setIsAuthenticated(true);
        setAdminData(data);
    };

    const logout = () => {
        localStorage.removeItem("admin_token");
        setIsAuthenticated(false);
        setAdminData(null);
        router.push("/admin/login");
    };

    const getToken = () => {
        return localStorage.getItem("admin_token");
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, loading, adminData, login, logout, getToken }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within AuthProvider");
    }
    return context;
}

function isProtectedRoute(pathname) {
    const protectedRoutes = ["/admin/dashboard", "/admin/scan"];
    return protectedRoutes.some(route => pathname.startsWith(route));
}
