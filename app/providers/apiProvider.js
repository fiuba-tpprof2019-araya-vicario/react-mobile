
import config from '../config/config'

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



}

export default apiProvider;



