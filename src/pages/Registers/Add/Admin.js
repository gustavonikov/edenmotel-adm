import { useState } from "react";

import Header from "../../../components/GoBackHeader";
import RegistersFeaturesPage from "../FeaturesPage";

import api from "../../../services/api";

import { errorAlert, successAlert } from "../../../utils/Alerts";

export default function AddAdmin() {
    const [login, setLogin] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [passwordsMatch, setPasswordsMatch] = useState(true);

    function addNewAdmin(ev) {
        ev.preventDefault();

        if (password !== confirmPassword) {
            errorAlert('As senhas digitadas não correspondem');
            return
        }

        const data = {
            login,
            email,
            password
        };

        api.post('/admins', data)
        .then(() => {
            successAlert('Admin cadastrado com sucesso!');

            setLogin('');
            setEmail('');
            setPassword('');
            setConfirmPassword('');
        })
        .catch((error) => {
            console.log(error);
            errorAlert('Não foi possível concluir seu cadastro no momento!')
        });
    }

    return (
        <RegistersFeaturesPage>
            <div className="registers-add-container">
                <Header to="/registers" title="Cadastrar administrador" />
                <form onSubmit={(ev) => addNewAdmin(ev)}>
                    <label htmlFor="login">
                        Login
                        <input
                            name="login"
                            value={login}
                            onChange={({ target }) => setLogin(target.value)}
                            required
                        />
                    </label>

                    <label htmlFor="e-mail">
                        E-mail
                        <input
                            name="e-mail"
                            type="email"
                            value={email}
                            onChange={({ target }) => setEmail(target.value)}
                            required
                        />
                    </label>

                    <label htmlFor="password">
                        Senha
                        <input
                            name="password"
                            type="password"
                            minLength="4"
                            value={password}
                            onChange={({ target }) => setPassword(target.value)}
                            required
                        />
                    </label>

                    <label htmlFor="confirm-password">
                        Confirme sua senha
                        <input
                            name="confirm-password"
                            type="password"
                            value={confirmPassword}
                            minLength="4"
                            onChange={({ target }) => {
                                setConfirmPassword(target.value);
                                if (password.length > 0 && target.value !== password) {
                                    setPasswordsMatch(false);
                                }
                                else if (password.length > 0 && target.value === password ) {
                                    setPasswordsMatch(true);
                                }
                            }}
                            required
                        />
                    </label>
                    {
                        !passwordsMatch &&
                        <p>
                            As senhas estão diferentes
                        </p>
                    }
                    <button
                        className="button"
                        type="submit"
                    >
                        Cadastrar
                    </button>
                </form>
            </div>
        </RegistersFeaturesPage>
    )
}
