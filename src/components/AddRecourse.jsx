import supabase from "@/lib/supabase";
import { useState } from "react";


export const AddRecourse = ({ setIsVisible }) => {
    const [title, setTitle] = useState('');
    const [link, setLink] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const { data: { user }, error: userError } = await supabase.auth.getUser();

        if (userError || !user) {
            setLoading(false);
            return;
        }

        const { error } = await supabase
            .from('recourses')
            .insert([
                { user_id: user.id, title, content: link }
            ])

        if (error) {
            setLoading(false);
            return;
        }

        setTitle('');
        setLink('');
        setLoading(false);
        setIsVisible(false);
        window.location.reload();
    };
    
    return (
        <div>
            <div className="bg-black/20 backdrop-blur-xs h-screen w-screen fixed z-25 top-0 left-0" onClick={() => setIsVisible(false)} />
            <div className="bg-[#fafafa] z-50 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-6 rounded-lg shadow-lg w-96">
                <h2 className="text-center font-medium text-3xl mb-5">Añade un recurso</h2>
                <form 
                    onSubmit={handleSubmit}
                    className="flex flex-col gap-4 items-center justify-center"
                >
                    <label 
                        htmlFor='title'
                        className="label"    
                    >
                        <input 
                            type="text"
                            id='title'
                            name='title'
                            placeholder='Título del recurso'
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="input"
                            required
                        />
                        <span className="text-gray-500 text-xs mt-1">Título</span>
                    </label>
                    <label 
                        htmlFor='link'
                        className="label"
                    >
                        <input 
                            type="text"
                            id='link'
                            name='link'
                            placeholder='Enlace del recurso'
                            value={link}
                            onChange={(e) => setLink(e.target.value)}
                            className="input"
                            required
                        />
                        <span className="text-gray-500 text-xs mt-1">Enlace</span>
                    </label>
                    <button
                        type="submit"
                        disabled={loading}
                        className="bg-blue-500 text-white px-4 py-1 rounded-md mt-2 hover:bg-blue-600 transition-all duration-300"
                        title={loading ? 'Cargando...' : 'Añadir'}
                    >
                        {loading ? 'Cargando...' : 'Añadir'}
                    </button>
                </form>
            </div>
        </div>
    )
}