import { useState } from "react";
import SideBar from "../../components/SideBar";
import api from "../../services/api";
import { errorAlert, successAlert } from "../../utils/Alerts";

import './styles.css';

export default function Report() {
    const adminId = localStorage.getItem('adminId');

    const [initialDate, setInitialDate] = useState('')

    function notifyToSendEmail() {
        api.get(`/report/${adminId}/${initialDate}`)
        .then(() => {
            successAlert('Seu e-mail foi enviado com sucesso!');
        })
        .catch((error) => {
            errorAlert('Não foi possível enviar o relatório!');
            
            console.log(error);
        });
    }

    return (
        <div id="report-page">
            <SideBar />
            <div className="report-page-container">
                <h2>
                    Selecione a data do relatório que você deseja receber:
                </h2>

                <input 
                    type="date" 
                    name="initial-date" 
                    value={initialDate} 
                    onChange={({ target }) => setInitialDate(target.value)} 
                />

                <button type="button" onClick={notifyToSendEmail}>
                    Enviar relatório
                </button>
            </div>
        </div>
    )
}
