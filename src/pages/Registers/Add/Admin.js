import { useState } from "react";
import Header from "../../../components/GoBackHeader";
import RegistersFeaturesPage from "../FeaturesPage";

export default function AddAdmin() {
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [email, setEmail] = useState('');

    return (
        <RegistersFeaturesPage>
            <div className="registers-add-container">
                <Header to="/registers" title="Cadastrar administrador" />
                <form>
                    <label htmlFor="login">
                        Login
                        <input
                            name="login"
                            value={login}
                            onChange={({target}) => setLogin(target.value)}
                            required
                        />
                    </label>

                    <label htmlFor="e-mail">
                        E-mail
                        <input
                            name="e-mail"
                            type="email"
                            value={email}
                            onChange={({target}) => setEmail(target.value)}
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
                            onChange={({target}) => setConfirmPassword(target.value)}
                            required
                        />
                    </label>

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
