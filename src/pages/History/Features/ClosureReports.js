import React, { useEffect, useState } from 'react';
import { Modal } from '@material-ui/core';
import { FaSearch } from 'react-icons/fa';
import { RiPrinterFill } from 'react-icons/ri';
import { AiFillEye } from 'react-icons/ai';

import HistoryContainer from '../HistoryContainer';

import ErrorMessage from '../../../components/ErrorMessage';
import { errorAlert } from '../../../utils/Alerts';
import SimpleLoader from '../../../components/SimpleLoader';

import api from '../../../services/api';

import './styles.css';
import GoBack from '../../../components/GoBackHeader';

export default function ClosureReportsHistory() {
    const [open, setOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [hasError, setHasError] = useState(false);


    function handlePrintModal() {
        window.print();

        setOpen(false);
    };

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
                                    <th>Data de saída</th>
                                    <th>Horário de saída</th>
                                    <th>Visualizar</th>
                                    {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
                                    <th />
                                </tr>
                            </thead>
                            <tbody>
                                {/* {
                                    entriesHistory === 0 ?
                                    <p className="no-history">
                                        Não há nenhum fechamento para este dia.
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
                                } */}
                                <tr>
                                    <td>Gabriel Toledo</td>
                                    <td>06/03/2021</td>
                                    <td>07:33</td>
                                    <td><AiFillEye className="print-icon" size={30} /></td>
                                    <td>
                                        <RiPrinterFill
                                            className="print-icon"
                                            size={30}
                                        />
                                    </td>
                                </tr>
                                <tr>
                                    <td>Raissa Toledo</td>
                                    <td>06/03/2021</td>
                                    <td>07:33</td>
                                    <td><AiFillEye className="print-icon" size={30} /></td>
                                    <td>
                                        <RiPrinterFill
                                            className="print-icon"
                                            size={30}
                                        />
                                    </td>
                                </tr>
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
        </HistoryContainer>
    );
}