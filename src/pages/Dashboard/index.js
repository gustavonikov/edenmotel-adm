import { Link } from 'react-router-dom';
import { AiOutlineDoubleRight } from 'react-icons/ai';
import { IoIosArrowDown } from 'react-icons/io';
import { LineChart, BarChart, Line, Bar, CartesianGrid, XAxis, YAxis, ResponsiveContainer, Text, Tooltip, Brush, Legend, PieChart, Pie, Label, LabelList, Cell } from 'recharts';

import SideBar from '../../components/SideBar';

import './styles.css';

export default function Dashboard() {
    const asideActiveBars = {
        dashboard: true,
        products: false,
        history: false,
        registers: false,
        report: false,
    };

    const paradise = [
        { 'Paraíso': 12, 'dia': 1 },
        { 'Paraíso': 6, 'dia': 2 },
        { 'Paraíso': 10, 'dia': 3 },
        { 'Paraíso': 14, 'dia': 4 },
        { 'Paraíso': 18, 'dia': 5 },
        { 'Paraíso': 14, 'dia': 6 },
        { 'Paraíso': 20, 'dia': 7 },
        { 'Paraíso': 21, 'dia': 8 },
        { 'Paraíso': 22, 'dia': 9 },
        { 'Paraíso': 23, 'dia': 10 },
        { 'Paraíso': 24, 'dia': 11 },
        { 'Paraíso': 24, 'dia': 12 },
        { 'Paraíso': 26, 'dia': 13 },
        { 'Paraíso': 20, 'dia': 14 },
        { 'Paraíso': 24, 'dia': 15 },
        { 'Paraíso': 18, 'dia': 16 },
        { 'Paraíso': 24, 'dia': 17 },
        { 'Paraíso': 30, 'dia': 18 },
        { 'Paraíso': 14, 'dia': 19 },
        { 'Paraíso': 20, 'dia': 20 },
        { 'Paraíso': 21, 'dia': 21 },
        { 'Paraíso': 22, 'dia': 22 },
        { 'Paraíso': 23, 'dia': 23 },
        { 'Paraíso': 24, 'dia': 24 },
        { 'Paraíso': 24, 'dia': 25 },
        { 'Paraíso': 26, 'dia': 26 },
        { 'Paraíso': 20, 'dia': 27 },
        { 'Paraíso': 24, 'dia': 28 },
        { 'Paraíso': 18, 'dia': 29 },
        { 'Paraíso': 24, 'dia': 30 },
    ];

    const sweetSin = [
        { 'Doce Pecado': 16 },
        { 'Doce Pecado': 8 },
        { 'Doce Pecado': 12 },
        { 'Doce Pecado': 21 },
        { 'Doce Pecado': 6 },
        { 'Doce Pecado': 9 },
        { 'Doce Pecado': 25 },
        { 'Doce Pecado': 27 },
        { 'Doce Pecado': 29 },
        { 'Doce Pecado': 15 },
        { 'Doce Pecado': 16 },
        { 'Doce Pecado': 20 },
        { 'Doce Pecado': 18 },
        { 'Doce Pecado': 27 },
        { 'Doce Pecado': 32 },
        { 'Doce Pecado': 19 },
        { 'Doce Pecado': 24 },
        { 'Doce Pecado': 28 },
        { 'Doce Pecado': 18 },
        { 'Doce Pecado': 15 },
        { 'Doce Pecado': 29 },
        { 'Doce Pecado': 25 },
        { 'Doce Pecado': 18 },
        { 'Doce Pecado': 11 },
        { 'Doce Pecado': 30 },
        { 'Doce Pecado': 22 },
        { 'Doce Pecado': 23 },
        { 'Doce Pecado': 18 },
        { 'Doce Pecado': 22 },
        { 'Doce Pecado': 26 },
    ];

    const rooms = paradise.map((item, index) => {
        return Object.assign(item, sweetSin[index])
    });

    const products1 = [
        { produto: 'REFRIGERANTE LATA 300ML', quantidade: 100 },
        { produto: 'AGUA MINERAL GRF 300ML', quantidade: 50 },
        { produto: 'CERVEJA 450ML', quantidade: 50 },
        { produto: 'SANDUICHE MISTO', quantidade: 40 },
        { produto: 'CAFE', quantidade: 28 },
        { produto: 'CHOCOLATE BARRA 210G', quantidade: 25 },
        { produto: 'CHAMPANHE', quantidade: 20 },
        { produto: 'HAMBURGUER X-TUDO', quantidade: 18 },
        { produto: 'BISCOITO TRELOSO 10UN', quantidade: 15 },
        { produto: 'TAPIOCA SIMPLES', quantidade: 10 },
    ];

    const products2 = [
        { produto: 'REFRIGERANTE LATA 300ML', quantidade: 9 },
        { produto: 'AGUA MINERAL GRF 300ML', quantidade: 8 },
        { produto: 'CERVEJA 450ML', quantidade: 7 },
        { produto: 'SANDUICHE MISTO', quantidade: 6 },
        { produto: 'CAFE', quantidade: 5 },
        { produto: 'CHOCOLATE BARRA 210G', quantidade: 4 },
        { produto: 'CHAMPANHE', quantidade: 3 },
        { produto: 'HAMBURGUER X-TUDO', quantidade: 2 },
        { produto: 'BISCOITO TRELOSO 10UN', quantidade: 1 },
        { produto: 'TAPIOCA SIMPLES', quantidade: 0 },
    ];

    const clientsPaymentPerType = [
        {
            name: 'Dinheiro',
            clients: 300,
            total: '1.900,00'
        },
        {
            name: 'Cartão',
            clients: 350,
            total: '2.100,00'
        },
    ];

    const colors = ['#24c73ae3', '#fd8300']

    
    return (
        <div id="dashboard-page">
            <SideBar barsState={asideActiveBars} />
            <div className="dashboard-container">
                <div className="select-month">
                    <select name="months" >
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
                                data={rooms}
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
                                <h2>Clientes por tipo de pagamento</h2>
                                <div className="pie-chart">
                                    <ResponsiveContainer width="45%" height={220}>
                                        <PieChart>
                                            <Pie
                                                dataKey="clients"
                                                nameKey="name"
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
                                        <div className="info">
                                            <h3 className="money">Dinheiro</h3>
                                            <p>R$ 1.900,00</p>
                                        </div>
                                        <div className="info">
                                            <h3 className="card">Cartão</h3>
                                            <p>R$ 2.100,00 </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="infos">
                            <div className="info">
                                <h3 className="paradise">Paraíso</h3>
                                <p>300 entradas</p>
                                <p>R$ 1.750,00 </p>
                            </div>
                            <div className="info">
                                <h3 className="sweet-sin">Doce Pecado</h3>
                                <p>350 entradas</p>
                                <p>R$ 2.250,00 </p>
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
                        <h2> Top 10 Produtos mais consumidos</h2>
                        <ResponsiveContainer
                            height={310}
                            width="100%"
                        >
                            <BarChart
                                layout="vertical"
                                margin={{ top: 0, right: 10, left: 0, bottom: 0 }}
                                data={products1}
                            >
                                <CartesianGrid horizontal={false} />
                                <XAxis
                                    tickCount={8}
                                    domain={[0, 'auto']}
                                    type="number"
                                    dataKey="quantidade"
                                    margin={{ left: 10 }}
                                    tickLine={false}
                                />
                                <YAxis
                                    width={230}
                                    type="category"
                                    dataKey="produto"
                                    tickLine={false}
                                />
                                <Tooltip />
                                <Bar
                                    fill="#24c73ae3"
                                    dataKey="quantidade"
                                />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                    <div className="chart-container">
                        <h2> Top 10 Produtos menos consumidos </h2>
                        <ResponsiveContainer height={310} width="100%">
                            <BarChart
                                layout="vertical"
                                data={products2}
                                margin={{ top: 0, right: 10, left: 0, bottom: 0 }}
                            >
                                <CartesianGrid horizontal={false} />
                                <Tooltip />
                                <XAxis
                                    tickCount={8}
                                    domain={[0, 'auto']}
                                    type="number"
                                    dataKey="quantidade"
                                    margin={{ left: 10 }}
                                    tickLine={false}
                                />
                                <YAxis
                                    width={230}
                                    type="category"
                                    dataKey="produto"
                                    tickLine={false}
                                    fill="#000"
                                />
                                <Bar
                                    fill="#fd8300"
                                    dataKey="quantidade"
                                />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                    <div className="collected-from-consumption">
                         <div className="collected">
                                <h3 className="total-clients">Total</h3>
                                <p>450 produtos</p>
                                <p>R$ 1.320,00 </p>
                        </div>                                 
                        <Link to="dashboard/consumption-table" className="table-link">
                            <p>Ver consumo de todos os produtos</p>
                            <AiOutlineDoubleRight className="go-to-icon" size={60} />
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}
