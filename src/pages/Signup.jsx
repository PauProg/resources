import supabase from "@/lib/supabase";
import { useState } from "react";
import { useNavigate } from "react-router-dom";


export const Signup = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const { error } = await supabase.auth.signUp({
            email,
            password
        });

        if (error) {
            alert('Error al registrarse: ' + error.message);
            setLoading(false);
            return;
        }

        alert('Registro exitoso! Por favor, verifica tu correo.');
        setEmail('');
        setPassword('');
        setLoading(false);
        navigate('/login');
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-200">
            <div className="bg-[#fafafa] p-8 rounded-md flex flex-col gap-4 shadow-md w-xs">
                <h1 className="text-center font-medium text-3xl mb-2">Registro</h1>
                <form 
                    onSubmit={handleSubmit}
                    className="flex flex-col gap-4 items-center justify-center"
                >
                    <label 
                        htmlFor='email'
                        className="label"
                    >
                        <input 
                            type="text"
                            id='email'
                            name='email'
                            placeholder='Tu correo'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="input"
                            required
                        />
                        <span className="text-gray-500 text-xs mt-1">Email</span>
                    </label>
                    <label 
                        htmlFor='password'
                        className="label"
                    >
                        <input 
                            type="password"
                            id='password'
                            name='password'
                            placeholder='Tu contraseña'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="input"
                            required
                        />
                        <span className="text-gray-500 text-xs mt-1">Contraseña</span>
                    </label>
                    <button
                        type="submit"
                        disabled={loading}
                        className="bg-blue-500 text-white px-4 py-1 rounded-md mt-2 hover:bg-blue-600 transition-all duration-300"
                        title={loading ? 'Cargando...' : 'Regístrate'}
                    >
                        {loading ? 'Cargando...' : 'Regístrate'}
                    </button>
                </form>
                <p className="text-xs text-center">
                    ¿Ya tienes una cuenta? 
                    <a 
                        href="/login"
                        className="ml-1 text-blue-500 hover:text-blue-600 transition-all duration-300"
                        title="Inicia sesión"
                    >
                        Inicia sesión
                    </a>
                </p>
            </div>
        </div>
    )
}