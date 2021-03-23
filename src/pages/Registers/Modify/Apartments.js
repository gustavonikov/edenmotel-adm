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
import { adjustValue } from '../../../utils/adjustValue';

import api from '../../../services/api';

import './styles/main.css';
import './styles/modal.css';

export default function ModifyApartments() {
    const [apartments, setApartments] = useState([]);
    const [id, setId] = useState('');
    const [number, setNumber] = useState('');
    const [status, setStatus] = useState('');
    const [type, setType] = useState('');
    const [price, setPrice] = useState('');
    const [overnight, setOvernight] = useState('');
    const [extraHour, setExtraHour] = useState('');
    const [open, setOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [hasError, setHasError] = useState(false);

    useEffect(() => {
        api.get('/apartments')
        .then((res) => {
            setApartments(res.data);
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

    function closeModal() {
        setOpen(false);
    }

    function updateApartment(ev) {
        ev.preventDefault();

        const apartment = {
            id,
            number,
            type,
            price,
            status,
            overnight,
            extraHour
        };
        
        api.put(`/apartments/${number}/${type}/${price}/${overnight}/${extraHour}`)
        .then(() => {
            successAlert('Apartamento alterado com sucesso!');

            setApartments(apartments.map((apt) => {
                if (apt.id === apartment.id) {
                    return {
                        ...apt, 
                        ...apartment
                    }
                }
                return apt;
            }));
            
            closeModal();
        })
        .catch((error) => {
            errorAlert('Não foi possível alterar os dados!');
            console.log(error);

            closeModal();
        });

    }

    function deleteApartment(aptNumber) {
        confirmAlert(`Deseja realmente excluir o Apartmento "${aptNumber}"?`, 'Essa ação não poderá ser revertida.')
        .then((yes) => {
            if (yes) {
                api.delete(`/apartments/${aptNumber}`)
                .then(() => {
                    setApartments(apartments.filter(({ number }) => aptNumber !== number));
                }).catch((error) => {
                    errorAlert('Não foi possível deletar o apartamento!');
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
                                    {
                                        apartments === 0 ?
                                            <p className="no-data">
                                                Não há apartamentos.
                                            </p>
                                            :
                                            apartments.map(({ id, number, status, type, value, overnight_stay, extra_hour }) => {
                                                const typeOf = type === 'DOCE_PECADO' ? 'Doce Pecado' : 'Paraíso';
                                                const statusOf = status === 'LIVRE' ? 'Livre' : 'Ocupado';
                                                const adjustedPrice = adjustValue(value)
                                                const adjustedOvernight = adjustValue(overnight_stay)
                                                const adjustedExtraHour = adjustValue(extra_hour)

                                                return (
                                                    <tr key={id}>
                                                        <td>{number}</td>
                                                        <td className={status === 'LIVRE' ? 'available' : 'occupied'}>{statusOf}</td>
                                                        <td>{typeOf}</td>
                                                        <td>{adjustedPrice}</td>
                                                        <td>{adjustedOvernight}</td>
                                                        <td>{adjustedExtraHour}</td>
                                                        <td>
                                                            <FiEdit
                                                                size={30}
                                                                className="icon edit-icon"
                                                                onClick={() => {
                                                                    setId(id);
                                                                    setNumber(number);
                                                                    setType(type);
                                                                    setPrice(adjustedPrice);
                                                                    setOvernight(adjustedOvernight);
                                                                    setExtraHour(adjustedExtraHour);
                                                                    setStatus(status)

                                                                    setOpen(true);
                                                                }}
                                                            />
                                                        </td>
                                                        <td>
                                                            <MdDelete
                                                                className="icon delete-icon"
                                                                size={30}
                                                                onClick={() => deleteApartment(number)}
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
                onClose={closeModal}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
            >
                <form onSubmit={(ev) => updateApartment(ev)}>
                    <h2>Alteração de dados</h2>
                    <label htmlFor="login">
                        Número
                        <input
                            name="number"
                            disabled
                            value={number}
                            onChange={ ({ target }) => setNumber(target.value)}
                            required
                        />
                    </label>

                    <select name="type" defaultValue={type} required>
                        <option value="PARAISO">Paraíso</option>
                        <option value="DOCE_PECADO">Doce Pecado</option>
                    </select>

                    <label htmlFor="password">
                        Preço do apartamento
                        <input
                            name="price"
                            value={price}
                            onChange={ ({ target }) => setPrice(target.value)}
                            required
                        />
                    </label>

                    <label htmlFor="password">
                        Preço do pernoite
                        <input
                            name="overnight"
                            value={overnight}
                            onChange={ ({ target }) => setOvernight(target.value)}
                            required
                        />
                    </label>

                    <label htmlFor="password">
                        Preço da hora extra
                        <input
                            name="extraHour"
                            value={extraHour}
                            onChange={ ({ target }) => setExtraHour(target.value)}
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
