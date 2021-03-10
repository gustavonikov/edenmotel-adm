import SideBar from "../../components/SideBar";

import './styles.css';

export default function HistoryContainer({children}) {
    const asideActiveBars = {
        dashboard: false,
        products: false,
        history: true,
        registers: false,
        report: false,
    };

    return (
        <div id="history-page">
            <SideBar barsState={asideActiveBars} />
            {children}
        </div>
    )
}