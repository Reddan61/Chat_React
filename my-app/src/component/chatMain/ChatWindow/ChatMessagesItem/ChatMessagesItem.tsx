import React from "react";
import css from "./ChatMessagesItemStyle.module.css"
import {messagesType} from "../../../Types/Types";


const ChatMessagesItem:React.FC<propsType> = (props) => {
    if(!props.message.text) {
        return <></>
    }
    return <div className={css.Message__Body}>
        <div className={css.Message_text}>
          {props.message.text}
        </div>
        <div className={css.Message_user}>
            {props.message.user}
        </div>
    </div>
};


export default ChatMessagesItem;


type propsType = {
    message: {
        user: string,
        text: string
    }
}