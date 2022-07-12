import { useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { AuthContext } from '../../context/auth';
import { api } from '../../services/api';

import TableTicketsClosed from '../../components/TableTicketsClosed';

import { Power } from 'phosphor-react';
import './styles.css';

export function History() {
    const { signOut } = useContext(AuthContext);
    const [ticketsClosed, setTicketsClosed] = useState([]);

    useEffect(() => {
        api.get('http://localhost:3001/tickets-closed')
            .then((response) => {
                setTicketsClosed(response.data);
            })
            .catch((error) => console.log(error));
    }, []);

    function handleLogout() {
        signOut();
    }

    function generateTable() {
        if(!ticketsClosed.length) return <tr><td colSpan="4">Nenhum chamado fechado.</td></tr>

        return ticketsClosed.map((ticket, index) => {
            return <TableTicketsClosed ticket={ticket} key={index} />
        });
    }

    return(
        <div className="dashboard-container">
            <header>
                <h1>Histórico</h1>
                <ul>
                    <li><Link to="/dashboard">Chamados</Link></li>
                    <li><Link to="/history">Histórico</Link></li>
                    <button type="button" onClick={handleLogout}>
                        <Power size={25}/>
                    </button>
                </ul>
            </header>
            <h3>Chamados fechados</h3>
            <div className="table-tickets">
                <table>
                    <thead>
                        <tr>
                            <th>Título</th>
                            <th>Prioridade</th>
                            <th>Data</th>
                            <th>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {generateTable()}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
