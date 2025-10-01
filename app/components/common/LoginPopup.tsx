// app/components/LoginPopup.tsx
import React, { useState } from 'react';

const LoginPopup: React.FC<{ onClose: () => void }> = ({ onClose }) => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [isLogginCorrect, setIsLoginCorrect] = useState<boolean>(true);

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        if (email.length > 0 && password.length > 0 && email === password) {
            setIsLoginCorrect(true);
            onClose();
        } else {
            setIsLoginCorrect(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-8 rounded-2xl shadow-2xl w-96">
                <h2 className="text-2xl font-bold mb-4">Login</h2>
                {!isLogginCorrect &&
                    <h2 className="text-md text-red-500 font-semi-bold mb-1">Mot de passe ou email incorrect</h2>
                }
                <form onSubmit={handleLogin} className="flex flex-col space-y-4">
                    <input
                        type="text"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="px-4 py-2 border border-gray-300 rounded-md"
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="px-4 py-2 border border-gray-300 rounded-md"
                    />
                    <div className="flex justify-between ">
                        <button
                            type="button"
                            className="bg-red-500 mr-4 w-1/2 text-white font-bold py-2 rounded-md hover:bg-red-600"
                            onClick={onClose}
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="bg-green-500 w-1/2 text-white font-bold py-2 rounded-md hover:bg-green-600"
                        >
                            Submit
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default LoginPopup;
