import React, {useEffect} from "react";
import css from "./stylesChatMain.module.css"
import RoomsPage from "./RoomsPage/RoomsPage";
import {compose} from "redux";
import {WithAuthRedirect} from "../HOC/withAuthRedirect";
import ChatWindow from "./ChatWindow/ChatWindow";
import {connect} from "react-redux";
import {getFirstTimeRoomsThunk} from "../redux/RoomsPageReducer/RoomsPageReducer";
import {StateType} from "../redux/store";
import Loader from "../loader/loader";
import socket from "../sockets/sockets";



const ChatMain: React.FC<MapStateToPropsType & MapDispatchToPropsType> = (props) => {
    useEffect(() => {
        return () => {
            socket.removeListener("LEAVE:CHATROOM");
            socket.removeListener("JOINED:ROOM");
            socket.removeListener('GET:ROOMS');
            socket.removeListener('ToOwner:ROOM');
            socket.removeListener('DELETE:ROOM');
            socket.removeListener("GET:IMAGE");
        }
    }, []);


    if (!props.isGettedRooms) {
        props.getFirstTimeRoomsThunk();
        return <div>
            <Loader/>
        </div>
    }
    return <div className={css.BodyChat}>
        <div className={css.BodyChat__items}>
            {!props.isChangedRoom ? <RoomsPage /> : <ChatWindow />}
        </div>
    </div>
};

let mapStateToProps = (state: StateType) => {
    return {
        isGettedRooms: state.RoomsPage.isGettedRooms,
        isChangedRoom: state.ChatPage.isChangedRoom
    }
};

export default compose(
    WithAuthRedirect,
    connect(mapStateToProps, {getFirstTimeRoomsThunk})
)
(ChatMain);

type MapStateToPropsType = ReturnType<typeof mapStateToProps>

type MapDispatchToPropsType = {
    getFirstTimeRoomsThunk: () => void
}