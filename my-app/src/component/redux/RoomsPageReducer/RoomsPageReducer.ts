import {ActionsTypes, ThunkActionType} from "../store";
import {socketRoomsDataType, socketRoomsDataTypeObj} from "../../Types/Types";
import {roomsAPI} from "../../api/api";

const AddRoom = 'ADD_ROOM';
const GetRooms = 'GET_ROOMS';
const AddUser = 'ADD_USER';
const ChangeModeGetted = "CHANGE_IS_GETTED_ROOMS";
const DeleteUserFromRoom = "DELETE_USER_FROM_ROOM";
const DeleteRoom = "DELETE_ROOM";
const SetImageByRoomId = "SET_IMAGE_BY_ROOM_ID";

let initialState = {
    isGettedRooms: false,
    rooms: [] as socketRoomsDataType
};

const SideBarReducer = (state = initialState, action: ActionReducerTypes): initialStateType => {
    switch (action.type) {
        case AddRoom:
            return {
                ...state,
                rooms: [...state.rooms, action.newRoom]
            };
        case GetRooms:
            return {
                ...state,
                isGettedRooms: true,
                rooms: action.rooms
            };
        case AddUser:
            return {
                ...state,
                rooms: state.rooms.map((item) => {
                    if (item.id === action.payload.id) {
                        item.users.push(action.payload.userName);
                    }
                    return item
                })
            };
        case ChangeModeGetted:
            return {
                ...state,
                isGettedRooms: action.bool
            };
        case "DELETE_USER_FROM_ROOM":
            return {
                ...state,
                rooms: state.rooms.map((item) => {
                    if (item.id === action.id) {
                        item.users = action.newUsers
                    }
                    return item
                })
            };
        case "DELETE_ROOM":
            return {
                ...state,
                rooms: state.rooms.filter((el) => el.id !== action.id)
            };
            case "SET_IMAGE_BY_ROOM_ID":
                return {
                    ...state,
                    rooms: state.rooms.map(item => {
                        if(item.id === action.id) {
                            item.imageSrc = action.imageSrc;
                        }
                        return item;
                    })
                };
        default:
            return state
    }
};


let actionsRoomPage = {
    getRoomsAC: (rooms: socketRoomsDataType) => ({type: GetRooms, rooms} as const),
    addRoomAC: (newRoom: socketRoomsDataTypeObj) => ({type: AddRoom, newRoom} as const),
    addUserToRoomAC: (payload: { id: number, userName: string }) => ({type: AddUser, payload} as const),
    changeIsGettedRoomsAC: (bool: boolean) => ({type: ChangeModeGetted, bool} as const),
    deleteUserFromRoomAC: (id: number, newUsers: Array<string>) => ({type: DeleteUserFromRoom, id, newUsers} as const),
    deleteRoomAC: (id: number) => ({type: DeleteRoom, id} as const),
    setImageByRoomIdAC: (id:number,imageSrc:string) => ({type:SetImageByRoomId,id,imageSrc} as const)
};

export const addRoomThunk = (newRoom: socketRoomsDataTypeObj): ThunkActionType<ActionReducerTypes> => {
    return async (dispatch) => {
        dispatch(actionsRoomPage.addRoomAC(newRoom));
    }
};

export const getFirstTimeRoomsThunk = (): ThunkActionType<ActionReducerTypes> => {
    return async (dispatch) => {
        let response = await roomsAPI.getRooms();
        dispatch(actionsRoomPage.getRoomsAC(response));
    }
};

export const addUserToRoomThunk = (id: number, userName: string): ThunkActionType<ActionReducerTypes> => {
    return async (dispatch) => {
        dispatch(actionsRoomPage.addUserToRoomAC({id, userName}));
    }
};

export const changeIsGettedRoomsThunk = (bool: boolean): ThunkActionType<ActionReducerTypes> => {
    return async (dispatch) => {
        dispatch(actionsRoomPage.changeIsGettedRoomsAC(bool))
    }
};


export const deleteUserFromRoomThunk = (id: number, newUsers: Array<string>): ThunkActionType<ActionReducerTypes> => {
    return async (dispatch) => {
        dispatch(actionsRoomPage.deleteUserFromRoomAC(id, newUsers))
    }
};

export const deleteRoomThunk = (id: number): ThunkActionType<ActionReducerTypes> => {
    return async (dispatch) => {
        dispatch(actionsRoomPage.deleteRoomAC(id));
    }
};

export const setImageByRoomIdThunk = (id:number,imageSrc:string): ThunkActionType<ActionReducerTypes> => {
    return async (dispatch) => {
        dispatch(actionsRoomPage.setImageByRoomIdAC(id,imageSrc))
    }
};

export default SideBarReducer;

type initialStateType = typeof initialState;
type ActionReducerTypes = ActionsTypes<typeof actionsRoomPage>;
