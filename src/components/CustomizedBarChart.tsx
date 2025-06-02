import { BarChart, Bar, XAxis, YAxis, Tooltip, Cell, ResponsiveContainer } from "recharts";
interface CustomizedBarChartProps {
  data: { name: string; votes: number; color: string }[];
}

const CandidateBarChart = ({ data }: CustomizedBarChartProps) => {
  const colors = data.map((entry) => entry.color);
  return (
    <ResponsiveContainer width="100%" height={400}>
      <BarChart data={data}>
        <XAxis dataKey="name" />
        <YAxis allowDecimals={false} />
        <Tooltip />
        <Bar dataKey="votes">
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
};

export default CandidateBarChart;
