import React, { useEffect, useState } from 'react'
import DataTable from 'react-data-table-component';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useDispatch, useSelector } from 'react-redux';
import { createPriceRanges, fetchpriceRangesList } from '../../features/catering/priceSlice';
import GlobalSearch from '../../components/common/GlobalSearch';
import { tableCustomStyles } from '../../components/tableCustomStyles';
import { FaEdit } from "react-icons/fa";


// const rows = [
//   {
//     personID: 1,
//     minimum: "Rs. 50",
//     maximum: "Rs. 100",
//     image: "https://dashkit.goodthemes.co/assets/img/avatars/profiles/avatar-1.jpg",
//   }
// ];

const initialState = {
  start_price: '',
  end_price: '',
}


const BudjetFilter = () => {

  const dispatch = useDispatch()
  const { priceRangesList, isLoading } = useSelector((state) => state.priceranges)

  const [values, setValues] = useState(initialState)
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value })
  }

  useEffect(() => {
    dispatch(fetchpriceRangesList());
  }, [dispatch]);


  useEffect(() => {
    if (priceRangesList) {
      const formattedData = priceRangesList?.map((price, index) => ({
        id: price?.id,
        startprice: price?.start_price,
        endprice: price?.end_price,
      }));
      setData(formattedData);
      setFilteredData(formattedData);
    }
  }, [priceRangesList]);



  const handleSearch = (e) => {
    const searchValue = e.target.value.toLowerCase();
    if (!searchValue) {
      setFilteredData(data);
      return;
    }
    const newFilteredData = data?.filter((row) => {
      return (
        String(row?.id).toLowerCase().includes(searchValue) ||
        (row?.startprice && String(row.startprice).toLowerCase().includes(searchValue)) ||
        (row?.endprice && String(row.endprice).toLowerCase().includes(searchValue))
      );
    });
    setFilteredData(newFilteredData);
  };


  const columns = [
    {
      name: "ID",
      selector: row => row.id,
      sortable: true,
    },
    {
      name: "Start Price",
      selector: row => row.startprice,
      sortable: true,
    },
    {
      name: "End Price",
      selector: row => row.endprice,
      sortable: true,
    },
    {
      name: "Action",
      cell: (row) => (
        <>
          <button className="btn btn-success me-1" onClick={() => handleEdit(row)}>
            <FaEdit />
          </button>
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


  const onHandleSubmit = async (e) => {
    e.preventDefault();
    const { start_price, end_price } = values;
    const data = {
      start_price,
      end_price
    }
    await dispatch(createPriceRanges(data))
    setValues(initialState)
    handleClose()
  }


  return (
    <>
      <div className="container-fluid my-5">

        <div className="row mb-4 d-flex justify-content-end me-2">
          <button className='btn btn-primary fit-content' variant="primary" onClick={handleShow}>
            Create Budget
          </button>
        </div>

        <div className="card">
          <GlobalSearch handleSearch={handleSearch} />
          <DataTable
            columns={columns}
            data={filteredData}
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
        <form onSubmit={onHandleSubmit}>
          <Modal.Header closeButton>
            <Modal.Title>Create Budget</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="row">
              <div className='col-6'>
                <label for="name" className="form-label"> <b>Start Price</b> </label>
                <input type="text" className="form-control" placeholder="Rs. 100" name="start_price" required onChange={handleChange} value={values.start_price} />
              </div>
              <div className='col-6'>
                <label for="name" className="form-label"> <b>End Price</b> </label>
                <input type="text" className="form-control" placeholder="Rs. 200" name="end_price" required onChange={handleChange} value={values.end_price} />
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" type='submit'>
              {isLoading ? 'Loading...' : 'Add Budjet'}
            </Button>
          </Modal.Footer>
        </form>
      </Modal>
    </>
  )
}

export default BudjetFilter