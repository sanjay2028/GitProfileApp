import axios from 'axios';


const networkError = {    
    status_code : 511,
    error_type: "network_error",
    error: "Network Error",
    flash: "Network Unavailable. Please try again"
}

const URL = 'http://localhost:9000/api'

const configVals = () => ({
    headers: { 'Accept': 'application/json',}
});

const userService = {
    fetchUser: (username) => {                
        return axios.get(`${URL}/${username}`, configVals())
               .then(({data}) => {        
                   return data;
               })
               .catch(error => {                       
                   if(typeof error.response == 'undefined'){                       
                        return Promise.reject(networkError); 
                   } else {
                        return Promise.reject({
                                status_code : error.response.status,
                                data : error.response.data                     
                        });                        
                   }       
               }); 
    },
    fetchCommits: ({username, repoId}) => {
        return axios.get(`${URL}/${username}/${repoId}`, configVals())
               .then(({data}) => {        
                   console.log("Success", data);
                   return data;
               })
               .catch(error => {                
                console.log("failure", error);       
                   if(typeof error.response == 'undefined'){                       
                        return Promise.reject(networkError); 
                   } else {
                        return Promise.reject({
                                status_code : error.response.status,
                                data : error.response.data                     
                        });                        
                   }       
               }); 
    },
}

export default userService;