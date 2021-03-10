import React, { useEffect, useState } from 'react';
import { Modal } from '@material-ui/core';
import { FaSearch } from 'react-icons/fa';
import { RiPrinterFill } from 'react-icons/ri';
import { AiFillEye } from 'react-icons/ai';

import GoBack from '../../../components/GoBackHeader';
import SimpleLoader from '../../../components/SimpleLoader';

import api from '../../../services/api';

import './styles.css';
import ErrorMessage from '../../../components/ErrorMessage';
import { errorAlert } from '../../../utils/Alerts';
import HistoryContainer from '../HistoryContainer';

export default function ApartmentsHistory() {
    const [entriesHistory, setEntriesHistory] = useState([]);
    const [consumption, setConsumption] = useState([]);
    const [printData, setPrintData] = useState({});
    const [open, setOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [hasError, setHasError] = useState(false);

    const id = localStorage.getItem('cashierId');

    useEffect(() => {
        api.get('/history') 
            .then((res) => {
                setIsLoading(false);
                setEntriesHistory(res.data);
            })
            .catch((error) => {
                console.log(error)
                setIsLoading(false);
                setHasError(true);
        });
    }, [id]);

    function handleOpenPrint(apt_id) {
        const apt_history = entriesHistory.find(({ id }) => id === apt_id);
        setPrintData(apt_history);
        
        api.get(`/consumption-history/${id}/${apt_id}`)
        .then((res) => {
            setConsumption(res.data);
            setOpen(true);
        })
        .catch((error) => {
            errorAlert('Não foi possível obter o histórico');

            console.log(error);
        });
    }

    function handlePrintModal() {
        window.print();

        setOpen(false);
    };

    function handleSearch() {
        let td; let i; let txtValue;

        const input = document.getElementById('apartments-history-input');
        const filter = input.value;
        const table = document.getElementById('apartments-history-table');
        const tr = table.getElementsByTagName('tr');

        for (i = 0; i < tr.length; i += 1) {
            [td = 0] = tr[i].getElementsByTagName('td');

            if (td) {
                txtValue = td.textContent || td.innerText;
                if (txtValue.indexOf(filter) > -1) {
                    tr[i].style.display = '';
                } else {
                    tr[i].style.display = 'none';
                }
            }
        }
    }

    return (
        <HistoryContainer>
            {
                hasError ?
                    <ErrorMessage />
                    :
                    <div className="history-container">
                        <div className="filter-wrapper">
                            <GoBack to="/history" />
                            <div className="filter-inputs">
                                <label htmlFor="initial-date">
                                    Data inicial
                                    <input type="date" name="initial-date" />
                                </label>
                                <label htmlFor="end-date">
                                    Data final
                                    <input type="date" name="end-date" />
                                </label>
                                <button type="button">
                                    Buscar
                                </button>
                            </div>
                        </div>
                        <header>
                            <div className="search-wrapper">
                                <FaSearch size={30} color="#122" />
                                <input
                                    type="text"
                                    id="apartments-history-input"
                                    onKeyUp={() => handleSearch()}
                                    placeholder="Pesquise o apartamento..."
                                />
                            </div>
                        </header>
                        <table id="apartments-history-table">
                            <thead>
                                <tr className="header">
                                    <th>Apartamento</th>
                                    <th>Data de saída</th>
                                    <th>Horário de saída</th>
                                    <th>Visualizar</th>
                                    {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
                                    <th />
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    entriesHistory === 0 ?
                                    <p className="no-history">
                                        Ainda não há nenhum apartamento.
                                    </p>
                                    :
                                    entriesHistory.map(({ id, number, payment_date, payment_moment }) => {
                                        return (
                                            <tr key={id}>
                                                <td>{number}</td>
                                                <td>{payment_date}</td>
                                                <td>{payment_moment}</td>
                                                <td><AiFillEye className="print-icon" size={30} /></td>
                                                <td>
                                                    <RiPrinterFill
                                                        className="print-icon"
                                                        size={30}
                                                        onClick={() => handleOpenPrint(id)}
                                                    />
                                                </td>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </table>
                        {
                            isLoading && 
                                <div className="loading">
                                    <h2>Carregando histórico...</h2>
                                    <SimpleLoader />
                                </div>
                        }
                    </div>
            }
            
            <Modal
                id="print-modal"
                open={open}
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
                    --------------------------------------
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
                        --------------------------------------<br />
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
        </HistoryContainer>
    );
}
