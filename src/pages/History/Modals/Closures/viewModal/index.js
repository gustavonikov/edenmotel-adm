import { Modal } from "@material-ui/core";
import { RiCloseCircleFill } from 'react-icons/ri';

import { adjustValue } from "../../../../../utils/adjustValue";

import './styles.css';

const ClosuresViewModal = ({ openViewModal, onClose, header, closingValue, entries, products, closingTicket, closingTotalTicket, registerCard, card, registerMoney, money }) => (
    <Modal
        id="closures-view-modal"
        open={openViewModal}
        aria-labelledby="printer"
        onClose={onClose}
    >
        <div className="modal-container">
            <RiCloseCircleFill className="close-modal" size={36} onClick={onClose} />
            <div className="modal-content">
                {header.map(({ login, cash_opening_date, cash_opening_time, cash_closed_date, cash_closed_time }) => (
                    <header>
                        INFORMAÇÕES DE FECHAMENTO DO CAIXA <br />
                        <hr className="separation-line"/>
                        <br />
                        CAIXA: {login}<br />
                        Data Abert/Fecham: {cash_opening_date} à {cash_closed_date}<br />
                        Hora Abert/Fecham: {cash_opening_time} às {cash_closed_time}<br />
                        Valor de Abertura: 0,00<br />
                        Valor de Fecham..: {adjustValue((parseFloat(closingValue.consumoTotal) + parseFloat(closingValue.diariaTotal)) - parseFloat(closingValue.descontoTotal))}<br />
                    </header>
                ))}
                <hr className="separation-line"/>
                <main>
                    <table id="entries">
                        <thead>
                            <tr>
                                <th>Ap</th>
                                <th>Hr.Ent</th>
                                <th>Hr.Sai</th>
                                <th>Placa</th>
                                <th>Valor</th>
                            </tr>
                        </thead>
                        <tbody>
                            {entries.map(({ id, number, time, exit_time, license_plate, daily_value, consumption }) => (
                                <tr key={id}>
                                    <td>{number}</td>
                                    <td>{time}</td>
                                    <td>{exit_time}</td>
                                    <td>{license_plate.toUpperCase()}</td>
                                    <td>{adjustValue(parseFloat(daily_value) + parseFloat(consumption))}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                            <hr className="separation-line"/><br />
                    <span id="total-entries">{entries.length}</span><span>T.Cons: {adjustValue(closingValue.consumoTotal)} </span><span>T.Serv: {adjustValue(closingValue.diariaTotal)}</span><span>{adjustValue(parseFloat(closingValue.consumoTotal) + parseFloat(closingValue.diariaTotal))}</span>
                    <br />
                    <br />
                        <hr className="separation-line"/><br />
                            PRODUTOS CONSUMIDOS <br />
                        <hr className="separation-line"/><br />
                    <table id="products">
                        <tbody>
                            {products.map(({ name, quantity }, id) => (
                                <tr key={id}>
                                    <td>{name} -</td>
                                    <td>{quantity}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <br />
                        <hr className="separation-line"/><br />
                            VALES <br />
                        <hr className="separation-line"/><br />
                    <table id="tickets">
                        <thead>
                            <tr>
                                <th />
                                <th />
                                <th />
                            </tr>
                        </thead>
                        <tbody>

                            {closingTicket.map(({ date, reason, value }, id) => (
                                <tr key={id}>
                                    <td>{date}</td>
                                    <td>{reason}</td>
                                    <td>{adjustValue(value)}</td>
                                </tr>
                            ))}

                        </tbody>
                    </table>
                    <hr className="separation-line"/><br />
                    Total <span>{adjustValue(closingTotalTicket)}</span>
                    <br />
                    <br />
                </main>
                <footer>
                    Resumo de Recebimentos<br />
                    <hr className="separation-line"/><br />
                    <table id="accounting">
                        <thead>
                            <tr>
                                <th />
                                <th>Informado</th>
                                <th>Sistema</th>
                                <th>Dif.</th>
                            </tr>
                        </thead>
                        <tbody>

                            <tr>
                                <td>Cartão........:</td>
                                <td>{adjustValue(registerCard)}</td>
                                <td>{adjustValue(card)}</td>
                                <td />
                            </tr>

                            <tr>
                                <td>Dinheiro......:</td>
                                <td>{adjustValue(parseFloat(registerMoney))}</td>

                                {!closingTotalTicket ?
                                    <td>{adjustValue(parseFloat(money))}</td>
                                    :
                                    <td>{adjustValue(parseFloat(money) - parseFloat(closingTotalTicket))}</td>
                                }

                                <td>{adjustValue(parseFloat(money) - parseFloat(registerMoney))}</td>
                            </tr>

                            <tr>
                                <td>Descontos........:</td>
                                <td>{adjustValue(closingValue.descontoTotal)}</td>
                                <td />
                            </tr>

                            <tr>
                                <td>Vales.........:</td>
                                <td>{adjustValue(closingTotalTicket)}</td>
                                <td />
                            </tr>
                        </tbody>
                    </table>
                    <hr className="separation-line"/><br />
                    <span>Total dinheiro:</span> {adjustValue(parseFloat(money))}<br />
                    <span>TOTAL GERAL...:</span> {adjustValue(parseFloat(money) + parseFloat(card))}<br />
                    <br />
                        ATENÇAO: Diferença de Caixa de: {adjustValue(parseFloat(money) - parseFloat(registerMoney))}
                </footer>
            </div>
        </div>
    </Modal>
);

export default ClosuresViewModal;
