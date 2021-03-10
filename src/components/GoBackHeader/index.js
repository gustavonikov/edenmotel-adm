import { BsBoxArrowLeft } from 'react-icons/bs';
import { Link } from 'react-router-dom';

import './styles.css';

const GoBackHeader = ({ to, title }) => (
    <div className="go-back" >
        <Link to={to} title="Voltar">
            <BsBoxArrowLeft className="arrow-icon" size={50} />
        </Link>
        <h2>{title}</h2>
    </div>
)

export default GoBackHeader;
