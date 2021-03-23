import SideBar from "../../components/SideBar";

import './styles.css';

export default function HistoryContainer({ children }) {
    return (
        <div id="history-page">
            <SideBar />
            {children}
        </div>
    )
}