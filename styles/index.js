import {StyleSheet , Dimensions , Platform} from 'react-native'

const { width } = Dimensions.get("window");

const btnBasic = {
        width: 150,
        paddingTop: 10,
        paddingBottom:10,
        justifyContent:'center',
        alignItems:'center',
        borderColor: '#f7f7f7',
        borderWidth: 1,
        borderRadius: 5,
        margin: 20,
}

export const btn = StyleSheet.create({
    btnPrimary: {
        ...btnBasic,
        backgroundColor: '#333'
    },
    btnCorrect:{
        ...btnBasic,
        backgroundColor: '#27ae60'
    },
    btnIncorrect:{
        ...btnBasic,
        backgroundColor: '#e74c3c'
    },
    btnDisable:{
        ...btnBasic,
        backgroundColor: '#95a5a6'
    },
    btnGroup:{
        flexDirection: 'row',
        height: 90,
        justifyContent: 'center',
        alignItems: 'center'
    }

})
export const txt = StyleSheet.create({
    primary:{
        fontStyle: 'normal',
        color: '#fff'
    },
    secondary:{
        fontStyle: 'italic',
        color: '#95a5a6'
    }
})

export const Deck = StyleSheet.create({
    container:{
        height: 250,
        borderBottomWidth: 1,
        backgroundColor:'#fff',
        borderBottomColor: '#f7f7f7',
        justifyContent: 'center',
        alignItems:'center',
        elevation: 2
    },
    row:{
        flexDirection:'row',
        justifyContent:'space-around',
        alignItems:'center',
        marginTop: 10
    }
})

export const input = StyleSheet.create({
    field:{
        padding: 10,
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 5,
        height: 60,
        margin: 20,
        width: width * 90 / 100,
    }
})
export const component = StyleSheet.create({
    Header:{
        height: Platform.OS === 'ios' ? 64 : 56,
        width: width,
        marginBottom: 10,
        backgroundColor: '#333',
        flexDirection: 'row',
        alignItems:'center'
    },
    circleImage:{
        width: 40,
        height:40,
        borderRadius: 20
    }
}) 