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


export default function ModifyUsers() {
    const [hasError, setHasError] = useState(false);
    const [users, setUsers] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [open, setOpen] = useState(false);

    function handleSearch() {
        let td; let i; let txtValue;

        const input = document.getElementById('modify-user-input');
        const filter = input.value.toUpperCase();
        const table = document.getElementById('modify-user-table');
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
                                    <GoBack to="/registers" title="Modificar usuários" />
                                </div>
                                <div className="search-wrapper">
                                    <FaSearch size={30} color="#122" />
                                    <input
                                        type="text"
                                        id="modify-user-input"
                                        onKeyUp={() => handleSearch()}
                                        placeholder="Pesquise o usuário desejado..."
                                        required
                                    />
                                </div>
                            </header>
                            <table id="modify-user-table">
                                <thead>
                                    <tr className="header">
                                        <th>Usuário</th>
                                        <th>Alterar senha</th>
                                        <th />
                                    </tr>
                                </thead>
                                <tbody>
                                    {/* {
                                        users === 0 ?
                                            <p className="no-data">
                                                Não há usuários.
                                            </p>
                                            :
                                            users.map(({ id, number }) => {
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
                                        <td>Gabriel Toledo</td>
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
                                        <td>Raissa Toledo</td>
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
                                    <h2>Carregando usuários...</h2>
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
                    <h2>Alteração de senha</h2>
                    <label htmlFor="login">
                        Login
                        <input
                            name="login"
                            required
                            disabled
                        />
                    </label>

                    <label htmlFor="password">
                        Nova senha
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
