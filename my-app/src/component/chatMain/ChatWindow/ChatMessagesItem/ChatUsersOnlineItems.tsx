import React from "react";
import css from "./ChatMessagesItemStyle.module.css"


const ChatUsersOnlineItems = (props:OtherPropsType) => {
    return <div className={css.UserOnline}>
        {props.user}
    </div>
};


export default ChatUsersOnlineItems;



type OtherPropsType = {
    user:string
}