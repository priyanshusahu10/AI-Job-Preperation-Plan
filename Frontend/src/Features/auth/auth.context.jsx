import { createContext ,useState, useEffect} from "react";
import {getUser} from "./Services/auth.api"

export const AuthContext = createContext()

export const Authprovider = ({children}) =>{

    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
    async function fetchUser() {
        setLoading(true);

        try {
            const data = await getUser();

            if (data?.user) {
                setUser(data.user);
            }
        } finally {
            setLoading(false);
        }
    }

    fetchUser();
}, []);

    return (
        <AuthContext.Provider value={{
            user, setUser, loading, setLoading}}>
            {children}
            </AuthContext.Provider>
    )
}