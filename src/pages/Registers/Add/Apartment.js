import { useState } from "react";

import Header from "../../../components/GoBackHeader";
import RegistersFeaturesPage from "../FeaturesPage";

import api from "../../../services/api";

import { errorAlert, successAlert } from "../../../utils/Alerts";

import './styles.css';

export default function AddApartment() {

    const [number, setNumber] = useState('');
    const [type, setType] = useState('');
    const [price, setPrice] = useState('');
    const [overnight, setOvernight] = useState('');
    const [extraHour, setExtraHour] = useState('');

    function addNewApartment(ev) {
        ev.preventDefault();
        
        const data = {
            number,
            type,
            value: price,
            overnight_stay: overnight,
            extra_hour: extraHour
        };
        
        api.post('/apartments', data)
        .then(() => {
            successAlert('Apartamento cadastrado com sucesso!');

            setNumber('');
            setType('');
            setPrice('');
            setOvernight('');
            setExtraHour('');
        })
        .catch((error) => {
            console.log(error);
            errorAlert('Não foi possível concluir seu cadastro no momento!')
        });
    }

    return (
        <RegistersFeaturesPage>
            <div className="registers-add-container">
                <Header to="/registers" title="Cadastrar apartamento" />
                <form onSubmit={(ev) => addNewApartment(ev)}>
                    <label htmlFor="login">
                        Nº do apartamento
                    <input
                        name="number"
                        value={number}
                        onChange={({ target }) => setNumber(target.value)}
                        required
                    />
                    </label>

                    <select name="type" value={type} onChange={({ target }) => setType(target.value)} required>
                        <option value="" disabled selected hidden>Selecione o tipo</option>
                        <option value="PARAISO">Paraíso</option>
                        <option value="DOCE_PECADO">Doce Pecado</option>
                    </select>

                    <label htmlFor="password">
                        Preço do apartamento
                    <input
                        name="price"
                        value={price}
                        onChange={({ target }) => setPrice(target.value)}
                        required
                    />
                    </label>

                    <label htmlFor="password">
                        Preço do pernoite
                    <input
                        name="overnight"
                        value={overnight}
                        onChange={({ target }) => setOvernight(target.value)}
                        required
                        />
                    </label>

                    <label htmlFor="password">
                        Preço da hora extra
                    <input
                            name="extraHour"
                            value={extraHour}
                            onChange={({ target }) => setExtraHour(target.value)}
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
