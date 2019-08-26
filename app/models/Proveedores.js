import React, { Component } from 'react';

import { StyleSheet, View, Alert, Platform, Button } from 'react-native';

class Proveedor {
  name: string;
  direccion: string;

  constructor(name, direccion){
    this.name = name;
    this.direccion = direccion;
  }
}

export class Proveedores extends Component {

  static listProveedores = [];

  constructor(){
    super();
    /*this.name = name;
    this.direccion = direccion;
    alert(this.name);*/
  }
  static agregar=(name, direccion)=>{
    Alert.alert("Se guardo al proveedor " + name);
    Proveedores.listProveedores.push(new Proveedor(name, direccion));
  }
  static getList=()=>{
    return Proveedor.listProveedores;
  }
}