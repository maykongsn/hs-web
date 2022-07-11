import { createContext, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { api } from "../services/api";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const loadingStoreData = async() => {
            const storageUser = localStorage.getItem("@Auth:user");
            const storageToken = localStorage.getItem("@Auth:token");

            if(storageUser && storageToken) {
                setUser(storageUser);
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
        } else if(response.data.technician) {
            setUser(response.data.technician);
            api.defaults.headers.common[
                "Authorization"
            ] = `Bearer ${response.data.token}`;
            localStorage.setItem("@Auth:token", response.data.token);
            localStorage.setItem("@Auth:user", JSON.stringify(response.data.technician));
        } else {
            setUser(response.data.client);
            api.defaults.headers.common[
                "Authorization"
            ] = `Bearer ${response.data.token}`;
            localStorage.setItem("@Auth:token", response.data.token);
            localStorage.setItem("@Auth:user", JSON.stringify(response.data.client));
            localStorage.setItem("@Auth:type", "client");
        }
    }

    const signOut = () => {
        localStorage.clear();
        setUser(null);
        return <Navigate to="/" />
    }

    return (
        <AuthContext.Provider value={{
          user, signed: !!user, signIn, signOut,
        }}>
            {children}
        </AuthContext.Provider>
    )
}
