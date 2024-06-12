import React, { useState } from 'react'
import DataTable from 'react-data-table-component';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';


const rows = [
  {
    personID: 1,
    sharedBy: 'Sudheer',
    sharedVia: 'SMS',
    phone: '9854654646',
    date: '23/05/12',
    time: '10:26 AM',
    emailID: 'rahul@gmail.com',
  }
];


const ShareLinks = () => {
  const [data, setData] = useState(rows);
  const [subCatdata, setSubCatData] = useState(rows);

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);



  const [showSubCategory, setSubCategory] = useState(false);
  const handleSubClose = () => setSubCategory(false);
  const handleSubShow = () => setSubCategory(true);


  const handleSearch = (e) => {
    const searchValue = e.target.value.toLowerCase();
    const newRows = rows.filter((row) => {
      return (
        row.personID.toString().toLowerCase().includes(searchValue) ||
        row.mainCategory.toLowerCase().includes(searchValue)
      );
    });
    setData(newRows);
  };

  const handleSubCategorySearch = (e) => {
    const searchValue = e.target.value.toLowerCase();
    const newRows = rows.filter((row) => {
      return (
        row.personID.toString().toLowerCase().includes(searchValue) ||
        row.mainCategory.toLowerCase().includes(searchValue)
      );
    });
    setSubCatData(newRows);
  };

  const columns = [
    {
      name: "ID",
      selector: row => row.personID,
      sortable: true,
    },
    {
      name: "Shared By",
      selector: row => row.sharedBy,
      sortable: true,
    },
    {
      name: "Shared via",
      selector: row => row.sharedVia,
      sortable: true,
    },
    {
      name: "Phone",
      selector: row => row.phone,
      sortable: true,
    },
    {
      name: "Date",
      selector: row => row.date,
      sortable: true,
    },
    {
      name: "Time",
      selector: row => row.time,
      sortable: true,
    },
    {
      name: "Email ID",
      selector: row => row.emailID,
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


  const columnsSubCategory = [
    {
      name: "ID",
      selector: row => row.personID,
      sortable: true,
    },
    {
      name: "Main Category",
      selector: row => row.mainCategory,
      sortable: true,
    },
    {
      name: "Sub Category",
      selector: row => row.subCategory,
      sortable: true,
    },
    {
      name: "Image",
      cell: row => (
        <a href={row.image} target="_blank" rel="noopener noreferrer">
          Image
        </a>
      ),
      sortable: false,
    },
    {
      name: "Status",
      selector: row => row.status,
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
            Create Link
          </button>

          <button className='btn btn-primary fit-content ms-3' variant="primary" onClick={handleSubShow}>
            Share link
          </button>
        </div>

        <hr />

        <h2>Total Main Categories - 6</h2>

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

        <hr />

      </div>

      <br />

      <Modal centered show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Create Share Link</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <label for="name" className="form-label">Android App Link</label>
            <input type="text" className="form-control" placeholder="Android App Link" />
          </div>
          <div className='mt-3'>
            <label for="name" className="form-label">IOS App Link</label>
            <input type="text" className="form-control" placeholder="IOS App Link" />
          </div>
          <div> className='mt-3'
            <label for="name" className="form-label">Web Portal vendor Link</label>
            <input type="text" className="form-control" placeholder="Web Portal vendor Link" />
          </div>

        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            update
          </Button>
        </Modal.Footer>
      </Modal>



      <Modal centered show={showSubCategory} onHide={handleSubClose}>
        <Modal.Header closeButton>
          <Modal.Title>Share Link</Modal.Title>
        </Modal.Header>
        <Modal.Body>

          <div>
            <label for="name" className="form-label">Share Via </label>
            <input type="text" className="form-control" placeholder="Via SMS / Whatsapp/ Email" />
            <input type="text" className="form-control mt-3" placeholder="Enter Phone No / Email ID" />
          </div>

        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleSubClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSubClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default ShareLinks