import React from "react";
import {NavLink} from "react-router-dom";
import css from "./styles.module.css"
import {compose} from "redux";
import {connect} from "react-redux";
import {StateType} from "../redux/store";
import {logOutThunk} from "../redux/authReducer";
import {ChangeModeThunk} from "../redux/ChatReducer/ChatReducer";
import socket from "../sockets/sockets";
import {changeIsGettedRoomsThunk} from "../redux/RoomsPageReducer/RoomsPageReducer";


const Header: React.FC<mapStateToPropsType & mapDispatchToPropsType> = (props) => {
    const logOut = () => {
        props.ChangeModeThunk(false,null);
        props.changeIsGettedRoomsThunk(false);
        props.logOutThunk(props.user!);
    };
    return <div className={css.header}>
        <ul className={css.auth}>
            <li>{props.user != null && <div className={css.header__Spoiler}>
                <ul className={css.spoiler__items}>
                    <li onClick={logOut}>Выход</li>
                </ul>

            </div>}</li>
            <li>{props.user != null ? props.user : <NavLink to={"/auth"}> Войти </NavLink>}</li>
        </ul>
    </div>
};


let mapStateToProps = (state: StateType) => {
    return {
        user: state.authPage.user
    }
};

export default compose(
    connect(mapStateToProps, {logOutThunk, ChangeModeThunk, changeIsGettedRoomsThunk})
)(Header);

type mapStateToPropsType = ReturnType<typeof mapStateToProps>

type mapDispatchToPropsType = {
    logOutThunk: (name:string) => void,
    ChangeModeThunk: (bool: boolean,id:number | null) => void,
    changeIsGettedRoomsThunk: (bool:boolean) => void
}
