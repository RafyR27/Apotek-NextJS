import environment from "@/config/environment";
import axios from "axios";

const headers = {
  "Content-Type": "application/json",
};

const instance = axios.create({
    baseURL: environment.BASE_URL,
    headers,
    timeout: 60 * 1000,
})

instance.interceptors.response.use(
    (response) => response,
    (error) => {
        const status = error.response?.status;

        if(status === 401){
            const message = status.response.data.message;

            if(message === "Unauthorized"){
                
            }
        }
    }
)
