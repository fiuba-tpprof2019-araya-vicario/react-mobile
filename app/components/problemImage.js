import React, { Component } from 'react';
import { Button, FormLabel, FormInput, FormValidationMessage } from 'react-native-elements'
import { View,
		  AppRegistry,
		  StyleSheet,
		  Text,
		  PixelRatio,
		  TouchableOpacity,
		  Image, } from 'react-native'
import ImagePicker from 'react-native-image-picker';

var base64 = require('base-64');

export class ProblemImage extends React.Component {

	constructor(props) {
	 super(props);
	 this.state = {
	    imageName: null,
	    imageUri: null,
	    latitude: null,
	    longitude: null
	 }
 	}

	selectPhotoTapped() {
	    const options = {
	      quality: 1.0,
	      maxWidth: 500,
	      maxHeight: 500,
	      storageOptions: {
	        skipBackup: true
	      }
	    };
		ImagePicker.showImagePicker(options, (response) => {
		  console.log('Response = ', response);

		  if (response.didCancel) {
		    console.log('User cancelled photo picker');
		  }
		  else if (response.error) {
		    console.log('ImagePicker Error: ', response.error);
		  }
		  else if (response.customButton) {
		    console.log('User tapped custom button: ', response.customButton);
		  }
		  else {
		    let source = { uri: response.uri };

		    // You can also display the image using data:
		    // let source = { uri: 'data:image/jpeg;base64,' + response.data };

		    this.setState({
		      image: source,
		      imageUri: response.uri,
		      imageName: response.fileName,
		      latitude: response.latitude,
		      longitude: response.longitude
		    });
		  }
		});
	}

	getLocation(){
		if (this.state.longitude)
			return this.state.longitude + '/' + this .state.latitude;
		else
			return '';
	}

	uploadPhoto(){

		let imageUri = this.state.imageUri;
		let imageName = this.state.imageName;

		return new Promise(function(res,rej){

			if(!imageUri){
				console.log("NO IMAGE");
				res(null);
			}

			console.log('URIII: '+imageUri);
			const formData = new FormData();
		    formData.append('file', { uri:  imageUri , type: 'image/jpg', name: imageName })

			return fetch('http://52.91.201.153:10011/api/upload', {
			     	method: 'post',
					headers: {
						'Authorization': 'Basic ' + base64.encode('user' + ":" + '12345'),
					},
			     	body: formData

			    }).then((response) => { 
			      let data = response.json().then((data) => {
			        console.log(data);
			        res(data.Location);
			      })
			    })
			    .catch((err) => {
			    	console.log(err);
			    });
		})
	}

	render() {
		return (
  		<View >
		      <FormLabel>Imagen del problema</FormLabel>
		   {/*   <FormInput containerStyle={{borderColor: 'gray'}} onChangeText={console.log("change")}/>
		      {false && <FormValidationMessage>Error message</FormValidationMessage>}*/}
		      <View style={{flex: 1,marginTop: 15, marginLeft: 20,marginRight: 20}}>
				<View style={styles.avatarContainer}>
					{ this.state.image == null ? 
					<Button
		      		onPress={this.selectPhotoTapped.bind(this)}
					backgroundColor={'#0093D0'}
					borderRadius={50}
					fontWeight={'800'}
					raised
					icon={{name: 'cloud-upload'}}
					title='Subir Imagen' /> :
					<TouchableOpacity onPress={this.selectPhotoTapped.bind(this)} >
						<Image 
						style={styles.avatar} 
						source={this.state.image} />
					</TouchableOpacity>
					}
				</View>
		      </View>
		  </View>
		)
	 }
	}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF'
  },
  avatarContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10
  },
  avatar: {
    borderColor: '#9B9B9B',
    borderWidth: 1 / PixelRatio.get(),
    borderRadius: 75,
    width: 150,
    height: 150
  }
});
export default ProblemImage;