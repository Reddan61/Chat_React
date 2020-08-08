import {ActionsTypes, ThunkActionType} from "./store";
import {formDataLoginType} from "../Types/Types";
import {stopSubmit} from "redux-form";

const CHECKAUTH = "CHECKAUTH";
const LOGOUT = "LOGOUT";


let initialState = {
    isAuth: false,
    user: null as string | null
};

type initialStateType = typeof initialState;

type actionsType = ActionsTypes<typeof actionsAuth>

const authReducer = (state = initialState, action: actionsType): initialStateType => {
    switch (action.type) {
        case CHECKAUTH:
            return {...state, isAuth: true, user: action.user};
        case LOGOUT:
            return {...state, isAuth: false,user: null};
        default:
            return state
    }
};

export default authReducer;


let actionsAuth = {
    checkAuth: (user: string | null) => ({type: CHECKAUTH, user}) as const,
    logOutAC: () => ({type: LOGOUT}) as const
};



export const logOutThunk = (): ThunkActionType<actionsType> => {
    return async (dispatch) => {
        dispatch(actionsAuth.logOutAC());
    }
};


export const registerUserThunk = ({Name:userName}: formDataLoginType): ThunkActionType<actionsType | ReturnType<typeof stopSubmit>> => {
    return async (dispatch) => {
        dispatch(actionsAuth.checkAuth(userName));
    };
};




