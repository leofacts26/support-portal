import React, { useEffect, useState } from 'react'
import DataTable from 'react-data-table-component';
import { useDispatch, useSelector } from 'react-redux';
import GlobalSearch from '../../components/common/GlobalSearch';
import { tableCustomStyles } from '../../components/tableCustomStyles';
import { FaEdit } from "react-icons/fa";
import { cancelSubscription, fetchSubscriptionData } from '../../features/subscriptionSlice';
import { MdDelete } from "react-icons/md";
import { Modal, Button } from 'react-bootstrap';
import DatePicker from 'react-datepicker';  // Step 1: Import react-datepicker
import 'react-datepicker/dist/react-datepicker.css';  // Step 1: Import datepicker CSS
import useExportData from '../../hooks/useExportData';

const Subscriptions = () => {

  const dispatch = useDispatch()
  const { subscriptionList, isLoading } = useSelector((state) => state.subscription)
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [selectedRow, setSelectedRow] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showSubscribeModal, setShowSubscribeModal] = useState(false);
  const [SubscribeModalData, setShowSubscribeModalData] = useState(null);
  const { exportToExcel } = useExportData();

  console.log(SubscribeModalData, "SubscribeModalDatas");


  // State for date filters
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const handleShow = () => setShowModal(true);
  const handleClose = () => setShowModal(false);

  const handleSubscribeShow = () => setShowSubscribeModal(true);
  const handleSubscribeClose = () => {
    setShowSubscribeModal(false)
    setShowSubscribeModalData(null)
  };

  useEffect(() => {
    dispatch(fetchSubscriptionData());
  }, [dispatch]);

  useEffect(() => {
    if (subscriptionList) {
      const formattedData = subscriptionList?.map((subscription) => ({
        company_id: subscription?.company_id,
        vendor_service_name: subscription?.vendor_service_name,
        vendor_type: subscription?.vendor_id,
        subscription_pattern: subscription?.subscription_pattern,
        sub_amount: subscription?.sub_amount,
        discount_amount: subscription?.discount_amount,
        final_amount: subscription?.final_amount,
        status: subscription?.status,
        created_at: new Date(subscription?.start_date),

        // extra details 
        razorpay_response: subscription?.razorpay_response,
        razorpay_order_id: subscription?.razorpay_order_id,
        razorpay_final_amount: subscription?.razorpay_final_amount,
        payment_status: subscription?.payment_status,
        payment_id: subscription?.payment_id,
        id: subscription?.id,
        end_date: subscription?.end_date,
        discount_amount: subscription?.discount_amount,
        carried_forward_days: subscription?.carried_forward_days,

      }));
      setData(formattedData);
      setFilteredData(formattedData);
    }
  }, [subscriptionList]);

  const handleSearch = (e) => {
    const searchValue = e.target.value.toLowerCase().trim();
    if (!searchValue) {
      setFilteredData(data);
      return;
    }

    const searchKeywords = searchValue.split(/[, ]+/).filter(Boolean);

    const newFilteredData = data.filter((row) => {
      return searchKeywords.some((keyword) =>
        Object.values(row).some(value =>
          value !== null && value.toString().toLowerCase().includes(keyword)
        )
      );
    });

    setFilteredData(newFilteredData);
  };

  // Handle date range filtering
  useEffect(() => {
    if (startDate && endDate) {
      const filteredByDate = data.filter((row) => {
        const createdDate = row.created_at;  // Date object of subscription created_at
        return createdDate >= startDate && createdDate <= endDate;
      });
      setFilteredData(filteredByDate);
    } else {
      setFilteredData(data);
    }
  }, [startDate, endDate, data]);

  const onHandleCancelSubscription = async (row) => {
    const { razorpay_subscription_id, vendor_id, status } = row;

    if ((status === "active" || status === "pending") && razorpay_subscription_id !== null) {
      const data = { subscription_id: razorpay_subscription_id, vendor_id };
      await dispatch(cancelSubscription(data));
      handleClose();
    } else {
      alert("Cancellation not allowed: Subscription is either not active/queued or does not have a valid Razorpay subscription ID.")
    }
  }

  const onHandleSubscriptionModal = (row) => {
    setSelectedRow(row);
    handleShow();
  }

  const columns = [
    {
      name: "Company ID",
      selector: row => row.company_id,
      sortable: true,
    },
    {
      name: "Vendor Name",
      selector: row => row.vendor_service_name,
      sortable: true,
    },
    {
      name: "Vendor Type",
      selector: row => row.vendor_type,
      sortable: true,
    },
    {
      name: "Subscription Pattern",
      selector: row => row.subscription_pattern,
      sortable: true,
    },
    {
      name: "Sub Amount",
      selector: row => row.sub_amount,
      sortable: true,
    },
    {
      name: "Discount Amount",
      selector: row => row.discount_amount,
      sortable: true,
    },
    {
      name: "Final Amount",
      selector: row => row.final_amount,
      sortable: true,
    },
    {
      name: "Status",
      selector: row => row.status,
      sortable: true,
    },
    {
      name: "Created At",  // Displaying created_at date
      selector: row => row.created_at.toLocaleDateString(),  // Convert date object to readable format
      sortable: true,
    },
    {
      name: "View",
      cell: (row) => (
        <>
          <button className="btn btn-success me-1" onClick={() => {
            handleSubscribeShow()
            setShowSubscribeModalData(row)
          }}>
            View
          </button>
        </>
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
    },
    {
      name: "Cancel",
      cell: (row) => (
        <>
          {(row.status === "active" || row.status === "pending") && row.razorpay_subscription_id !== null && (
            <button
              className="btn btn-danger me-1"
              onClick={() => onHandleSubscriptionModal(row)}
            >
              Cancel <MdDelete />
            </button>
          )}
        </>
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
    }
  ];



  const formatDataForExport = () => {
    return filteredData.map((row) => {
      // Create a new formatted row object
      const formattedRow = {};

      // Loop through each column and get the value using the selector function
      columns.forEach((col) => {
        formattedRow[col.name] = col.selector ? col.selector(row) : row[col.name];
      });

      return formattedRow;
    });
  };

  return (
    <>
      <div className="container-fluid my-5">
        <div className="row mb-4 me-2">
          <div className="d-flex justify-content-between align-items-center">
            <h1 className="header-title">
              Total Vendor Subscription List - {subscriptionList?.length}
            </h1>

            <div className="col-lg-6">
              <div className="d-flex justify-content-end">
                <Button variant="primary" onClick={() => exportToExcel(formatDataForExport(), 'vendorlist')}>
                  Export
                </Button>
              </div>
            </div>
          </div>
        </div>
        <hr />

        <div className="card">
          <GlobalSearch handleSearch={handleSearch} />
          {/* Date Filter Component */}
          <div className="d-flex my-3">
            <div className="me-3">
              <DatePicker
                selected={startDate}
                onChange={(date) => setStartDate(date)}
                showYearDropdown
                scrollableYearDropdown
                yearDropdownItemNumber={50}
                placeholderText="Start Date"
                isClearable
                className="form-control"
                popperClassName="higher-zindex"
              />
            </div>
            <div>
              <DatePicker
                selected={endDate}
                onChange={(date) => setEndDate(date)}
                placeholderText="End Date"
                isClearable
                className="form-control"
              />
            </div>
          </div>

          <DataTable
            columns={columns}
            data={filteredData}
            paginationRowsPerPageOptions={[50, 100, 300, 500, 1000]}
            paginationPerPage="100"
            fixedHeader
            pagination
            selectableRows
            customStyles={tableCustomStyles}
          />
        </div>
      </div>


      <Modal show={showSubscribeModal} onHide={handleSubscribeClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>View Subscription Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {SubscribeModalData ? (
            <div className="subscription-details">
              <h4 className="text-center">Subscription ID: {SubscribeModalData?.id}</h4>
              <p><strong>Company ID:</strong> {SubscribeModalData?.company_id}</p>
              <p><strong>Vendor Service Name:</strong> {SubscribeModalData?.vendor_service_name}</p>
              <p><strong>Vendor Type:</strong> {SubscribeModalData?.vendor_type}</p>
              <p><strong>Subscription Pattern:</strong> {SubscribeModalData?.subscription_pattern}</p>
              <p><strong>Start Date:</strong> {new Date(SubscribeModalData?.created_at).toLocaleDateString()}</p>
              <p><strong>End Date:</strong> {new Date(SubscribeModalData?.end_date).toLocaleDateString()}</p>
              <p><strong>Status:</strong> {SubscribeModalData?.status}</p>
              <p><strong>Payment Status:</strong> {SubscribeModalData?.payment_status}</p>
              <p><strong>Payment ID:</strong> {SubscribeModalData?.payment_id}</p>
              <p><strong>Order ID:</strong> {SubscribeModalData?.razorpay_order_id}</p>
              <p><strong>Amount:</strong> {SubscribeModalData?.sub_amount}</p>
              <p><strong>Discount:</strong> {SubscribeModalData?.discount_amount}</p>
              <p><strong>Final Amount:</strong> {SubscribeModalData?.final_amount}</p>
              <p><strong>Razorpay Final Amount:</strong> {SubscribeModalData?.razorpay_final_amount}</p>
              <p><strong>Carried Forward Days:</strong> {SubscribeModalData?.carried_forward_days}</p>
              <p><strong>Razorpay Response:</strong></p>
              <pre>{JSON.stringify(JSON.parse(SubscribeModalData?.razorpay_response), null, 2)}</pre>
            </div>
          ) : (
            <h2 className='text-center'>No Subscription Selected</h2>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleSubscribeClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>



      <Modal show={showModal} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Cancel Subscription</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h2 className='text-center'>Are you sure you want to cancel the subscription?</h2>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            No, Keep Subscription
          </Button>
          <Button
            variant="danger"
            onClick={() => {
              onHandleCancelSubscription(selectedRow);
            }}
          >
            Yes, Cancel Subscription
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default Subscriptions;
