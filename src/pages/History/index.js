import { Link } from 'react-router-dom';
import { FaHotel } from 'react-icons/fa';
import { IoDocuments } from 'react-icons/io5';
import { AiOutlineDoubleRight } from 'react-icons/ai';

import HistoryContainer from './HistoryContainer';

import './styles.css';

export default function History() {
    return (
        <HistoryContainer>
            <div className="history-page-container">
                <h2>Qual histórico você deseja ver?</h2>
                <ul>
                    <li>
                        <FaHotel size={68} />
                        <h2>Apartamentos</h2>
                        <Link to="/history/apartments">
                            <button>
                                Ir para
                                <AiOutlineDoubleRight className="go-to-icon" size={32} />
                            </button>
                        </Link>
                    </li>
                    <li>
                        <IoDocuments size={70} />
                        <h2>Fechamentos</h2>
                        <Link to="/history/closure-reports">
                            <button>
                                Ir para
                                <AiOutlineDoubleRight className="go-to-icon" size={32} />
                            </button>
                        </Link>
                    </li>
                </ul>
            </div>
        </HistoryContainer>
    )
}

