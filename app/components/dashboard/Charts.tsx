'use client';

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';
import { Line, Bar, Pie, Doughnut } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

interface ChartProps {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    backgroundColor?: string | string[];
    borderColor?: string;
  }[];
  title?: string;
}

export function LineChart({ labels, datasets, title }: ChartProps) {
  return (
    <div className="bg-white p-6 rounded-lg shadow">
      {title && <h3 className="text-lg font-semibold mb-4">{title}</h3>}
      <Line
        data={{ labels, datasets }}
        options={{
          responsive: true,
          plugins: { legend: { display: true } },
        }}
      />
    </div>
  );
}

export function BarChart({ labels, datasets, title }: ChartProps) {
  return (
    <div className="bg-white p-6 rounded-lg shadow">
      {title && <h3 className="text-lg font-semibold mb-4">{title}</h3>}
      <Bar
        data={{ labels, datasets }}
        options={{
          responsive: true,
          plugins: { legend: { display: true } },
        }}
      />
    </div>
  );
}

export function PieChart({ labels, datasets, title }: ChartProps) {
  return (
    <div className="bg-white p-6 rounded-lg shadow">
      {title && <h3 className="text-lg font-semibold mb-4">{title}</h3>}
      <Pie
        data={{ labels, datasets }}
        options={{
          responsive: true,
          plugins: { legend: { display: true } },
        }}
      />
    </div>
  );
}
