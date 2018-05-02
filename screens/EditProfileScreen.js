import React, { Component } from 'react';
import { Text, View, TouchableOpacity, StyleSheet, Image, AsyncStorage, TextInput, KeyboardAvoidingView } from 'react-native';
import { connect } from 'react-redux';
import { ImagePicker } from 'expo';
import { btn } from '../styles';
import { setUser } from '../actions'
class EditProfileScreen extends Component {

  static navigationOptions = {
    title: "Edit"
  }
  state = {
    avarta: "",
    user_name: ""
  }



  handlePickPhoto = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({ mediaTypes: "All" });
    if (result.cancelled) {
      return
    }
    this.setState(() => { return { avarta: result.uri } })
  }

  handleNameChange = (name) => {
    this.setState(() => {
      return {
        user_name: name
      }
    })
  }

  handleUpdateUserInfor = () => {
    let { avarta, user_name } = this.state
    if (avarta.length > 0 && user_name.length > 0) {

      this.props.dispatch(setUser(user_name, avarta)).then(() => {
        this.props.navigation.goBack();
      })
    }
  }

  renderImageHelper = () => {
    const { avarta } = this.state;
    const { avatarUri } = this.props.User
    if (avarta.length > 0) {
      return { uri: avarta }
    } else {
      if (avatarUri.length > 0) {
        return { uri: avatarUri }
      } else {
        return require('../default_avatar.jpg')
      }
    }
  }
  render() {
    const { name, avatarUri } = this.props.User
    return (
      <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
        <TouchableOpacity onPress={this.handlePickPhoto} style={{
          justifyContent: 'center',
          alignItems: 'center'
        }}>
          <Image source={this.renderImageHelper()} style={styles.imageavartar} />
          <Text>Edit Avarta</Text>
        </TouchableOpacity>

        <View style={styles.row} behavior="padding" enabled>
          <Text>Your Name : </Text>
          <TextInput
            placeholder={`Old name : ${name}`}
            value={this.state.user_name}
            onChangeText={this.handleNameChange}
            style={styles.txtInput}
          />
        </View>
        <TouchableOpacity
          onPress={this.handleUpdateUserInfor}
          style={(this.state.avarta.length > 0 && this.state.user_name.length > 0) ? btn.btnPrimary : btn.btnDisable}
          disabled={(this.state.avarta.length > 0 && this.state.user_name.length > 0) ? false : true}
        >
          <Text style={{ color: '#fff' }}>Make Change</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  imageavartar: {
    height: 200,
    width: 200,
    borderRadius: 100,
    marginBottom: 20
  },
  row: {
    flexDirection: 'row',
    height: 100,
    justifyContent: 'center',
    alignItems: 'center'
  },
  txtInput: {
    flex: 1,
    paddingLeft: 10,
    height: 70
  }
})

const mapStateToProps = (state) => {
  return {
    User: state.User
  }
}

export default connect(mapStateToProps)(EditProfileScreen);

// {avatarUri.length > 0 && <Image style={styles.imageavartar} source={{uri:this.state.avarta}}/>}