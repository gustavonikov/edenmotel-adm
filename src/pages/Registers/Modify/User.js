import { useEffect, useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';
import { FiEdit } from 'react-icons/fi';
import { Modal } from '@material-ui/core';

import ErrorMessage from '../../../components/ErrorMessage';
import SimpleLoader from '../../../components/SimpleLoader';
import GoBack from "../../../components/GoBackHeader";
import RegistersFeaturesPage from "../FeaturesPage";

import { confirmAlert, errorAlert, successAlert } from '../../../utils/Alerts';

import api from '../../../services/api';

import './styles/main.css';
import './styles/modal.css';


export default function ModifyUsers() {
    const [users, setUsers] = useState([]);
    const [id, setId] = useState('');
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [hasError, setHasError] = useState(false);
    const [open, setOpen] = useState(false);

    useEffect(() => {
        api.get('/users')
        .then((res) => {
            setUsers(res.data);
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

    function updateUser(ev) {
        ev.preventDefault();

        const user = {
            id,
            login,
            password
        };

        api.put(`users/${id}/${login}/${password}`)
        .then(() => {
            successAlert('Usuário alterado com sucesso!');
            setUsers(users.map((us) => {
                if (us.login === user.login) {
                    return {
                        ...us, 
                        ...user
                    }
                }
                return us;
            }));
            closeModal();
        })
        .catch((error) => {
            errorAlert('Não foi possível alterar os dados!');
            console.log(error);
            closeModal();
        });
    }

    function deleteUser(userId) {
        confirmAlert(`Deseja realmente excluir "${login}"?`, 'Essa ação não poderá ser revertida.')
        .then((yes) => {
            if (yes) {
                api.delete(`/users/${userId}`)
                .then(() => {
                    setUsers(users.filter(({ id }) => userId !== id));
                }).catch((error) => {
                    errorAlert('Não foi possível deletar o admin!');
                    console.log(error);
                });
            }
        });
    }
    
    function closeModal() {
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
                                    {
                                        !isLoading && users === 0 ?
                                            <p className="no-data">
                                                Não há usuários.
                                            </p>
                                            :
                                            users.map(({ id, login, password }) => {
                                                return (
                                                    <tr key={id}>
                                                        <td>{login}</td>
                                                        <td>
                                                            <FiEdit
                                                                size={30}
                                                                className="icon edit-icon"
                                                                onClick={() => {
                                                                    setId(id);
                                                                    setLogin(login);
                                                                    setPassword(password);
                                                                    console.log(password);

                                                                    setOpen(true);
                                                                }}
                                                            />
                                                        </td>
                                                        <td>
                                                            <MdDelete
                                                                className="icon delete-icon"
                                                                size={30}
                                                                onClick={() => deleteUser(id)}
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
                onClose={closeModal}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
            >
                <form onSubmit={(ev) => updateUser(ev)}>
                    <h2>Alteração de senha</h2>
                    <label htmlFor="login">
                        Login
                        <input
                            name="login"
                            value={login}
                            required
                            disabled
                        />
                    </label>

                    <label htmlFor="password">
                        Nova senha
                        <input
                            name="password"
                            value={password}
                            onChange={({ target }) => setPassword(target.value)}
                            type="password"
                            minLength="4"
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
