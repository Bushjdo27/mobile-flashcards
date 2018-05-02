import {
    ALL_DECK,
    ADD_NEW_DECK,
    ADD_QUESTION,
    UPDATE_CORRECT_ANWSER
} from '../actions/type'


export const deckReducer = (state = {} , action) =>{
    switch(action.type){
        case ALL_DECK:
            return {...state , ...action.payload}

        case ADD_NEW_DECK:
            return {
                ...state,
                [action.payload.key]:{
                    title:action.payload.key,
                    questions: [],
                    correctAnwser: 0
                }
            }

        case ADD_QUESTION:
            let {key , question} = action.payload;
            return {
                ...state,
                [key]: {
                    ...state[key],
                    questions:[
                        ...state[key].questions,
                        question
                    ]
                }
            }

        case UPDATE_CORRECT_ANWSER:
            return {...action.payload}

        default:
            return state;
    }
}