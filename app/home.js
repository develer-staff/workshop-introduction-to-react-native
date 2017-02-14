import React, { Component } from 'react';
import { View, ListView, Text, StyleSheet, Platform } from 'react-native';


export default class Home extends Component {
  constructor(props) {
    super(props);

    // Prepare data
    const data = [
      'Row 1', 'Row 2', 'Row 3', 'Row 4', 'Row 5',
      'Row 6', 'Row 7', 'Row 8', 'Row 9', 'Row 10',
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
        <Text style={styles.rowText}>{rowData}</Text>
      </View>
    );
  }


  render() {
    return (
      <View style={styles.container}>

        <View style={styles.titleView}>
          <Text style={styles.titleText}>Home Title</Text>
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
    borderWidth: 1,
    borderColor: 'red',
  },
  rowText: {
    fontFamily: 'Arial',
    fontSize: 16,
    color: '#777777',
  },
});
