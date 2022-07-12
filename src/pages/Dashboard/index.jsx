import { useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { AuthContext } from '../../context/auth';
import { api } from '../../services/api';

import TableTickets from '../../components/TableTickets';

import { ArrowsClockwise, ListPlus, Checks, Power } from 'phosphor-react';
import './styles.css';

export function Dashboard() {
    const { signOut } = useContext(AuthContext);
    const [ticketsInProgress, setTicketsInProgress] = useState([]);
    const [ticketsOpen, setTicketsOpen] = useState([]);
    const [ticketsClosed, setTicketsClosed] = useState([]);

    useEffect(() => {
        api.get('http://localhost:3001/tickets-in-progress')
            .then((response) => {
                setTicketsInProgress(response.data);
            })
            .catch((error) => console.log(error));
        api.get('http://localhost:3001/tickets-open')
            .then((response) => {
                setTicketsOpen(response.data);
            })
            .catch((error) => console.log(error));
        api.get('http://localhost:3001/tickets-closed')
            .then((response) => {
                setTicketsClosed(response.data);
            })
            .catch((error) => console.log(error));
    }, []);

    function handleLogout() {
        signOut();
    }

    function closeTicketOpen(code) {
        let ticketsTemp = ticketsOpen;
        ticketsTemp.map((ticket, index) => {
            if(ticket.code === code) {
                ticketsTemp.splice(index, 1);
                setTicketsClosed([...ticketsClosed, ticket]);
            }
        });
        setTicketsOpen([...ticketsTemp]);
    }

    function closeTicketInProgress(code) {
        let ticketsTemp = ticketsInProgress;
        ticketsTemp.map((ticket, index) => {
            if(ticket.code === code) {
                ticketsTemp.splice(index, 1);
                setTicketsClosed([...ticketsClosed, ticket]);
            }
        });
        setTicketsInProgress([...ticketsTemp]);
    }

    function putTicketInProgress(code) {
        let ticketsTemp = ticketsOpen;
        ticketsTemp.map((ticket, index) => {
            if(ticket.code === code) {
                ticketsTemp.splice(index, 1);
                setTicketsInProgress([...ticketsInProgress, ticket]);
            }
        });
        setTicketsOpen([...ticketsTemp]);
    }

    function generateTableInProgress() {
        if(!ticketsInProgress.length) return <tr><td colSpan="4">Nenhum chamado em andamento.</td></tr>

        return ticketsInProgress.map((ticket, index) => {
            return <TableTickets ticket={ticket} closeTicketInProgress={closeTicketInProgress} key={index} />
        });
    }

    function generateTableOpen() {
        if(!ticketsOpen.length) return <tr><td colSpan="4">Nenhum chamado aberto.</td></tr>

        return ticketsOpen.map((ticket, index) => {
            return <TableTickets ticket={ticket} putTicketInProgress={putTicketInProgress} closeTicketOpen={closeTicketOpen} key={index} />
        })
    }

    return(
        <div className="dashboard-container">
            <header>
                <h1>Dashboard</h1>
                <ul>
                    <li><Link to="/dashboard">Chamados</Link></li>
                    <li><Link to="/history">Histórico</Link></li>
                    <button type="button" onClick={handleLogout}>
                        <Power size={25}/>
                    </button>
                </ul>
            </header>
            <div className="panel-cards">
                <div className="card">
                    <h3>Em Andamento</h3>
                    <ArrowsClockwise size={32} />
                    <strong>{ticketsInProgress.length}</strong>
                </div>
                <div className="card">
                    <h3>Abertos</h3>
                    <ListPlus size={32} />
                    <strong>{ticketsOpen.length}</strong>
                </div>
                <div className="card">
                    <h3>Fechados</h3>
                    <Checks size={32} />
                    <strong>{ticketsClosed.length}</strong>
                </div>
            </div>
            <h3>Chamados em andamento</h3>
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
                        {generateTableInProgress()}
                    </tbody>
                </table>
            </div>
            <h3>Chamados abertos</h3>
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
                        {generateTableOpen()}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
