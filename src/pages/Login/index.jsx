import { useContext, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../../context/auth';
import './styles.css';

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { signIn, signed } = useContext(AuthContext);

    const handleSignIn = async(event) => {
        event.preventDefault();
        const data = {
            email,
            password,
        };

        await signIn(data);
    }

    if(signed) {
        return <Navigate to="/home" />
    } else {
        return (
            <div className="login-container">
                <div>
                    <section className="form">
                        <form onSubmit={handleSignIn}>
                            <h1>Faça seu Login</h1>
                            <input
                                type="text"
                                placeholder="Digite seu e-mail"
                                value={email ?? ""}
                                name="email"
                                onChange={(event) => { setEmail(event.target.value) }} />
                            <input
                                type="password"
                                placeholder="Digite sua senha"
                                value={password ?? ""}
                                name="password"
                                onChange={(event) => { setPassword(event.target.value) }} />
                            <button className="button" type="submit">Entrar</button>
                        </form>
                    </section>
                </div>
            </div>
        );
    }
}
