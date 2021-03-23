import SideBar from "../../components/SideBar";
import api from "../../services/api";
import { errorAlert, successAlert } from "../../utils/Alerts";

import './styles.css';

export default function Report() {
    const adminId = localStorage.getItem('adminId');

    function notifyToSendEmail() {
        api.get(`/report/${adminId}`)
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
                    Clique no botão abaixo para enviar o relatório para o seu e-mail:
                </h2>
                <button type="button" onClick={notifyToSendEmail}>
                    Enviar relatório
                </button>
            </div>
        </div>
    )
}
