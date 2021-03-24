import { Modal } from "@material-ui/core";

import { adjustValue } from "../../../../../utils/adjustValue";

import './styles.css';

const ClosuresPrintModal = ({ openPrintModal, handlePrintModal, header, closingValue, entries, products, closingTicket, closingTotalTicket, registerCard, card, registerMoney, money }) => (
    <Modal
        id="closures-print-modal"
        open={openPrintModal}
        onRendered={handlePrintModal}
    >
        <div className="modal-container">
            {header.map(({ login, cash_opening_date, cash_opening_time, cash_closed_date, cash_closed_time }) => (
                <header>
                    INFORMAÇÕES DE FECHAMENTO DO CAIXA <br />
                    ------------------------------------------
                    <br />
                    CAIXA: {login}<br />
                    Data Abert/Fecham: {cash_opening_date} à {cash_closed_date}<br />
                    Hora Abert/Fecham: {cash_opening_time} às {cash_closed_time}<br />
                    Valor de Abertura: 0,00<br />
                    Valor de Fecham..: {adjustValue((parseFloat(closingValue.consumoTotal) + parseFloat(closingValue.diariaTotal)) - parseFloat(closingValue.descontoTotal))}<br />
                </header>
            ))}
            ------------------------------------------
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
                ------------------------------------------<br />
                <span id="total-entries">
                    {entries.length}
                </span>
                <span>
                    T.Cons: {adjustValue(closingValue.consumoTotal)} 
                </span>
                <span>
                    T.Serv: {adjustValue(closingValue.diariaTotal)}
                </span>
                <span>
                    {adjustValue(parseFloat(closingValue.consumoTotal) + parseFloat(closingValue.diariaTotal))}
                </span>
                <br />
                <br />
                    ------------------------------------------<br />
                        PRODUTOS CONSUMIDOS <br />
                    ------------------------------------------<br />
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
                    ------------------------------------------<br />
                        VALES <br />
                    ------------------------------------------<br />
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
                ------------------------------------------<br />
                Total <span>{adjustValue(closingTotalTicket)}</span>
                <br />
                <br />
            </main>
            <footer>
                Resumo de Recebimentos<br />
                ------------------------------------------<br />
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
                            <td>Descontos.....:</td>
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
                ------------------------------------------<br />
                <span>Total dinheiro:</span> {adjustValue(parseFloat(money))}<br />
                <span>TOTAL GERAL...:</span> {adjustValue(parseFloat(money) + parseFloat(card))}<br />
                <br />
                <span className="warning-accounting">
                    ATENCAO: Diferença de Caixa de: {adjustValue(parseFloat(money) - parseFloat(registerMoney))}
                </span>
            </footer>
        </div>
    </Modal>
);

export default ClosuresPrintModal;
