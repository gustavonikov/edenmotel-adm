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

export default function ModifyAdmins() {
    const [hasError, setHasError] = useState(false);
    const [admin, setAdmin] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [open, setOpen] = useState(false);

    function handleSearch() {
        let td; let i; let txtValue;

        const input = document.getElementById('modify-admin-input');
        const filter = input.value.toUpperCase();
        const table = document.getElementById('modify-admin-table');
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
                                    <GoBack to="/registers" title="Modificar administradores" />
                                </div>
                                <div className="search-wrapper">
                                    <FaSearch size={30} color="#122" />
                                    <input
                                        type="text"
                                        id="modify-admin-input"
                                        onKeyUp={() => handleSearch()}
                                        placeholder="Pesquise o administrador desejado..."
                                        required
                                    />
                                </div>
                            </header>
                            <table id="modify-admin-table">
                                <thead>
                                    <tr className="header">
                                        <th>Administrador</th>
                                        <th>E-mail</th>
                                        <th>Alterar dados</th>
                                        <th />
                                    </tr>
                                </thead>
                                <tbody>
                                    {/* {
                                        admins === 0 ?
                                            <p className="no-data">
                                                Não há administradores.
                                            </p>
                                            :
                                            admins.map(({ id, number }) => {
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
                                        <td>Matheus Costa</td>
                                        <td>matheuscosta@example.com</td>
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
                                        <td>Gustavo Chaves</td>
                                        <td>gustavochaves@example.com</td>
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
                                    <h2>Carregando administradores...</h2>
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
                        Login
                        <input
                            name="login"
                            required
                            disabled
                        />
                    </label>

                    <label htmlFor="e-mail">
                        E-mail
                        <input
                            name="e-mail"
                            type="email"
                            required
                        />
                    </label>

                    <label htmlFor="password">
                        Senha
                        <input
                            name="password"
                            type="password"
                            minLength="4"
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
