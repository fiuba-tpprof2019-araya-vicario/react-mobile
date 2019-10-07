
import config from '../config/config'
import storageProvider from './storageProvider'

const apiProvider = {

  _get: async function(route){

    let token = await storageProvider.getToken();

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

    let token = await storageProvider.getToken();

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

    let token = await storageProvider.getToken();

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

    let token = await storageProvider.getToken();

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

  uploadDocument: async function(file){
      // console.log("uploadDocument:file",file)
      let token = await storageProvider.getToken();
      let currentProjectId = await storageProvider.getCurrentProject();
      let body = new FormData();
      body.append('file', {uri: file.uri,name: file.name,filename :file.name,type: file.type});
      body.append('Content-Type', 'application/pdf');

    try {
      let response = await fetch(
        config.api.url+"/projects/"+currentProjectId+"/proposal",
        {
          method: 'put',
          headers: {
            "Content-Type": "multipart/form-data",
            'Authorization':token,
          },
          body: body
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
   // console.log('puting project',body)
    return this._put(`/projects/${projectId}`,body);
  },

  deleteIdea: async function(projectId){
    // console.log('deleting project')
    return this._delete(`/projects/${projectId}`);
  },

  acceptStudentRequest: async function(requestId){
    let body ={"status": "accepted"}
    return this._put(`/requests/students/${requestId}`, body);
  },
  rejectStudentRequest: async function(requestId){
    let body ={"status": "rejected"}
    return this._put(`/requests/students/${requestId}`, body);
  },

    acceptTutorRequest: async function(requestId){
    let body ={"status": "accepted"}
    return this._put(`/requests/tutors/${requestId}`, body);
  },
  rejectTutorRequest: async function(requestId){
    let body ={"status": "rejected"}
    return this._put(`/requests/tutors/${requestId}`, body);
  },

  getMyProject: async function(){
    let projectId = await storageProvider.getCurrentProject();

    if(projectId == null) return

    let project = await this._get('/projects/'+projectId);
    // console.log('apiProvider:project:',project);
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
  getStudentRequests: async function(){
    return this._get('/requests/students');
  },
  getTutorRequests: async function(){
    return this._get('/requests/tutors');
  }

}

export default apiProvider;



