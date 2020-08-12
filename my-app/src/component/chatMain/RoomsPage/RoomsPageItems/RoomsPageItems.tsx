import React, {useEffect} from "react";
import {socketRoomsDataTypeObj} from "../../../Types/Types";
import css from './StyleSideBarItem.module.css'
import {StateType} from "../../../redux/store";


const RoomsPageItems: React.FC<RoomPageItemsType & mapStateToPropsType & mapDispatchToProps> = (props) => {
    return <div className={css.RoomsPage__Item} >
        <div className={css.Item__Content}>
            <div className={css.Item__ImageRoom}>
                <img src={props.room.imageSrc?props.room.imageSrc:"https://filkiniada-4sc.ucoz.org/80781_3.jpg"}/>
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