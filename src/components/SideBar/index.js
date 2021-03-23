import { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { MdShoppingCart, MdAddBox, MdDashboard } from 'react-icons/md';
import { FaPowerOff, FaHistory } from 'react-icons/fa';
import { HiDocumentReport } from 'react-icons/hi';

import api from '../../services/api';
import { errorAlert } from '../../utils/Alerts';

import './styles.css';

export default function SideBar() {
    const location = useLocation();
    const splittedRoute = location.pathname.split('/');
    const currentBar = splittedRoute[1];

    useEffect(() => {
        if (currentBar !== '') document.querySelector(`[${currentBar}]`).classList.add('active-bar');
    }, [currentBar]);

    function handleLogout() {
        const id = localStorage.getItem('cashierId');

        api.put(`/sessions/${id}`).then(() => {
            localStorage.clear();
        }).catch((error) => {
            errorAlert('Não foi possível deslogar!')
        });
    }

    return (
        <nav id="main-aside">
            <Link to="/dashboard" dashboard="" >
                <MdDashboard size={30} className="icon-report" />
                Dashboard      
            </Link> 
            
            <Link to="/products" products="" >
                <MdShoppingCart size={30} className="icon" />
                Produtos
            </Link>
            <Link to="/history" history="" >
                <FaHistory size={30} className="icon-report" />
                Histórico       
            </Link>
            <Link to="/registers" registers="" >
                <MdAddBox size={30} className="icon-report" />
                Registros      
            </Link> 
            <Link to="/report" report="" >
                <HiDocumentReport size={30} className="icon-report" />
                Relatório      
            </Link> 
            <Link to="/" onClick={handleLogout}>
                <FaPowerOff size={30} className="icon"/>
                Deslogar        
            </Link>
        </nav>
    );
};
