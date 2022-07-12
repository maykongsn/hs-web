import React from "react"
import { Link } from "react-router-dom";

import { ChatText } from "phosphor-react";

export const Ticket = (props) => {
    const { code, title, message, status } = props.ticket
    return(
        <>
            <li>
                <h3>{title}</h3>
                <p>{message}</p>
                <strong>STATUS:</strong>
                <p>{status}</p>
                <Link to={`/chat/${code}`}>
                    <ChatText size={23} color="#737380" />
                </Link>
            </li>
        </>
    );
}
