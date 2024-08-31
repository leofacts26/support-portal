import React, { useEffect, useState } from 'react'
import DataTable from 'react-data-table-component';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useDispatch, useSelector } from 'react-redux';
import { createPriceRanges, updatePriceRanges, updateTogglePriceRanges } from '../../features/catering/priceSlice';
import GlobalSearch from '../../components/common/GlobalSearch';
import { tableCustomStyles } from '../../components/tableCustomStyles';
import { FaEdit } from "react-icons/fa";
import { cater_vendor_type } from '../../constants';
import { fetchSubscriptionData } from '../../features/subscriptionSlice';


const initialState = {
  start_price: '',
  end_price: '',
}


const Subscriptions = () => {

  const dispatch = useDispatch()
  const { subscriptionList, isLoading } = useSelector((state) => state.subscription)
  console.log(subscriptionList, "subscriptionList subscriptionList");


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
    dispatch(fetchSubscriptionData());
  }, [dispatch]);


  useEffect(() => {
    if (subscriptionList) {
      const formattedData = subscriptionList?.map((subscription, index) => ({
        id: subscription?.id,
        auth_status: subscription?.auth_status,
        carried_forward_days: subscription?.carried_forward_days,
        created_at: subscription?.created_at,
        discount_amount: subscription?.discount_amount,
        final_amount: subscription?.final_amount,
        payment_status: subscription?.payment_status,
        razorpay_subscription_id: subscription?.razorpay_subscription_id,
        status: subscription?.status,
        sub_amount: subscription?.sub_amount,
        subscription_pattern: subscription?.subscription_pattern,
        vendor_id: subscription?.vendor_id,
        vendor_service_name: subscription?.vendor_service_name,
      }));
      setData(formattedData);
      setFilteredData(formattedData);
    }
  }, [subscriptionList]);



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


  const handleStatusToggle = async (item) => {
    const data = {
      ...item,
      is_active: item.is_active === 1 ? 0 : 1
    }
    await dispatch(updateTogglePriceRanges(data))
    await dispatch(fetchSubscriptionData());
  }


  const columns = [
    {
      name: "ID",
      selector: row => row.id,
      sortable: true,
    },
    {
      name: "auth_status",
      selector: row => row.auth_status,
      sortable: true,
    },
    {
      name: "carried_forward_days",
      selector: row => row.carried_forward_days,
      sortable: true,
    },
    {
      name: "created_at",
      selector: row => row.created_at,
      sortable: true,
    },
    {
      name: "discount_amount",
      selector: row => row.discount_amount,
      sortable: true,
    },
    {
      name: "final_amount",
      selector: row => row.final_amount,
      sortable: true,
    },
    {
      name: "payment_status",
      selector: row => row.payment_status,
      sortable: true,
    },
    {
      name: "razorpay_subscription_id",
      selector: row => row.razorpay_subscription_id,
      sortable: true,
    },
    {
      name: "status",
      selector: row => row.status,
      sortable: true,
    },
    {
      name: "sub_amount",
      selector: row => row.sub_amount,
      sortable: true,
    },
    {
      name: "subscription_pattern",
      selector: row => row.subscription_pattern,
      sortable: true,
    },
    {
      name: "vendor_id",
      selector: row => row.vendor_id,
      sortable: true,
    },
    {
      name: "vendor_service_name",
      selector: row => row.vendor_service_name,
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
    await dispatch(fetchSubscriptionData());
    setValues(initialState)
    handleClose()
  }


  return (
    <>
      <div className="container-fluid my-5">



        <div className="row mb-4 me-2">
          <div className="d-flex justify-content-between">
            <h2>Total Subscription List - {subscriptionList?.length} </h2>
            <button className='btn btn-primary fit-content' variant="primary" onClick={handleShow}>
              Create Subscription List
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
            <Modal.Title> {editId ? 'Edit Subscription' : 'Create Subscription'} </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>----------</p>
            {/* <div className="row">
              <div className='col-6'>
                <label for="name" className="form-label"> <b>Start Price</b> </label>
                <input type="text" className="form-control" placeholder="Rs. 100" name="start_price" required onChange={handleChange} value={values.start_price} />
              </div>
              <div className='col-6'>
                <label for="name" className="form-label"> <b>End Price</b> </label>
                <input type="text" className="form-control" placeholder="Rs. 200" name="end_price" required onChange={handleChange} value={values.end_price} />
              </div>
            </div> */}
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

export default Subscriptions