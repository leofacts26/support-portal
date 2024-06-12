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

const UserMaster = () => {
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
            Create Employee
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
          <div>
            <label for="name" className="form-label">User ID</label>
            <input type="text" className="form-control" placeholder="User ID" />
          </div>

          <div className='mt-2'>
            <label for="name" className="form-label">Employee</label>
            <input type="text" className="form-control" placeholder="Employee" />
          </div>

          <div className='mt-2'>
            <label for="name" className="form-label">User Type</label>
            <input type="email" className="form-control" placeholder="User Type" />
          </div>

          <div className='mt-2'>
            <label for="name" className="form-label">User Name</label>
            <input type="email" className="form-control" placeholder="User Name" />
          </div>

          <div className='mt-2'>
            <label for="name" className="form-label">Password</label>
            <input type="email" className="form-control" placeholder="Password" />
          </div>

          <div className="mb-3 mt-2">
            <label for="name" className="form-label">Status</label>
            <select className="form-select" data-choices>
              <option>Active</option>
              <option>In/Active</option>
            </select>
          </div>

          <div className='mt-2'>
            <label for="name" className="form-label">Date</label>
            <input type="date" className="form-control" placeholder="Date" />
          </div>




        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default UserMaster