import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import DataTable from 'react-data-table-component';
import GlobalSearch from '../../components/common/GlobalSearch';
import { fetchAdminDashboardCityCount } from '../../features/dashboardSlice';

const DashboardCityCount = () => {
  const dispatch = useDispatch();
  const { dashboardCityCount } = useSelector((state) => state.dashboardSlice);
  
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);

  // Fetch city count data on component mount
  useEffect(() => {
    dispatch(fetchAdminDashboardCityCount());
  }, [dispatch]);

  // Update the data and filtered data once we receive the dashboard city count data
  useEffect(() => {
    if (dashboardCityCount) {
      setData(dashboardCityCount);
      setFilteredData(dashboardCityCount);
    }
  }, [dashboardCityCount]);

  // Search handler
  const handleSearch = (e) => {
    const searchValue = e.target.value.toLowerCase();
    if (!searchValue) {
      setFilteredData(data);
      return;
    }

    const newFilteredData = data.filter((row) =>
      (row.city?.toLowerCase() || '').includes(searchValue) ||
      (row.vendor_count?.toString().toLowerCase() || '').includes(searchValue) ||
      (row.tiffin_count?.toString().toLowerCase() || '').includes(searchValue)
    );
    setFilteredData(newFilteredData);
  };

  // Define table columns
  const columns = [
    {
      name: "City",
      selector: row => row.city || 'N/A',
      sortable: true,
    },
    {
      name: "Vendor Count",
      selector: row => row.vendor_count,
      sortable: true,
    },
    {
      name: "Tiffin Count",
      selector: row => row.tiffin_count,
      sortable: true,
    },
  ];

  return (
    <div className="container-fluid my-5">
      <h2 className="header-title mb-3">
        City Based Count
      </h2>

      <div className="card">
        {/* Search Input */}
        <GlobalSearch handleSearch={handleSearch} />
        <DataTable
          columns={columns}
          data={filteredData}
          paginationRowsPerPageOptions={[50, 100, 300]}
          paginationPerPage="50"
          fixedHeader
          pagination
        />
      </div>
    </div>
  );
};

export default DashboardCityCount;










// import React, { useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { Bar } from 'react-chartjs-2';
// import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
// import { fetchAdminDashboardCityCount } from '../../features/dashboardSlice';

// // Register the required Chart.js components
// ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

// const DashboardCityCount = () => {
//   const { dashboardCityCount } = useSelector((state) => state.dashboardSlice);
//   const dispatch = useDispatch();

//   useEffect(() => {
//     dispatch(fetchAdminDashboardCityCount());
//   }, [dispatch]);

//   console.log(dashboardCityCount, 'dashboardCityCount dashboardCityCount');

//   // Ensure the city-based counts exist before mapping
//   const cateringCities = dashboardCityCount?.catering_city_based_counts?.map((item) => item.city || 'Unknown') || [];
//   const cateringCounts = dashboardCityCount?.catering_city_based_counts?.map((item) => parseInt(item.subscription_count)) || [];

//   const tiffinsCities = dashboardCityCount?.tiffins_city_based_counts?.map((item) => item.city || 'Unknown') || [];
//   const tiffinsCounts = dashboardCityCount?.tiffins_city_based_counts?.map((item) => parseInt(item.subscription_count)) || [];

//   // Combine cities to have unique city labels across both datasets
//   const uniqueCities = Array.from(new Set([...cateringCities, ...tiffinsCities]));

//   // Align data to the unique city labels
//   const alignedCateringCounts = uniqueCities.map((city) => {
//     const index = cateringCities.indexOf(city);
//     return index !== -1 ? cateringCounts[index] : 0;
//   });

//   const alignedTiffinsCounts = uniqueCities.map((city) => {
//     const index = tiffinsCities.indexOf(city);
//     return index !== -1 ? tiffinsCounts[index] : 0;
//   });

//   const data = {
//     labels: uniqueCities,
//     datasets: [
//       {
//         label: 'Catering Subscriptions',
//         data: alignedCateringCounts,
//         backgroundColor: 'rgba(75, 192, 192, 0.2)',
//         borderColor: 'rgba(75, 192, 192, 1)',
//         borderWidth: 1
//       },
//       {
//         label: 'Tiffins Subscriptions',
//         data: alignedTiffinsCounts,
//         backgroundColor: 'rgba(153, 102, 255, 0.2)',
//         borderColor: 'rgba(153, 102, 255, 1)',
//         borderWidth: 1
//       }
//     ]
//   };

//   const options = {
//     responsive: true,
//     maintainAspectRatio: false, 
//     aspectRatio: 2,
//     plugins: {
//       legend: {
//         position: 'top'
//       },
//       title: {
//         display: true,
//         text: 'City-Based Subscription Counts'
//       }
//     },
//     scales: {
//       y: {
//         beginAtZero: true
//       }
//     }
//   };

//   return (
//     <>
//       <div className="container-fluid">
//         {/* Your existing dashboard header */}
//       </div>

//       <div className="container-fluid">
//         <div className="row">
//           <div className="col-12">
//             <div className="card">
//               <div className="card-body" style={{ overflowX: 'auto', overflowY: 'hidden', maxHeight: '500px' }}>
//                 <div style={{ width: uniqueCities.length * 60 + 'px', height: '400px' }}>
//                   <Bar data={data} options={options} />
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default DashboardCityCount;
