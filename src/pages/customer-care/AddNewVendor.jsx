import React, { useState } from 'react'
import DataTable from 'react-data-table-component';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const rows = [
  {
    personID: 125,
    employeeName: "Rahul",
    userType: 'Admin',
    userName: 'admin@123',
    password: '9864685465',
    status: 'Active',
    date: '30/04/12',
  },
];

const AddNewVendor = () => {
  const [data, setData] = useState(rows);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleSearch = (e) => {
    const searchValue = e.target.value.toLowerCase();
    const newRows = rows.filter((row) => {
      return (
        row.personID.toString().toLowerCase().includes(searchValue)
      );
    });
    setData(newRows);
  };

  const columns = [
    {
      name: "User ID",
      selector: row => row.personID,
      sortable: true,
    },
    {
      name: "Employee",
      selector: row => row.employeeName,
      sortable: true,
    },
    {
      name: "User Type",
      selector: row => row.userType,
      sortable: true,
    },
    {
      name: "User Name",
      selector: row => row.userName,
      sortable: true,
    },
    {
      name: "Password",
      selector: row => row.password,
      sortable: true,
    },
    {
      name: "Status",
      selector: row => row.status,
      sortable: true,
    },
    {
      name: "Date",
      selector: row => row.date,
      sortable: true,
    },
    {
      name: "Action",
      cell: (row) => (
        <>
          <span className='text-primary cursor-pointer' onClick={() => handleEdit(row.personID)}>Edit / </span>
          <span className='text-primary cursor-pointer' onClick={() => handleDelete(row.personID)}> {" "} Delete </span>
        </>
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
    },
  ];

  const handleEdit = (event) => {
    console.log(event, "event");
  }
  const handleDelete = (event) => {
    console.log(event, "event");
  }

  return (
    <>
      <div className="container my-5">

        <div className="row mb-4 d-flex justify-content-end me-2">
          <button className='btn btn-primary fit-content' variant="primary" onClick={handleShow}>
            Add New Vendor +
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

      <Modal centered show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Create</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="mb-3 mt-2">
            <label for="name" className="form-label">Select Vendor type</label>
            <select className="form-select" data-choices>
              <option>Catering</option>
              <option>Tiffin</option>
            </select>
          </div>

          <div className='mt-2'>
            <label for="name" className="form-label">Business Name</label>
            <input type="text" className="form-control" placeholder="Business Name" />
          </div>

          <div className='mt-2'>
            <label for="name" className="form-label">Contact Person</label>
            <input type="email" className="form-control" placeholder="Contact Person" />
          </div>

          <div className='mt-2'>
            <label for="name" className="form-label">Phone No</label>
            <input type="email" className="form-control" placeholder="Phone No" />
          </div>

          <div className='mt-2'>
            <label for="name" className="form-label">Landline No</label>
            <input type="email" className="form-control" placeholder="Landline No" />
          </div>

          <div className='mt-2'>
            <label for="name" className="form-label">Whatsapp No</label>
            <input type="email" className="form-control" placeholder="Whatsapp No" />
          </div>

          <div className='mt-2'>
            <label for="name" className="form-label">Area</label>
            <input type="email" className="form-control" placeholder="Area" />
          </div>

          <div className='mt-2'>
            <label for="name" className="form-label">City</label>
            <input type="email" className="form-control" placeholder="City" />
          </div>

          <div className='mt-2'>
            <label for="name" className="form-label">Pin Code</label>
            <input type="email" className="form-control" placeholder="Pin Code" />
          </div>

          <div className='mt-2'>
            <label for="name" className="form-label">State</label>
            <input type="email" className="form-control" placeholder="State" />
          </div>

        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save & Submit
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default AddNewVendor