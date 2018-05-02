import React , {Component} from 'react';
import {StackNavigator , TabNavigator , SwitchNavigator ,TabBarBottom} from 'react-navigation';
import {Ionicons} from '@expo/vector-icons';
import WelcomeScreen from './WelcomeScreen';
import MainScreen from './MainScreen';
import DeckScreen from './DeckScreen';
import AddDeckScreen from './AddDeckScreen';
import AddQuestionScreen from './AddQuestionScreen';
import QuizScreen from './QuizScreen';
import SettingScreen from './SettingScreen'
//import NotificationScreen from './NotificationScreen';
import ProgressScreen from './ProgressScreen';
import EditProfileScreen from './EditProfileScreen'

const AppStack = StackNavigator({
    main: {
        screen: MainScreen
    },
    deck:{
        screen:DeckScreen
    },
    addQuestion:{
        screen: AddQuestionScreen
    },
    quiz:{
        screen:QuizScreen
    }
},{
    initialRouteName: 'main',
    headerMode: 'screen',
    navigationOptions: {
        headerStyle: {
          backgroundColor: '#333',
        },
        
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'normal',
          color:'#fff'
        },
      },
});

const SettingStack = StackNavigator({
    Setting:{
        screen: SettingScreen
    },
    Progress:{
        screen: ProgressScreen
    },
    Edit:{
        screen: EditProfileScreen
    }
},{
    navigationOptions:{

        headerTitleStyle:{
            fontWeight: 'normal',
            color: '#fff'
        },
        headerStyle:{
            backgroundColor: '#333'
        },

        headerTintColor: '#fff',
    },
    initialRouteName: 'Setting',
    
  })


const TabStack = TabNavigator({
    All:{
        screen: AppStack
    },
    Add:{
        screen: AddDeckScreen
    },
    Settings:{
        screen: SettingStack
    }
},{
    navigationOptions: ({ navigation }) => ({
        tabBarIcon: ({ focused, tintColor }) => {
          const { routeName } = navigation.state;
          let iconName;
          if (routeName === 'All') {
            iconName = `ios-home${focused ? '' : '-outline'}`;
          } else if (routeName === 'Settings') {
            iconName = `ios-options${focused ? '' : '-outline'}`;
          }else if (routeName === 'Add'){
              iconName =`ios-add-circle${focused ? '' :'-outline'}`
          }
  
          // You can return any component that you like here! We usually use an
          // icon component from react-native-vector-icons
          return <Ionicons name={iconName} size={25} color={tintColor} />;
        },
      }),
    tabBarComponent: TabBarBottom,
    tabBarPosition:'bottom',
    tabBarOptions:{
        activeTintColor: '#e74c3c',
        inactiveTintColor:'gray'
    }
})

const RootFlow = SwitchNavigator({
    Welcome: WelcomeScreen,
    AppMain: TabStack

})

class MainRoute extends Component{
  render(){
    return (
        <RootFlow />
      )
  }
}

export default MainRoute;

/**
 * ,{
    initialRouteName: 'main',
    navigationOptions:{
        headerBackground: '#333',
        headerTitleStyle:{
            fontWeight: 'normal',
            color: '#fff'
        }

    }
}
 */


 /**
  const AppStack = TabNavigator({
    main:{
        screen: MainScreen
    },
    add:{
        screen: AddDeck
    },
    setting:{
        screen: SettingScreen
    }
},{
    navigationOptions: ({ navigation }) => ({
        tabBarIcon: ({ focused, tintColor }) => {
          const { routeName } = navigation.state;
          let iconName;
          if (routeName === 'main') {
            iconName = `ios-information-circle${focused ? '' : '-outline'}`;
          } else if (routeName === 'setting') {
            iconName = `ios-options${focused ? '' : '-outline'}`;
          }else if (routeName === 'add'){
              iconName =`ios-add-circle${focused ? '' :'-outline'}`
          }
  
          // You can return any component that you like here! We usually use an
          // icon component from react-native-vector-icons
          return <Ionicons name={iconName} size={25} color={tintColor} />;
        },
      }),
    tabBarComponent: TabBarBottom,
    tabBarPosition:'bottom',
    tabBarOptions:{
        activeTintColor: 'tomato',
        inactiveTintColor:'gray'
    }
    
})

const RootStack = SwitchNavigator({
    Welcome: WelcomScreen,
    App: AppStack,
    Checking: CheckingScreen
},{
    initialRouteName: 'App'
})


export default class Root extends Component{
    render(){
        return <RootStack />
    }
}
  */