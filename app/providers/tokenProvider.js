import { AsyncStorage } from "react-native"

const tokenProvider = {
  storeToken: async function(token) {
    try {
        var jsonOfItem = await AsyncStorage.setItem('accessToken', token);
        return jsonOfItem;
    } catch (error) {
      console.log(error.message);
    }
  },

  getToken: async function(){
  	 return await AsyncStorage.getItem('accessToken');
  },

  clearToken: async function(){
  	 return await AsyncStorage.clear();
  }



}

export default tokenProvider;



