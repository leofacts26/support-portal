import React, { useState } from 'react'
import DataTable from 'react-data-table-component';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';


const rows = [
  {
    personID: 1,
    fullName: "test@gmail.com",
  },
  {
    personID: 2,
    fullName: "test1@gmail.com",
  }
];


const NewsLetter = () => {
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
      name: "S.No",
      selector: row => row.personID,
      sortable: true,
    },
    {
      name: "Email Id",
      selector: row => row.fullName,
      sortable: true,
    }
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


        <div className="row mb-4 d-flex justify-content-end me-2 w-75">
          <button className='btn btn-primary fit-content' variant="primary" onClick={handleShow}>
            Send Offers
          </button>
          <button className='btn btn-secondary fit-content ms-2' variant="primary">
            Export
          </button>
        </div>
        <div className="card w-75">
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
          <Modal.Title>Offers Email Templates</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <label for="name" className="form-label">title</label>
            <input type="text" className="form-control" placeholder="City Name" />
          </div>
          <div className='mt-3'>
            <label for="name" className="form-label">Description</label>
            <textarea className="form-control" data-autosize rows={3} placeholder="Try typing something..." defaultValue={""} />
          </div>
          <div className='mt-3'>
            <label for="name" className="form-label">Add Discounts</label>
            <input type="text" className="form-control" placeholder="10% Early Bird Offer" />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Send Email
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default NewsLetter