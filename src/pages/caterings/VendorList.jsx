import React, { useEffect, useState } from 'react'
import DataTable from 'react-data-table-component';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCateringVendors } from '../../features/catering/cateringSlice';
import * as XLSX from "xlsx";


const rows = [
  {
    businessID: 1,
    fullName: "Mumbai",
    phoneNo: "7896587458",
    planType: "Branded",
    subscription: "Annual",
    status: "Active",
    city: "Bangalore",
    startDate: "03/19/2024",
  }
];


const VendorList = () => {
  const dispatch = useDispatch()
  const { cateringVendors } = useSelector((state) => state.catering)
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);

  // console.log(cateringVendors, "cateringVendors");
  

  useEffect(() => {
    dispatch(fetchCateringVendors());
  }, [dispatch]);

  useEffect(() => {
    if (cateringVendors) {
      const formattedData = cateringVendors.map((catering, index) => ({
        businessID: index + 1,
        fullName: catering?.vendor_service_name || 'N/A',
        phoneNo: catering?.phone_number || 'N?A',
        planType: "N/A",
        subscription: "N/A",
        status: catering?.status || 'N/A',
        city: catering?.city || 'N/A',
        startDate: new Date(catering?.created_at).toLocaleDateString(),
        // sNO: index + 1,
        // name: catering?.vendor_service_name,
        // role: catering?.role || 'NA',
        // phoneNo: catering?.phone_number,
        // DateTime: new Date(catering?.created_at).toLocaleDateString(),
        // EmailID: catering.email,
      }));
      setData(formattedData);
      setFilteredData(formattedData);
    }
  }, [cateringVendors]);


  const handleSearch = (e) => {
    const searchValue = e.target.value.toLowerCase();
    if (!searchValue) {
      setFilteredData(data);
      return;
    }
    const newFilteredData = data?.filter((row) => {
      return (
        row.businessID.toString().toLowerCase().includes(searchValue) ||
        row.fullName.toLowerCase().includes(searchValue)
      );
    });
    setFilteredData(newFilteredData);
  };



  const columns = [
    {
      name: "Business ID",
      selector: row => row.businessID,
      sortable: true,
    },
    {
      name: "Business Name",
      selector: row => row.fullName,
      sortable: true,
    },
    {
      name: "Phone No",
      selector: row => row.phoneNo,
      sortable: true,
    },
    {
      name: "Plan type",
      selector: row => row.planType,
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
      name: "City",
      selector: row => row.city,
      sortable: true,
    },
    {
      name: "Start Date",
      selector: row => row.startDate,
      sortable: true,
    },
    {
      name: "Details",
      cell: (row) => (
        <>
          <span className='text-primary cursor-pointer'>View</span>
        </>
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
    },
  ];


  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(filteredData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
    XLSX.writeFile(workbook, "vendorlist.xlsx");
  };
  


  return (
    <>
      <div className="container-fluid my-5">


        <h2>Total Registered Caterers - {cateringVendors?.length} </h2>
        <div className="row mb-4 d-flex justify-content-end me-2">
          <button className='btn btn-secondary fit-content' variant="primary" onClick={exportToExcel}>
            Export
          </button>
        </div>

        <div className="card">
          <input
            type="search"
            className="form-control-sm border ps-3 py-3"
            placeholder="Search"
            onChange={handleSearch}
          />
          <DataTable
            columns={columns}
            data={filteredData}
            fixedHeader
            pagination
            selectableRows
          // title="React-Data-Table-Component Tutorial."
          />
        </div>
      </div>

      <br />
    </>
  )
}

export default VendorList