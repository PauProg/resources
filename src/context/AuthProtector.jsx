import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import supabase from "../lib/supabase";

const AuthProtector = ({ children }) => {
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState(null);

    useEffect(() => {
        const getUser = async () => {
        const { data: { user } } = await supabase.auth.getUser();
        setUser(user);
        setLoading(false);
        };
        getUser();
    }, []);

    if (loading) return null;
    if (user) return <Navigate to="/" replace />;
    return children;
};

export default AuthProtector;
