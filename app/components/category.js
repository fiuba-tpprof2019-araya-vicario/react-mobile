import React, { Component } from 'react';
import { FormLabel, FormInput, FormValidationMessage, Icon } from 'react-native-elements'
import { View, Text, TouchableOpacity } from 'react-native'

export class Category extends React.Component {

	constructor(props) {
	 super(props);
 	}

	render() {
		return (
      <TouchableOpacity onPress = { () => {this.props.navigation.push('Proposal' , { listOfQuestions: this.props.categoryInfo.questions, categoryId: this.props.categoryInfo.id })} }>
		    <View style={{paddingBottom: 15, paddingLeft: 20, paddingRight: 20, marginTop: 0}} 
              onPress={() => this.props.navigation.push('ProposalScreen')}>
          <View style={{height: 40, flex: 1, alignItems:'center', flexDirection:'row'}} key="asd">
            <Icon name='adjust' type='material' color='#0093D0'/>
            <Text style={{fontWeight: '500', fontSize: 17, marginLeft: 10}} key="Text">
              {this.props.categoryInfo.nombre}
            </Text>
          </View>
          <View style={{marginTop: 0, borderBottomWidth: 2, borderBottomColor: '#d6d7da', width: 100}} key="Line">
          </View>
        </View>
      </TouchableOpacity>
		)
	 }
	}
export default Category;