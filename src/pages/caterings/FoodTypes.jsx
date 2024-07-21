import React, { useEffect, useState } from 'react'
import DataTable from 'react-data-table-component';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCateringFoodTypes } from '../../features/catering/cateringSlice';


const rows = [
  {
    foodTypes: "Veg",
    status: 'active',
    order: 1
  },
  {
    foodTypes: "Non Veg",
    status: 'active',
    order: 2
  },
];

const FoodTypes = () => {
  const dispatch = useDispatch()
  const { cateringFoodTypes } = useSelector((state) => state.catering)
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    dispatch(fetchCateringFoodTypes());
  }, [dispatch]);


  useEffect(() => {
    if (cateringFoodTypes) {
      const formattedData = cateringFoodTypes.map((foodType, index) => ({
        name: foodType?.name,
        status: foodType?.is_active,
        order: foodType?.id,
      }));
      setData(formattedData);
      setFilteredData(formattedData);
    }
  }, [cateringFoodTypes]);


  const handleSearch = (e) => {
    const searchValue = e.target.value.toLowerCase();
    if (!searchValue) {
      setFilteredData(data);
      return;
    }
    const newFilteredData = data.filter((row) => {
      return (
        row?.name?.toLowerCase().includes(searchValue) ||
        row?.status?.toLowerCase().includes(searchValue) ||
        row?.order?.toLowerCase().includes(searchValue)
      );
    });
    setFilteredData(newFilteredData);
  };


  const columns = [
    {
      name: "Food Type",
      selector: row => row.name,
      sortable: true,
    },
    {
      name: "Status",
      // selector: row => row.status,
      cell: (row) => (
        <>
          <div class="form-check form-switch">
            <input class="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckChecked" checked={row?.is_active} />
          </div>
        </>
      ),
      sortable: true,
    },
    {
      name: "Order",
      selector: row => row.order,
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


  console.log(cateringFoodTypes, "cateringFoodTypes");

  return (
    <>
      <div className="container my-5">

        <div className="row mb-4 d-flex justify-content-end me-2">
          <button className='btn btn-primary fit-content' variant="primary" onClick={handleShow}>
            Add Food Types
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
          <Modal.Title>Create Food Types</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <label for="name" className="form-label">Add Food Types</label>
            <input type="text" className="form-control" placeholder="Food Types" />
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

export default FoodTypes