import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { fetchAdminDashboardAreaCount } from '../../features/dashboardSlice';

// Register the required Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const DashboardAreaCountChart = () => {
  const { dashboardAreaCount } = useSelector((state) => state.dashboardSlice);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAdminDashboardAreaCount());
  }, [dispatch]);

  // Ensure the data exists before mapping
  const cateringAreas = dashboardAreaCount?.catering_area_based_counts?.map(item => item.area || 'Unknown Area') || [];
  const cateringCounts = dashboardAreaCount?.catering_area_based_counts?.map(item => item.subscription_count) || [];

  const tiffinsAreas = dashboardAreaCount?.tiffins_area_based_counts?.map(item => item.area) || [];
  const tiffinsCounts = dashboardAreaCount?.tiffins_area_based_counts?.map(item => item.subscription_count) || [];

  // Merge the area data (ensure the areas are unique)
  const allAreas = Array.from(new Set([...cateringAreas, ...tiffinsAreas]));

  // Map the data for each area for both catering and tiffins
  const cateringData = allAreas.map(area => {
    const found = dashboardAreaCount?.catering_area_based_counts?.find(item => item.area === area);
    return found ? parseInt(found.subscription_count) : 0;
  });

  const tiffinsData = allAreas.map(area => {
    const found = dashboardAreaCount?.tiffins_area_based_counts?.find(item => item.area === area);
    return found ? parseInt(found.subscription_count) : 0;
  });

  // Chart configuration
  const chartData = {
    labels: allAreas,
    datasets: [
      {
        label: 'Catering Subscription Count',
        data: cateringData,
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
      {
        label: 'Tiffins Subscription Count',
        data: tiffinsData,
        backgroundColor: 'rgba(153, 102, 255, 0.6)',
        borderColor: 'rgba(153, 102, 255, 1)',
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false, // Ensures custom height works
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Subscription Count by Area',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
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
              <div className="card-body" style={{ overflowX: 'auto', overflowY: 'hidden', maxHeight: '500px' }}>
                <div style={{ width: allAreas.length * 60 + 'px', height: '400px' }}>
                  {allAreas.length > 0 ? (
                    <Bar data={chartData} options={options} />
                  ) : (
                    <p>Loading chart...</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DashboardAreaCountChart;
