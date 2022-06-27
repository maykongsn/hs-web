import { useState } from 'react';
import { Link } from 'react-router-dom';
import './styles.css';

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    return (
        <div className="login-container">
            <div>
                <section className="form">
                    <form>
                        <h1>Faça seu Login</h1>
                        <input
                            type="text"
                            placeholder="Digite seu e-mail"
                            value={email ?? ""}
                            name="email"
                            onChange={(event) => { setEmail(event.target.value) }} />
                        <input
                            type="text"
                            placeholder="Digite sua senha"
                            value={password ?? ""}
                            name="password"
                            onChange={(event) => { setPassword(event.target.value) }} />
                        <button className="button" type="submit">Entrar</button>
                        <Link className="back-link" to="/register">
                            Cadastrar-se
                        </Link>
                    </form>
                </section>
            </div>
        </div>
    );
}
