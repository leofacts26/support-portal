import React, { useState } from 'react'
import DataTable from 'react-data-table-component';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';


const rows = [
  {
    service: "Catering",
    planName: "Branded",
    subscription: "Monthly",
    planCost: 4000,
    Status: 'Active',
    color: '#ffffff',
    benifits: 'View',
  }
];

const Subscriptions = () => {
  const [data, setData] = useState(rows);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

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
      name: "Service",
      selector: row => row.service,
      sortable: true,
    },
    {
      name: "Plan Name",
      selector: row => row.planName,
      sortable: true,
    },
    {
      name: "subscription",
      selector: row => row.subscription,
      sortable: true,
    },
    {
      name: "planCost",
      selector: row => row.planCost,
      sortable: true,
    },
    {
      name: "Status",
      selector: row => row.Status,
      sortable: true,
    },
    {
      name: "color",
      selector: row => row.color,
      sortable: true,
    },
    {
      name: "benifits",
      selector: row => row.benifits,
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
            Create Subscription
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
          <Modal.Title>Create Subscription Plan</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <label for="name" className="form-label">Choose Service</label>
            <select className="form-select" data-choices>
              <option>catering</option>
              <option>Tiffin</option>
            </select>
          </div>

          <div className='mt-3'>
            <label for="name" className="form-label">Enter Plan Name</label>
            <input type="text" className="form-control" placeholder="Enter Plan Name" />
          </div>

          <div className='mt-3'>
            <label for="name" className="form-label">Subscription</label>
            <select className="form-select" data-choices>
              <option>Yearly</option>
              <option>Monthly</option>
            </select>
          </div>

          <div className='mt-3'>
            <label for="name" className="form-label">Plan Cost</label>
            <input type="text" className="form-control" placeholder="Plan Cost" />
          </div>

          <div className='mt-3'>
            <label for="name" className="form-label">Color Picker</label>
            <input type="color" className="form-control" id="colorPicker" placeholder="Choose a color" />
          </div>

          <div className='mt-3'>
            <label for="name" className="form-label">Benifits</label>
            <textarea class="form-control" data-autosize rows="1" placeholder="Try typing something..."></textarea>
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

export default Subscriptions