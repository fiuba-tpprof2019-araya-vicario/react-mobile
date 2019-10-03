import { AsyncStorage } from "react-native"

const storageProvider = {
  storeToken: async function(token) {
    try {
      console.log('storing token',token)
        var jsonOfItem = await AsyncStorage.setItem('accessToken', token);
        return jsonOfItem;
    } catch (error) {
      console.log(error.message);
    }
  },

  getToken: async function(){

  try {
    const value = await AsyncStorage.getItem('accessToken');
    if (value !== null) {
      // We have data!!
      // console.log('getToken',value);
      return value;
    }
  }
   catch (error) {
    // Error retrieving data
  }

  },

  storeUser: async function(userId) {
    try {
      console.log('storing userId',userId)
        var jsonOfItem = await AsyncStorage.setItem('userId', userId.toString());
        return jsonOfItem;
    } catch (error) {
      console.log(error.message);
    }
  },

  getUser: async function(){

  try {
    const value = await AsyncStorage.getItem('userId');
    if (value !== null) {
      console.log('getUser',value);
      return parseInt(value);
    }
  }
   catch (error) {
    // Error retrieving data
  }

  },

  storeCurrentProject: async function(projectId) {
    try {
      console.log('storing projectId',projectId)
        var jsonOfItem = await AsyncStorage.setItem('currentProjectId', projectId.toString());
        return jsonOfItem;
    } catch (error) {
      console.log(error.message);
    }
  },

  getCurrentProject: async function(){

  try {
    const value = await AsyncStorage.getItem('currentProjectId');
    if (value !== null) {
      // We have data!!
      // console.log('getToken',value);
      return parseInt(value);
    }
  }
   catch (error) {
    // Error retrieving data
  }

  },

  clearCurrentProject: async function(){
    return await AsyncStorage.removeItem('currentProjectId');
  },

  clearStorage: async function(){
  	 return await AsyncStorage.clear();
  }
}

export default storageProvider