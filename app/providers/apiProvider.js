
import config from '../config/config'
import tokenProvider from './tokenProvider'

const apiProvider = {
  login: async function(userInfo) {
    console.log(userInfo);

    let passbody= {
      id_token: userInfo.idToken,
      email: userInfo.user.email,
      name: userInfo.user.name
    }
    console.log('login in request:',passbody);

    try {
      let response = await fetch(
        config.api.url+'/v0/api/auth',
        {
          method: 'post',
          headers: {'Content-Type':'application/json'},
          body: JSON.stringify(passbody)
        }
        );
      let responseJson = await response.json();
      return responseJson;
    } 
    catch (error) {
      console.error(error);
    }
  },


  getStudents: async function(){

    let token = await tokenProvider.getToken();
    console.log('sending token',token);

    try {
      let response = await fetch(
        config.api.url+'/v0/api/users?type=student',
        {
          method: 'get',
          headers: {
            'Content-Type':'application/json',
            'Authorization':token
          },
        }
        );
      let responseJson = await response.json();
      return responseJson;
    } 
    catch (error) {
      console.error(error);
    }

  },


  getTutors: async function(){

    let token = await tokenProvider.getToken();
    console.log('sending token',token);

    try {
      let response = await fetch(
        config.api.url+'/v0/api/users?type=tutor',
        {
          method: 'get',
          headers: {
            'Content-Type':'application/json',
            'Authorization':token
          },
        }
        );
      let responseJson = await response.json();
      return responseJson;
    } 
    catch (error) {
      console.error(error);
    }

  },

   getCareers: async function(){

    let token = await tokenProvider.getToken();
    console.log('sending token',token);

    try {
      let response = await fetch(
        config.api.url+'/v0/api/careers',
        {
          method: 'get',
          headers: {
            'Content-Type':'application/json',
            'Authorization':token
          },
        }
        );
      let responseJson = await response.json();
      return responseJson;
    } 
    catch (error) {
      console.error(error);
    }

  }


}

export default apiProvider;


