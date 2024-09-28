import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { fetchAdminDashboardInactiveVendors } from '../../features/dashboardSlice';

// Register the required Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const DashboardInactiveVendorChart = () => {
  const { dashboardInactiveVendors } = useSelector((state) => state.dashboardSlice);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAdminDashboardInactiveVendors());
  }, [dispatch]);

  // Check if the data is available before processing
  if (!dashboardInactiveVendors) {
    return <p>Loading...</p>;
  }

  // Extract periods and vendor types from the data
  const periods = dashboardInactiveVendors.map(item => item.period);

  // Prepare datasets for each vendor type
  const vendorTypes = ['Caterer', 'Tiffin', 'Others'];
  
  const datasets = vendorTypes.map(type => {
    return {
      label: `${type} Inactive Vendors`,
      data: dashboardInactiveVendors.map(item => {
        const vendorData = item.inactive_vendors.find(v => v.vendor_type === type);
        return vendorData ? parseInt(vendorData.inactive_vendor_count) : 0;
      }),
      backgroundColor: getColorByType(type),
      borderColor: getColorByType(type, true),
      borderWidth: 1,
    };
  });

  // Helper function to assign colors based on vendor type
  function getColorByType(type, border = false) {
    const colors = {
      Caterer: border ? 'rgba(75, 192, 192, 1)' : 'rgba(75, 192, 192, 0.6)',
      Tiffin: border ? 'rgba(153, 102, 255, 1)' : 'rgba(153, 102, 255, 0.6)',
      Others: border ? 'rgba(255, 159, 64, 1)' : 'rgba(255, 159, 64, 0.6)',
    };
    return colors[type];
  }

  // Chart configuration
  const chartData = {
    labels: periods,
    datasets,
  };

  const options = {
    responsive: true,
    aspectRatio: 2,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Inactive Vendors by Period',
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
                <Bar data={chartData} options={options} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DashboardInactiveVendorChart;
