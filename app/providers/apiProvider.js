
import config from '../config/config'
import tokenProvider from './tokenProvider'

const apiProvider = {

  _get: async function(route){

    let token = await tokenProvider.getToken();

    try {
      let response = await fetch(
        config.api.url+route,
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

  _post: async function(route,body){

    let token = await tokenProvider.getToken();

    try {
      let response = await fetch(
        config.api.url+route,
        {
          method: 'post',
          headers: {
            'Content-Type':'application/json',
            'Authorization':token,
          },
          body: JSON.stringify(body)
        }
        );
      let responseJson = await response.json();
      return responseJson;
    } 
    catch (error) {
      console.error(error);
    }
  },


  login: async function(userInfo) {
    let passbody= {
      id_token: userInfo.idToken,
      email: userInfo.user.email,
      name: userInfo.user.name
    }
    return this._post('/auth',passbody);
  },



  createIdea: async function(){

//   {
//   "name": "tp-prueba",
//   "description": "descripcion tp-prueba",
//   "proposal_url": "https://drive.google.com/file/d/1Z2B-Ro66RmOuAKQ2U0_oVRYfzKPdwxG1/view?usp=sharing",
//   "type_id": 1,
//   "students": [8],
//   "tutor_id": 9,
//   "cotutors": [4,7],
//   "careers": [2,3]
// }

    return this._post('/projects',{});
  },


  getStudents: async function(){
    return this._get('/users?type=student');
  },
  getTutors: async function(){
    return this._get('/users?type=tutor');
  },
  getCareers: async function(){
    return this._get('/careers');
  },


}

export default apiProvider;



