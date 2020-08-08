import React from "react";
import css from "./CreateRoomStyle.module.css";
import {CSSTransition} from "react-transition-group";
import "../PopUpAnimationsStyles.css"
import CreateRoomReduxForm from "./CreateRoomForm/CreateRoomForm";
import {compose} from "redux";
import {connect} from "react-redux";
import { ChangeModeThunk } from "../../redux/ChatReducer/ChatReducer";
import {StateType} from "../../redux/store";
import socket from "../../sockets/sockets";

const CreateRoom: React.FC<propsType & mapStateToPropsType> = (props) => {

    let SubmitCreateRoom = (formdata:{NameRoom:string}) => {
        let data = {
            NameRoom:formdata.NameRoom,
            userName:props.userName
        };
       socket.emit("SET:ROOM", data);
    };
    return <div className={css.CreateRoomContainer}>
            <div className={css.CreateRoomContainer__body}>
                <div className={css.CreateRoomContainer__header}>
                    <div className={css.CreateRoomContainer__close}>
                        <span onClick={() => props.changeMode(false)}>X</span>
                    </div>
                    <div className={css.CreateRoomContainer__title}>
                        <p>Создание комнаты</p>
                    </div>
                </div>
                <div className={css.CreateRoomContainer__content}>
                    <CreateRoomReduxForm onSubmit = {SubmitCreateRoom}/>
                </div>
            </div>
    </div>
};

let mapStateToProps = (state:StateType) => {
    return {
        userName: state.authPage.user
    }
};

export default compose(
    connect(mapStateToProps,{ChangeModeThunk})
)(CreateRoom);


type mapStateToPropsType = ReturnType<typeof mapStateToProps>
type propsType = {
    changeMode: (bool: boolean) => void,
    ChangeModeThunk: (bool: boolean,id:number | null) => void,

}