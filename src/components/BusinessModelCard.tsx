import React from 'react';
import { BusinessModelOutput, User } from '../types';
import { Line, Radar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, RadialLinearScale, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, RadialLinearScale, Title, Tooltip, Legend);

interface Props {
  model: BusinessModelOutput;
  user: User;
}

const BusinessModelCard: React.FC<Props> = ({ model, user }) => {
  const trendChartOptions = {
    responsive: true,
    plugins: {
      legend: { display: false },
      title: { display: true, text: 'Growth Trend' }
    },
    scales: {
      y: { beginAtZero: true }
    }
  };

  const trendChartData = {
    labels: model.trendChart.labels,
    datasets: [{
      data: model.trendChart.data,
      borderColor: 'rgb(39, 92, 116)',
      backgroundColor: (context) => {
        const ctx = context.chart.ctx;
        const gradient = ctx.createLinearGradient(0, 0, 0, 200);
        gradient.addColorStop(0, 'rgba(0, 0, 0, 0.8)');
        gradient.addColorStop(1, 'rgba(39, 92, 116, 0.8)');
        return gradient;
      },
      fill: true,
    }]
  };

  const successChartOptions = {
    responsive: true,
    plugins: {
      legend: { display: false },
      title: { display: true, text: 'Success Probability' }
    },
    scales: {
      r: {
        angleLines: { display: false },
        suggestedMin: 0,
        suggestedMax: 1
      }
    }
  };

  const successChartData = {
    labels: model.successChart.labels,
    datasets: [{
      data: model.successChart.data,
      backgroundColor: 'rgba(39, 92, 116, 0.2)',
      borderColor: 'rgb(39, 92, 116)',
      pointBackgroundColor: 'rgb(39, 92, 116)',
    }]
  };

  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden text-gray-800">
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-4">{model.title}</h2>
        <p className="mb-4">{model.description}</p>
        
        <div className="mb-4">
          <h3 className="font-semibold mb-2">Skills Needed:</h3>
          <ul className="list-disc list-inside">
            {model.skills.map((skill, index) => (
              <li key={index}>{skill}</li>
            ))}
          </ul>
        </div>
        
        <div className="mb-4">
          <h3 className="font-semibold mb-2">Budget:</h3>
          <p>${model.budget.min} - ${model.budget.max}</p>
        </div>
        
        <div className="mb-4">
          <h3 className="font-semibold mb-2">How to Grow:</h3>
          <ul className="list-disc list-inside">
            {model.growthStrategy.map((step, index) => (
              <li key={index}>{step}</li>
            ))}
          </ul>
        </div>
        
        {user.isPro && (
          <div className="mb-4">
            <h3 className="font-semibold mb-2">Weekly Tasks:</h3>
            <ul className="list-disc list-inside">
              {model.weeklyTasks.map((task, index) => (
                <li key={index}>{task}</li>
              ))}
            </ul>
          </div>
        )}
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
          <div>
            <Line options={trendChartOptions} data={trendChartData} />
          </div>
          <div>
            <Radar options={successChartOptions} data={successChartData} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BusinessModelCard;