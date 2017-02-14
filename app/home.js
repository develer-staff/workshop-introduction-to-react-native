import React, { Component } from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';


export default class Home extends Component {
  render() {
    return (
      <View style={styles.container}>

        <View style={styles.titleView}>
          <Text style={styles.titleText}>Home Title</Text>
        </View>

        <View style={styles.contentView}>
          <Text style={styles.contentText}>Home Content</Text>
        </View>

      </View>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Platform.OS === 'ios' ? 22 : 0,
  },
  titleView: {
    padding: 20,
    backgroundColor: '#F59C00',
  },
  titleText: {
    fontFamily: 'Arial',
    fontSize: 20,
    color: 'white',
  },
  contentView: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  contentText: {
    fontFamily: 'Arial',
    fontSize: 16,
    color: '#777777',
  },
});
