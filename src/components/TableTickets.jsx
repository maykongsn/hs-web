import React from "react";

import { Link } from 'react-router-dom';
import { Checks, ChatText, ArrowsClockwise } from 'phosphor-react';
import axios from "axios";

const TableTickets = (props) => {
    const { code, title, priority, created_at } = props.ticket;
    const [YYYY, MM, DD] = created_at.substring(0, 10).split('-');

    function handleCloseTicket() {
        axios.put(`http://localhost:3001/tickets/close/${code}`)
            .then((response) => {
                if(response.data.status === 'Aberto') {
                    props.closeTicketOpen(code)
                } else {
                    props.closeTicketInProgress(code)
                }
            })
            .catch((error) => console.log(error));
    }

    function handlePutTicketInProgress() {
        axios.put(`http://localhost:3001/tickets/in-progress/${code}`)
            .then(() => {
                props.putTicketInProgress(code)
            })
            .catch(() => alert('Ação inválida'));
    }

    return (
        <tr>
            <td>{title}</td>
            <td>{priority}</td>
            <td>{DD}/{MM}/{YYYY}</td>
            <td>
                <Link to={`/chat-technician/${code}`}>
                    <ChatText alt="Abrir conversa" size={23} color="#737380" />
                </Link>
                <button onClick={() => handlePutTicketInProgress()}>
                    <ArrowsClockwise alt="Chamado em andamento" size={23} color="#737380" />
                </button>
                <button onClick={() => handleCloseTicket()}>
                    <Checks alt="Fechar chamado" size={23} color="#737380" />
                </button>
            </td>
        </tr>
    );
}

export default TableTickets;
