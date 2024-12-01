import React from 'react';
import Style from './../Dialogs.module.scss';

type MessageType = {
    message: string
}


const Message: React.FC<MessageType> = (props) => {
    return <div className={Style.messages}>{props.message}</div>
}

export default Message;