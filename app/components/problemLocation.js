import React, { Component } from 'react';
import { FormLabel, FormInput, FormValidationMessage } from 'react-native-elements'
import { View } from 'react-native'

export class ProblemLocation extends React.Component {

	// constructor(props) {
	//  super(props)
 // 	}

	render() {
		return (
  		<View >
		      <FormLabel>Ubicacion del problema</FormLabel>
		   {/*   <FormInput containerStyle={{borderColor: 'gray'}} onChangeText={console.log("change")}/>
		      {false && <FormValidationMessage>Error message</FormValidationMessage>}*/}
		      <View style={{flex: 1, height: 100,marginTop: 15, marginLeft: 20,marginRight: 20, backgroundColor: '#787878', borderRadius: 5}}>
		      </View>
		  </View>
		)
	 }
	}
export default ProblemLocation;