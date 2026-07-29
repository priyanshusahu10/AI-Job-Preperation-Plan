import { useContext} from "react"
import { AuthContext } from "../auth.context"
import { login, register, logOut, getUser } from "../Services/auth.api"



export const useAuth = () => {
    const context = useContext(AuthContext)
    const {user, setUser, loading, setLoading} = context


 const handleLogin = async ({email,password}) => {
        setLoading(true)
        try{
        const data = await login({email,password})  
        setUser(data.user)
        console.log(data.user);
        
        }catch(err){

        }finally{
        
        setLoading(false)
       
        }  
 }


    const handleRegister = async ({email,username, password}) => {
        setLoading(true)
        try{
        const data = await register({username,email,password})
        setUser(data.user)
        }catch(err){
        }finally{
        setLoading(false)
        }
    }

    const handlelogOut = async() =>{
        setLoading(true)
        
        const data = await logOut()
        setUser(null)
        setLoading(false)
    
    }

    //  useEffect(()=>{
    //     const getAndSetUser = async ()=>{
    //         const data = await getUser()
    //         setUser(data.user)
    //         setLoading(false)
    //     }
        
    //     getAndSetUser()
    // },[])


    return {user , loading , handleRegister, handleLogin, handlelogOut}
}