import React, { useEffect, useState } from 'react'
import DataTable from 'react-data-table-component';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { createBroadbandSubscription, fetchBroadcastNotificationData, fetchUserNotificationData } from '../../features/notificationSlice';
import { useDispatch, useSelector } from 'react-redux';
import GlobalSearch from '../../components/common/GlobalSearch';
import { tableCustomStyles } from '../../components/tableCustomStyles';
import { fetchSubscriptionData } from '../../features/subscriptionSlice';



const initialState = {
  title: '',
  message: '',
  type: '',
  subscriptionTypeId: ''
}

const UserNotification = () => {
  const dispatch = useDispatch()
  const { userNotificationList, isLoading } = useSelector((state) => state.notifications)
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
    dispatch(fetchUserNotificationData());
  }, [dispatch]);



  useEffect(() => {
    if (userNotificationList) {
      const formattedData = userNotificationList?.map((broadcast, index) => ({
        vendor_type: broadcast?.vendor_type,
        title: broadcast?.title,
        message: broadcast?.message,
        created_at: broadcast?.created_at,
      }));
      setData(formattedData);
      setFilteredData(formattedData);
    }
  }, [userNotificationList]);


  const handleSearch = (e) => {
    const searchValue = e.target.value.toLowerCase();
    if (!searchValue) {
      setFilteredData(data);
      return;
    }
    const newFilteredData = data.filter((row) => {
      return (
        row?.title?.toLowerCase().includes(searchValue),
        row?.message?.toLowerCase().includes(searchValue)
      );
    });
    setFilteredData(newFilteredData);
  };


  const columns = [
    {
      name: "vendor_type",
      selector: row => row.vendor_type,
      sortable: true,
    },
    {
      name: "title",
      selector: row => row.title,
      sortable: true,
    },
    {
      name: "message",
      selector: row => row.message,
      sortable: true,
    },
    {
      name: "created_at",
      selector: row => row.created_at.slice(0, 10),
      sortable: true,
    },
    // {
    //   name: "Action",
    //   cell: (row) => (
    //     <>
    //       <span className='text-primary cursor-pointer' onClick={() => alert("test")}>View </span>
    //     </>
    //   ),
    //   ignoreRowClick: true,
    //   allowOverflow: true,
    //   button: true,
    // },
  ];

  const onHandleSubmit = async (e) => {
    e.preventDefault();
    const { title, message, type, subscriptionTypeId } = values;
    const data = {
      message,
      title,
      vendor_type: type,
      subscription_type_id: subscriptionTypeId
    }
    await dispatch(createBroadbandSubscription(data))
    await dispatch(fetchUserNotificationData())
    setValues(initialState)
    handleClose()

    // if (editId === null) {
    //   await dispatch(createPriceRanges(data))
    // } else {
    //   await dispatch(updatePriceRanges(data))
    // }
    // await dispatch(fetchpriceRangesList());
    // setValues(initialState)
    // handleClose()
  }

  return (
    <>
      <div className="container-fluid my-5">
      <div className="row mb-4  me-2">
          <div className="d-flex justify-content-between align-items-center">
            <h2>Total User Notifications - {userNotificationList?.length}</h2>
            <button className='btn btn-primary fit-content' variant="primary" onClick={handleShow}>
              Create User Notifications
            </button>
          </div>
        </div>
        <hr />


        <div className="card">
          {/* Search */}
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
        <hr />
      </div>
      <br />


      <Modal centered show={show} onHide={handleClose}>
        <form onSubmit={onHandleSubmit}>
          <Modal.Header closeButton>
            <Modal.Title>Create User Notifications</Modal.Title>
          </Modal.Header>
          <Modal.Body>

            <div>
              <label for="name" className="form-label">Type</label>
              <select
                className="form-select"
                name="type"
                value={values.type}
                onChange={handleChange}
              >
                <>
                  <option value="All">All</option>
                  <option value="Catering">Catering</option>
                  <option value="Tiffin">Tiffin</option>
                  <option value="User">User</option>
                </>
              </select>
            </div>


            <div className='mt-3'>
              <label for="name" className="form-label">subscription Types</label>
              <select
                className="form-select"
                name="subscriptionTypeId"
                value={values.subscriptionTypeId}
                onChange={handleChange}
              >
                <>
                  <option value="All">All</option>
                  <option value="1">Brand</option>
                  <option value="2">Popular</option>
                  <option value="3">Basic</option>
                </>
              </select>
            </div>


            <div className='mt-3'>
              <label for="name" className="form-label">Title</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter Title"
                name="title"
                value={values.title}
                onChange={handleChange}
              />
            </div>
            <div className='mt-3'>
              <label for="name" className="form-label">Message</label>
              <textarea
                className="form-control"
                data-autosize rows="1"
                placeholder="Enter Message..."
                name="message"
                value={values.message}
                onChange={handleChange}
              ></textarea>
            </div>



          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" type='submit' disabled={isLoading}>
              {isLoading ? 'Loading...' : 'Save Changes'}
            </Button>
          </Modal.Footer>
        </form>
      </Modal>


    </>
  )
}

export default UserNotification