import { Modal } from "@material-ui/core";
import { RiCloseCircleFill } from 'react-icons/ri';

import './styles.css';

const ApartmentsViewModal = ({ openViewModal, printData, consumption, onClose }) => (
    <Modal
        id="apartments-view-modal"
        open={openViewModal}
        aria-labelledby="printer"
        onClose={onClose}
    >
        <div className="modal-container">
            <RiCloseCircleFill className="close-modal" size={36} onClick={onClose} />
            <div className="modal-content">
                <header>
                    EDEN MOTEL LTDA <br />
                    Apartamento: {printData.number}<br />
                    Horario de Entrada..: {printData.time} - {printData.date}<br />
                    Horario de Saida....: {printData.payment_moment} - {printData.payment_date}<br />
                    Horas extras........: {printData.lenght_of_stay}<br />
                </header>
                <hr className="separation-line"/>
                <main>
                    Consumo
                    <table>
                            <thead>
                                <tr>
                                    <th>Nome do produto</th>
                                    <th>Valor</th>
                                    <th>Qtd</th>
                                </tr>
                            </thead>
                            <tbody>
                                {consumption.length === 0
                                    ?
                                    <span>Não houve consumo</span>
                                    :
                                    consumption.map(({ id, name, price, quantity }) => {
                                        const adjustedPrice = Intl.NumberFormat({ style: 'currency', currency: 'BRL' }, { minimumFractionDigits: 2 },).format(price);

                                        return (
                                            <tr key={id}>
                                                <td>{name}</td>
                                                <td>{adjustedPrice}</td>
                                                <td>{quantity}</td>
                                            </tr>
                                        );
                                    })}
                            </tbody>
                        </table>
                    <hr className="separation-line"/>
                    Total à pagar<br />
                        <span>Consumo total.......: {Intl.NumberFormat({ style: 'currency', currency: 'BRL' }, { minimumFractionDigits: 2 },).format(Number(printData.consumption))}</span>
                        <br />
                        <span>Valor do Apartamento: {Intl.NumberFormat({ style: 'currency', currency: 'BRL' }, { minimumFractionDigits: 2 },).format(Number(printData.daily_value))}</span>
                        <br />
                        <br />
                        {
                            !printData.discount ?
                                <span> Valor da conta......: {Intl.NumberFormat({ style: 'currency', currency: 'BRL' }, { minimumFractionDigits: 2 },).format(Number(printData.daily_value) + Number(printData.consumption))}</span>
                                :
                                <>
                                    <span> Valor do desconto...: {Intl.NumberFormat({ style: 'currency', currency: 'BRL' }, { minimumFractionDigits: 2 },).format(printData.discount)}</span>
                                    <br />
                                    <span> Valor da conta......: {
                                        Intl.NumberFormat({ style: 'currency', currency: 'BRL' }, { minimumFractionDigits: 2 },).format((Number(printData.daily_value) + Number(printData.consumption)) - printData.discount)
                                    }</span>
                                </>
                        }
                    <br />
                </main>
            </div>
        </div>
    </Modal>
);

export default ApartmentsViewModal;
