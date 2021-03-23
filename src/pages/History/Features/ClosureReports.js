import React, { useEffect, useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import { RiPrinterFill } from 'react-icons/ri';
import { AiFillEye } from 'react-icons/ai';

import HistoryContainer from '../HistoryContainer';
import PrintModal from '../Modals/Closures/printModal';
import ViewModal from '../Modals/Closures/viewModal';
import ErrorMessage from '../../../components/ErrorMessage';
import SimpleLoader from '../../../components/SimpleLoader';
import { errorAlert } from '../../../utils/Alerts';

import api from '../../../services/api';

import './styles.css';
import GoBack from '../../../components/GoBackHeader';

export default function ClosureReportsHistory() {
    const [cashiersHistory, setCashiersHistory] = useState([]);
    const [initialDate, setInitialDate] = useState([]);
    const [finalDate, setFinalDate] = useState([]);
    const [openPrintModal, setOpenPrintModal] = useState(false);
    const [openViewModal, setOpenViewModal] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [hasError, setHasError] = useState(false);

    const [header, setHeader] = useState([]);
    const [closingValue, setClosingValue] = useState([]);
    const [closingTicket, setClosingTicket] = useState([]);
    const [closingTotalTicket, setClosingTotalTicket] = useState([]);
    const [entries, setEntries] = useState([]);
    const [products, setProducts] = useState([]);
    const [money, setMoney] = useState([]);
    const [card, setCard] = useState([]);
    const [registerMoney, setRegisterMoney] = useState('');
    const [registerCard, setRegisterCard] = useState('');

    useEffect(() => {
        api.get('/admin-history-cashiers-today')
            .then((res) => {
                setIsLoading(false);
                setCashiersHistory(res.data);
            })
            .catch((error) => {
                console.log(error);
                setIsLoading(false);
                setHasError(false);
            });
    }, []);

    function handleOpenPrint(cashierId, closureDate) {
        Promise.all([
            api.get(`/header-cashier/${cashierId}`), 
            api.get(`/total-consumption/${cashierId}`),
            api.get(`/entry-cashier/${cashierId}`),
            api.get(`/products-cashier/${cashierId}`),
            api.get(`/vales-cashier/${cashierId}`),
            api.get(`/total-vales-cashier/${cashierId}`),
            api.get(`/total-money/${cashierId}`),
            api.get(`/total-card/${cashierId}`),
            api.get(`/informed/${cashierId}/${closureDate}`)
        ])
        .then((res) => {
            setHeader(res[0].data);
            setClosingValue(res[1].data[0]);
            setEntries(res[2].data);
            setProducts(res[3].data);
            setClosingTicket(res[4].data);
            setClosingTotalTicket(res[5].data);
            setMoney(res[6].data);
            setCard(res[7].data);
            setRegisterMoney(res[8].data[0].money);
            setRegisterCard(res[8].data[0].card);

            setOpenPrintModal(true);
        })
        .catch((error) => {
            errorAlert('Não foi possível obter a impressão');

            console.log(error);
        });
    }

    function handleOpenView(cashierId, closureDate) {
        Promise.all([
            api.get(`/header-cashier/${cashierId}`), 
            api.get(`/total-consumption/${cashierId}`),
            api.get(`/entry-cashier/${cashierId}`),
            api.get(`/products-cashier/${cashierId}`),
            api.get(`/vales-cashier/${cashierId}`),
            api.get(`/total-vales-cashier/${cashierId}`),
            api.get(`/total-money/${cashierId}`),
            api.get(`/total-card/${cashierId}`),
            api.get(`/informed/${cashierId}/${closureDate}`)
        ])
        .then((res) => {
            setHeader(res[0].data);
            setClosingValue(res[1].data[0]);
            setEntries(res[2].data);
            setProducts(res[3].data);
            setClosingTicket(res[4].data);
            setClosingTotalTicket(res[5].data);
            setMoney(res[6].data);
            setCard(res[7].data);
            setRegisterMoney(res[8].data[0].money);
            setRegisterCard(res[8].data[0].card);
            
            setOpenViewModal(true);
        })
         .catch((error) => {
            errorAlert('Não foi possível obter o histórico');
            
            console.log(error);
        });
    }

    function handlePrintModal() {
        window.print();

        setOpenPrintModal(false);
    }

    function closeViewModal() {
        setOpenViewModal(false);
    }

    function getClosuresHistory() {
        setIsLoading(true);

        api.post('/admin-history-cashiers', {
            initialDate,
            finalDate,
        }).then((res) => {
            setIsLoading(false);
            setCashiersHistory(res.data);
        })
        .catch((error) => {
            console.log(error);
            setIsLoading(false);
            setHasError(false);
        });
    }

    function handleSearch() {
        let td; let i; let txtValue;

        const input = document.getElementById('report-history-input');
        const filter = input.value.toUpperCase();
        const table = document.getElementById('report-history-table');
        const tr = table.getElementsByTagName('tr');

        for (i = 0; i < tr.length; i += 1) {
            [td = 0] = tr[i].getElementsByTagName('td');

            if (td) {
                txtValue = td.textContent || td.innerText;
                if (txtValue.toUpperCase().indexOf(filter) > -1) {
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
                    <div className="history-features-container">
                        <div className="filter-wrapper">
                            <GoBack to="/history" />
                            <div className="filter-inputs">
                                <label htmlFor="initial-date">
                                    Data inicial
                                    <input type="date" name="initial-date" value={initialDate} onChange={({ target }) => setInitialDate(target.value)} />
                                </label>
                                <label htmlFor="end-date">
                                    Data final
                                    <input type="date" name="end-date" value={finalDate} onChange={({ target }) => setFinalDate(target.value)} />
                                </label>
                                <button type="button" onClick={getClosuresHistory}>
                                    Buscar
                                </button>
                            </div>
                        </div>
                        <header>
                            <div className="search-wrapper">
                                <FaSearch size={30} color="#122" />
                                <input
                                    type="text"
                                    id="report-history-input"
                                    onKeyUp={() => handleSearch()}
                                    placeholder="Pesquise o caixa desejado..."
                                />
                            </div>
                        </header>
                        <table id="report-history-table">
                            <thead>
                                <tr className="header">
                                    <th>Nome do caixa</th>
                                    <th>Data de fechamento</th>
                                    <th>Horário de fechamento</th>
                                    <th>Visualizar</th>
                                    {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
                                    <th />
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    cashiersHistory === 0 ?
                                        <p className="no-history">
                                            Não há nenhum fechamento para este dia.
                                    </p>
                                        :
                                        cashiersHistory.map(({ id, login, cash_closed_date, cash_closed_time }) => {
                                            return (
                                                <tr key={id}>
                                                    <td>{login}</td>
                                                    <td>{cash_closed_date}</td>
                                                    <td>{cash_closed_time}</td>
                                                    <td>
                                                        <AiFillEye 
                                                            className="print-icon" 
                                                            size={30} 
                                                            onClick={() => handleOpenView(id, cash_closed_date)}
                                                        />
                                                    </td>
                                                    <td>
                                                        <RiPrinterFill
                                                            className="print-icon"
                                                            size={30}
                                                            onClick={() => handleOpenPrint(id, cash_closed_date)}
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
            {
                openViewModal &&
                <ViewModal
                    openViewModal={openViewModal}
                    onClose={closeViewModal}
                    header={header}
                    closingValue={closingValue}
                    entries={entries}
                    products={products}
                    closingTicket={closingTicket}
                    closingTotalTicket={closingTotalTicket}
                    registerCard={registerCard}
                    card={card}
                    registerMoney={registerMoney}
                    money={money}
                />
            }
            {
                openPrintModal &&
                <PrintModal
                    openPrintModal={openPrintModal}
                    handlePrintModal={handlePrintModal}
                    header={header}
                    closingValue={closingValue}
                    entries={entries}
                    products={products}
                    closingTicket={closingTicket}
                    closingTotalTicket={closingTotalTicket}
                    registerCard={registerCard}
                    card={card}
                    registerMoney={registerMoney}
                    money={money}
                />
           }
        </HistoryContainer>
    );
}