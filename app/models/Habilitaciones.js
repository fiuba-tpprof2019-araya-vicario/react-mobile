import React, { Component } from 'react';

import { StyleSheet, View, Alert, Platform, Button } from 'react-native';

class Habilitacion {

  constructor(name, proveedor, fecha){
    this.name = name;
    this.proveedor = proveedor;
    this.fecha = fecha;
  }
}

export class Habilitaciones extends Component {

  static listHabilitaciones = [];

  constructor(){
    super();
  }
  
  static agregar=(name, proveedor, fecha)=>{
    Alert.alert(name + proveedor.name + fecha);
    Habilitaciones.listHabilitaciones.push(new Habilitacion(name, proveedor, fecha));
  }
}