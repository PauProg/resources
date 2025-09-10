import { AddRecourse } from "@/components/AddRecourse";
import supabase from "@/lib/supabase";
import { useEffect, useState } from "react";



export const Home = () => {
    const [recourses, setRecourses] = useState([]);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const fetchRecourses = async () => {
            const { data: { user }, error: userError } = await supabase.auth.getUser();
            if (userError || !user) {
                console.error('No user found:', userError);
                setRecourses([]);
                return;
            }
            const { data, error } = await supabase
                .from('recourses')
                .select('*')
                .order('created_at', { ascending: false })
                .eq('user_id', user.id);

            if (error) {
                console.error('Error fetching recourses:', error);
                setRecourses([]);
                return;
            }

            setRecourses(data);
        }

        fetchRecourses();
    }, []);

    return (
        <div className="w-full min-h-screen mx-auto flex justify-center bg-gray-200">
            <div className="max-w-3xl w-full py-10">
                <h1 className="text-3xl font-medium">Tus recursos</h1>
                {
                    recourses.length === 0 || recourses === null ? (
                        <div className="flex flex-col items-center justify-center h-full">
                            <p className="text-5xl">📚</p>
                            <h2 className="text-4xl font-medium">No tienes recursos!</h2>
                            <p>Añade uno con el símbolo '+'.</p>
                        </div>
                    ) : (
                        <p>Hola</p>
                    )
                }
            </div>

            <AddRecourse setIsVisible={setIsVisible} />
        </div>
    )
}