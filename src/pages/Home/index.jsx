import { Link } from "react-router-dom";
import { ChatText, Power } from "phosphor-react";

import './styles.css';
import { useContext, useEffect, useState } from "react";
import { api } from "../../services/api";
import { AuthContext } from '../../context/auth';

export function Home() {
    const { signOut } = useContext(AuthContext);
    const user = JSON.parse(localStorage.getItem("@Auth:client"));
    const [tickets, setTickets] = useState([]);

    useEffect(() => {
        api.get(`http://localhost:3001/client/tickets/${user.id}`)
            .then((response) => {
                setTickets(response.data);
            })
            .catch((error) => console.log(error));
    }, [user.id]);

    function handleLogout() {
        signOut();
    }

    return (
        <div className="home-container">
            <header>
                <span>Olá, {user.name}</span>
                <Link className="button" to="/tickets/new">
                    Novo chamado
                </Link>
                <button type="button" onClick={handleLogout}>
                    <Power size={25}/>
                </button>
            </header>
            <h1>Chamados criados</h1>
            <ul>
            {tickets.map((ticket, index) => (
                <li key={index}>
                    <h3>{ticket.title}</h3>
                    <p>{ticket.message}</p>
                    <strong>STATUS:</strong>
                    <p>{ticket.status}</p>
                    <Link to={`/chat/${ticket.code}`}>
                        <ChatText size={23} color="#737380"/>
                    </Link>
                </li>
            ))}
            </ul>
        </div>
    )
}
