import React from "react";

const Message = (props) => {
    const { author, text } = props.message;

    return (
        <div className="message">
            <div className="author">
                <img className="avatar" src="https://github.com/maykongsn.png" />
                <div className="author-info">
                    <strong>{author}</strong>
                </div>
            </div>
            <p>{text}</p>
        </div>
    )
};

export default Message;
