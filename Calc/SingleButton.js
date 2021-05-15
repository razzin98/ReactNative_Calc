import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  Dimensions,
  TouchableOpacity
} from 'react-native';

export default class InputNumberButton extends Component {
  
  render() {
    const {title, background, clickButton} = this.props;
    let zero = title === '0'  ? 2.06 : 1;

    return(
      <TouchableOpacity 
        style={{
          margin: 1,
          borderWidth : 2,
          borderColor: 'gray',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor : background,
          flex: zero
        }}
        onPress={() => clickButton(title)}>
        
        <Text style={styles.textStyle}>{title}</Text>
      </TouchableOpacity>
    );
  }
} 
  

const styles = StyleSheet.create({
  textStyle: {
      color: 'white',
      fontSize: 40
  }
});