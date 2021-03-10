import { useEffect, useState } from 'react';
import { FaSearch } from 'react-icons/fa';

import SideBar from '../../../components/SideBar';
import SimpleLoader from '../../../components/SimpleLoader';
import ErrorMessage from '../../../components/ErrorMessage';
import GoBack from '../../../components/GoBackHeader';

import api from '../../../services/api';

import './styles.css';

export default function ConsumptionTable() {
    const asideActiveBars = {
        dashboard: true,
        products: false,
        history: false,
        registers: false,
        report: false,
    };

    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [hasError, setHasError] = useState(false);

    function handleSearch() {
        let td; let i; let txtValue;

        const input = document.getElementById('consumption-input');
        const filter = input.value.toUpperCase();
        const table = document.getElementById('consumption-table');
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
        <div id="consumption-table-page">
            <SideBar barsState={asideActiveBars} />
            {
                hasError ?
                    <ErrorMessage />
                    :
                    <div className="consumption-table-container">
                        <header>
                            <GoBack to="/dashboard" />
                            <div className="input-wrapper">
                                <FaSearch size={30} color="#122" />
                                <input
                                    type="text"
                                    id="consumption-input"
                                    onKeyUp={() => handleSearch()}
                                    placeholder="Pesquise o produto..."
                                    required
                                />
                            </div>
                        </header>
                        <table id="consumption-table">
                            <thead>
                                <tr className="header">
                                    <th>Nome do produto</th>
                                    <th>Quantidade consumida (unidades)</th>
                                    <th>Valor arrecadado (R$)</th>
                                    {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
                                    <th />
                                </tr>
                            </thead>
                            {
                                /* !isLoading && products.length === 0 ?
                                <p className="no-consumption">
                                    Ainda não há produtos consumidos.
                                </p>
                                : */
                                <tbody>
                                    <tr>
                                        <td>PRESERVATIVO GRATUITO</td>
                                        <td>100</td>
                                        <td>0,00</td>
                                    </tr>
                                    <tr>
                                        <td>AGUA MINERAL GRF 300ML</td>
                                        <td>50</td>
                                        <td>200,00</td>
                                    </tr>
                                    <tr>
                                        <td>PRESERVATIVO</td>
                                        <td>50</td>
                                        <td>120,00</td>
                                    </tr>
                                    <tr>
                                        <td>REFRIGERANTE LATA 300ML</td>
                                        <td>50</td>
                                        <td>225,00</td>
                                    </tr>
                                    <tr>
                                        <td>CHAMPANHE</td>
                                        <td>28</td>
                                        <td>280,00</td>
                                    </tr>
                                    <tr>
                                        <td>CHOCOLATE BARRA</td>
                                        <td>25</td>
                                        <td>112,50</td>
                                    </tr>
                                    <tr>
                                        <td>SANDUICHE</td>
                                        <td>20</td>
                                        <td>80,00</td>
                                    </tr>
                                    <tr>
                                        <td>HAMBURGUER</td>
                                        <td>18</td>
                                        <td>90,00</td>
                                    </tr>
                                    <tr>
                                        <td>BISCOITO</td>
                                        <td>15</td>
                                        <td>37,50</td>
                                    </tr>
                                    <tr>
                                        <td>CAFE</td>
                                        <td>10</td>
                                        <td>11,50</td>
                                    </tr>
                                </tbody>
                            }
                        </table>
                        {
                            isLoading && (
                                <div className="loading">
                                    <h2>Carregando produtos...</h2>
                                    <SimpleLoader />
                                </div>
                            )
                        }
                </div> 
            }
        </div>
    );
}
