import React from "react";

const Message = (props) => {
    const { author, text } = props.message;

    return (
        <div className="message">
            <div className="sender">
                <div className="avatar"><p>{author.slice(0, 1)}</p></div>
                <div className="author-info">
                    <strong>{author}</strong>
                </div>
            </div>
            <p>{text}</p>
        </div>
    )
};

export default Message;
