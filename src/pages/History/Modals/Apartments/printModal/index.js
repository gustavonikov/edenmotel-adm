import { Modal } from "@material-ui/core";

import './styles.css';

const ApartmentsPrintModal = ({ openPrintModal, handlePrintModal, printData, consumption }) => (
    <Modal
        id="apartments-print-modal"
        open={openPrintModal}
        aria-labelledby="printer"
        onRendered={handlePrintModal}
    >
        <div className="modal-container">
            <header>
                EDEN MOTEL LTDA <br />
            Apartamento: {printData.number}<br />
            Horario de Entrada..: {printData.time} - {printData.date}<br />
            Horario de Saida....: {printData.payment_moment} - {printData.payment_date}<br />
            Horas extras........: {printData.lenght_of_stay}<br />
            </header>
        ----------------------------------------
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
            ----------------------------------------<br />
            Total à pagar<br />
                <span>Consumo total.......: {Intl.NumberFormat({ style: 'currency', currency: 'BRL' }, { minimumFractionDigits: 2 },).format(Number(printData.totalPrice))}</span>
                <br />
                <span>Valor do Apartamento: {Intl.NumberFormat({ style: 'currency', currency: 'BRL' }, { minimumFractionDigits: 2 },).format(Number(printData.daily_value))}</span>
                <br />
                <br />
                {
                    !printData.discount ?
                        <span> Valor da conta......: {Intl.NumberFormat({ style: 'currency', currency: 'BRL' }, { minimumFractionDigits: 2 },).format(Number(printData.daily_value) + Number(printData.totalPrice))}</span>
                        :
                        <>
                            <span> Valor do desconto...: {Intl.NumberFormat({ style: 'currency', currency: 'BRL' }, { minimumFractionDigits: 2 },).format(printData.discount)}</span>
                            <br />
                            <span> Valor da conta......: {
                                Intl.NumberFormat({ style: 'currency', currency: 'BRL' }, { minimumFractionDigits: 2 },).format((Number(printData.daily_value) + Number(printData.totalPrice)) - printData.discount)
                            }</span>
                        </>
                }
                <br />
            </main>

            <footer>
                OBRIGADO PELA PREFERENCIA, VOLTE SEMPRE!
        </footer>
        </div>
    </Modal>
);

export default ApartmentsPrintModal;
