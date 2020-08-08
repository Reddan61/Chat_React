import React, {useCallback, useEffect, useState} from "react";
import css from './styleSideBar.module.css'
import {compose} from "redux";
import {connect} from "react-redux";
import {StateType} from "../../redux/store";
import RoomsPageItems from "./RoomsPageItems/RoomsPageItems";
import socket from "../../sockets/sockets";
import {socketRoomsDataTypeObj} from "../../Types/Types";
import {
    addRoomThunk,
    addUserToRoomThunk,
    deleteRoomThunk,
    deleteUserFromRoomThunk
} from "../../redux/RoomsPageReducer/RoomsPageReducer";
import CreateRoom from "../../PopUp/CreateRoom/CreateRoom";
import {TransitionGroup, CSSTransition} from "react-transition-group"
import "../../PopUp/PopUpAnimationsStyles.css";
import {ChangeModeThunk} from "../../redux/ChatReducer/ChatReducer";

const RoomsPage: React.FC<MapStateToPropsType & MapDispatchToPropsType> = (props) => {
    //Стейт для отображения POPUP
    let [isCreatingRoom, createRoomMode] = useState(false);
    const CreateRoomFunc = () => {
        createRoomMode(true);
    };
    /*socket.emit('SET:ROOM', 'TEST')*/
    useEffect(() => {
        //Подключает к общей комнате Нового пользователя
        socket.emit("SET:MAINROOM", {userName : props.userName});

        //Отвечает за динамическое получение НОВЫХ комнат
        socket.on('GET:ROOMS', (data: socketRoomsDataTypeObj) => {
            props.addRoomThunk(data);
        });

        //Изменения онлайна при выходе user
        socket.on("LEAVE:CHATROOM", (data: {id:number,newUsers: Array<string>}) => {
            props.deleteUserFromRoomThunk(data.id,data.newUsers);
        });

        //Подключение к комнате(ИЗМЕНЕИЕ ОНЛАЙНА В КОМНАТЕ)
        socket.on("JOINED:ROOM", (data: {id:number,userName:string}) => {
            props.addUserToRoomThunk(data.id,data.userName);
        });
        //Отслеживание на то, что ЭТОТ юзер создал комнату
        socket.on("ToOwner:ROOM",(data:{id:number}) => {
            props.ChangeModeThunk(true,data.id);
        });

        //Удаление комнаты при пустом онлайне
        socket.on("DELETE:ROOM", (data: {id:number}) => {
            props.deleteRoomThunk(data.id);
        });
        return () => {
            //Выход из главной комнаты
            socket.emit('LEAVE:MAINROOM');
        }
    },[]);

    //Подключение к комнате по нажатию кнопки "ВОЙТИ"
    let RoomJoinButtonClick = (e:any) => {
        if (e.target.id.includes("JoinRoomButton")) {
            let id = e.target.id.slice(e.target.id.search(" ") + 1, e.target.id.length)
            socket.emit("JOIN:ROOM",{
                id:id,
                userName: props.userName
            });
            props.ChangeModeThunk(true,Number(id));
        }

    };
    return <div className={css.RoomPage} onClick = {RoomJoinButtonClick}>
        <button className={"btn"} onClick={useCallback(CreateRoomFunc, [])}>Создать комнату</button>
        <div className={css.RoomPage__items}>
            {props.rooms}
        </div>
        <TransitionGroup>
            {isCreatingRoom && <CSSTransition
                timeout={500}
                in
                mountOnEnter
                unmountOnExit
                classNames={"alert"}>
                <CreateRoom changeMode={createRoomMode}/></CSSTransition>
            }</TransitionGroup>
    </div>
};

let mapStateToProps = (state: StateType) => {
    return {
        rooms: state.RoomsPage.rooms.map((el,index) => {
            return <RoomsPageItems key={el.id + index} room={el} />}),
        isChangedRoom: state.ChatPage.isChangedRoom,
        userName: state.authPage.user
    }
};

export default compose(
    connect(mapStateToProps, {
        addRoomThunk,addUserToRoomThunk,ChangeModeThunk,
        deleteUserFromRoomThunk, deleteRoomThunk})
)(RoomsPage);


type MapStateToPropsType = ReturnType<typeof mapStateToProps>

type MapDispatchToPropsType = {
    addRoomThunk: (newRoom: socketRoomsDataTypeObj) => void,
    addUserToRoomThunk: (id: number, userName: string) => void,
    ChangeModeThunk: (bool: boolean, id: number | null) => void,
    deleteUserFromRoomThunk: (id: number, newUsers: Array<string>) => void,
    deleteRoomThunk: (id:number) => void
}
