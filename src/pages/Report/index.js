import SideBar from "../../components/SideBar";

import './styles.css';

export default function Report() {
    const asideActiveBars = {
        dashboard: false,
        products: false,
        history: false,
        registers: false,
        report: true,
    };

    return (
        <div id="report-page">
            <SideBar barsState={asideActiveBars} />
            <div className="report-page-container">
                <h2>
                    Clique no botão abaixo para enviar o relatório para o seu e-mail cadastrado:
                </h2>
                <button>
                    Enviar relatório
                </button>
            </div>
        </div>
    )
}
