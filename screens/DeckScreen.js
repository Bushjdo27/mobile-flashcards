import React ,{Component} from 'react';
import {Text , View  , TouchableOpacity , StyleSheet} from 'react-native';
import {txt} from '../styles'
import {connect} from 'react-redux';

class DeckScreen extends Component {
    static navigationOptions = ()=>{
        return {
            title: "Deck"
        }
    }

    render(){
        let { title } = this.props.navigation.state.params.singleDeck;
        console.log(title)
        return(
            <View style={styles.container}>
            {this.props.allDeck ? 
                <View style={styles.container}>
                <Text style={{fontSize:20}}>{title}</Text>
                <View style={{flexDirection: 'row' , marginTop: 20 , marginBottom: 20}}>
                    <Text style={[txt.secondary, {marginRight: 10}]}>{`Cards : ${this.props.allDeck[title].questions.length}`}</Text>
                    <Text style={[txt.secondary]}>{`Correct : ${this.props.allDeck[title].correctAnwser}`}</Text>
                </View>
                
                <TouchableOpacity 
                    style={styles.btn}
                    onPress={()=>{
                        this.props.navigation.navigate('addQuestion',{
                            groupQuestion : title
                        })
                    }}
                    >
                    <Text>Add Card</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                style={[styles.btn , {backgroundColor:'#333'}]}
                onPress={()=>{
                    this.props.navigation.navigate('quiz',{
                        questions: this.props.allDeck[title].questions,
                        title: title
                    })
                }}
                >
                    <Text style={{color:'#fff'}}>Make Quiz</Text>
                </TouchableOpacity>
                </View>
                : <Text>Fetching..</Text>}
            </View>
        )
    }
}

const mapStateToProps = (state)=>{
    return {
        allDeck : state.Decks
    }
}

const styles = StyleSheet.create({
    container:{
        justifyContent: 'center',
        alignItems:'center',
        backgroundColor: '#fff',
        flex:1
        
    },
    btn:{
        marginTop: 20,
        paddingTop: 20,
        paddingBottom: 20,
        borderRadius: 10,
        borderColor:'#333',
        borderWidth: 1,
        width: 150,
        justifyContent: 'center',
        alignItems:'center'
    },
    
})



export default connect(mapStateToProps)(DeckScreen);