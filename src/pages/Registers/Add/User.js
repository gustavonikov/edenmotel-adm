import { useState } from "react";
import Header from "../../../components/GoBackHeader";
import RegistersFeaturesPage from "../FeaturesPage";

import api from "../../../services/api";

import { errorAlert, successAlert } from "../../../utils/Alerts";

export default function AddUser() {
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [passwordsMatch, setPasswordsMatch] = useState(true);

    function addNewUser(ev) {
        ev.preventDefault();

        if (password !== confirmPassword) {
            errorAlert('As senhas digitadas não correspondem');
            return
        }

        const data = {
            login, 
            password
        };

        api.post('/users', data)
        .then(() => {
            successAlert('Usuário cadastrado com sucesso!');

            setLogin('');
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
                <Header to="/registers" title="Cadastrar usuário" />
                <form onSubmit={(ev) => addNewUser(ev)}>
                    <label htmlFor="login">
                        Login
                        <input
                            name="login"
                            value={login}
                            onChange={({target}) => setLogin(target.value)}
                            required
                        />
                    </label>

                    <label htmlFor="password">
                        Senha
                        <input
                            name="password"
                            type="password"
                            value={password}
                            minLength="4"
                            onChange={({target}) => setPassword(target.value)}
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
                            onChange={({target}) => {
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
