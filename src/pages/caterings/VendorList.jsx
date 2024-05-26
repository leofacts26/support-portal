import React, { useState } from 'react'
import DataTable from 'react-data-table-component';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const rows = [
  {
    personID: 1,
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
  const [data, setData] = useState(rows);
  const [show, setShow] = useState(false);

  const handleSearch = (e) => {
    const searchValue = e.target.value.toLowerCase();
    const newRows = rows.filter((row) => {
      return (
        row.personID.toString().toLowerCase().includes(searchValue) ||
        row.fullName.toLowerCase().includes(searchValue)
      );
    });
    setData(newRows);
  };

  const columns = [
    {
      name: "Business ID",
      selector: row => row.personID,
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


  return (
    <>
      <div className="container my-5">


        <h2>Total Registered Caterers - 18776</h2>
        <div className="row mb-4 d-flex justify-content-end me-2">
          <button className='btn btn-secondary fit-content' variant="primary">
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
            data={data}
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