import React , {Component} from 'react';
import {View , Text  , StyleSheet ,FlatList} from 'react-native';
import ProgressBar from '../components/ProgressBar'
import {connect} from 'react-redux';

class ProgressScreen extends Component{
  static navigationOptions = {
    title: "Progress",
  }
  
  renderHelper = ({item})=>{
    const data = this.props.allDeck;
    if(data){
      return (
            <View style={styles.container}>
              <Text>{data[item].title}</Text>
              <ProgressBar progress={data[item].correctAnwser / data[item].questions.length*100}/>
              <Text>{`Complete : ${data[item].correctAnwser}/${data[item].questions.length}`}</Text>
            </View>
        )
    
    }else{
      return (<Text>Loading..</Text>)
    }
    
  }
  render(){
    return (
      <View style={{flex: 1 }}>
        {this.props.allDeck ? 
          <FlatList 
            data={Object.keys(this.props.allDeck)}
            keyExtractor={(item , index)=>index.toString()}
            renderItem={this.renderHelper}
      /> :<Text>Loading...</Text>}
      </View>
        
      )
  }
}

const styles = StyleSheet.create({
  container:{
    backgroundColor: "#fff",
    height: 100,
    marginBottom: 20, padding: 10
  }
})

const mapStateToProp = (state)=>{
  return {
    allDeck : state.Decks,
  }
}


export default connect(mapStateToProp)(ProgressScreen);