import { useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';
import { FiEdit } from 'react-icons/fi';
import { Modal } from '@material-ui/core';

import ErrorMessage from '../../../components/ErrorMessage';
import SimpleLoader from '../../../components/SimpleLoader';
import GoBack from "../../../components/GoBackHeader";
import RegistersFeaturesPage from "../FeaturesPage";

import './styles/main.css';
import './styles/modal.css';

export default function ModifyApartments() {
    const [hasError, setHasError] = useState(false);
    const [apartments, setApartments] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [open, setOpen] = useState(false);

    function handleSearch() {
        let td; let i; let txtValue;

        const input = document.getElementById('modify-apartment-input');
        const filter = input.value;
        const table = document.getElementById('modify-apartment-table');
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

    function handleOpenModal() {
        setOpen(true);
    }

    function handleCloseModal() {
        setOpen(false);
    }

    return (
        <RegistersFeaturesPage>
            {
                hasError ?
                    <ErrorMessage />
                    :
                    (
                        <div className="registers-modify-container">
                            <header>
                                <div className="go-back-wrapper">
                                    <GoBack to="/registers" title="Modificar apartamentos" />
                                </div>
                                <div className="search-wrapper">
                                    <FaSearch size={30} color="#122" />
                                    <input
                                        type="text"
                                        id="modify-apartment-input"
                                        onKeyUp={() => handleSearch()}
                                        placeholder="Pesquise o apartamento desejado..."
                                        required
                                    />
                                </div>
                            </header>
                            <table id="modify-apartment-table">
                                <thead>
                                    <tr className="header">
                                        <th>Apartamento</th>
                                        <th>Status</th>
                                        <th>Tipo</th>
                                        <th>Preço</th>
                                        <th>Pernoite</th>
                                        <th>Hora extra</th>
                                        <th>Alterar dados</th>
                                        <th />
                                    </tr>
                                </thead>
                                <tbody>
                                    {/* {
                                        apartments === 0 ?
                                            <p className="no-data">
                                                Não há apartamentos.
                                            </p>
                                            :
                                            apartments.map(({ id, number }) => {
                                                return (
                                                    <tr key={id}>
                                                        <td>{number}</td>
                                                        <td>
                                                            <FiEdit
                                                                size={30}
                                                                className="icon edit-icon"
                                                                onClick={handleOpenModal}
                                                            />
                                                        </td>
                                                        <td>
                                                            <MdDelete
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
                                        <td>101</td>
                                        <td className="occupied">Ocupado</td>
                                        <td>Doce Pecado</td>
                                        <td>55,00</td>
                                        <td>45,00</td>
                                        <td>35,00</td>
                                        <td>
                                            <FiEdit
                                                className="icon edit-icon"
                                                size={30}
                                                onClick={handleOpenModal}
                                            />
                                        </td>
                                        <td>
                                            <MdDelete
                                                className="icon delete-icon"
                                                size={30}
                                            />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>102</td>
                                        <td className="available">Livre</td>
                                        <td>Paraíso</td>
                                        <td>45,00</td>
                                        <td>35,00</td>
                                        <td>25,00</td>
                                        <td>
                                            <FiEdit
                                                className="icon edit-icon"
                                                size={30}
                                                onClick={handleOpenModal}
                                            />
                                        </td>
                                        <td>
                                            <MdDelete
                                                className="icon delete-icon"
                                                size={30}
                                            />
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                            {
                                isLoading &&
                                <div className="loading">
                                    <h2>Carregando apartamentos...</h2>
                                    <SimpleLoader />
                                </div>
                            }
                        </div>
                        
                    )
            }
            <Modal
                className="modify-features-modal"
                open={open}
                onClose={handleCloseModal}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
            >
                <form>
                    <h2>Alteração de dados</h2>
                    <label htmlFor="login">
                        Número
                    <input
                        name="number"
                        required
                        disabled
                        value="101"
                    />
                    </label>

                    <select name="type" required>
                        <option value="" disabled selected hidden>Selecione o tipo</option>
                        <option value="PARAISO">Paraíso</option>
                        <option value="DOCE_PECADO">Doce Pecado</option>
                    </select>

                    <label htmlFor="password">
                        Preço do apartamento
                    <input
                        name="price"
                        required
                    />
                    </label>

                    <label htmlFor="password">
                        Preço do pernoite
                    <input
                        name="overnight"
                        required
                        />
                    </label>

                    <label htmlFor="password">
                        Preço da hora extra
                    <input
                        name="extraHour"
                        required
                        />
                    </label>

                    <div className="button-container">
                        <button type="button" onClick={handleCloseModal}>
                            Cancelar
                        </button>
                        <button type="submit">
                            Confirmar
                        </button>
                    </div>
                </form>
            </Modal>
        </RegistersFeaturesPage>
    )
}
