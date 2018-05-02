import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, AsyncStorage } from 'react-native';
//import { Constants } from 'expo';
import { connect } from 'react-redux';
import { getAllDeck, getUser } from '../actions';
import { setLocalNotification, clearLocalNotification } from '../utils'

class WelcomeScreen extends Component {
  static navigationOptions = {
    header: null
  }
  componentDidMount() {
    this.props.dispatch(getAllDeck()).then(() => {
      this.props.dispatch(getUser()).then(() => {
        setLocalNotification().then(() => {
          //just for show logo :)
          setTimeout(() => {
            this.props.navigation.navigate('AppMain')
          }, 800)
        })


      })

    })
    // AsyncStorage.removeItem('UdaciCards:UserInfor').then(() => {
    //   clearLocalNotification().then(() => {
    //     console.log('Remove Success')
    //   })

    // });

  }
  render() {
    return (
      <View style={styles.container}>
        <Image
          style={{ height: 200, marginBottom: 5, resizeMode: 'contain' }}
          source={require('../default_avatar.jpg')}>
        </Image>

        <Text>Loading.. </Text>
      </View>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  }
});


export default connect()(WelcomeScreen);