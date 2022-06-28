import { createContext, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { api } from "../services/api";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [client, setClient] = useState(null);

    useEffect(() => {
        const loadingStoreData = async() => {
            const storageClient = localStorage.getItem("@Auth:client");
            const storageToken = localStorage.getItem("@Auth:token");

            if(storageClient && storageToken) {
                setClient(storageClient);
            }
        };

        loadingStoreData();
    }, []);

    const signIn = async({ email, password }) => {
        const response = await api.post("/auth", {
            email,
            password,
        });

        if(response.data.error) {
            alert(response.data.error);
        } else {
            setClient(response.data.client);
            api.defaults.headers.common[
                "Authorization"
            ] = `Bearer ${response.data.token}`;
            localStorage.setItem("@Auth:token", response.data.token);
            localStorage.setItem("@Auth:client", JSON.stringify(response.data.client));
        }
    }

    const signOut = () => {
        localStorage.clear();
        setClient(null);
        return <Navigate to="/" />
    }

    return (
        <AuthContext.Provider value={{
          client, signed: !!client, signIn, signOut,
        }}>
            {children}
        </AuthContext.Provider>
    )
}
