import {ActionsTypes, ThunkActionType} from "../store";
import {roomsAPI} from "../../api/api";
import {messagesType, socketRoomsDataTypeObj} from "../../Types/Types";

const SWITCHMODE = "SWITCH_MODE";
const ADDCHANGEDROOMFROMPOST = "ADD_CHANGED_ROOM_FROM_POST";
const ADDNEWMESSAGE = "ADD_NEW_MESSAGE";
const ADDNEWUSER = "ADD_NEW_USER";
const REPLACENEWUSERS = "REPLACE_NEW_USERS";

let initialState = {
    //Пользователь выбрал комнату или нет
    isChangedRoom: false,
    changedRoomId: null as number | null,
    changedRoom: null as socketRoomsDataTypeObj | null
};


const ChatReducer = (state = initialState, action: ActionReducerType): iniitalStateType => {
    switch (action.type) {
        case "SWITCH_MODE":
            return {...state, isChangedRoom: action.bool, changedRoomId: action.id};
        case ADDCHANGEDROOMFROMPOST:
            return {
                ...state,
                changedRoom: action.room
            };
        case "ADD_NEW_MESSAGE":
            return {
                ...state,
                changedRoom: {
                    ...state.changedRoom,
                    messages: [...state.changedRoom!.messages, action.message]
                } as socketRoomsDataTypeObj
            };
        case "ADD_NEW_USER":
            return {
                ...state,
                changedRoom: {
                    ...state.changedRoom,
                    users: [...state.changedRoom!.users, action.user]
                } as socketRoomsDataTypeObj
            };
        case "REPLACE_NEW_USERS":
            return {
                ...state,
                changedRoom: {
                    ...state.changedRoom,
                    users: action.newUsers
                } as socketRoomsDataTypeObj
            };
        default:
            return state;
    }
};


let actions = {
    ChangeMode: (bool: boolean, id: number | null) => ({type: SWITCHMODE, bool, id} as const),
    addChangedRoomFromPost: (room: socketRoomsDataTypeObj | null) => ({type: ADDCHANGEDROOMFROMPOST, room} as const),
    addNewMessageAC: (message: messagesType) => ({type: ADDNEWMESSAGE, message} as const),
    addNewUserAC: (user: string) => ({type: ADDNEWUSER, user} as const),
    replaceNewUsers: (newUsers: Array<string>) => ({type: REPLACENEWUSERS, newUsers} as const)
};

export default ChatReducer;


export const ChangeModeThunk = (bool: boolean, id: number | null): ThunkActionType<ActionReducerType> => {
    return async (dispatch) => {
        if (id !== null) {
            let response = await roomsAPI.getRoomMessages(id);
            dispatch(actions.addChangedRoomFromPost(response[0]));
            dispatch(actions.ChangeMode(bool, id));
        } else {
            dispatch(actions.ChangeMode(bool, id));
            dispatch(actions.addChangedRoomFromPost(null));
        }

    }
};

export const addNewMessageThunk = (message: messagesType): ThunkActionType<ActionReducerType> => {
    return async (dispatch) => {
        dispatch(actions.addNewMessageAC(message));
    }
};

export const addNewUserThunk = (user: string): ThunkActionType<ActionReducerType> => {
    return async (dispatch) => {
        dispatch(actions.addNewUserAC(user));
    }
};

export const replaceNewUsers = (newUsers: Array<string>): ThunkActionType<ActionReducerType> => {
    return async (dispatch) => {
        dispatch(actions.replaceNewUsers(newUsers))
    }
};

type iniitalStateType = typeof initialState;
type ActionReducerType = ActionsTypes<typeof actions>