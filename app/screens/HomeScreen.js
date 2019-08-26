import React, { Component } from "react";
import { Header, AppRegistry, Image, View, Text, StyleSheet } from "react-native";
// import { LoginButton, AccessToken } from 'react-native-fbsdk';


const remote = "../assets/main-bg.jpg";

export default class HomeScreen extends React.Component {
  render() {
    const mainTitle = "@TuGobiernas2019";
    const secondTitle = "Votar es un acto inteligente";
    const urlTitle = "www.tugobiernas.com";

    return (
      <View
        style={{
          flex: 1,
          backgroundColor: "#eee",
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        <View
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%"
          }}
        >
          <Image
            style={{ flex: 1 }}
            source={require("../assets/main-bg.jpg")}
          />
        </View>
        <Image
          style={{
            height: 230,
            width: 230,
            shadowColor: "black",
            shadowOffset: {
              width: 0,
              height: 3
            },
            shadowRadius: 5,
            shadowOpacity: 0.3
          }}
          source={require("../assets/people-intro.png")}
        />
        <View
          style={{
            marginTop: 10,
            height: 100,
            padding: 25,
            borderRadius: 50,
            backgroundColor: "white",
            justifyContent: "center"
          }}
        >
          <Text style={[styles.titleStyle, styles.bold]}>{mainTitle}</Text>
          <Text style={[styles.subTitleStyle, styles.bold]}>{secondTitle}</Text>
        </View>
        <View style={{ marginTop: 10 }}>
          <Text style={[styles.urlStyle, styles.bold]}>{urlTitle}</Text>
        </View>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  ralewayFont: {
    fontFamily: "Raleway",
    color: "white",
    padding: 10
  },
  bold: {
    fontWeight: "800"
  },
  titleStyle: {
    fontSize: 30,
    color: "#ee275d",
    textAlign: "center"
  },
  subTitleStyle: {
    fontSize: 20,
    color: "gray",
    textAlign: "center"
  },
  urlStyle: {
    fontSize: 20,
    color: "white",
    textAlign: "center"
  }
});
