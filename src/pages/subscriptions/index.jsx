import React, { useEffect, useState } from 'react'
import DataTable from 'react-data-table-component';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSubscriptionData } from '../../features/subscriptions';
import GlobalSearch from '../../components/common/GlobalSearch';
import { tableCustomStyles } from '../../components/tableCustomStyles';
import { FaEdit } from "react-icons/fa";


// const rows = [
//   {
//     service: "Catering",
//     planName: "Branded",
//     subscription: "Monthly",
//     planCost: 4000,
//     Status: 'Active',
//     color: '#ffffff',
//     benifits: 'View',
//   }
// ];


const Subscriptions = () => {
  const dispatch = useDispatch()
  const { subscriptionList, isLoading } = useSelector((state) => state.subscription)

  console.log(subscriptionList, "subscriptionList subscriptionList");


  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    dispatch(fetchSubscriptionData());
  }, [dispatch]);


  useEffect(() => {
    if (subscriptionList) {
      const formattedData = subscriptionList?.map((item, index) => ({
        id: item?.id,
        vendor_id: item?.vendor_id,
        subscription_type_id: item?.subscription_type_id,
        status: item?.status,
        payment_status: item?.payment_status,
        payment_id: item?.payment_id,
        razorpay_order_id: item?.razorpay_order_id,
        razorpay_subscription_id: item?.razorpay_subscription_id,
        subscription_pattern: item?.subscription_pattern,
        start_date: item?.start_date,
        end_date: item?.end_date,
        auth_attempt_date: item?.auth_attempt_date,
        previous_subscription_id: item?.previous_subscription_id,
        next_subscription_id: item?.next_subscription_id,
        sub_amount: item?.sub_amount,
        discount_amount: item?.discount_amount,
        final_amount: item?.final_amount,
        razorpay_final_amount: item?.razorpay_final_amount,
        coupon_id: item?.coupon_id,
        carried_forward_days: item?.carried_forward_days,
        created_at: item?.created_at,
        updated_at: item?.updated_at,
        auth_payment_id: item?.auth_payment_id,
        vendor_service_name: item?.vendor_service_name,
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
        row?.vendor_service_name?.toString().toLowerCase().includes(searchValue) ||
        row?.id?.toString().toLowerCase().includes(searchValue) ||
        row?.vendor_id?.toString().toLowerCase().includes(searchValue)
      );
    });
    setFilteredData(newFilteredData);
  };



  const columns = [
    {
      name: "id",
      selector: row => row.id,
      sortable: true,
    },
    {
      name: "vendor_id",
      selector: row => row.vendor_id,
      sortable: true,
    },
    {
      name: "subscription_type_id",
      selector: row => row.subscription_type_id,
      sortable: true,
    },
    {
      name: "status",
      selector: row => row.status,
      sortable: true,
    },
    {
      name: "payment_status",
      selector: row => row.payment_status,
      sortable: true,
    },
    {
      name: "payment_id",
      selector: row => row.payment_id,
      sortable: true,
    },
    {
      name: "razorpay_order_id",
      selector: row => row.razorpay_order_id,
      sortable: true,
    },
    {
      name: "razorpay_subscription_id",
      selector: row => row.razorpay_subscription_id,
      sortable: true,
    },
    {
      name: "subscription_pattern",
      selector: row => row.subscription_pattern,
      sortable: true,
    },
    {
      name: "start_date",
      selector: row => row.start_date,
      sortable: true,
    },
    {
      name: "end_date",
      selector: row => row.end_date,
      sortable: true,
    },
    {
      name: "auth_attempt_date",
      selector: row => row.auth_attempt_date,
      sortable: true,
    },
    {
      name: "previous_subscription_id",
      selector: row => row.previous_subscription_id,
      sortable: true,
    },
    {
      name: "next_subscription_id",
      selector: row => row.next_subscription_id,
      sortable: true,
    },
    {
      name: "sub_amount",
      selector: row => row.sub_amount,
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
      name: "razorpay_final_amount",
      selector: row => row.razorpay_final_amount,
      sortable: true,
    },
    {
      name: "coupon_id",
      selector: row => row.coupon_id,
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
      name: "updated_at",
      selector: row => row.updated_at,
      sortable: true,
    },
    {
      name: "auth_payment_id",
      selector: row => row.auth_payment_id,
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

  const handleEdit = (event) => {
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
            Create Subscription
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