import React, {useEffect, useState} from "react";
import css from "./StyleChatWindow.module.css";
import { compose } from "redux";
import {connect} from "react-redux";
import {StateType} from "../../redux/store";
import ChatMessagesItem from "./ChatMessagesItem/ChatMessagesItem";
import socket from "../../sockets/sockets";
import {messagesType} from "../../Types/Types";
import {
    addNewMessageThunk,
    addNewUserThunk,
    ChangeModeThunk,
    replaceNewUsers
} from "../../redux/ChatReducer/ChatReducer";
import ChatUsersOnlineItems from "./ChatMessagesItem/ChatUsersOnlineItems";


const ChatWindow:React.FC<mapStateToPropsType & mapDispatchToPropsType> = (props) => {
    let [myMessage,ChangeMessage] = useState('');

    let ChangeInputMessage = (e:any) => {
        ChangeMessage(e.target.value);
    };
    useEffect(() => {
        socket.removeListener("JOINED:ROOM");
        socket.removeListener('GET:ROOMS');
        socket.removeListener('DELETE:ROOM');

        socket.on("LEAVE:CHATROOM", (data: {newUsers : Array<string>}) => {
            props.replaceNewUsers(data.newUsers);
        });

        socket.on("GET:MESSAGE", (data: {
            message:messagesType
        }) => {
            props.addNewMessageThunk(data.message);
            ChangeMessage('');
        });
        socket.on("ADDUSER:ROOM", (data: {
            newUser:string
        }) => {
            props.addNewUserThunk(data.newUser);
        });
        return () => {
            socket.emit("LEAVE:CHATROOM", {id:props.thisRoomId,userName:props.userName});
            socket.removeListener("GET:MESSAGE");
            socket.removeListener("ADDUSER:ROOM");
        }
    },[]);

    let sendNewMessage = () => {
        socket.emit("NEW:MESSAGE", {id:props.thisRoomId, message: {
                user:props.userName,
                text:myMessage
            }})
    };

    let changeNewImage = (e:any) => {
        let file = e.target.files[0];
        if(e.target.files.length && (file.type === 'image/jpeg' || file.type === 'image/png')) {
            socket.emit("SET:IMAGE", {
                file,
                id:props.thisRoomId
            })
        }
    };

    return <div className={css.ChatWindow}>
        <div>
            <div className={css.ChatWindow__ShowOnline}> <span></span></div>
            <div  className={css.ChatWindow__Left}>
                {props.users}
            </div>

        </div>
        <div className={css.ChatWindow__Right}>
            <div className={css.ChatWindow__Header}>
                <div className={css.Header__Settings}>
                    <input type={'file'} onChange={changeNewImage}/>
                </div>
                <div className={css.ChatWindow__X} onClick={() => props.ChangeModeThunk(false,null)}>
                </div>
            </div>
            <div className = {css.ChatWindow__Messages}>
                {props.messages}
            </div>
            <div className = {css.ChatWindow__SendMessage}>
                <textarea onChange={(event) => ChangeInputMessage(event)} value={myMessage}/>
                <button onClick = {sendNewMessage}>Отправить сообщение</button>
            </div>
        </div>
    </div>
};

let mapStateToProps = (state:StateType) => {

    return {
        userName: state.authPage.user,
        thisRoomId: state.ChatPage.changedRoomId,
        users:state.ChatPage.changedRoom!.users.map((item,index) => <ChatUsersOnlineItems key = {item + index} user={item} />),
        messages: state.ChatPage.changedRoom!.messages.map((el, index) => <ChatMessagesItem key = {el.text + index} message = {el}/>)
    }
};

export default compose(
    connect(mapStateToProps, {addNewMessageThunk,addNewUserThunk, ChangeModeThunk, replaceNewUsers})
)(ChatWindow);


type mapStateToPropsType = ReturnType<typeof mapStateToProps>

type mapDispatchToPropsType = {
    addNewMessageThunk: (message:messagesType) => void
    addNewUserThunk: (user:string) => void,
    ChangeModeThunk: (bool:boolean,id:number | null) => void,
    replaceNewUsers: (newUsers: Array<string>) => void
}