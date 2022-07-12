import React from "react";

import { Link } from 'react-router-dom';
import { ChatText } from 'phosphor-react';

const TableTickets = (props) => {
    const { code, title, priority, created_at } = props.ticket;
    const [YYYY, MM, DD] = created_at.substring(0, 10).split('-');

    return (
        <tr>
            <td>{title}</td>
            <td>{priority}</td>
            <td>{DD}/{MM}/{YYYY}</td>
            <td>
                <Link to={`/chat-technician/${code}`}>
                    <ChatText alt="Abrir conversa" size={23} color="#737380" />
                </Link>
            </td>
        </tr>
    );
}

export default TableTickets;
