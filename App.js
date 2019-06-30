/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, Button, TouchableOpacity } from 'react-native';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});



export default class App extends Component {
  constructor() {
    super()
    this.state = {
      resultText: "",
      calculation: 0,
      lastOperation: "AC"
    }
  }

  buttonPressed(text) {
    if (text == "=") {
      console.log(this.state.calculation)
      if (this.state.lastOperation == "+") {
        this.setState({
          calculation: (this.state.calculation + parseFloat(this.state.resultText)),
          resultText: "" + (this.state.calculation + parseFloat(this.state.resultText)),
          lastOperation: "+"
        })
      } else if (this.state.lastOperation == "-") {
        this.setState({
          calculation: (this.state.calculation - parseFloat(this.state.resultText)),
          resultText: "" + (this.state.calculation - parseFloat(this.state.resultText)),
          lastOperation: "-"
        })
        console.log(this.state.calculation)
      } else if (this.state.lastOperation == "/") {
        this.setState({
          calculation: (this.state.calculation / parseFloat(this.state.resultText)),
          resultText: "" + (this.state.calculation / parseFloat(this.state.resultText)),
          lastOperation: "/"
        })
      } else if (this.state.lastOperation == "*") {
        this.setState({
          calculation: (this.state.calculation * parseFloat(this.state.resultText)),
          resultText: "" + (this.state.calculation * parseFloat(this.state.resultText)),
          lastOperation: "*"
        })
      }
      return
    }

    this.setState({
      resultText: this.state.resultText.localeCompare("0") ? this.state.resultText + text : "" + text,
    })

  }



  operate(operation) {
    if (this.state.lastOperation == "AC") {
      this.setState({
        calculation: parseFloat(this.state.resultText),
        resultText: "",
        lastOperation: ""+operation
      })
      return
    }
    switch (operation) {
      case "AC":
        this.setState({
          resultText: "",
          calculation: 0,
          lastOperation: "AC"
        })
        break
      case "+":
        let num1 = this.state.lastOperation!="=" ? this.state.calculation: this.state.calculation + parseFloat(this.state.resultText)
        this.setState({
          calculation: num1,
          resultText: "",
          lastOperation: "+"
        })
        console.log(num1)
        break
      case "-":
        num1 = this.state.lastOperation!="=" ? this.state.calculation: this.state.calculation - parseFloat(this.state.resultText)
        this.setState({
          calculation: num1,
          resultText: "",
          lastOperation: "-"
        })
        console.log(num1)
        break
      case "/":
        num1 = this.state.lastOperation!="=" ? this.state.calculation: this.state.calculation / parseFloat(this.state.resultText)
        this.setState({
          calculation: num1,
          resultText: "",
          lastOperation: "/"
        })
        break
      case "*":
        num1 = this.state.lastOperation!="=" ? this.state.calculation: this.state.calculation * parseFloat(this.state.resultText)
        this.setState({
          calculation: num1,
          resultText: "",
          lastOperation: "*"
        })
        break

      default:

        break
    }
  }

  render() {
    let lastRow = [".", 0, "="];
    let rows = []
    for (let i = 2; i >= 0; i--) {
      let row = []
      for (let j = 3; j > 0; j--) {
        row.push(<TouchableOpacity style={styles.btn} onPress={() => this.buttonPressed(3 * i + j)}>
          <Text style={styles.btnText} >{3 * i + j}</Text>
        </TouchableOpacity>)
      }
      rows.push(<View style={styles.row}>{row}</View>)
    }
    let ops = []
    try {
      let row = []
      for (let i = 0; i < 3; ++i) {
        let temp = lastRow[i];
        row.push(<TouchableOpacity style={styles.btn} onPress={() => this.buttonPressed(temp)}>
          <Text style={styles.btnText} >{temp}</Text>
        </TouchableOpacity>)
      }
      rows.push(<View style={styles.row}>{row}</View>)
      let operations = ["+", "-", "/", "*", "AC"]

      for (let i = 0; i < 5; i++) {
        ops.push(<TouchableOpacity style={styles.btn} onPress={() => this.operate(operations[i])}>
          <Text style={[styles.btnText, styles.white]} >{operations[i]}</Text>
        </TouchableOpacity>)
      }

    }
    catch (e) {
      console.log(e)
    }
    return (
      <View style={styles.container}>
        <View style={styles.results}>
          <Text style={styles.resultText}>{this.state.resultText}</Text>
        </View>
        <View style={styles.buttons}>
          <View style={styles.numbers}>
            {rows}
          </View>
          <View style={styles.operations}>
            {ops}
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  calculationText: {
    fontSize: 24,
    color: "white"
  },
  btnText: {
    fontSize: 24
  },
  white: {
    color: 'white'
  },
  resultText: {
    fontSize: 30,
    color: "white"
  },
  row: {
    flex: 1,
    flexDirection: "row",
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  results: {
    flex: 2,
    backgroundColor: "red",
    justifyContent: "center",
    alignItems: "flex-end"
  },
  calculations: {
    flex: 1,
    backgroundColor: "green",
    justifyContent: "center",
    alignItems: "flex-end"
  },
  buttons: {
    flexGrow: 7,
    flexDirection: "row"
  },
  numbers: {
    flex: 3,
    backgroundColor: "yellow"
  },
  operations: {
    flex: 1,
    backgroundColor: "black",
    justifyContent: "space-around",
    alignItems: 'stretch'
  },
  btn: {
    flex: 1,
    alignItems: "center",
    alignSelf: "stretch",
    justifyContent: "center"
  },
});
