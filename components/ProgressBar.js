import React , {Component} from 'react';
import {View , StyleSheet , Dimensions} from 'react-native';
import {Ionicons} from '@expo/vector-icons';

const {width} = Dimensions.get('window');

class ProgressBar extends Component{
  render(){
    const {progress} = this.props;
    return (
         <View style={styles.rowProgress}>
          <View style={{flex: 1 , backgroundColor:'#D3D3D3' , height: 5 , position: "relative" , marginRight: 10}}>
            <View style={{width: width*progress/100 , backgroundColor:"tomato" , height: 5 , position: 'absolute' , top: 0 , left: 0}}>
          
          </View>
          </View>
          <Ionicons name="ios-trophy-outline" color= {progress === 100 ? 'tomato' : "#333"} size={25}/>
          
          </View>
      )
  }
}

const styles = StyleSheet.create({
  rowProgress:{
    flexDirection: 'row',
    backgroundColor: "#fff",
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 50,
  }
})

export default ProgressBar