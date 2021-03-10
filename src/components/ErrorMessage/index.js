import './styles.css';

export default function ErrorMessage() {
    return (
        <div className="error-container">
            <h1 className="error-title">
                Erro 503: Serviço temporariamente indisponível.
            </h1>
            <p className="error-message">
                Por favor aguardar ou tente novamente mais tarde.
            </p>
            <div className="error-image-container">
                <img className="error-image" src="https://i.pinimg.com/564x/24/8c/c4/248cc4eec11b158d6eaf49c7088022a4.jpg" alt="Sad Face"/>
            </div>
        </div>
    );
}
