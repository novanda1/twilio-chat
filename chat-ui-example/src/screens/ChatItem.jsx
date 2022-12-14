import { ListItem } from "@mui/material";
import classNames from "classnames";
import moment from "moment";
import React from "react";

class ChatItem extends React.Component {
  render() {
    const { message, email } = this.props;
    const isOwnMessage = message.author === email;

    return (
      <div
        className={classNames("chat", {
          "chat-start": !isOwnMessage,
          "chat-end": isOwnMessage,
        })}
      >
        <div className="chat-header">
          {message.author}
          <time className="text-xs opacity-50">
            {moment(message.dateCreated).format("DD-MM-YYYY")}
          </time>
        </div>
        <div
          className={classNames("chat-bubble", {
            "chat-bubble-primary": !isOwnMessage,
          })}
        >
          {message.body}
        </div>
      </div>
    );
  }
}

export default ChatItem;
