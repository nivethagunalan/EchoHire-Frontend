import { Line, Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Tooltip,
  Legend,
  Filler
);

function Charts({ data }) {

  // ✅ DETECT THEME
  const isDark = document.documentElement.classList.contains('dark');

  // 🎯 COLORS BASED ON THEME
  const textColor = isDark ? '#cbd5e1' : '#334155';
  const gridColor = isDark ? 'rgba(148,163,184,0.15)' : 'rgba(0,0,0,0.08)';
  const tooltipBg = isDark ? '#0f172a' : '#ffffff';
  const tooltipTitle = isDark ? '#f8fafc' : '#0f172a';
  const tooltipBody = isDark ? '#e2e8f0' : '#334155';

  // ✅ LINE CHART DATA
  const lineData = {
    labels: data.scoreTrend.map((_, i) => `Q${i + 1}`),
    datasets: [
      {
        label: 'Score',
        data: data.scoreTrend,
        borderColor: '#7c3aed',
        tension: 0.4,
        fill: true,
        backgroundColor: isDark
          ? 'rgba(124, 58, 237, 0.2)'
          : 'rgba(124, 58, 237, 0.1)',
        pointBackgroundColor: '#7c3aed'
      }
    ]
  };

  // ✅ BAR CHART DATA
  const barData = {
    labels: ['Technical', 'Communication', 'Confidence'],
    datasets: [
      {
        label: 'Skills',
        data: data.bars.map(b => b.value),
        backgroundColor: ['#38bdf8', '#a78bfa', '#22c55e'],
        borderRadius: 8
      }
    ]
  };

  // ✅ COMMON OPTIONS
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: tooltipBg,
        titleColor: tooltipTitle,
        bodyColor: tooltipBody,
        borderColor: isDark ? '#334155' : '#e2e8f0',
        borderWidth: 1
      }
    },
    scales: {
      x: {
        grid: { display: false },
        ticks: { color: textColor }
      },
      y: {
        grid: { color: gridColor },
        ticks: {
          color: textColor,
          beginAtZero: true,
          max: 100
        }
      }
    }
  };

  return (
    <div className="space-y-6">

      {/* SCORE TREND */}
      <div className="rounded-3xl bg-white/60 dark:bg-slate-900/60 backdrop-blur p-4 shadow">
        <p className="text-sm mb-2 text-gray-700 dark:text-gray-300">
          Score Trend
        </p>
        <div className="h-52">
          <Line data={lineData} options={options} />
        </div>
      </div>

      {/* SKILLS */}
      <div className="rounded-3xl bg-white/60 dark:bg-slate-900/60 backdrop-blur p-4 shadow">
        <p className="text-sm mb-2 text-gray-700 dark:text-gray-300">
          Skills Overview
        </p>
        <div className="h-52">
          <Bar data={barData} options={options} />
        </div>
      </div>

    </div>
  );
}

export default Charts;