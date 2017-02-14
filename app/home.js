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
  ActivityIndicator,
} from 'react-native';


export default class Home extends Component {
  constructor(props) {
    super(props);

    // Initialize component state
    this.state = {
      ds: new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 }),
      dataSource: null,
      dataReady: false,
    };

    this.renderRow = this.renderRow.bind(this);
  }


  componentWillMount() {
    fetch('https://tinyurl.com/znhzspm')
      .then((data) => data.json())
      .then((jsonData) => {
        this.setState({
          dataSource: this.state.ds.cloneWithRows(jsonData),
          dataReady: true
        })
      })
  }


  renderRow(rowData) {
    return (
      <View style={styles.rowView}>

        <Image style={styles.imgView}
               source={{uri: rowData[1]}} />

        <View style={styles.infoView}>
          <Text style={styles.rowText}>{rowData[0]}</Text>

          <TouchableOpacity onPress={() => Linking.openURL(`tel:${rowData[2]}`)}>
            <Text style={styles.linkText}>{rowData[2]}</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => Linking.openURL(`mailto:${rowData[3]}`)}>
            <Text style={styles.linkText}>{rowData[3]}</Text>
          </TouchableOpacity>

        </View>

      </View>
    );
  }


  renderLoadingState() {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator />
      </View>
    );
  }


  renderReadyState() {
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


  render() {
    if (this.state.dataReady)
      return this.renderReadyState();

    return this.renderLoadingState();
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
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
