import React ,{Component} from 'react';
import {Text , View , StyleSheet} from 'react-native';
import {Constants} from 'expo';
import ListDecks from '../components/ListDecks';
import Header from '../components/Header'
import {connect} from 'react-redux';

  
class MainScreen extends Component {

    static navigationOptions = {
        headerLeft: <Header />
    }
    
    

    render(){
        return(
            <View>
              {this.props.allDeck ? 
                <ListDecks 
                    data = {this.props.allDeck}
                    navigation={this.props.navigation}
                />
                : <Text>Loading...</Text>
              }
            </View>
        )
    }
} 

const styles = StyleSheet.create({
  container:{
    paddingTop: Constants.statusBarHeight
  }
})


const mapStateToProps = (state)=>{
  return {
    allDeck : state.Decks,
  }
}
export default connect(mapStateToProps)(MainScreen);