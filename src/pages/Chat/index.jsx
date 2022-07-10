import { Link, useParams } from "react-router-dom";
import { ArrowLeft } from "phosphor-react";
import { useEffect, useState } from "react";
import axios from "axios";

import { api } from "../../services/api";

import Message from '../../components/Message';

import './styles.css';

export function Chat() {
    const params = useParams();
    const [title, setTitle] = useState("");
    const [author, setAuthor] = useState("");
    const [message, setMessage] = useState("");
    const [ticket_code, setTicket_code] = useState("");
    const [text, setText] = useState("");
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        api.get(`http://localhost:3001/tickets/${params.code}`)
            .then((response) => {
                setTitle(response.data[0].title);
                setAuthor(response.data[0].client.name);
                setMessage(response.data[0].message);
                setTicket_code(response.data[0].code);
            })
            .catch((error) => console.log(error));
        api.get(`http://localhost:3001/message/list/${params.code}`)
            .then((response) => {
                setMessages(response.data);
            })
            .catch((error) => console.log(error));
    }, []);

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
                <Link className="back-link" to="/home">
                    <ArrowLeft size={30} />
                    Voltar
                </Link>
            </header>
            <div className="content">
                <div className="author">
                    <img className="avatar" src="https://github.com/maykongsn.png" />
                    <div className="author-info">
                        <strong>{author}</strong>
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
