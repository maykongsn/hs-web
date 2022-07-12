import { Link } from "react-router-dom";

import { useContext, useEffect, useState } from "react";
import { api } from "../../services/api";
import { AuthContext } from '../../context/auth';

import { Power } from "phosphor-react";
import './styles.css';
import { Ticket } from '../../components/Ticket';

export function Home() {
    const { signOut } = useContext(AuthContext);
    const user = JSON.parse(localStorage.getItem("@Auth:user"));
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

    function generateTickets() {
        if(!tickets.length) return <h3>Nenhum chamado cadastrado</h3>

        return tickets.map((ticket, index) => {
            return <Ticket ticket={ticket} key={index} />
        })
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
                {generateTickets()}
            </ul>
        </div>
    )
}
