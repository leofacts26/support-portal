import React, { useEffect, useState } from 'react'
import DataTable from 'react-data-table-component';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { createUserNotification, fetchBroadcastNotificationData, fetchUserNotificationData } from '../../features/notificationSlice';
import { useDispatch, useSelector } from 'react-redux';
import GlobalSearch from '../../components/common/GlobalSearch';
import { tableCustomStyles } from '../../components/tableCustomStyles';
import { fetchSubscriptionData } from '../../features/subscriptionSlice';



const initialState = {
  title: '',
  message: '',
  receiverId: '',
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
        type: broadcast?.type,
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
        row?.message?.toLowerCase().includes(searchValue),
        row?.type?.toLowerCase().includes(searchValue)
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
      name: "type",
      selector: row => row.type,
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
    const { title, message, receiverId } = values;
    const data = {
      message,
      title,
      receiver_id: receiverId
    }
    // console.log(data, "data");
    await dispatch(createUserNotification(data))
    await dispatch(fetchUserNotificationData())
    setValues(initialState)
    handleClose()
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
              <label htmlFor="type" className="form-label">Receiver ID</label>
              <select
                className="form-select"
                name="receiverId"
                value={values.receiverId}
                onChange={handleChange}
              >
                <option value="">Select Receiver ID</option>
                {userNotificationList?.map((item) => (
                  <option value={item.receiver_id} key={item.receiver_id}>
                    {item.receiver_id}
                  </option>
                ))}
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