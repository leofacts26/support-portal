import React, { useState } from 'react'
import DataTable from 'react-data-table-component';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const rows = [
  {
    personID: 1,
    roleType: "Manager",
    accessMemu: 'Share Links/ Follow Ups',
    status: 'InActive',
    date: '30/04/12',
  },
];

const RolesAccess = () => {
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
      name: "ID",
      selector: row => row.personID,
      sortable: true,
    },
    {
      name: "Role Type",
      selector: row => row.roleType,
      sortable: true,
    },
    {
      name: "Access Menu",
      selector: row => row.accessMemu,
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
            Create
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
          <Modal.Title>Create Roles and Access</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="mb-3">
            <label for="name" className="form-label">Create Role</label>
            <select className="form-select" data-choices>
              <option>Manager</option>
              <option>Agent</option>
              <option>Executive</option>
            </select>
          </div>

          <div className="mb-3">
            <label for="name" className="form-label">Access Menu</label>
            <select className="form-select" data-choices>
              <option>Share Links</option>
              <option>Follow Ups</option>
              <option>Support Ticket</option>
            </select>
          </div>

          <div className="mb-3">
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

export default RolesAccess