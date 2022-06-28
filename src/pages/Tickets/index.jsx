import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { ArrowLeft } from "phosphor-react";
import './styles.css';
import { api } from "../../services/api";

export function Tickets() {
    const [title, setTitle] = useState("");
    const [message, setMessage] = useState("");
    const [priority, setPriority] = useState("");
    const navigate = useNavigate();
    const client = JSON.parse(localStorage.getItem("@Auth:client"));

    const handleSubmit = (event) => {
        event.preventDefault();

        const newTicket = {
            title,
            client_id: client.id,
            priority,
            message,
            status: 'Aberto'
        }

        api.post("/tickets/new", newTicket)
            .then(
                () => {
                    alert("Chamado criado com sucesso.");
                    navigate("/home");
                }
            )
            .catch(
                (error) => {
                  alert('Erro ao cadastrar no chamado, tente novamente!');
                }
            )
    }

    return (
        <div className="tickets-container">
            <header>
                <Link className="back-link" to="/home">
                    <ArrowLeft size={30} />
                    Voltar
                </Link>
            </header>
            <div className="content">
                <form onSubmit={handleSubmit}>
                    <h1>Cadastro de chamado</h1>
                    <p>Descreva o caso detalhadamente para que o time de suporte possa ajudar.</p>
                    <fieldset>
                        <div className="field">
                            <label>Título</label>
                            <input
                                placeholder="Título"
                                value={title}
                                name="title"
                                onChange={event => setTitle(event.target.value)}
                            />
                        </div>
                        <div className="field">
                            <label>Mensagem</label>
                            <textarea
                                placeholder="Mensagem"
                                value={message}
                                name="menssage"
                                onChange={event => setMessage(event.target.value)}
                            />
                        </div>
                        <div className="field">
                            <label>Prioridade</label>
                            <select
                                name="priority"
                                value={priority}
                                onChange={event => setPriority(event.target.value)}
                            >
                                <option value="Baixa">Baixa</option>
                                <option value="Média">Média</option>
                                <option value="Alta">Alta</option>
                            </select>
                        </div>
                    </fieldset>
                    <button className="button" type="submit">Cadastrar</button>
                </form>
            </div>
        </div>
    );
}
