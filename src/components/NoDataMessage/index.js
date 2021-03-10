import './styles.css';

export default function NoDataMessage({ title }) {
    return (
        <div className="no-data-container">
            <h1 className="no-data-title">
                {title}
            </h1>
            <p className="no-data-message">
                Caso haja e não foi mostrado na tela, atualize a página.
            </p>
        </div>
    )
}
