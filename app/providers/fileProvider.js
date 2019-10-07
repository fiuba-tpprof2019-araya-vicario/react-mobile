
import DocumentPicker from 'react-native-document-picker';
import config from '../config/config'
import storageProvider from './storageProvider'

const fileProvider = {

	pickDocument: async function(){
			try {

				const res = await DocumentPicker.pick({
					type: [DocumentPicker.types.pdf],
				});
				return res;
			}
			catch (err) {
				if (DocumentPicker.isCancel(err)) {
				// User cancelled the picker, exit any dialogs or menus and move on
				} 
				else {
					throw err;
				}
			}
	}




}

export default fileProvider;