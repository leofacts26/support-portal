import React, { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCateringVendors, setVendorListId } from '../../features/catering/cateringSlice';
import * as XLSX from "xlsx";
import useExportData from '../../hooks/useExportData';
import toast from 'react-hot-toast';
import Table from 'react-bootstrap/Table';
import { tableCustomStyles } from '../../components/tableCustomStyles';
import GlobalSearch from '../../components/common/GlobalSearch';
import { Link } from 'react-router-dom';
import { cater_vendor_type } from '../../constants';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const VendorList = () => {
  const dispatch = useDispatch();
  const { cateringVendors, cateringVendorsDetail } = useSelector((state) => state.catering);
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const { exportToExcel } = useExportData();

  const [startDate, setStartDate] = useState(null); // Start date for filtering
  const [endDate, setEndDate] = useState(null);     // End date for filtering

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // Effect to fetch vendors on component mount
  useEffect(() => {
    dispatch(fetchCateringVendors(cater_vendor_type));
  }, [dispatch]);

  // Effect to format and set table data when catering vendors are updated
  useEffect(() => {
    if (cateringVendors) {
      const formattedData = cateringVendors.map((catering, index) => ({
        businessID: index + 1,
        id: catering.id,
        vendor_service_name: catering?.vendor_service_name || 'N/A',
        phone_number: catering?.phone_number || 'N/A',
        subscription_type_name: catering?.subscription_type_name || "N/A",
        subscription: catering?.subscription || "N/A",
        status: catering?.status || 'N/A',
        listing_status: catering?.listing_status || 'N/A',
        final_status: catering?.final_status || 'N/A',
        vendor_type: catering?.vendor_type || 'N/A',
        city: catering?.city || 'N/A',
        company_id: catering?.company_id || 'N/A',
        created_at: new Date(catering?.created_at).toLocaleDateString(),
        created_at_timestamp: new Date(catering?.created_at).getTime() // Store as timestamp for easy comparison
      }));
      setData(formattedData);
      setFilteredData(formattedData);
    }
  }, [cateringVendors]);

  // Function to handle global search
  const handleSearch = (e) => {
    const searchValue = e.target.value.toLowerCase();
    if (!searchValue) {
      setFilteredData(data);
      return;
    }
    const newFilteredData = data?.filter((row) => {
      return (
        row.id.toString().toLowerCase().includes(searchValue) ||
        row.phone_number.toString().toLowerCase().includes(searchValue) ||
        row.subscription_type_name.toString().toLowerCase().includes(searchValue) ||
        row.subscription.toString().toLowerCase().includes(searchValue) ||
        row.status.toString().toLowerCase().includes(searchValue) ||
        row.listing_status.toString().toLowerCase().includes(searchValue) ||
        row.final_status.toString().toLowerCase().includes(searchValue) ||
        row.vendor_type.toString().toLowerCase().includes(searchValue) ||
        row.city.toString().toLowerCase().includes(searchValue) ||
        row.company_id.toString().toLowerCase().includes(searchValue) ||
        row.created_at.toString().toLowerCase().includes(searchValue) ||
        row.vendor_service_name.toLowerCase().includes(searchValue)
      );
    });
    setFilteredData(newFilteredData);
  };

  // Function to handle date range change and filter data
  const handleDateRangeChange = (dates) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);

    if (start && end) {
      // Filter data based on the selected date range
      const newFilteredData = data.filter(row => {
        const createdDateTimestamp = row.created_at_timestamp;
        return createdDateTimestamp >= start.getTime() && createdDateTimestamp <= end.getTime();
      });
      setFilteredData(newFilteredData);
    } else {
      setFilteredData(data);
    }
  };

  const onHandleCateringDetails = (row) => {
    handleShow();
    dispatch(setVendorListId(row?.id));
  };

  const columns = [
    { name: "ID", selector: row => row.id, sortable: true },
    { name: "company id", selector: row => row.company_id, sortable: true },
    { name: "Business Name", selector: row => row.vendor_service_name, sortable: true },
    { name: "Phone No", selector: row => row.phone_number, sortable: true },
    { name: "Plan type", selector: row => row.subscription_type_name, sortable: true },
    { name: "Subscription", selector: row => row.subscription, sortable: true },
    { name: "Status", selector: row => row.status, sortable: true },
    { name: "listing status", selector: row => row.listing_status, sortable: true },
    { name: "Final status", selector: row => row.final_status, sortable: true },
    { name: "City", selector: row => row.city, sortable: true },
    { name: "vendor type", selector: row => row.vendor_type, sortable: true },
    { name: "Start Date", selector: row => row.created_at, sortable: true },
    {
      name: "Details",
      cell: (row) => (
        <>
          {row?.company_id ? (
            <Link onClick={() => onHandleCateringDetails(row)} to={`/vendor-list/${row.id}?company_id=${row.company_id}`} className='text-primary cursor-pointer'>
              {row.company_id ? 'View' : 'N/A'}
            </Link>
          ) : (
            <span>N/A</span>
          )}
        </>
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
    },
  ];

  return (
    <>
      <div className="container-fluid my-5">
        <h2>Total Registered Caterers - {cateringVendors?.length}</h2>

        {/* Date Range Picker */}
        <div className="d-flex mb-4 align-items-center">
          <label className="me-2">Date Range: </label>
          <DatePicker
            selectsRange
            startDate={startDate}
            endDate={endDate}
            onChange={handleDateRangeChange}
            isClearable={true}
            dateFormat="dd/MM/yyyy"
            className="form-control"
            placeholderText="Select date range"
          />
        </div>

        <div className="row mb-4 d-flex justify-content-end me-2">
          <button className='btn btn-secondary fit-content' variant="primary" onClick={() => exportToExcel(filteredData, 'vendorlist')}>
            Export
          </button>
        </div>

        <div className="card">
          <GlobalSearch handleSearch={handleSearch} />
          <DataTable
            columns={columns}
            data={filteredData}
            fixedHeader
            pagination
            selectableRows
            customStyles={tableCustomStyles}
          />
        </div>
      </div>
    </>
  );
};

export default VendorList;
