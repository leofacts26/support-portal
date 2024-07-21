import React, { useState } from 'react'
import DataTable from 'react-data-table-component';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useSelector, useDispatch } from 'react-redux'

const rows = [
  {
    personID: 1,
    mainCategory: "Mumbai",
    image: "https://dashkit.goodthemes.co/assets/img/avatars/profiles/avatar-1.jpg",
    status: "Active",
  },
  {
    personID: 2,
    mainCategory: "Bangalore",
    image: "https://dashkit.goodthemes.co/assets/img/avatars/profiles/avatar-1.jpg",
    status: "De Active",
  }
];


const rowsSubCategory = [
  {
    personID: 1,
    mainCategory: "Mumbai",
    subCategory: "Mumbai",
    image: "https://dashkit.goodthemes.co/assets/img/avatars/profiles/avatar-1.jpg",
    status: "Active",
  },
  {
    personID: 2,
    mainCategory: "Bangalore",
    subCategory: "Bangalore",
    image: "https://dashkit.goodthemes.co/assets/img/avatars/profiles/avatar-1.jpg",
    status: "De Active",
  }
];

const Cuisines = () => {
  const [data, setData] = useState(rows);
  const [subCatdata, setSubCatData] = useState(rowsSubCategory);

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // const count = useSelector((state) => state.cuisine.value)

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
      name: "Main Category",
      selector: row => row.mainCategory,
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
            Create Main Category
          </button>

          <button className='btn btn-primary fit-content ms-3' variant="primary" onClick={handleSubShow}>
            Create Sub Category
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

        <h2>Total Sub Categories - 26</h2>

        <div className="card">
          <input
            type="search"
            className="form-control-sm border ps-3 py-3"
            placeholder="Search"
            onChange={handleSubCategorySearch}
          />
          <DataTable
            columns={columnsSubCategory}
            data={subCatdata}
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
          <Modal.Title>Add Main Category</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <label for="name" className="form-label">Add Category</label>
            <input type="text" className="form-control" placeholder="Category" />
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



      <Modal centered show={showSubCategory} onHide={handleSubClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Sub Category</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="mb-3">
            <label for="name" className="form-label">Select Main category</label>
            <select className="form-select" data-choices>
              <option>My first option</option>
              <option>Another option</option>
              <option>Third option is here</option>
            </select>
          </div>

          <div>
            <label for="name" className="form-label">Add Sub Category</label>
            <input type="text" className="form-control" placeholder="Sub Category" />
          </div>
          <div className='mt-3'>
            <label for="image" className="form-label">Add Image</label>
            <input className="form-control" type="file" id="formFile" accept="image/*" />
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

export default Cuisines