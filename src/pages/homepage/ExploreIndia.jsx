import React, { useState } from 'react'
import DataTable from 'react-data-table-component';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { tableCustomStyles } from '../../components/tableCustomStyles';
import { FaEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import GlobalSearch from '../../components/common/GlobalSearch';


const rows = [
  {
    personID: 1,
    fullName: "Mumbai",
    image: "https://dashkit.goodthemes.co/assets/img/avatars/profiles/avatar-1.jpg",
  },
  {
    personID: 2,
    fullName: "Bangalore",
    image: "https://dashkit.goodthemes.co/assets/img/avatars/profiles/avatar-1.jpg",
  },
  {
    personID: 3,
    fullName: "Chennai",
    image: "https://dashkit.goodthemes.co/assets/img/avatars/profiles/avatar-1.jpg",
  },
  {
    personID: 4,
    fullName: "Hyderabad",
    image: "https://dashkit.goodthemes.co/assets/img/avatars/profiles/avatar-1.jpg",
  },
  {
    personID: 5,
    fullName: "Pune",
    image: "https://dashkit.goodthemes.co/assets/img/avatars/profiles/avatar-1.jpg",
  },
  {
    personID: 6,
    fullName: "Gurgaon",
    image: "https://dashkit.goodthemes.co/assets/img/avatars/profiles/avatar-1.jpg",
  },
  {
    personID: 7,
    fullName: "Ranchi",
    image: "https://dashkit.goodthemes.co/assets/img/avatars/profiles/avatar-1.jpg",
  },
  {
    personID: 8,
    fullName: "Kolkata",
    image: "https://dashkit.goodthemes.co/assets/img/avatars/profiles/avatar-1.jpg",
  },
  {
    personID: 9,
    fullName: "Goa",
    image: "https://dashkit.goodthemes.co/assets/img/avatars/profiles/avatar-1.jpg",
  },
  {
    personID: 10,
    fullName: "Madurai",
    image: "https://dashkit.goodthemes.co/assets/img/avatars/profiles/avatar-1.jpg",
  },
  {
    personID: 11,
    fullName: "Coiambator",
    image: "https://dashkit.goodthemes.co/assets/img/avatars/profiles/avatar-1.jpg",
  },
];

const ExploreIndia = () => {
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
      name: "ID",
      selector: row => row.personID,
      sortable: true,
    },
    {
      name: "City Name",
      selector: row => row.fullName,
      sortable: true,
    },
    {
      name: "Image Preview",
      cell: row => (
        <a href={row.image} target="_blank" rel="noopener noreferrer">
          Image
        </a>
      ),
      sortable: false,
    },
    {
      name: "Action",
      cell: (row) => (
        <>
          <button className="btn btn-success me-1" onClick={() => handleEdit(row.personID)}>
            <FaEdit />
          </button>
          <button className="btn btn-danger" onClick={() => handleDelete(row.personID)}>
            <MdDeleteForever />
          </button>

          {/* <span className='text-primary cursor-pointer' onClick={() => handleEdit(row.personID)}>Edit / </span> */}
          {/* <span className='text-primary cursor-pointer' onClick={() => handleDelete(row.personID)}> {" "} Delete </span> */}
        </>
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
    },
  ];

  const handleEdit = (event) => {
    handleShow()
    console.log(event, "event");
  }
  const handleDelete = (event) => {
    console.log(event, "event");
  }

  return (
    <>
      <div className="container-fluid my-5">

        <div className="row mb-4 d-flex justify-content-end me-2">
          <button className='btn btn-primary fit-content' variant="primary" onClick={handleShow}>
            Create City
          </button>
        </div>

        <div className="card">

          {/* Search */}
          <GlobalSearch handleSearch={handleSearch} />

          <DataTable
            columns={columns}
            data={data}
            fixedHeader
            pagination
            selectableRows
            customStyles={tableCustomStyles}
          // title="React-Data-Table-Component Tutorial."
          />
        </div>
      </div>

      <br />

      <Modal centered show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Create City</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <label for="name" className="form-label">Add City Name</label>
            <input type="text" className="form-control" placeholder="City Name" />
          </div>
          <div className='mt-3'>
            <label for="image" className="form-label">Add Image</label>
            <input className="form-control" type="file" id="formFile" accept="image/*" />
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

export default ExploreIndia