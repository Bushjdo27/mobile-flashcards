import {combineReducers} from 'redux';
import {deckReducer} from './deckReducers';
import {userReducer} from './userReducer';

export default combineReducers({
    Decks: deckReducer,
    User:userReducer,
})