import { AsyncStorage } from "react-native"

const util = {
  isValidEmail:  function(email) {
      // eslint-disable-next-line no-useless-escape
  		return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);
  },


}

export default util;

