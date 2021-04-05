import { useEffect, useState } from "react";

import SideBar from "../../components/SideBar";
import ErrorMessage from '../../components/ErrorMessage';
import SimpleLoader from '../../components/SimpleLoader';

import api from "../../services/api";
import { errorAlert, successAlert } from "../../utils/Alerts";

import './styles.css';

export default function Tolerance() {
    const [currentTolerance, setCurrentTolerance] = useState('');
    const [lastModification, setLastModification] = useState('');
    const [newTolerance, setNewTolerance] = useState('');
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        api.get('/tolerance')
            .then((res) => {
                setIsLoading(false);
                setCurrentTolerance(res.data.tolerance);
                setLastModification(res.data.date);
            })
            .catch((error) => {
                console.log(error);
                setIsLoading(false);
                setCurrentTolerance('Não foi possível obter o valor');
                setLastModification('Não foi possível obter a data');
            })
    }, []);

    function addNewTolerance() {
        api.put(`/tolerance/${newTolerance}`)
            .then(() => {
                setCurrentTolerance(newTolerance);
                successAlert('Tolerância modificada com sucesso!');
            })
            .catch((error) => {
                console.log(error);
                errorAlert('Não foi possível alterar a Tolerância!');
            })
    }

    return (
        <div id="tolerance-page">
            <SideBar />

            <div className="tolerance-page-container">
                {
                    isLoading ? 
                        <SimpleLoader />
                        :
                        (
                            <p>
                                <strong>
                                    Tolerância atual: <span>{currentTolerance}</span>
                                </strong>
                                <strong>
                                    Data da ultima modificação: <span>{lastModification}</span>
                                </strong>
                            </p>
                        )
                }
                <label htmlFor="tolerance">
                    Nova Tolerância (minutos):
                    <input type="number" name="tolerance" value={newTolerance} onChange={({ target }) => setNewTolerance(target.value)} />
                </label>
                <button type="button" onClick={addNewTolerance}>
                    Modificar
                </button>
            </div>
        </div>
    );
}
