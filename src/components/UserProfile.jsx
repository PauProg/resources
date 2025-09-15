import supabase from "@/lib/supabase";
import { useEffect, useState } from "react";


export const UserProfile = ({ setUserVisible }) => {
    const [username, setUsername] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchUsername = async () => {
            setLoading(true);
            const { data: { user}, error } = await supabase.auth.getUser();

            if (!user || error) {
                setUsername(null);
                return;
            }

            setUsername(user.email);
            setLoading(false);
        }

        fetchUsername();
    }, [])

    const handleSignout = async () => {
        const { error } = await supabase.auth.signOut();

        if (error) {
            alert('Error al cerrar sesión');
            return;
        }

        window.location.reload();
    }

    return (
        <div className="fixed w-screen h-screen top-0 left-0">
            <div 
                onClick={() => setUserVisible(false)}
                className="bg-black/20 w-screen h-screen backdrop-blur-sm z-25" 
            />
            <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg shadow-lg z-30 px-6 py-10 w-11/12 max-w-md flex flex-col items-center justify-center">
                { loading ? (
                    <h2 className="text-lg font-semibold">Cargando...</h2>
                ) : (
                    <div className="flex flex-col items-center">
                        <h2 className="text-lg font-semibold">Bienvenido {username}!</h2>
                        <button 
                            onClick={handleSignout}
                            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 transition-all duration-300 rounded-md mt-4"
                        >
                            Cerrar sesión
                        </button>
                    </div>
                )}
            </div>
        </div>
    )
}