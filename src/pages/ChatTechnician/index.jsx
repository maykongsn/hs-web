import { Link, useParams } from "react-router-dom";
import { ArrowLeft } from "phosphor-react";
import { useEffect, useState } from "react";
import axios from "axios";

import { api } from "../../services/api";

import Message from '../../components/Message';

import './styles.css';

export function ChatTechnician() {
    const params = useParams();
    const [title, setTitle] = useState("");
    const [client, setClient] = useState("");
    const [message, setMessage] = useState("");
    const [ticket_code, setTicket_code] = useState("");
    const [text, setText] = useState("");
    const [messages, setMessages] = useState([]);
    const technician = JSON.parse(localStorage.getItem("@Auth:user"));
    const author = technician.name;

    useEffect(() => {
        api.get(`http://localhost:3001/tickets/${params.code}`)
            .then((response) => {
                setTitle(response.data[0].title);
                setClient(response.data[0].client.name);
                setMessage(response.data[0].message);
                setTicket_code(response.data[0].code);
            })
            .catch((error) => console.log(error));
        api.get(`http://localhost:3001/message/list/${params.code}`)
            .then((response) => {
                setMessages(response.data);
            })
            .catch((error) => console.log(error));
    }, [params.code]);

    const handleSubmit = (event) => {
        event.preventDefault();

        const newMessage = { ticket_code, author, text };

        setMessages([...messages, newMessage]);

        axios.post("http://localhost:3001/message/send", newMessage)
            .catch(
                () => {
                    alert('Erro ao enviar mensagem, tente novamente!');
                }
            )
        setText("");
    }

    function generateMessages() {
        if(!messages) return;

        return messages.map((message, index) => {
            return <Message message={message} key={index} />
        });
    }

    return(
        <div className="chat-container">
            <header>
                <Link className="back-link" to="/dashboard">
                    <ArrowLeft size={30} />
                    Voltar
                </Link>
            </header>
            <div className="content">
                <div className="author">
                    <div className="avatar"><p>{client.slice(0, 1)}</p></div>
                    <div className="author-info">
                        <strong>{client}</strong>
                    </div>
                </div>
                <h1>{title}</h1>
                <p>{message}</p>
                {generateMessages()}
                <div className="answers">
                    <strong>Responder</strong>
                    <form onSubmit={handleSubmit}>
                        <textarea
                            placeholder="Mensagem"
                            name="text"
                            value={text ?? ""}
                            onChange={(event) => setText(event.target.value)}
                        />
                        <button className="button" type="submit">Enviar</button>
                    </form>
                </div>
            </div>
        </div>
    );
}
