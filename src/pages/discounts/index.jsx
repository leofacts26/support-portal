import React, { useEffect, useState } from 'react'
import DataTable from 'react-data-table-component';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCouponList } from '../../features/catering/couponSlice';
import GlobalSearch from '../../components/common/GlobalSearch';
import { tableCustomStyles } from '../../components/tableCustomStyles';
import { FaEdit } from "react-icons/fa";


// const rows = [
//   {
//     discount_name: '',
//     vendor_type: '',
//     coupon_code: '',
//     valid_from: '',
//     valid_till: '',
//     status: '',
//     coupon_type: '',
//     discount_percent: '',
//     discount_price: '',
//   }
// ];


const initialState = {
  discount_name: '',
  vendor_type: '',
  coupon_code: '',
  valid_from: '',
  valid_till: '',
  status: '',
  coupon_type: '',
  discount_percent: '',
  discount_price: '',
}


// const rowsSubCategory = [
//   {
//     ID: 1,
//     vendorID: 23345,
//     coupons: "MAR3024",
//     discount: "50%",
//     validForm: "3/15/24",
//     validTill: "3/31/24",
//     status: "Active",
//     timeToUse: 1,
//   }
// ];

const Discounts = () => {
  const dispatch = useDispatch()
  const { couponsList, isLoading } = useSelector((state) => state.coupons)


  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  // const [subCatdata, setSubCatData] = useState(rowsSubCategory);

  const [values, setValues] = useState(initialState)

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [showSubCategory, setSubCategory] = useState(false);
  const handleSubClose = () => setSubCategory(false);
  const handleSubShow = () => setSubCategory(true);

  console.log(couponsList, "couponsList couponsList couponsList");


  useEffect(() => {
    dispatch(fetchCouponList())
  }, [])


  useEffect(() => {
    if (couponsList) {
      const formattedData = couponsList?.map((item, index) => ({
        id: item?.id,
        discount_name: item?.discount_name,
        vendor_type: item?.vendor_type,
        coupon_code: item?.coupon_code,
        valid_from: item?.valid_from,
        valid_till: item?.valid_till,
        status: item?.status,
        coupon_type: item?.coupon_type,
        discount_percent: item?.discount_percent,
        discount_price: item?.discount_price,
      }));
      setData(formattedData);
      setFilteredData(formattedData);
    }
  }, [couponsList]);


  const handleSearch = (e) => {
    const searchValue = e.target.value.toLowerCase();
    // const newRows = rows.filter((row) => {
    //   return (
    //     row.mainCategory.toLowerCase().includes(searchValue)
    //   );
    // });
    // setData(newRows);
  };

  // const handleSubCategorySearch = (e) => {
  //   const searchValue = e.target.value.toLowerCase();
  //   const newRows = rows.filter((row) => {
  //     return (
  //       row.mainCategory.toLowerCase().includes(searchValue)
  //     );
  //   });
  //   setSubCatData(newRows);
  // };

  const onHandleChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value })
  }

  const columns = [
    {
      name: "S.No",
      selector: row => row.id,
      sortable: true,
    },
    {
      name: "Discount Name",
      selector: row => row.discount_name,
      sortable: true,
    },
    {
      name: "Vendor Type",
      selector: row => row.vendor_type,
      sortable: true,
    },
    {
      name: "Coupon Code",
      selector: row => row.coupon_code,
      sortable: true,
    },
    {
      name: "Valid From",
      selector: row => row.valid_from,
      sortable: true,
    },
    {
      name: "Valid Till",
      selector: row => row.valid_till,
      sortable: true,
    },
    {
      name: "coupon type",
      selector: row => row.coupon_type,
      sortable: true,
    },
    {
      name: "discount_percent",
      selector: row => row.discount_percent,
      sortable: true,
    },
    {
      name: "discount_price",
      selector: row => row.discount_price,
      sortable: true,
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


  // const vendorCouponList = [
  //   {
  //     name: "S.No",
  //     selector: row => row.ID,
  //     sortable: true,
  //   },
  //   {
  //     name: "vendor ID",
  //     selector: row => row.vendorID,
  //     sortable: true,
  //   },
  //   {
  //     name: "coupons",
  //     selector: row => row.coupons,
  //     sortable: true,
  //   },
  //   {
  //     name: "discount",
  //     selector: row => row.discount,
  //     sortable: true,
  //   },
  //   {
  //     name: "valid From",
  //     selector: row => row.validForm,
  //     sortable: true,
  //   },
  //   {
  //     name: "valid Till",
  //     selector: row => row.validTill,
  //     sortable: true,
  //   },
  //   {
  //     name: "status",
  //     selector: row => row.status,
  //     sortable: true,
  //   },
  //   {
  //     name: "Time To Use",
  //     selector: row => row.timeToUse,
  //     sortable: true,
  //   },
  //   {
  //     name: "Action",
  //     cell: (row) => (
  //       <>
  //         <span className='text-primary cursor-pointer' onClick={() => alert("test")}> Edit / </span>
  //         <span className='text-primary cursor-pointer' onClick={() => alert("test")}> {" "} Delete </span>
  //       </>
  //     ),
  //     ignoreRowClick: true,
  //     allowOverflow: true,
  //     button: true,
  //   },
  // ];


  const handleEdit = (event) => {
    console.log(event, "event");
  }
  const handleDelete = (event) => {
    console.log(event, "event");
  }

  const onHandleSubmit = (e) => {
    e.preventDefault()

    handleClose()
  }

  return (
    <>
      <div className="container-fluid my-5">

        <div className="row mb-4 d-flex justify-content-between me-2">
          <button className='btn btn-primary fit-content ms-3' variant="primary" onClick={handleShow}>
            Create Single Vendor Discount
          </button>

          {/* <button className='btn btn-primary fit-content ms-3' variant="primary" onClick={handleSubShow}>
            Create Broadcast Discount
          </button> */}
        </div>

        <hr />

        <h2>Single Coupon List</h2>

        <div className="card">
          <GlobalSearch handleSearch={handleSearch} />
          <DataTable
            columns={columns}
            data={data}
            fixedHeader
            pagination
            selectableRows
            customStyles={tableCustomStyles}
          />
        </div>

        <hr />

        {/* <h4>Create Single vendor Discount</h4>
        <div className="card">
          <input
            type="search"
            className="form-control-sm border ps-3 py-3"
            placeholder="Search"
            onChange={handleSubCategorySearch}
          />
          <DataTable
            columns={vendorCouponList}
            data={subCatdata}
            fixedHeader
            pagination
            selectableRows
          />
        </div> */}
      </div>

      <br />

      <Modal centered show={show} onHide={handleClose}>
        <form onSubmit={onHandleSubmit}>
          <Modal.Header closeButton>
            <Modal.Title>Create Single Vendor Discount</Modal.Title>
          </Modal.Header>
          <Modal.Body>

            <div className="row mt-3">
              <div className="col-6">
                <div>
                  <label for="name" className="form-label">Discount Name</label>
                  <input type="text" className="form-control" placeholder="Discount Name"
                    name="discount_name" value={values.discount_name} onChange={onHandleChange}
                  />
                </div>
              </div>
              <div className="col-6">
                <div>
                  <label for="name" className="form-label">Vendor Type</label>
                  <select className="form-select" data-choices
                    name="vendor_type" value={values.vendor_type} onChange={onHandleChange}>
                    <option value="">Select an option</option>
                    <option value="user-caterer">Caterer</option>
                    <option value="user-caterer">Tiffin</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="row mt-3">
              <div className="col-6">
                <div>
                  <label for="name" className="form-label">Coupon Code</label>
                  <input type="text" className="form-control" placeholder="Coupon Code"
                    name="coupon_code" value={values.coupon_code} onChange={onHandleChange}
                  />
                </div>
              </div>
              <div className="col-6">
                <div>
                  <label for="name" className="form-label">Status</label>
                  <select className="form-select" data-choices name="valid_from" value={values.valid_from} onChange={onHandleChange}>
                    <option value="Active">Active</option>
                    <option value="In-Active">In Active</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="row mt-3">
              <div className="col-6">
                <div>
                  <label for="name" className="form-label">Valid From</label>
                  <input type="date" className="form-control"
                    name="valid_from" value={values.valid_from} onChange={onHandleChange} />
                </div>
              </div>
              <div className="col-6">
                <div>
                  <label for="name" className="form-label">Valid Till</label>
                  <input type="date" className="form-control"
                    name="valid_till" value={values.valid_till} onChange={onHandleChange}
                  />
                </div>
              </div>
            </div>

            <div className="row mt-3">
              <div className="col-6">
                <div>
                  <label for="name" className="form-label">Coupon Type</label>
                  <select className="form-select" data-choices
                    name="coupon_type" value={values.coupon_type} onChange={onHandleChange}
                  >
                    <option value="discount">Discount</option>
                  </select>
                </div>
              </div>
              <div className="col-6">
                <div>
                  <label for="name" className="form-label">Discount Percentage</label>
                  <input type="text" className="form-control" placeholder="Discount Percentage"
                    name="discount_percent" value={values.discount_percent} onChange={onHandleChange}
                  />
                </div>
              </div>
            </div>

            <div className="row mt-3">
              <div className="col-6">
                <div>
                  <label for="name" className="form-label">Discount Price</label>
                  <input type="text" className="form-control" placeholder="Discount Price"
                    name="discount_price" value={values.discount_price} onChange={onHandleChange}
                  />
                </div>
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" type='submit'>
              Submit
            </Button>
          </Modal.Footer>
        </form>
      </Modal>



      {/* <Modal centered show={showSubCategory} onHide={handleSubClose}>
        <Modal.Header closeButton>
          <Modal.Title>Create Single Vendor List</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="row">
            <div className="col-6">
              <div>
                <label for="name" className="form-label">Vendor ID</label>
                <input type="text" className="form-control" placeholder="Vendor ID" />
              </div>
            </div>
            <div className="col-6">
              <div>
                <label for="name" className="form-label">Coupon Code</label>
                <input type="text" className="form-control" placeholder="Coupon Code" />
              </div>
            </div>
          </div>


          <div className="row mt-3">
            <div className="col-6">
              <div>
                <label for="name" className="form-label">% Discount</label>
                <input type="text" className="form-control" placeholder="Ex:- 5%" />
              </div>
            </div>
            <div className="col-6">
              <div>
                <label for="name" className="form-label">Time To Use</label>
                <input type="text" className="form-control" placeholder="Ex:- 5" />
              </div>
            </div>
          </div>

          <div className="row mt-3">
            <div className="col-6">
              <div>
                <label for="name" className="form-label">Valid From</label>
                <input type="date" className="form-control" />
              </div>
            </div>
            <div className="col-6">
              <div>
                <label for="name" className="form-label">Valid Till</label>
                <input type="date" className="form-control" />
              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleSubClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSubClose}>
            Create
          </Button>
        </Modal.Footer>
      </Modal> */}
    </>
  )
}

export default Discounts