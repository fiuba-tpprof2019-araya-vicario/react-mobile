import React, { Component } from 'react';
import { Text, View, Button, ScrollView, FlatList, SectionList, Image } from 'react-native'
import { Header, List, ListItem, Icon } from "react-native-elements";
import {
  FormLabel,
  FormInput,
  FormValidationMessage
} from "react-native-elements";

import { Category } from '../components/category';
import { categories } from '../assets/lists';

class CategoriesScreen extends React.Component {
  constructor(props) {
    super(props);
  }
  
  render() {
    return (
      <View style={{ flex: 1, backgroundColor: "#eaeaea" }}>
        <Header
          outerContainerStyles={{ backgroundColor: "#ebc877" }}
          centerComponent={{
            text: "Nueva Propuesta",
            style: { fontSize: 18, color: "#fff" }
          }}
        />
        <ScrollView style={{ flex: 1 }}>
          <View
            style={{
              backgroundColor: "#ffffff",
              margin: 10,
              flex: 1,
              borderRadius: 10,
              paddingBottom: 15,
            }}
          >
            <View
              style={{
                position: "absolute",
                bottom: 60,
                right: 0,
                width: undefined,
                height: undefined,
                zIndex: 200
              }}
            >
              <Image
                resizeMode={'contain'}
                style={{ height: 300, width: 150}}
                source={require("../assets/people-thinking.png")}
              />
            </View>
            <Text
              style={{
                fontWeight: "800",
                margin: 15,
                fontSize: 25,
                color: "#596163"
              }}
            >
              Cuentáme tu problema
            </Text>
          <View style={{backgroundColor: '#ffffff', margin: 10, flex: 1, borderRadius: 10, paddingBottom: 15}}>
              { 
                categories.map((item) => {
                  return (
                    <Category key={ item.id } navigation={this.props.navigation} categoryInfo={ item }></Category>
                    )
                }) }
          </View>
        </View>
       </ScrollView>
      </View>
    );
  }
}

export default CategoriesScreen;
