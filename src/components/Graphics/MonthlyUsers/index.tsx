import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const data = [
  { mes: 'Jan', usuarios: 4000 },
  { mes: 'Fev', usuarios: 3000 },
  { mes: 'Mar', usuarios: 2000 },
  { mes: 'Abr', usuarios: 2780 },
  { mes: 'Mai', usuarios: 1890 },
  { mes: 'Jun', usuarios: 2390 },
  { mes: 'Jul', usuarios: 3490 },
  { mes: 'Ago', usuarios: 2000 },
  { mes: 'Set', usuarios: 2780 },
  { mes: 'Out', usuarios: 1890 },
  { mes: 'Nov', usuarios: 2390 },
  { mes: 'Dez', usuarios: 3490 },
];

const MonthlyUsers = () => (
  <ResponsiveContainer width="100%" height={300}>
    <LineChart data={data}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="mes" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Line type="monotone" dataKey="usuarios" stroke="#8884d8" activeDot={{ r: 8 }} />
    </LineChart>
  </ResponsiveContainer>
);

export default MonthlyUsers;
