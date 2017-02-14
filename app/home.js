import React, { Component } from 'react';

import {
  View,
  ListView,
  Text,
  StyleSheet,
  Platform,
  Image,
  TouchableOpacity,
  Linking,
} from 'react-native';


export default class Home extends Component {
  constructor(props) {
    super(props);

    // Prepare data
    const data = [
      { name: 'John Doe 1', email: 'jdoe@gmail.com', phone: '3333333333' },
      { name: 'John Doe 2', email: 'jdoe@gmail.com', phone: '3333333333' },
      { name: 'John Doe 3', email: 'jdoe@gmail.com', phone: '3333333333' },
      { name: 'John Doe 4', email: 'jdoe@gmail.com', phone: '3333333333' },
      { name: 'John Doe 5', email: 'jdoe@gmail.com', phone: '3333333333' },
      { name: 'John Doe 6', email: 'jdoe@gmail.com', phone: '3333333333' },
      { name: 'John Doe 7', email: 'jdoe@gmail.com', phone: '3333333333' },
      { name: 'John Doe 8', email: 'jdoe@gmail.com', phone: '3333333333' },
      { name: 'John Doe 9', email: 'jdoe@gmail.com', phone: '3333333333' },
      { name: 'John Doe 10', email: 'jdoe@gmail.com', phone: '3333333333' },
    ];

    // Initialize list datasource
    const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });

    // Initialize component state
    this.state = {
      dataSource: ds.cloneWithRows(data),
    };

    this.renderRow = this.renderRow.bind(this);
  }


  renderRow(rowData) {
    return (
      <View style={styles.rowView}>

        <Image style={styles.imgView}
               source={{uri: 'https://tinyurl.com/z2bffag'}} />

        <View style={styles.infoView}>
          <Text style={styles.rowText}>{rowData.name}</Text>

          <TouchableOpacity onPress={() => Linking.openURL(`tel:${rowData.phone}`)}>
            <Text style={styles.linkText}>{rowData.phone}</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => Linking.openURL(`mailto:${rowData.email}`)}>
            <Text style={styles.linkText}>{rowData.email}</Text>
          </TouchableOpacity>

        </View>

      </View>
    );
  }


  render() {
    return (
      <View style={styles.container}>

        <View style={styles.titleView}>
          <Text style={styles.titleText}>Contacts List</Text>
        </View>

        <ListView style={styles.listView}
                  dataSource={this.state.dataSource}
                  renderRow={this.renderRow}
                  />
      </View>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Platform.OS === 'ios' ? 22 : 0,
    backgroundColor: 'white',
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
  listView: {
    flex: 1,
    padding: 20,
  },
  rowView: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  imgView: {
    width: 80,
    height: 80,
  },
  infoView: {
    flex: 1,
    paddingLeft: 10,
    justifyContent: 'center',
  },
  rowText: {
    fontFamily: 'Arial',
    fontSize: 16,
    color: '#777777',
  },
  linkText: {
    fontFamily: 'Arial',
    fontSize: 16,
    color: '#0000FF',
  },
});
