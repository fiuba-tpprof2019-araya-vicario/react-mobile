import { AsyncStorage } from "react-native"

const tokenProvider = {
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
      console.log('getToken',value);
      return value;
    }
  }
   catch (error) {
    // Error retrieving data
  }

  },

  clearToken: async function(){
  	 return await AsyncStorage.clear();
  }



}

export default tokenProvider;



