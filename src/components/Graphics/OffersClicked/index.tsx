import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
  { oferta: 'Oferrta 1', cliques: 240 },
  { oferta: 'Oferrta 3', cliques: 139 },
  { oferta: 'Oferrta 2', cliques: 980 },
  { oferta: 'Oferrta 4', cliques: 390 },
];

const OffersClicked: React.FC = () => {
  return (
    <ResponsiveContainer width="100%" height={400}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="oferta" stroke="red" />
        <Line type="monotone" dataKey="cliques" stroke="green" />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default OffersClicked;
