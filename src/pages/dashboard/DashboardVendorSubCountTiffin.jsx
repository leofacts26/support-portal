
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import DataTable from 'react-data-table-component';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import GlobalSearch from '../../components/common/GlobalSearch';
import { fetchDashboardVendorSubCountTiffin } from '../../features/dashboardSlice';


const DashboardVendorSubCountTiffin = () => {
    const dispatch = useDispatch();
    const { vendorTiffinSubCount, isLoading } = useSelector((state) => state.dashboardSlice);

    const [data, setData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);

    useEffect(() => {
        dispatch(fetchDashboardVendorSubCountTiffin());
    }, [dispatch]);

    useEffect(() => {
        if (vendorTiffinSubCount) {
            setData(vendorTiffinSubCount);
            setFilteredData(vendorTiffinSubCount);
        }
    }, [vendorTiffinSubCount]);

    // Handle search
    const handleSearch = (e) => {
        const searchValue = e.target.value.toLowerCase();
        if (!searchValue) {
            setFilteredData(data);
            return;
        }
        const newFilteredData = data.filter((row) =>
            row.subscription_type_name.toLowerCase().includes(searchValue) ||
            row.vendor_count.toString().toLowerCase().includes(searchValue)
        );
        setFilteredData(newFilteredData);
    };


     // Helper function for badge classes
     const getBadgeClass = (type, count) => {
        let badgeClass = "badge ";
        switch (type) {
            case "normal":
                badgeClass += count > 0 ? "text-bg-normal-bage" : "text-bg-normal-bage";
                break;
            case "popular":
                badgeClass += count > 0 ? "text-bg-popular-bage" : "text-bg-popular-bage";
                break;
            case "recomended":
                badgeClass += count > 0 ? "text-bg-default-bage" : "text-bg-default-bage";
                break;
            default:
                badgeClass += "text-bg-popular-bage";
                break;
        }
        return badgeClass;
    };

    const columns = [
        {
            name: "Subscription Type",
            cell: (row) => {
                // Apply the badge class based on subscription_type_name and vendor_count
                const badgeClass = getBadgeClass(row.subscription_type_name, row.vendor_count);
                return (
                    <span className={badgeClass}>
                        {row.subscription_type_name || "Unknown Type"}
                    </span>
                );
            },
            sortable: true,
        },
        {
            name: "Vendor Count",
            selector: (row) => row.vendor_count,
            sortable: true,
        },
    ];



    return (
        <div className="container-fluid my-5">
            <h2 className="header-title mb-3">
                Vendor Subscription Count (Tiffin)
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

export default DashboardVendorSubCountTiffin;




























// import React, { useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { Bar } from 'react-chartjs-2';
// import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
// import { fetchDashboardVendorSubCountTiffin } from '../../features/dashboardSlice';

// // Register the required Chart.js components
// ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

// const DashboardVendorSubCountTiffin = () => {
//     const { vendorTiffinSubCount } = useSelector((state) => state.dashboardSlice);
//     const dispatch = useDispatch();

//     useEffect(() => {
//         dispatch(fetchDashboardVendorSubCountTiffin());
//     }, [dispatch]);

//     // Prepare data for the chart
//     const labels = vendorTiffinSubCount.map(item => item.subscription_type_name);
//     const dataValues = vendorTiffinSubCount.map(item => parseInt(item.vendor_count));

//     const data = {
//         labels: labels,
//         datasets: [
//             {
//                 label: 'Vendor Count',
//                 data: dataValues,
//                 backgroundColor: 'rgba(75, 192, 192, 0.6)',
//                 borderColor: 'rgba(75, 192, 192, 1)',
//                 borderWidth: 1,
//             }
//         ],
//     };

//     const options = {
//         responsive: true,
//         aspectRatio: 2,
//         plugins: {
//             legend: {
//                 position: 'top',
//             },
//             title: {
//                 display: true,
//                 text: 'Admin dashboard vendor subscription counts By Tiffin',
//             },
//         },
//     };

//     return (
//         <>
//             <div className="container-fluid">
//                 {/* Your existing dashboard header */}
//             </div>

//             <div className="container-fluid">
//                 <div className="row">
//                     <div className="col-12">
//                         <div className="card">
//                             <div className="card-body">
//                                 <Bar data={data} options={options} />
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </>
//     );
// };

// export default DashboardVendorSubCountTiffin;
