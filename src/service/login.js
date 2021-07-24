import axios from "axios";

function logIn() {
  axios.post('https://alurakut.vercel.app/api/login', community, config)
  .then(function (response) {
    if(success){
      success(response.data);
    }
  })
  .catch(function (error) {
    console.error(error);
    if(fail){
      fail(error);
    }
  });   
}

export const LoginService = {
  logIn: logIn,
}