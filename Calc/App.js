import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  TouchableOpacity,
  Dimensions
} from 'react-native';

import SingleButton from './SingleButton'
import { buttonsPortrait, buttonsLandscape } from './Buttons'



export default class App extends React.Component {


  constructor() {
    super()
	const getOrientation = () => {
            const screen = Dimensions.get('window');
            return screen.height >= screen.width;
        };
	
    this.state = {
      resultText: "",
	  orientation: getOrientation() ? 'PORTRAIT' : 'LANDSCAPE',
	  operations :["AC", "DEL", "/", "*", "-", "+"],
	  advanced :[["+/-", "%" , "e"], ["ln", "log10", "ex" ] ,["SQRT", "x^2" , "x^3"]],
	  nums :[[7, 8, 9], [4, 5, 6], [1, 2, 3], [0,".","="]]
    }
	
	Dimensions.addEventListener('change', () => {
            this.setState({
                orientation: getOrientation() ? 'PORTRAIT' : 'LANDSCAPE'
      });
    });
	
  }
  
  createButtons(buttons) {
    let buttonsLayout = buttons.map((buttonRows, rowsIndex) => {
      let rowLayout = buttonRows.map((button, buttonIndex) => {
        return <SingleButton
          title={button.title}
          background={button.backgroundColor}
          clickButton={this.buttonPressed.bind(button.title)}
          key={'b' + buttonIndex} />
      });
      return <View style={styles.row} key={'r' + rowsIndex}>{rowLayout}</View>
    });
    return buttonsLayout
  }

calculateResult() {
  const text = this.state.resultText
  this.setState({
    resultText: ""+eval(text)
  })
}

  validate() {
    const text = this.state.resultText
    switch(text.slice(-1)) {
      case '+':
      case '-':
      case '*':
      case '/':
        return false
    }
    return true
  }

   buttonPressed = (text) => {
	  const { resultText, orientation, operations, advanced, nums } = this.state;
    console.log(text)
	if(text=='AC'||text=='DEL'||text=='+/-'||text=='e'||text=='ex'||text=='log10'||text=='ln'
		||text==''||text=='SQRT'||text=='x^2'||text=='x^3'||text=='II'||text=='x!'){
			this.operate(text)
		}
	else{
		let lastCharr = resultText.charAt(0);
		let stringLength = resultText.length;
		let lastChar = resultText.charAt(1);
		let end = resultText.charAt(resultText.length-1);
		if(text == '=') {
		  return this.validate() && this.calculateResult()
		}
		else if(lastCharr=='0' && lastChar!='.'){
			if(text!='.'){
				this.setState({
					resultText: ""+text
				})
			}
			else{
				this.setState({
					resultText: resultText+text
				})
			}
		}
		
		else if(text == '0'){
		  let stringLength2 = resultText.length;
		  let lastCharr2 = resultText.charAt(stringLength2 - 1);
		  if(lastCharr2 == '/') {
			resultText: resultText
		  }
		  else {this.setState({
			resultText: resultText+text
		  })}
		}

		else if(resultText.slice(-1) == '.' && text == '.'){
		  resultText: resultText
		}
		else if(end==text);
		else {this.setState({
		  resultText: resultText+text
		})}
	}
  }

  operate(operation) {
    switch(operation) {
		case 'AC':
        this.setState({
          resultText: ''
        })
        break
		case 'DEL':
          let text = this.state.resultText.split('')
          text.pop()
          this.setState({
            resultText: text.join('')
          })
          break
		case '+/-':
			this.setState({
				resultText: ""+eval(this.state.resultText)*-1
			})
          break
		case 'e':
			this.setState({
				resultText: ""+eval(eval(this.state.resultText)*Math.exp(1))
				//resultText: ""+eval(eval(this.state.resultText)*Math.exp(1))
				//resultText: ""+eval(Math.exp(eval(this.state.resultText)))
				//resultText: ""+eval(Math.exp(this.state.resultText))
			})
          break
		case 'ex':
			this.setState({
				resultText: ""+eval(Math.exp(eval(this.state.resultText)))
			})
          break
		case 'log10':
			this.setState({
				resultText: ""+eval(Math.log10(eval(this.state.resultText)))
			})
          break
		case 'ln':
			this.setState({
				resultText: ""+eval(Math.log(eval(this.state.resultText)))
			})
          break
		case 'SQRT':
			this.setState({
				resultText: ""+eval(Math.sqrt(eval(this.state.resultText)))
			})
          break
		case 'x^2':
			this.setState({
				resultText: ""+eval(Math.pow((eval(this.state.resultText)),2))
			})
          break
		case 'x^3':
			this.setState({
				resultText: ""+eval(Math.pow((eval(this.state.resultText)),3))
			})
			break
		case 'II':
			this.setState({
				resultText: ""+this.state.resultText +Math.PI
			})
          break
		case 'x!':
			let num = eval(this.state.resultText);
			let fac = num;
			if (num === 0 || num === 1) 
				return 1; 
			while (num > 1) { 
				num--;
				fac *= num;
			}
			this.setState({
				resultText: fac
			})
          break
          const lastChar = this.state.resultText.split('').pop()
          if(operations.indexOf(lastChar) > 0) return
          if(text == "") return
          this.setState({
            resultText: this.state.resultText + operation
          })
    }
  }

  render() {
	if(this.state.orientation=='PORTRAIT'){
		return (
		  <View style={styles.container}>
			<View style={styles.result}>
			  <Text style={styles.resultText}>{this.state.resultText}</Text>
			</View>
			<View style={styles.buttons}>
			  {this.createButtons(buttonsPortrait)}
			</View>
		  </View>
		);
	}
	else{
		return (
		  <View style={styles.container}>
			<View style={styles.result}>
			  <Text style={styles.resultText}>{this.state.resultText}</Text>
			</View>
			<View style={styles.buttons}>
			  {this.createButtons(buttonsLandscape)}
			</View>
		  </View>
		);
	}
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  resultText: {
    fontSize: 40,
    color: 'white'
  },
  btntext: {
    fontSize: 30,
	color: 'white'
  },
  btn: {
    flex: 1,
    alignItems: 'center',
    alignSelf: 'stretch',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#434343'
  },
  row: {
    flexDirection: 'row',
    flex: 1
  },
  result: {
    flex: 2,
    backgroundColor: '#434343',
    justifyContent: 'center',
    alignItems: 'flex-end'
  },
  calculation: {
    flex: 1,
    backgroundColor: '#636363',
    justifyContent: 'center',
    alignItems: 'flex-end'
  },
  buttons: {
    flex: 5,
	backgroundColor:'black'
  }
})
