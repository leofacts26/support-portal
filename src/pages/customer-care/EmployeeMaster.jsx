import React, { useState } from 'react'
import DataTable from 'react-data-table-component';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const rows = [
  {
    personID: 125,
    employeeName: "Rahul",
    phoneNo: '9874587458',
    emailID: 'rahul@gmail.com',
    status: 'Active',
    date: '30/04/12',
  },
];

const EmployeeMaster = () => {
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
      name: "Emp ID",
      selector: row => row.personID,
      sortable: true,
    },
    {
      name: "Employee Name",
      selector: row => row.employeeName,
      sortable: true,
    },
    {
      name: "Phone No",
      selector: row => row.phoneNo,
      sortable: true,
    },
    {
      name: "Email ID",
      selector: row => row.emailID,
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
          <Modal.Title>Create Employee</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <label for="name" className="form-label">Employee Name</label>
            <input type="text" className="form-control" placeholder="Employee Name" />
          </div>

          <div className='mt-2'>
            <label for="name" className="form-label">Phone No</label>
            <input type="text" className="form-control" placeholder="Phone No" />
          </div>

          <div className='mt-2'>
            <label for="name" className="form-label">Email ID</label>
            <input type="email" className="form-control" placeholder="Email ID" />
          </div>

          <div className="mb-3 mt-2">
            <label for="name" className="form-label">Status</label>
            <select className="form-select" data-choices>
              <option>Active</option>
              <option>In/Active</option>
            </select>
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

export default EmployeeMaster