import axios from "axios";




export const createApiInstance=(navigate)=>{


const apiUrl = process.env.REACT_APP_API_URL;

const api=axios.create({
    baseURL:`${apiUrl}/api/v1`,
    headers:{
        "Content-Type":"application/json"
    }

})

api.interceptors.request.use(
    (config)=>{

     

        const accessToken=localStorage.getItem("accessToken")
        const refreshToken=localStorage.getItem("refreshToken")


    //    if(!accessToken || !refreshToken){
    //     navigate("/login")
    //     return Promise.reject(new Error("Tokens are missing"))

    //    }



       config.headers['Authorization'] = `Bearer ${accessToken}`;
       config.headers['x-refresh-token'] = refreshToken;


       return config;
    },
    (error)=>{
        console.log(error)
        return Promise.reject(error)
    }



)



return api;


}

