import React, { useEffect, useState } from 'react'
import DataTable from 'react-data-table-component';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useDispatch, useSelector } from 'react-redux';
import {  fetchCateringVendors, setVendorListId } from '../../features/catering/cateringSlice';
import * as XLSX from "xlsx";
import useExportData from '../../hooks/useExportData';
import toast from 'react-hot-toast';
import Table from 'react-bootstrap/Table';
import { tableCustomStyles } from '../../components/tableCustomStyles';
import GlobalSearch from '../../components/common/GlobalSearch';
import { Link } from 'react-router-dom'
import { cater_vendor_type } from '../../constants';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';



const VendorList = () => {
  const dispatch = useDispatch()
  const { cateringVendors, cateringVendorsDetail } = useSelector((state) => state.catering)
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const { exportToExcel } = useExportData()
  // console.log(cateringVendorsDetail.vendorDetails, "cateringVendorsDetail");
  const { foodTypes, kitchenTypes, mealTimes, serviceTypes, servingTypes, vendorDetails } = cateringVendorsDetail;

  // const { token } = useSelector((state) => state.authSlice)


  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    dispatch(fetchCateringVendors(cater_vendor_type));
  }, [dispatch]);


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
      }));
      setData(formattedData);
      setFilteredData(formattedData);
    }
  }, [cateringVendors]);


  const handleSearch = (e) => {
    const searchValue = e.target.value.toLowerCase().trim();
    if (!searchValue) {
      setFilteredData(data);
      return;
    }
  
    // Split the input value into multiple keywords based on commas or spaces
    const searchKeywords = searchValue.split(/[, ]+/).filter(Boolean);
  
    const newFilteredData = data.filter((row) => {
      // Check if any of the keywords match the values in the row
      return searchKeywords.some((keyword) =>
        row.id.toString().toLowerCase().includes(keyword) ||
        row.phone_number.toString().toLowerCase().includes(keyword) ||
        row.subscription_type_name.toString().toLowerCase().includes(keyword) ||
        row.subscription.toString().toLowerCase().includes(keyword) ||
        row.status.toString().toLowerCase().includes(keyword) ||
        row.listing_status.toString().toLowerCase().includes(keyword) ||
        row.final_status.toString().toLowerCase().includes(keyword) ||
        row.vendor_type.toString().toLowerCase().includes(keyword) ||
        row.city.toString().toLowerCase().includes(keyword) ||
        row.company_id.toString().toLowerCase().includes(keyword) ||
        row.created_at.toString().toLowerCase().includes(keyword) ||
        row.vendor_service_name.toLowerCase().includes(keyword)
      );
    });
  
    setFilteredData(newFilteredData);
  };
  

  const onHandleCateringDetails = (row) => {
    handleShow()
    dispatch(setVendorListId(row?.id));
  }

  const columns = [
    {
      name: "ID",
      selector: row => row.id,
      sortable: true,
    },
    {
      name: "company id",
      selector: row => row.company_id,
      sortable: true,
    },
    {
      name: "Business Name",
      selector: row => row.vendor_service_name,
      sortable: true,
    },
    {
      name: "Phone No",
      selector: row => row.phone_number,
      sortable: true,
    },
    {
      name: "Plan type",
      selector: row => row.subscription_type_name,
      sortable: true,
    },
    {
      name: "Subscription",
      selector: row => row.subscription,
      sortable: true,
    },
    {
      name: "Status",
      selector: row => row.status,
      sortable: true,
    },
    {
      name: "listing status",
      selector: row => row.listing_status,
      sortable: true,
    },
    {
      name: "Final status",
      selector: row => row.final_status,
      sortable: true,
    },
    {
      name: "City",
      selector: row => row.city,
      sortable: true,
    },
    {
      name: "vendor type",
      selector: row => row.vendor_type,
      sortable: true,
    },
    {
      name: "Start Date",
      selector: row => row.created_at,
      sortable: true,
    },
    {
      name: "Details",
      cell: (row) => (
        <>
          {row?.company_id ? (
            <Link
              onClick={() => onHandleCateringDetails(row)}
              to={`/vendor-list/${row.id}?company_id=${row.company_id}`}
              className='text-primary cursor-pointer'
            >
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

        <h2>Total Registered Caterers - {cateringVendors?.length} </h2>
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

      <br />


    </>
  )
}

export default VendorList