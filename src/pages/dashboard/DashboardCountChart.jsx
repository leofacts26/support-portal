import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Title, Tooltip, Legend } from 'chart.js';
import { fetchDashboardCount } from '../../features/dashboardSlice';

// Register the required Chart.js components
ChartJS.register(ArcElement, Title, Tooltip, Legend);

const DashboardCountChart = () => {
  const { dashboardCount } = useSelector((state) => state.dashboardSlice);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchDashboardCount());
  }, [dispatch]);

  const data = {
    labels: [
      'Catering Vendors',
      'Tiffins Vendors',
      'Inactive Vendors',
      'Newsletter Subs',
      'Registered Users'
    ],
    datasets: [
      {
        label: 'Count',
        data: [
          dashboardCount.catering_vendor_count,
          dashboardCount.tiffins_vendor_count,
          dashboardCount.total_inactive_vendors,
          dashboardCount.total_newsletter_subs,
          dashboardCount.total_registered_users
        ],
        backgroundColor: [
          'rgba(255, 99, 132, 0.6)',
          'rgba(54, 162, 235, 0.6)',
          'rgba(255, 206, 86, 0.6)',
          'rgba(75, 192, 192, 0.6)',
          'rgba(153, 102, 255, 0.6)'
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)'
        ],
        borderWidth: 1
      }
    ]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: true,
    aspectRatio: 2,
    plugins: {
      legend: {
        position: 'top'
      },
      title: {
        display: true,
        text: 'Dashboard Overview'
      }
    }
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
                <Doughnut data={data} options={options} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DashboardCountChart;
