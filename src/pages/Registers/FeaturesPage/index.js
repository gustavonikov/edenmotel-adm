import SideBar from "../../../components/SideBar";

import './styles.css';

export default function RegistersFeaturesPage({ children }) {
    const asideActiveBars = {
        dashboard: false,
        products: false,
        history: false,
        registers: true,
        report: false,
    };

    return (
        <div className="registers-features-page">
            <SideBar barsState={asideActiveBars} />
            {children}
        </div>
    );
}
