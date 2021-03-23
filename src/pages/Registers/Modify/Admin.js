import { useEffect, useState } from 'react';
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
import api from '../../../services/api';
import { confirmAlert, errorAlert, successAlert } from '../../../utils/Alerts';

export default function ModifyAdmins() {
    const [admins, setAdmins] = useState([]);
    const [id, setId] = useState('');
    const [login, setLogin] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [open, setOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [hasError, setHasError] = useState(false);

    useEffect(() => {
        api.get('/admins')
        .then((res) => {
            setAdmins(res.data);
            setIsLoading(false);
        })
        .catch((error) => {
            setHasError(true);
            setIsLoading(false);
            console.log(error)
        });
    }, [])

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

    function closeModal() {
        setOpen(false);
    }

    function updateAdmin(ev) {
        ev.preventDefault();
        const admin = {
            id,
            login,
            email,
            password
        };

        api.put(`/admins/${id}/${login}/${email}/${password}`)
        .then(() => {
            successAlert('Admin alterado com sucesso!');
            setAdmins(admins.map((adm) => {
                if (adm.login === admin.login) {
                    return {
                        ...adm, 
                        ...admin
                    }
                }
                return adm;
            }));
            
            closeModal();
        })
        .catch((error) => {
            errorAlert('Não foi possível alterar os dados!');
            console.log(error);
            closeModal();
        });
    }

    function deleteAdmin(adminId, login) {
        confirmAlert(`Deseja realmente excluir "${login}"?`, 'Essa ação não poderá ser revertida.')
        .then((yes) => {
            if (yes) {
                api.delete(`/admins/${adminId}`)
                .then(() => {
                    setAdmins(admins.filter(({ id }) => adminId !== id));
                }).catch((error) => {
                    errorAlert('Não foi possível deletar o admin!');
                    console.log(error);
                });
            }
        });
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
                                    {
                                        admins === 0 ?
                                            <p className="no-data">
                                                Não há administradores.
                                            </p>
                                            :
                                            admins.map(({ id, login, email, password }) => {
                                                return (
                                                    <tr key={id}>
                                                        <td>{login}</td>
                                                        <td>{email}</td>
                                                        <td>
                                                            <FiEdit
                                                                size={30}
                                                                className="icon edit-icon"
                                                                onClick={() => {
                                                                    setId(id);
                                                                    setLogin(login);
                                                                    setEmail(email);
                                                                    setPassword(password);

                                                                    setOpen(true);
                                                                }}
                                                            />
                                                        </td>
                                                        <td>
                                                            <MdDelete
                                                                className="icon delete-icon"
                                                                size={30}
                                                                onClick={() => deleteAdmin(id, login)}
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
                onClose={closeModal}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
            >
                <form onSubmit={(ev) => updateAdmin(ev)}>
                    <h2>Alteração de dados</h2>
                    <label htmlFor="login">
                        Login
                        <input
                            name="login"
                            value={login}
                            disabled
                            required
                        />
                    </label>

                    <label htmlFor="e-mail">
                        E-mail
                        <input
                            name="e-mail"
                            type="email"
                            value={email}
                            onChange={({ target }) => setEmail(target.value)}
                            required
                        />
                    </label>

                    <label htmlFor="password">
                        Senha
                        <input
                            name="password"
                            type="password"
                            minLength="4"
                            value={password}
                            onChange={({ target }) => setPassword(target.value)}
                            required
                        />
                    </label>

                    <div className="button-container">
                        <button type="button" onClick={closeModal}>
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
