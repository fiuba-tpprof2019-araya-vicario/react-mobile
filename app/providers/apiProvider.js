
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

  _put: async function(route,body){

    let token = await tokenProvider.getToken();

    try {
      let response = await fetch(
        config.api.url+route,
        {
          method: 'put',
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

  _delete: async function(route){

    let token = await tokenProvider.getToken();

    try {
      let response = await fetch(
        config.api.url+route,
        {
          method: 'delete',
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


  login: async function(userInfo) {
    let passbody= {
      id_token: userInfo.idToken,
      email: userInfo.user.email,
      name: userInfo.user.name
    }
    return this._post('/auth',passbody);
  },



  createIdea: async function(idea){
    
     let body ={
         "name":idea.title,
         "description":idea.description,
         "students":idea.selectedStudent,
         "tutor_id":idea.selectedTutor[0],
         "cotutors":[],
         "careers": idea.selectedCarreer,
         "type_id": idea.selectedType[0],
     }
    console.log('posting new project',body)
     return this._post("/projects",body);
  },

  editIdea: async function(idea, projectId){
    
    let body ={
        "name":idea.title,
        "description":idea.description,
        "students":idea.selectedStudent,
        "tutor_id":idea.selectedTutor[0],
        "cotutors":[],
        "careers": idea.selectedCarreer,
        "type_id": idea.selectedType[0],
    }
   console.log('puting project',body)
    return this._put(`/projects/${projectId}`,body);
 },

 deleteIdea: async function(projectId){
  console.log('deleting project')
  return this._delete(`/projects/${projectId}`);
},

  getMyProject: async function(){
    let currentProject =  await this._get('/projects/students/');
    // console.log('proyect that I participate:',currentProject);
    if(currentProject.data.Creations.length==0 
      && currentProject.data.Participations.length==0)
      return null;
    let projectId;
     if(currentProject.data.Participations.length==0)
       projectId= currentProject.data.Creations[0].id;
     else projectId= currentProject.data.Participations[0].id;


    let project = await this._get('/projects/'+projectId);
    console.log('apiProvider:project:',project);
    return project.data;

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
  getTypes: async function(){
    return this._get('/types');
  },

}

export default apiProvider;



