import { useEffect, useState } from 'react';
/* import { Link } from 'react-router-dom';
import { AiOutlineDoubleRight } from 'react-icons/ai'; */
import { IoIosArrowDown } from 'react-icons/io';
import { LineChart, BarChart, Line, Bar, CartesianGrid, XAxis, YAxis, ResponsiveContainer, Tooltip, Brush, Legend, PieChart, Pie, LabelList, Cell } from 'recharts';

import SideBar from '../../components/SideBar';
import SimpleLoader from '../../components/SimpleLoader';
import ErrorMessage from '../../components/ErrorMessage';

import api from '../../services/api';
import { adjustValue } from '../../utils/adjustValue';

import './styles.css';

export default function Dashboard() {
    const month = new Date().getMonth() + 1;
    const colors = ['#cdca32', '#ca4016'];

    const [filteredMonth, setFilteredMonth] = useState(month);
    const [roomEntriesPerType, setRoomEntriesPerType] = useState([]);
    const [totalEntriesParadise, setTotalEntriesParadise] = useState(0);
    const [totalEntriesSweetSin, setTotalEntriesSweetSin] = useState(0);
    const [totalValueParadise, setTotalValueParadise] = useState();
    const [totalValueSweetSin, setTotalValueSweetSin] = useState()
    const [clientsPaymentPerType, setClientsPaymentPerType] = useState([]);
    const [mostConsumedProducts, setMostConsumedProducts] = useState([]);
    const [lessConsumedProducts, setLessConsumedProducts] = useState([]);
    const [totalCollectedFromProducts, setTotalCollectedFromProducts] = useState('');
    const [totalProductsQuantity, setTotalProductsQuantity] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const [hasError, setHasError] = useState(false);
    
    useEffect(() => {
        localStorage.setItem('month', filteredMonth);
    }, [filteredMonth]);

    useEffect(() => {
        api.get(`/entries-dashboard/${filteredMonth}`) // 
        .then((res) => {
            setIsLoading(false);

            setRoomEntriesPerType(res.data.data);
            setTotalEntriesParadise(adjustValue(res.data.paradise));
            setTotalEntriesSweetSin(adjustValue(res.data.sweet));
            setTotalValueParadise(adjustValue(res.data.payment_paraiso));
            setTotalValueSweetSin(adjustValue(res.data.payment_doce));
        })
        .catch((error) => {
            console.log(error);
            
            setIsLoading(false);
            setHasError(true);
        }); 
    }, [filteredMonth]);

    useEffect(() => {
        api.get(`/payment-dashboard/${filteredMonth}`)
        .then((res) => {
            setClientsPaymentPerType(res.data);
        })
        .catch((error) => {
            console.log(error);
        });
    }, [filteredMonth]);

    useEffect(() => {
        api.get(`/consumptions-dashboard/${filteredMonth}`)
        .then((res) => {
            setMostConsumedProducts(res.data[0].top10most);
            setLessConsumedProducts(res.data[0].top10less);
            setTotalCollectedFromProducts(adjustValue(res.data[0].total));
            setTotalProductsQuantity(res.data[0].quantity);
        })
        .catch((error) => {
            console.log(error);
        });
    }, [filteredMonth]);

    return (
        <div id="dashboard-page">
            <SideBar />
           { 
                hasError ?
                    <ErrorMessage />
                    :
                    (
                        <div className="dashboard-container">
                            {
                                isLoading && (
                                    <div className="loading">
                                        <h2>Carregando dados...</h2>
                                        <SimpleLoader />
                                    </div>
                                )
                            }
                            <div className="select-month">
                                <select name="months" defaultValue={filteredMonth} onChange={({ target }) => setFilteredMonth(target.value)}>
                                    <option value={1}>Janeiro</option>
                                    <option value={2}>Fevereiro</option>
                                    <option value={3}>Março</option>
                                    <option value={4}>Abril</option>
                                    <option value={5}>Maio</option>
                                    <option value={6}>Junho</option>
                                    <option value={7}>Julho</option>
                                    <option value={8}>Agosto</option>
                                    <option value={9}>Setembro</option>
                                    <option value={10}>Outubro</option>
                                    <option value={11}>Novembro</option>
                                    <option value={12}>Dezembro</option>
                                </select>
                                <IoIosArrowDown size={32} className="select-arrow" />
                            </div>
                            <div className="dashboard-items">
                                <div className="chart-container line-chart">
                                    <h2>Entradas por tipo de quarto</h2>
                                    <ResponsiveContainer
                                        height={340}
                                        width="100%"
                                    >
                                        <LineChart
                                            margin={{ top: 0, right: 10, left: 0, bottom: 0 }}
                                            data={roomEntriesPerType}
                                        >
                                            <CartesianGrid vertical={false} />
                                            <XAxis interval={1} dataKey="dia" tickLine={false} />
                                            <YAxis tickLine={false} />
                                            <Tooltip />
                                            <Legend align="center" verticalAlign="top" iconType="plainline" height={40} />
                                            <Brush dataKey="dia" height={30} stroke="#24c73ae3" />
                                            <Line
                                                stroke="#24c73ae3"
                                                dataKey="Paraíso"
                                                dot={false}
                                                type="monotone"
                                                strokeWidth={2}
                                            />
                                            <Line
                                                stroke="#fd8300"
                                                dataKey="Doce Pecado"
                                                dot={false}
                                                type="monotone"
                                                strokeWidth={2}
                                            />
                                        </LineChart>
                                    </ResponsiveContainer>
                                </div>
                                <div className="clients-info">
                                    <div className="items">
                                        <div className="pie-chart-container">
                                            <h2>Entradas por tipo de pagamento</h2>
                                            <div className="pie-chart">
                                                <ResponsiveContainer width="45%" height={220}>
                                                    <PieChart>
                                                        <Pie
                                                            dataKey="clients"
                                                            fill="#24c73ae3"
                                                            data={clientsPaymentPerType}
                                                        >
                                                            {clientsPaymentPerType.map((entry, index) => (
                                                                <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                                                            ))}
                                                            <LabelList position="inside" dataKey="clients" />
                                                        </Pie>
                                                    </PieChart>
                                                </ResponsiveContainer>
                                                <div className="pie-chart-infos">
                                                    {
                                                        clientsPaymentPerType.map(({ name, total }) => {
                                                            const totalPrice = adjustValue(total);

                                                            return (
                                                                <div key={name} className="info">
                                                                    <h3 className={name === 'Dinheiro' ? 'money' : 'card'}>{name}</h3>
                                                                    <p>R$ {totalPrice}</p>
                                                                </div>
                                                            )
                                                        })
                                                    }
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="infos">
                                        <div className="info">
                                            <h3 className="paradise">Paraíso</h3>
                                            <p>{totalEntriesParadise} entradas</p>
                                            <p>R$ {totalValueParadise}</p>
                                        </div>
                                        <div className="info">
                                            <h3 className="sweet-sin">Doce Pecado</h3>
                                            <p>{totalEntriesSweetSin} entradas</p>
                                            <p>R$ {totalValueSweetSin}</p>
                                        </div>
                                        <div className="info">
                                            <h3 className="total-clients">Total</h3>
                                            <p>650 entradas</p>
                                            <p>R$ 4.000,00 </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="items-division" />
                            <div className="dashboard-items">
                                <div className="chart-container">
                                    <h2>Top 10 Produtos mais consumidos</h2>
                                    <ResponsiveContainer
                                        height={310}
                                        width="100%"
                                    >
                                        <BarChart
                                            layout="vertical"
                                            margin={{ top: 0, right: 10, left: 0, bottom: 0 }}
                                            data={mostConsumedProducts}
                                        >
                                            <CartesianGrid horizontal={false} />
                                            <XAxis
                                                tickCount={8}
                                                domain={[0, 'auto']}
                                                type="number"
                                                dataKey="sum"
                                                margin={{ left: 10 }}
                                                tickLine={false}
                                            />
                                            <YAxis
                                                width={230}
                                                type="category"
                                                dataKey="name"
                                                tickLine={false}
                                            />
                                            <Tooltip />
                                            <Bar
                                                fill="#24c73ae3"
                                                dataKey="sum"
                                            />
                                        </BarChart>
                                    </ResponsiveContainer>
                                </div>
                                <div className="chart-container">
                                    <h2>Top 10 Produtos menos consumidos</h2>
                                    <ResponsiveContainer height={310} width="100%">
                                        <BarChart
                                            layout="vertical"
                                            data={lessConsumedProducts}
                                            margin={{ top: 0, right: 10, left: 0, bottom: 0 }}
                                        >
                                            <CartesianGrid horizontal={false} />
                                            <Tooltip />
                                            <XAxis
                                                tickCount={8}
                                                domain={[0, 'auto']}
                                                type="number"
                                                dataKey="sum"
                                                margin={{ left: 10 }}
                                                tickLine={false}
                                            />
                                            <YAxis
                                                width={230}
                                                type="category"
                                                dataKey="name"
                                                tickLine={false}
                                                fill="#000"
                                            />
                                            <Bar
                                                fill="#fd8300"
                                                dataKey="sum"
                                            />
                                        </BarChart>
                                    </ResponsiveContainer>
                                </div>
                                <div className="collected-from-consumption">
                                    <div className="collected">
                                            <h3 className="total-clients">Total</h3>
                                            <p>{totalProductsQuantity} produtos</p>
                                            <p>R$ {totalCollectedFromProducts}</p>
                                    </div>                                 
                                    {/* <Link to="dashboard/consumption-table" className="table-link">
                                        <p>Ver consumo de todos os produtos</p>
                                        <AiOutlineDoubleRight className="go-to-icon" size={60} />
                                    </Link> */}
                                </div>
                            </div>
                        </div>
                    )
            }
        </div>
    )
}
