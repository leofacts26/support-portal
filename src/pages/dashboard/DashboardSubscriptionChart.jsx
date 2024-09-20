import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { fetchAdminDashboardSubscriptionChart } from '../../features/dashboardSlice';

// Register the required Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const DashboardSubscriptionChart = () => {
  const { dashboardSubscriptionChartData } = useSelector((state) => state.dashboardSlice);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAdminDashboardSubscriptionChart());
  }, [dispatch]);

  // Prepare data for the chart
  const periods = dashboardSubscriptionChartData.map(item => item.period);
  const cateringCounts = dashboardSubscriptionChartData.map(item => {
    const catering = item.subscription_chart.find(vendor => vendor.vendor_type === 'Caterer');
    return catering ? parseInt(catering.subscription_count) : 0;
  });
  const tiffinCounts = dashboardSubscriptionChartData.map(item => {
    const tiffin = item.subscription_chart.find(vendor => vendor.vendor_type === 'Tiffin');
    return tiffin ? parseInt(tiffin.subscription_count) : 0;
  });

  const data = {
    labels: periods,
    datasets: [
      {
        label: 'Caterer',
        data: cateringCounts,
        backgroundColor: 'rgba(255, 99, 132, 0.6)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1,
      },
      {
        label: 'Tiffin',
        data: tiffinCounts,
        backgroundColor: 'rgba(54, 162, 235, 0.6)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    aspectRatio: 1,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Subscription Chart Overview',
      },
    },
  };

  return (
    <>
      <div className="container-fluid">
        {/* Your existing dashboard header */}
      </div>

      <div className="container-fluid">
        <div className="row">
          <div className="col-12">
            <div className="card">
              <div className="card-body">
                <Bar data={data} options={options} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DashboardSubscriptionChart;
