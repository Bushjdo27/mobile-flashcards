import React, { Component } from 'react';
import { View, StyleSheet} from 'react-native';
import {Provider} from 'react-redux';
import Thunk from 'redux-thunk'
import {createStore , applyMiddleware} from 'redux';
import reducers from './reducers';
import RootStack from './screens'

const store = createStore(reducers , {} , applyMiddleware(Thunk))

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
      <View style={styles.container}>
        <RootStack />
      </View>
      </Provider>
      
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ecf0f1',
  },
 
});
