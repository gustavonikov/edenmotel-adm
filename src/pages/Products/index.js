import { Modal } from '@material-ui/core';
import { useEffect, useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';
import { IoMdAddCircle } from 'react-icons/io';

import SideBar from '../../components/SideBar';
import SimpleLoader from '../../components/SimpleLoader';
import ErrorMessage from '../../components/ErrorMessage';

import { confirmAlert, errorAlert } from '../../utils/Alerts';
import { adjustValue } from '../../utils/adjustValue';
import api from '../../services/api';

import './styles/index.css';
import './styles/addProductsModal.css';
import './styles/updateQuantityModal.css';

export default function Products() {
    const [products, setProducts] = useState([]);
    const [openAddProductModal, setOpenAddProductModal] = useState(false);
    const [openUpdateProductModal, setOpenUpdateProductModal] = useState(false);
    const [productName, setProductName] = useState('');
    const [productPrice, setProductPrice] = useState('');
    const [productQuantity, setProductQuantity] = useState(1);
    const [productUpdate, setProductUpdate] = useState({});
    const [newQuantity, setNewQuantity] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const [hasError, setHasError] = useState(false);

    useEffect(() => {
        api.get('/products')
        .then((res) => {
            setIsLoading(false);
            setProducts(res.data);
        })
        .catch((error) => {
            console.log(error);
            setIsLoading(false);
            setHasError(true);
        });
    }, []);

    function handleAddProductModalOpen() {
        setProductName('');
        setProductPrice('');
        setProductQuantity(0);
        setOpenAddProductModal(true);
    }

    function handleAddProductModalClose() {
        setOpenAddProductModal(false);
    }

    function handleUpdateProductModalOpen() {
        setOpenUpdateProductModal(true);
        setNewQuantity(0);
    }

    function handleUpdateProductModalClose() {
        setOpenUpdateProductModal(false);
    }

    function handleAddProduct(ev, name, price, quantity) {
        ev.preventDefault();

        const newProduct = {
            name,
            price,
            quantity,
        };

        api.post('/products', newProduct)
        .then(() => {
            setOpenAddProductModal(false);

            setProducts([...products, newProduct]);
        }).catch(() => {
            errorAlert('Ocorreu um erro ao cadastrar o produto!');
            setOpenAddProductModal(false);
        });
    }

    function handleSearch() {
        let td; let i; let txtValue;

        const input = document.getElementById('products-input');
        const filter = input.value.toUpperCase();
        const table = document.getElementById('products-table');
        const tr = table.getElementsByTagName('tr');

        for (i = 0; i < tr.length; i += 1) {
            [td = 0] = tr[i].getElementsByTagName('td');

            if (td) {
                txtValue = td.textContent || td.innerText;
                if (txtValue.toUpperCase().indexOf(filter) > -1) {
                    tr[i].style.display = '';
                } else {
                    tr[i].style.display = 'none';
                }
            }
        }
    }

    function handleUpdateQuantity(ev, quantidade) {
        ev.preventDefault();

        const quantidadeUpdated = Number(quantidade) + Number(productUpdate.quantity);

        const updatedProduct = {
            ...productUpdate,
            quantity: quantidadeUpdated,
        };

        api.put(`/products/${productUpdate.id}`, updatedProduct).then(() => {
            setOpenUpdateProductModal(false);
            
            setProducts([...products, updatedProduct]);
        }).catch((error) => {
            console.log(error);

            errorAlert('Não foi possível alterar o produto');
            setOpenUpdateProductModal(false);
        });
    }

    function handleDeleteProduct(productId, productName) {
        confirmAlert(`Deseja realmente excluir "${productName}"?`, 'Essa ação não poderá ser revertida.').then((yes) => {
            if (yes) {
                api.delete(`/products/${productId}`).then(() => {
                    setProducts(products.filter(({ id }) => productId !== id));
                }).catch((error) => {
                    errorAlert('Não foi possível deletar o produto!');
                    console.log(error);
                });
            }
        });
    }

    return (
        <div id="products-page">
            <SideBar />

            {
                hasError ?
                    <ErrorMessage />
                    :
                    <div className="products-container">
                    <header>
                        <div className="input-wrapper">
                            <FaSearch size={30} color="#122" />
                            <input
                                type="text"
                                id="products-input"
                                onKeyUp={() => handleSearch()}
                                placeholder="Pesquise o produto..."
                                required
                            />
                        </div>
                        <button type="button" onClick={handleAddProductModalOpen} className="button">
                            <IoMdAddCircle size={30} className="products-add-icon" color="#ffffff" />
                            Novo produto
                        </button>
                    </header>
                    <table id="products-table">
                        <thead>
                            <tr className="header">
                                <th>Nome do produto</th>
                                <th>Valor</th>
                                <th>Quantidade em estoque</th>
                                <th>Alterar estoque</th>
                                {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
                                <th />
                            </tr>
                        </thead>
                        {
                            !isLoading && products.length === 0 ?
                                <tbody>
                                    <p className="no-products">
                                        Ainda não há produtos cadastrados
                                    </p>
                                </tbody>
                            :
                            <tbody>
                            {
                                products.length > 0
                                    && products.map(({ id, name, price, quantity }) => {
                                        const adjustedPrice = adjustValue(price);
                                        
                                        return (
                                            <tr key={id}>
                                                <td>{name}</td>
                                                <td>{adjustedPrice}</td>
                                                <td>{quantity}</td>
                                                <td>
                                                    <button
                                                        type="button"
                                                        className="button"
                                                        onClick={() => {
                                                            setProductUpdate({
                                                                id,
                                                                name,
                                                                adjustedPrice,
                                                                quantity,
                                                            });
                                                            handleUpdateProductModalOpen();
                                                        }}
                                                    >
                                                    Adicionar
                                                    </button>
                                                </td>
                                                <td>
                                                    <MdDelete
                                                        size={25}
                                                        title="Clique pra excluir o produto"
                                                        className="delete-product-icon"
                                                        onClick={() => handleDeleteProduct(id, name)}
                                                    />
                                                </td>
                                            </tr>
                                        )
                                    })
                            }
                            </tbody>
                        }
                        
                    </table>
                    {
                        isLoading && (
                            <div className="loading">
                                <h2>Carregando produtos...</h2>
                                <SimpleLoader />
                            </div>
                        )
                    }
                </div> 
            }
            <Modal
                id="add-products-modal"
                open={openAddProductModal}
                onClose={handleAddProductModalClose}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
            >
                <form className="modal-container" onSubmit={(ev) => handleAddProduct(ev, productName, productPrice, productQuantity)}>
                    <h2>Adicionar Produto</h2>
                    <div className="modal-product-content">
                        <label htmlFor="nome">
                            <strong>Nome do Produto</strong>
                            <input
                                className="product-modal-primary-input"
                                name="nome"
                                type="text"
                                value={productName}
                                onChange={({ target }) => setProductName(target.value)}
                                required
                            />
                        </label>
                        <div className="second-line">
                            <label htmlFor="nome">
                                <strong>Valor</strong>
                                <input
                                    className="product-modal-input bigger"
                                    name="nome"
                                    type="text"
                                    value={productPrice}
                                    onChange={({ target }) => setProductPrice(target.value)}
                                    required
                                />
                            </label>
                            <label htmlFor="nome">
                                <strong>Quantidade</strong>
                                <input
                                    className="product-modal-input smaller"
                                    name="nome"
                                    type="number"
                                    value={productQuantity}
                                    onChange={({ target }) => setProductQuantity(target.value)}
                                    required
                                />
                            </label>
                        </div>
                    </div>
                    <div className="button-container">
                        <button type="button" className="button" onClick={handleAddProductModalClose}>
                            Cancelar
                        </button>
                        <button type="submit" className="button">
                            Adicionar
                        </button>
                    </div>
                </form>
            </Modal>
            <Modal
                id="update-quantity-modal"
                open={openUpdateProductModal}
                onClose={handleUpdateProductModalClose}
            >
                <div className="modal-container">
                    <h2>{productUpdate.name}</h2>
                    <label htmlFor="alterar-quantidade">
                        <strong>Quantidade</strong>
                        <input
                            className="product-modal-primary-input"
                            name="alterar-quantidade"
                            type="number"
                            value={newQuantity}
                            onChange={({ target }) => setNewQuantity(target.value)}
                            required
                        />
                    </label>
                    <div className="button-container">
                        <button type="button" className="button" onClick={handleUpdateProductModalClose}>
                                Cancelar
                        </button>
                        <button type="submit" className="button" onClick={(ev) => handleUpdateQuantity(ev, newQuantity)}>
                                Adicionar
                        </button>
                    </div>
                </div>
            </Modal>
        </div>
    );
}
