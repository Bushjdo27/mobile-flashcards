import React ,{Component} from 'react';
import {Image , View , Text} from 'react-native';
import {connect} from 'react-redux'
import {component} from '../styles';

class Header extends Component{
    render(){
        const {name , avatarUri} = this.props.User;
        return (
            <View>
            {this.props.User && 
                <View style={{paddingLeft: 10 , flexDirection:'row' , alignItems:'center'}}>
                    <Image source={avatarUri.length > 0 ? {uri:avatarUri} : require('../default_avatar.jpg')} style={component.circleImage}/>
                    <Text style={{marginLeft: 10 , color: '#fff'}}>{name ? `${name}`:'User'}</Text>
                </View>
            }
            </View>
        )
    }
}


const mapStateToProps = (state)=>{
    return {
        User: state.User
    }
}

export default connect(mapStateToProps)(Header);