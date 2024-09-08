import React, { useEffect, useState } from 'react'
import DataTable from 'react-data-table-component';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useDispatch, useSelector } from 'react-redux';
import { createPriceRanges, fetchpriceRangesList, updatePriceRanges, updateTogglePriceRanges } from '../../features/catering/priceSlice';
import GlobalSearch from '../../components/common/GlobalSearch';
import { tableCustomStyles } from '../../components/tableCustomStyles';
import { FaEdit } from "react-icons/fa";
import { cater_vendor_type } from '../../constants';
import { fetchFooterData } from '../../features/footer';


const initialState = {
  start_price: '',
  end_price: '',
}


const Footer = () => {

  const dispatch = useDispatch()
  const { footerList, isLoading } = useSelector((state) => state.footerSlice)

  const [values, setValues] = useState(initialState)
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [editId, setEditId] = useState(null)

  const [show, setShow] = useState(false);
  const handleClose = () => {
    setShow(false)
    setEditId(null)
  };
  const handleShow = () => setShow(true);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value })
  }

  useEffect(() => {
    dispatch(fetchFooterData());
  }, [dispatch]);


  useEffect(() => {
    if (footerList) {
      const formattedData = footerList?.map((footer, index) => ({
        id: footer?.id,
        category: footer?.category,
        sub_category: footer?.sub_category,
        is_active: footer?.status,
        link: footer?.link,
        vendor_type: footer?.vendor_type,
        category_display_order: footer?.category_display_order,
        updated_at: footer?.updated_at,
      }));
      setData(formattedData);
      setFilteredData(formattedData);
    }
  }, [footerList]);



  const handleSearch = (e) => {
    const searchValue = e.target.value.toLowerCase();
    if (!searchValue) {
      setFilteredData(data);
      return;
    }
    const newFilteredData = data?.filter((row) => {
      return (
        String(row?.id).toLowerCase().includes(searchValue) ||
        (row?.category && String(row.category).toLowerCase().includes(searchValue)) ||
        (row?.vendor_type && String(row.vendor_type).toLowerCase().includes(searchValue)) ||
        (row?.sub_category && String(row.sub_category).toLowerCase().includes(searchValue))
      );
    });
    setFilteredData(newFilteredData);
  };


  const handleStatusToggle = async (item) => {
    const data = {
      ...item,
      is_active: item.is_active === 1 ? 0 : 1
    }
    await dispatch(updateTogglePriceRanges(data))
    await dispatch(fetchFooterData());
  }


  const columns = [
    {
      name: "ID",
      selector: row => row.id,
      sortable: true,
    },
    {
      name: "Category",
      selector: row => row.category,
      sortable: true,
    },
    {
      name: "Sub Category",
      selector: row => row.sub_category,
      sortable: true,
    },
    {
      name: "Link",
      selector: row => row.link,
      sortable: true,
    },
    {
      name: "Vendor Type",
      selector: row => row.vendor_type,
      sortable: true,
    },
    {
      name: "Display Order",
      selector: row => row.category_display_order,
      sortable: true,
    },
    {
      name: "Updated At",
      selector: row => row.updated_at,
      sortable: true,
    },
    {
      name: "Status",
      cell: row => (
        <div className="form-check form-switch">
          <input
            className="form-check-input"
            type="checkbox"
            id={`status-${row.id}`}
            checked={row.is_active === 1}
            onChange={() => handleStatusToggle(row)}
          />
          {/* <label className="form-check-label" htmlFor={`status-${row.id}`}>
            {row.is_active === 1 ? 'Active' : 'Inactive'}
          </label> */}
        </div>
      ),
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

  const handleEdit = (data) => {
    // console.log(data, "data");
    setEditId(data?.id)
    handleShow();
    setValues((prevValues) => ({
      ...prevValues,
      id: data?.id,
      start_price: data?.startprice,
      end_price: data?.endprice,
    }))
  }


  const handleDelete = (event) => {
    console.log(event, "event");
  }


  const onHandleSubmit = async (e) => {
    e.preventDefault();
    const { start_price, end_price } = values;
    const data = {
      vendor_type: cater_vendor_type,
      start_price,
      end_price,
      id: editId
    }

    if (editId === null) {
      await dispatch(createPriceRanges(data))
    } else {
      await dispatch(updatePriceRanges(data))
    }
    await dispatch(fetchFooterData());
    setValues(initialState)
    handleClose()
  }


  return (
    <>
      <div className="container-fluid my-5">



        <div className="row mb-4 me-2">
          <div className="d-flex justify-content-between">
            <h2>Total Catering Budjet List - {footerList?.length} </h2>
            <button className='btn btn-primary fit-content' variant="primary" onClick={handleShow}>
              Create Catering Budget
            </button>
          </div>
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
            <Modal.Title> {editId ? 'Edit Budget' : 'Create Budget'} </Modal.Title>
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
              {isLoading ? 'Loading...' : 'Save Changes'}
            </Button>
          </Modal.Footer>
        </form>
      </Modal>
    </>
  )
}

export default Footer