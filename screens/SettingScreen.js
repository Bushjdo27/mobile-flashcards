import React , {Component} from 'react';
import {View , Text , StyleSheet , TouchableOpacity , Image , AsyncStorage ,TimePickerAndroid ,DatePickerAndroid} from 'react-native';
import {connect} from 'react-redux'
import {Ionicons ,SimpleLineIcons} from '@expo/vector-icons';
import {txt , btn} from '../styles';

import {setLocalNotification , clearLocalNotification} from '../utils';
import {getNotification} from '../actions'

class SettingScreen extends Component {
  static navigationOptions = {
    title: "Setting",
  }
  
  state = {
    manualSetting: false,
    date: new Date(),
    hour: 0,
    minute: 0
  }

  componentDidMount(){
    this.props.dispatch(getNotification())
  }
  
  showPickTimeAndDate = ()=>{
        this.setState((prevState)=>{
        return {
            manualSetting: !prevState.manualSetting
        }
    })
  }
  handlePickTimeDaily = async ()=>{
    await clearLocalNotification();
    try {
        const {action, hour, minute} = await TimePickerAndroid.open({
            hour: 14,
            minute: 0,
            is24Hour: true, 
        });
        if (action !== TimePickerAndroid.dismissedAction) {
            this.setState(()=>{
                return {
                    hour,
                    minute
                }
            })
            await setLocalNotification(null , this.state.hour , this.state.minute)
            this.props.dispatch(getNotification()).then(()=>{
                console.log("Get notification success")
              })
        }
    } catch ({code, message}) {
        console.warn('Cannot open time picker', message);
    }
  }

  handlePickTimeManuall = async ()=>{
    await clearLocalNotification();
    try {
        const Day = await DatePickerAndroid.open({
            date: this.state.date
        });
        if (Day.action !== DatePickerAndroid.dismissedAction) {
            let picker = new Date(Day.year, Day.month , Day.day)
            this.setState(()=>{
                return {
                    date: picker
                }
            })
        }

        const {action, hour, minute} = await TimePickerAndroid.open({
            hour: 14,
            minute: 0,
            is24Hour: true, 
        });
        if (action !== TimePickerAndroid.dismissedAction) {
            this.setState(()=>{
                return {
                    hour,
                    minute
                }
            })

            await setLocalNotification(this.state.date , this.state.hour , this.state.minute)
            this.props.dispatch(getNotification()).then(()=>{
                console.log("Get notification success")
              })
        }
    } catch ({code, message}) {
        console.warn('Cannot open date picker', message);
    }
  }

  
  
  
    render(){
        const {name , avatarUri , notification} = this.props.User;
        return(
            <View style={styles.container}>
                <TouchableOpacity style={[styles.row , {marginBottom: 20}]} onPress={()=>{this.props.navigation.navigate("Edit")}}>
                    <Image source={avatarUri.length > 0 ? {uri:avatarUri} : require('../default_avatar.jpg')} style={styles.circleImage}/>
                    {name.length > 0 ? <Text style={[styles.txt , {flex: 1}]}>{name}</Text> : <Text style={[styles.txt , {flex: 1}]}>User</Text>}
                    <SimpleLineIcons name="pencil" color='#e74c3c' size={20}/>
                </TouchableOpacity>
                <TouchableOpacity style={styles.row} onPress={()=>{this.props.navigation.navigate("Progress")}}>
                    <Ionicons name="ios-school-outline" color='#e74c3c' size={25}/>
                    <Text style={styles.txt}>Progress</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.row} onPress={this.handlePickTimeDaily}>
                    <Ionicons name="ios-notifications-outline" color='#e74c3c' size={25}/>
                    <View style={{marginLeft: 20}}>
                        <Text>Set Notification Daily</Text>
                        <Text style={[txt.secondary , {marginTop:5}]}>{notification.daily ? `Daily , ${notification.hours} : ${notification.minutes}`: `Not set`}</Text>
                    </View>
                    
                </TouchableOpacity>
                <TouchableOpacity style={styles.row} onPress={this.handlePickTimeManuall}>
                    <Ionicons name="ios-notifications-outline" color='#e74c3c' size={25}/>
                    <View style={{marginLeft: 20}}>
                        <Text>Set Notification Manually</Text>
                        <Text style={[txt.secondary , {marginTop:5}]}>{notification.manual ? `At ${notification.date.toString().substr(0,16)} , ${notification.hours} : ${notification.minutes}`: `Not set`}</Text>
                    </View>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        paddingTop: 10
    },
    row:{
        flexDirection : 'row',
        backgroundColor: '#fff',
        alignItems: 'center',
        height: 90,
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#f7f7f7'
    },
    txt:{
        marginLeft: 20,
    },
    circleImage:{
      width: 40,
      height:40,
      borderRadius: 20
    },
    
    
})

const mapStateToProps = (state)=>{
    return {
        User : state.User
    }
}

export default connect(mapStateToProps)(SettingScreen);
