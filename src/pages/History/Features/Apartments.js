import React, { useEffect, useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import { RiPrinterFill } from 'react-icons/ri';
import { AiFillEye } from 'react-icons/ai';

import HistoryContainer from '../HistoryContainer';
import GoBack from '../../../components/GoBackHeader';
import SimpleLoader from '../../../components/SimpleLoader';
import PrintModal from '../Modals/Apartments/printModal';
import ViewModal from '../Modals/Apartments/viewModal';

import api from '../../../services/api';
import ErrorMessage from '../../../components/ErrorMessage';
import { errorAlert } from '../../../utils/Alerts';

import './styles.css';

export default function ApartmentsHistory() {
    const [entriesHistory, setEntriesHistory] = useState([]);
    const [consumption, setConsumption] = useState([]);
    const [printData, setPrintData] = useState({});
    const [initialDate, setInitialDate] = useState([]);
    const [finalDate, setFinalDate] = useState([]);
    const [openPrintModal, setOpenPrintModal] = useState(false);
    const [openViewModal, setOpenViewModal] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [hasError, setHasError] = useState(false);

    useEffect(() => {
        api.get('/admin-history-entries-today') 
            .then((res) => {
                setIsLoading(false);
                setEntriesHistory(res.data);
            })
            .catch((error) => {
                console.log(error);
                setIsLoading(false);
                setHasError(true);
            });
    }, []);

    function handleOpenView(apt_id) {
        const apt_history = entriesHistory.find(({ id }) => id === apt_id);
        console.log(apt_history);
        const cashierId = apt_history.cashier_id;
        setPrintData(apt_history);
 
        api.get(`/consumption-history/${cashierId}/${apt_id}`)
        .then((res) => {
            setConsumption(res.data);
            setOpenViewModal(true);
        })
        .catch((error) => {
            errorAlert('Não foi possível obter o histórico');

            console.log(error);
        });
    }

    function handleOpenPrint(apt_id) {
        const apt_history = entriesHistory.find(({ id }) => id === apt_id);
        const cashierId = apt_history.cashier_id;
        setPrintData(apt_history);
        
        api.get(`/consumption-history/${cashierId}/${apt_id}`)
        .then((res) => {
            setConsumption(res.data);
            setOpenPrintModal(true);
        })
        .catch((error) => {
            errorAlert('Não foi possível obter a impressão');
            
            console.log(error);
        });
    }

    function handlePrintModal() {
        window.print();

        setOpenPrintModal(false);
    };

    function closeViewModal(){
        setOpenViewModal(false);
    }

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

    function getApartmentsHistory() {
        api.post('/admin-history-entries', {
            initialDate,
            finalDate,
        })
        .then((res) => {
            setIsLoading(true);
            setEntriesHistory(res.data);
        })
        .catch((error) => {
            console.log(error);
            setIsLoading(false);
            setHasError(true);
        });
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
                                    <input 
                                        type="date" 
                                        name="initial-date" 
                                        value={initialDate} 
                                        onChange={({ target }) => setInitialDate(target.value)} 
                                    />
                                </label>
                                <label htmlFor="end-date">
                                    Data final
                                    <input 
                                        type="date" 
                                        name="final-date" 
                                        value={finalDate} 
                                        onChange={({ target }) => setFinalDate(target.value)} 
                                    />
                                </label>
                                <button onClick={getApartmentsHistory} type="button">
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
                                    <tr className="no-history">
                                        Ainda não há nenhum apartamento.
                                    </tr>
                                    :
                                    entriesHistory.map(({ id, number, payment_date, payment_moment }) => {
                                        return (
                                            <tr key={id}>
                                                <td>{number}</td>
                                                <td>{payment_date}</td>
                                                <td>{payment_moment}</td>
                                                <td>
                                                    <AiFillEye 
                                                        className="print-icon" 
                                                        size={30} 
                                                        onClick={() => handleOpenView(id)}
                                                    />
                                                </td>
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
            {
                openViewModal &&
                    <ViewModal 
                        openViewModal={openViewModal}
                        printData={printData}
                        consumption={consumption}
                        onClose={closeViewModal}
                    />
           }
           {
                openPrintModal &&
                    <PrintModal 
                        openPrintModal={openPrintModal}
                        handlePrintModal={handlePrintModal}
                        printData={printData}
                        consumption={consumption}
                    />
           }
        </HistoryContainer>
    );
}
