import axios from "axios"



export async function register({ username, email, password }) {

    try {
        const response = await axios.post('https://ai-job-preperation-plan.onrender.com/api/auth/register', {
            username, email, password
        },{
            withCredentials: true
        })

        return response.data

    } catch (err) {

        console.log(err)

    }

}

export async function login({ email, password }) {

    try {

        const response = await axios.post("https://ai-job-preperation-plan.onrender.com/api/auth/login", {
            email, password
        },{
            withCredentials: true
        })

        return response.data
        console.log("data")
    } catch (err) {
        console.log(err)
    }

}

export async function logOut() {
    try {

        const response = await axios.get("https://ai-job-preperation-plan.onrender.com/api/auth/logout",{
            withCredentials:true
        })

        return response.data

    } catch (err) {

    }
}

export async function getUser() {

    try {

        const response = await axios.get("https://ai-job-preperation-plan.onrender.com/api/auth/get-user",{
            withCredentials:true
        })

        return response.data

    } catch (err) {
        console.log(err)
    }

}
