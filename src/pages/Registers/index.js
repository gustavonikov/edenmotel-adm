import { FaUserAlt, FaUserShield, FaHotel } from 'react-icons/fa';
import { Link } from 'react-router-dom';

import SideBar from '../../components/SideBar';

import './styles.css';

export default function Register() {
    return (
        <div id="registers-page">
            <SideBar />

            <div className="registers-page-container">
                <h2>Clique na categoria em que você deseja adicionar ou modificar:</h2>
                <ul>
                    <li>
                        <FaHotel size={68} />
                        <div>
                            <Link to="/registers/add-apartment">
                                <button className="green-button">
                                    Adicionar apartamento
                                </button>
                            </Link>
                            <Link to="/registers/modify-apartments">
                                <button className="black-button">
                                    Modificar apartamentos
                                </button>
                            </Link>
                        </div>
                    </li>
                    <li>
                        <FaUserAlt size={60} />
                        <div>
                            <Link to="/registers/add-user">
                                <button className="green-button">
                                    Adicionar usuário
                                </button>
                            </Link>
                            <Link to="/registers/modify-users">
                                <button className="black-button">
                                    Modificar usuários
                                </button>
                            </Link>
                        </div>
                    </li>
                    <li>
                        <FaUserShield size={75} />
                        <div>
                            <Link to="/registers/add-admin">
                                <button className="green-button">
                                    Adicionar admin
                                </button>
                            </Link>
                            <Link to="/registers/modify-admins">
                                <button className="black-button">
                                    Modificar admins
                                </button>
                            </Link>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    );
}
