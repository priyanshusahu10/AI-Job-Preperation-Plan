import {useAuth} from "../Hooks/useAuth"
import { Navigate,useNavigate } from "react-router"
import Loading from "../Pages/Loading/Loading.jsx"


const Protected = ({children}) =>{
    const {loading, user} = useAuth()
    const navigate = useNavigate()

    if(loading){
        return 
        (
            <Loading/>
        )
    }
   
    if(!user){
        return <Navigate to={'/login'}/>
    }
    return children
}

export default Protected