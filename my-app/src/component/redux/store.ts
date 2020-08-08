import {combineReducers, applyMiddleware, createStore, Action} from "redux";
import {reducer as formReducer} from 'redux-form';
import thunk, {ThunkAction} from "redux-thunk";
import authReducer from "./authReducer";
import RoomsPageReducer from "./RoomsPageReducer/RoomsPageReducer";
import ChatReducer from "./ChatReducer/ChatReducer";



let reducers =combineReducers({
   authPage: authReducer,
   RoomsPage:RoomsPageReducer,
   ChatPage:ChatReducer,
   form:formReducer
});


const store = createStore(reducers,applyMiddleware(thunk));


// @ts-ignore
window.store = store;




//thunk
export type ThunkActionType<AT extends Action,R = Promise<void>>
    = ThunkAction<R, ()=>StateType, unknown, AT>;


//action
export type ActionsTypes<T> = T extends { [keys: string]: (...args: any[]) => infer U } ? U : never



//state
type RootReducerType = typeof reducers;//Вернет новый стейт
export type StateType = ReturnType<RootReducerType>

export default store;