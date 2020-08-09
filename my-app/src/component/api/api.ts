import axios from 'axios';
import {messagesType, socketRoomsDataType, socketRoomsDataTypeObj} from "../Types/Types";

let instance = axios.create({
    withCredentials: true,
    baseURL: 'http://localhost:5000/api/'
});


export const roomsAPI = {
    getRooms: () => {
        return instance.get<socketRoomsDataType>('rooms/getRooms').then(response => response.data);
    },
    getRoomMessages: (id: number | null) => {
        return instance.post<socketRoomsDataType>('rooms/getRoomById', {
            id
        }).then((response) => {
            return response.data
        })
    }
};

export const authApi = {
    checkUserName: (name: string) => {
        return instance.post<authCheckUserNameType>("auth/checkUserName", {name}).then(response => response.data)
    },
    deleteUserName: (name: string) => {
        return instance.post<{responseCode:number}>("auth/deleteUserName", {name}).then(response => response.data)
    }
};

type authCheckUserNameType = {
    responseCode: number, error?: string
}
