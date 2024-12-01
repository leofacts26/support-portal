import React, { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useDispatch, useSelector } from 'react-redux';
import { createSupportTicketData, fetchSupportListUsers, fetchSupportTicketData, updateSupportTicketData, updateSupportTicketStatus } from '../features/supportTicketSlice';
import GlobalSearch from '../components/common/GlobalSearch';
import { tableCustomStyles } from '../components/tableCustomStyles';
import { FaEdit } from "react-icons/fa";
import { createSupportshareLinksData, fetchSupportSharedLinksData, updateSupportshareLinksData } from '../features/shareLinksSlice';
import moment from 'moment';
import { assignAsignAgentVendor, fetchSupportFollowUpssList } from '../features/followUpsSlice';



const FollowUps = () => {
  const dispatch = useDispatch();
  const { followUpList, isLoading } = useSelector((state) => state.followUps);
  const { listUsers } = useSelector((state) => state.supportTickets);
  const [filteredData, setFilteredData] = useState([]);
  const [editId, setEditId] = useState(null);
  const [selectedUser, setSelectedUser] = useState('');
  const [showAssignModal, setShowAssignModal] = useState(false);
  const [selectAgent, setSelectAgent] = useState("")

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


  useEffect(() => {
    dispatch(fetchSupportFollowUpssList());
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchSupportListUsers());
  }, [dispatch]);


  useEffect(() => {
    setFilteredData(followUpList);
  }, [followUpList]);

  const handleSearch = (e) => {
    const searchValue = e.target.value.toLowerCase();
    if (!searchValue) {
      setFilteredData(followUpList);
      return;
    }
    const newFilteredData = followUpList.filter((ticket) =>
      Object.values(ticket).some((value) =>
        String(value).toLowerCase().includes(searchValue)
      )
    );
    setFilteredData(newFilteredData);
  };


  const handleAssignClose = () => {
    setShowAssignModal(false)
    setSelectedUser('');
    setSelectAgent('')
  };

  const handleAssignShow = () => setShowAssignModal(true);


  const onHandleAssignSubmit = async (e) => {
    e.preventDefault();

    if (!selectedUser) {
      alert('Please select a user to assign tickets.');
      return;
    }

    const payload = {
      vendor_id: selectAgent,
      agent_user_id: selectedUser,
    };

    try {
      await dispatch(assignAsignAgentVendor(payload))
      await dispatch(fetchSupportFollowUpssList());
      await handleAssignClose()
    } catch (error) {
      console.log(error);
    }
  }



  const columns = [
    { name: 'Business ID', selector: (row) => row.id, sortable: true },
    { name: 'Vendor Type', selector: (row) => row.vendor_type, sortable: true, },
    {
      name: 'Phone No',
      selector: (row) => (
        <a href={`tel:${row.phone_number}`} style={{ textDecoration: 'none', color: 'blue' }}>
          {row.phone_number}
        </a>
      ),
      sortable: true,
    },
    { name: 'Business Name', selector: (row) => row.vendor_service_name, sortable: true, },
    { name: 'Status', selector: (row) => row.listing_status, sortable: true, },
    {
      name: 'Date Time',
      selector: (row) => moment(row.date_time).format('DD/MMM/YYYY h:mm a'),
      sortable: true,
      width: '250px'
    },
    { name: 'Agent', selector: (row) => row.shared_via, sortable: true, },
    {
      name: 'Assign Agent',
      cell: (row) => (
        <Button variant="success" onClick={() => {
          handleAssignShow();
          setSelectAgent(row.id)
        }}>
          Assign
        </Button>
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
      width: '120px'
    },
    {
      name: 'Update Comment',
      cell: (row) => (
        <Button variant="success" onClick={handleShow}>
          Update
        </Button>
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
      width: '120px'
    },
  ];

  return (
    <div className="container-fluid my-5">

      <div className="row mb-4  me-2">
        <div className="d-flex justify-content-between align-items-center">
          <h1 className="header-title">
            Support Tickets - {followUpList?.length}
          </h1>
        </div>
      </div>
      <hr />


      <div className="card">
        <GlobalSearch handleSearch={handleSearch} />
        <DataTable
          columns={columns}
          data={filteredData}
          pagination
          fixedHeader
          customStyles={tableCustomStyles}
        />
      </div>




      <Modal size="lg" centered show={showAssignModal} onHide={handleAssignClose}>
        <form onSubmit={onHandleAssignSubmit}>
          <Modal.Header closeButton>
            <Modal.Title>Assign Details</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="row">
              {/* Left Column: Select User */}
              <div className="col-md-12">
                <div className="form-group mb-3">
                  <label htmlFor="assignUser">Select User</label>
                  <select
                    id="assignUser"
                    className="form-control"
                    onChange={(e) => setSelectedUser(e.target.value)} // Handle selection
                    required
                  >
                    <option value="">-- Select a User --</option>
                    {listUsers?.map((user) => (
                      <option key={user.id} value={user.id}>
                        {user.name} ({user.username})
                      </option>
                    ))}
                  </select>
                </div>
              </div>

            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleAssignClose}>
              Close
            </Button>
            <Button variant="primary" type="submit">
              {isLoading ? 'Loading...' : 'Save Changes'}
            </Button>
          </Modal.Footer>
        </form>
      </Modal>



      <Modal centered show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Update Comment</Modal.Title>
        </Modal.Header>
        <Modal.Body>Woohoo, you are reading this text in a modal!</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>




    </div>
  );
};

export default FollowUps;
