import { AddRecourse } from "@/components/AddRecourse";
import { UserProfile } from "@/components/UserProfile";
import supabase from "@/lib/supabase";
import { useEffect, useState } from "react";


export const Home = () => {
    const [recourses, setRecourses] = useState([]);
    const [isVisible, setIsVisible] = useState(false);
    const [userVisible, setUserVisible] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        const fetchRecourses = async () => {
            const { data: { user }, error: userError } = await supabase.auth.getUser();
            
            if (userError || !user) {
                setRecourses([]);
                return;
            }

            const { data, error } = await supabase
                .from('recourses')
                .select('*')
                .order('created_at', { ascending: false })
                .eq('user_id', user.id);

            if (error) {
                setRecourses([]);
                return;
            }

            setRecourses(data);
            setLoading(false);
        }

        fetchRecourses();
    }, []);

    const handleDelete = (id) => async () => {
        setLoading(true);
        const { error } = await supabase
            .from('recourses')
            .delete()
            .eq('id', id);

        if (error) {
            return;
        }

        const fetchRecourses = async () => {
            const { data: { user }, error: userError } = await supabase.auth.getUser();
            
            if (userError || !user) {
                setRecourses([]);
                return;
            }

            const { data, error } = await supabase
                .from('recourses')
                .select('*')
                .order('created_at', { ascending: false })
                .eq('user_id', user.id);

            if (error) {
                setRecourses([]);
                return;
            }

            setRecourses(data);
            setLoading(false);
        }

        fetchRecourses();
        setLoading(false);
    }

    return (
        <div className="w-full min-h-screen mx-auto flex justify-center bg-gray-200">
            <div className="max-w-3xl w-full py-10 px-5 md:px-0">
                <div className="flex justify-between items-center">
                    <h1 className="text-3xl font-medium">Tus recursos</h1>
                    <i
                        onClick={() => setUserVisible(true)}
                        className='bx bxs-user border-2 border-gray-300 bg-gray-100 hover:bg-gray-300 cursor-pointer p-3 text-xl flex justify-center items-center rounded-full transition-all duration-300'
                    />
                </div>
                { loading ? (
                    <div className="flex flex-col items-center justify-center h-full">
                        <h2 className="text-2xl">Cargando recursos...</h2>
                    </div>
                ) : (
                    recourses.length === 0 || recourses === null ? (
                        <div className="flex flex-col items-center justify-center h-full">
                            <p className="text-5xl">📚</p>
                            <h2 className="text-4xl font-medium">No tienes recursos!</h2>
                            <p>Añade uno con el símbolo '+'.</p>
                        </div>
                    ) : (
                        <ul className="flex flex-col gap-4 mt-10">
                            {
                                recourses.map((recourse, key) => (
                                    <li key={key} className="bg-[#fafafa] py-5 px-8 rounded-md shadow-sm hover:shadow-md transition-all duration-300 flex justify-between items-center">
                                        <div className="flex justify-center items-center gap-4">
                                            <h3 className="text-lg md:text-xl lg:text-2xl font-semibold">{recourse.title}</h3>
                                            <p className="text-gray-400 text-xs">{recourse.content}</p>
                                        </div>
                                        <div className="flex gap-2 h-full">
                                            <a
                                                href={recourse.content} 
                                                target="_blank"
                                                className="cursor-pointer text-white bg-blue-600 rounded-md px-3 py-1 hover:bg-blue-700 transition-all duration-300"
                                            >
                                                Visitar
                                            </a>
                                            <button
                                                className="cursor-pointer text-white bg-red-600 rounded-md px-3 py-1 hover:bg-red-700 transition-all duration-300"
                                                onClick={handleDelete(recourse.id)}
                                                disabled={loading}
                                            >
                                                Eliminar
                                            </button>
                                        </div>
                                    </li>
                                ))
                            }
                        </ul>
                    )
                )}
            </div>

            { isVisible ? (
                <AddRecourse setIsVisible={setIsVisible} />
            ) : (
                <button 
                    onClick={() => setIsVisible(true)}
                    className="absolute bottom-10 right-10 bg-blue-600 flex items-center justify-center p-2 rounded-full shadow-lg text-white hover:bg-blue-700 transition-all duration-300"
                >
                    <i className="bx bx-plus text-xl" />
                </button>
            )}

            { userVisible && (
                <UserProfile setUserVisible={setUserVisible} />
            )}

        </div>
    )
}