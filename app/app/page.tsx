"use client";
import React from "react";
import ButtonAdd from "@/components/common/ButtonAdd";
import {useRouter} from "next/navigation";

const Home: React.FC = () => {
    const router = useRouter();
    return (
        <div className="font-sans bg-gray-50 text-gray-600 my-4">
            <main className="p-4">
                <div className="flex flex-col items-center justify-center min-h-screen">
                    <h1 className="text-4xl font-extrabold text-center mb-2 text-blue-600">
                        Bienvenue sur le Gestionnaire de Contacts
                    </h1>
                    <div className="flex justify-around w-full max-w-lg mt-8 mb-10">
                        <ButtonAdd
                            title="Créer votre groupe"
                            onClick={() => router.push("/groups?create=true")}
                        />
                        <ButtonAdd
                            title="Créer votre contact"
                            onClick={() => router.push("/contacts?create=true")}
                        />
                    </div>
                    <div className="flex flex-col lg:flex-row items-center lg:items-start text-center lg:text-left">
                        <p className="mx-4 my-6 text-lg lg:my-0 transition-all duration-300 ease-in-out transform hover:scale-105">
                            FSR is a web application designed to simplify the way you manage your contacts and stay organized.
                            Whether it's adding, modifying, or deleting contacts, or efficiently organizing them into customized
                            groups, FSR offers a seamless and user-friendly experience. Built using the power of Spring and Hibernate.
                        </p>
                        <img src="/image_home.jpg" alt="FSR App" className="w-full lg:w-1/2 rounded-xl shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105" />
                    </div>
                </div>
            </main>
        </div>
    )
}


export default Home;
