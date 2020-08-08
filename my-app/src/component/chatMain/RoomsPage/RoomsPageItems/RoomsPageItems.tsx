import React, {useEffect} from "react";
import {socketRoomsDataTypeObj} from "../../../Types/Types";
import css from './StyleSideBarItem.module.css'
import {compose} from "redux";
import {connect} from "react-redux";
import {StateType} from "../../../redux/store";
import {ChangeModeThunk} from "../../../redux/ChatReducer/ChatReducer";


const RoomsPageItems: React.FC<RoomPageItemsType & mapStateToPropsType & mapDispatchToProps> = (props) => {
    return <div className={css.RoomsPage__Item} >
        <div className={css.Item__Content}>
            <div className={css.Item__ImageRoom}>
                <img src={"https://w7.pngwing.com/pngs/301/284/png-transparent-twilight-sparkle-pony-rarity-rainbow-dash-princess-celestia-my-little-pony-horse-purple-mammal.png"}/>
            </div>
            <div className={css.Item__Right}>
                <div className={css.Item__NameRoom}>
                    {props.room.nameRoom}
                </div>
                <div className={css.Item__OnlineRoom}>
                    В комнате : {props.room.users.length}
                </div>
            </div>
        </div>
        <div className={css.Item__Button}>
            <a id={`JoinRoomButton ${props.room.id}`}>Войти</a>
        </div>
    </div>
};

let mapStateToProps = (state:StateType) => {
    return {

    }
};
/*export default compose(
    connect(mapStateToProps,{ChangeModeThunk})
)(RoomsPageItems);*/

export default RoomsPageItems;

type mapStateToPropsType = ReturnType<typeof mapStateToProps >
type RoomPageItemsType = {
    room: socketRoomsDataTypeObj
}
type mapDispatchToProps = {
    /*ChangeModeThunk: (bool:boolean) => void*/
}