import { Link } from 'react-router-dom';
import { MdShoppingCart, MdAddBox, MdDashboard } from 'react-icons/md';
import { FaPowerOff, FaHistory } from 'react-icons/fa';
import { HiDocumentReport } from 'react-icons/hi';

import api from '../../services/api';
import { errorAlert } from '../../utils/Alerts';

import './styles.css';

export default function SideBar({ barsState }) {
    function handleLogout() {
        const id = localStorage.getItem('cashierId');

        api.put(`/sessions/${id}`).then(() => {
            localStorage.clear();
        }).catch((error) => {
            console.log(error)
            errorAlert('Não foi possível deslogar!')
        });
    }

    return (
        <aside id="main-aside">
            <Link to="/dashboard" className={barsState.dashboard ? 'active-bar' : ''} >
                <MdDashboard size={30} className="icon-report" />
                Dashboard      
            </Link> 
            
            <Link to="/products" className={barsState.products ? 'active-bar' : ''}>
                <MdShoppingCart size={30} className="icon" />
                Produtos
            </Link>
            <Link to="/history" className={barsState.history ? 'active-bar' : ''} >
                <FaHistory size={30} className="icon-report" />
                Histórico       
            </Link>
            <Link to="/registers" className={barsState.registers ? 'active-bar' : ''} >
                <MdAddBox size={30} className="icon-report" />
                Registros      
            </Link> 
            <Link to="/report" className={barsState.report ? 'active-bar' : ''} >
                <HiDocumentReport size={30} className="icon-report" />
                Relatório      
            </Link> 
            <Link to="/" onClick={handleLogout}>
                <FaPowerOff size={30} className="icon"/>
                Deslogar        
            </Link>
        </aside>
    );
};
