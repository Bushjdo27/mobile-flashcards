import React ,{Component} from 'react';
import {Text , View , TouchableOpacity ,StyleSheet ,TextInput , Dimensions ,KeyboardAvoidingView} from 'react-native';
import {Constants} from 'expo'
import {addNewDeck} from '../actions'
import {connect} from 'react-redux';
import {btn , input} from '../styles'

const SCREEN_WITDH = Dimensions.get('window').width;

class AddDeckScreen extends Component {
    static navigationOptions = ()=>{
        return {
            title: "Add"
        }
    }
    state = {
        DeckTitle : "",
    }
    
    handleTitleChange = (DeckTitle)=>{
      this.setState(()=>{
        return {
          DeckTitle
        }
      })
    }
    render(){
        return(
            <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
                <Text style={{fontSize: 20 , marginBottom: 40}}>Welcome , Please enter your new Deck title</Text>
                <TextInput 
                    style={input.field}
                    placeholder="Enter title for your deck"
                    onChangeText={this.handleTitleChange}
                    multiline
                    value={this.state.DeckTitle}
                />
                <TouchableOpacity
                    style={this.state.DeckTitle.length > 0 ? btn.btnPrimary : btn.btnDisable}
                    disabled={this.state.DeckTitle.length > 0 ? false : true}
                    onPress={()=>{
                        this.props.dispatch(addNewDeck(this.state.DeckTitle)).then(()=>{
                           this.props.navigation.navigate('All')
                        })
                       
                    }}
                ><Text style={{color: '#fff'}}>Create</Text></TouchableOpacity>
            </KeyboardAvoidingView>
        )
    }
} 
const styles = StyleSheet.create({
  container:{
    flex:1,
    justifyContent:'center',
    alignItems:'center',
    backgroundColor: '#fff',
    paddingTop: Constants.statusBarHeight
  },
  txtInput : {
        paddingLeft : 10,
        paddingTop: 5,
        paddingBottom: 2,
        width : SCREEN_WITDH,
        height: 40,
        marginBottom: 20
    }
})

export default connect()(AddDeckScreen);