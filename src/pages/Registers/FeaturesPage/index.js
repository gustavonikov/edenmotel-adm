import SideBar from "../../../components/SideBar";

import './styles.css';

export default function RegistersFeaturesPage({ children }) {
    return (
        <div className="registers-features-page">
            <SideBar />
            {children}
        </div>
    );
}
