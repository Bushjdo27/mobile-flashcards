import React , {Component} from 'react';
import {View ,Text , FlatList , TouchableOpacity} from 'react-native';
import { Deck ,txt} from '../styles'

class ListDecks extends Component {


    renderItem = ({item})=>{
        const {data} = this.props;
        
        return (
            <TouchableOpacity 
                style={Deck.container}
                onPress={()=>{
                    this.props.navigation.navigate('deck',{
                        singleDeck: data[item]
                    })
                }}
            >
                <Text style={{fontSize: 20 , fontWeight:"bold"}}>{data[item].title}</Text>
                <View style={Deck.row}>
                    <Text style={txt.secondary}>Cards : {data[item].questions.length}</Text>
                    <Text style={[txt.secondary , {marginLeft: 20}]}>Correct : {data[item].correctAnwser}</Text>                        
                </View>
                
            </TouchableOpacity>
        )
    }

    render(){
        const {data} = this.props;
        return (
            <View>
                <FlatList 
                    data={Object.keys(data)}
                    keyExtractor={(item , index)=>index.toString()}
                    renderItem={this.renderItem}
                />
            </View>
        )
    }
}


export default ListDecks;