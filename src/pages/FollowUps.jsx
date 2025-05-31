import React, { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useDispatch, useSelector } from 'react-redux';
import { createSupportTicketData, fetchSupportListUsers, fetchSupportTicketData, supportGetViewAccess, updateSupportTicketData, updateSupportTicketStatus } from '../features/supportTicketSlice';
import GlobalSearch from '../components/common/GlobalSearch';
import { tableCustomStyles } from '../components/tableCustomStyles';
import { FaEdit } from "react-icons/fa";
import { createSupportshareLinksData, fetchSupportSharedLinksData, updateSupportshareLinksData } from '../features/shareLinksSlice';
import moment from 'moment';
import { agentVendorComments, assignAsignAgentVendor, fetchSupportFollowUpssList, resetAgentVendorComments, updateAgentComment } from '../features/followUpsSlice';
import Table from 'react-bootstrap/Table';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import LoadingSpinner from '../components/LoadingSpinner';
import { useNavigate } from 'react-router-dom';
import { useLocation } from "react-router-dom";



const FollowUps = () => {
  const dispatch = useDispatch();
  const { followUpList, agentVendorCommentsList, isLoading } = useSelector((state) => state.followUps);
  const { listUsers, viewAccess } = useSelector((state) => state.supportTickets);
  const [filteredData, setFilteredData] = useState([]);
  const [editId, setEditId] = useState(null);
  const [selectedUser, setSelectedUser] = useState('');
  const [showAssignModal, setShowAssignModal] = useState(false);
  const [selectAgent, setSelectAgent] = useState("")
  const [comment, setComment] = useState("")
  const [activeAgent, setActiveAgent] = useState([])
  const [selectedTickets, setSelectedTickets] = useState([]);
  const [checkedRows, setCheckedRows] = useState({}); // Tracks checkbox states
  const location = useLocation();


  console.log(selectedTickets, "selectedTickets");
  console.log(checkedRows, "checkedRows");



  const navigate = useNavigate()

  // const activeAgent = agentVendorCommentsList[0]

  // console.log(agentVendorCommentsList, "agentVendorCommentsList agentVendorCommentsList");
  // console.log(activeAgent, "activeAgent activeAgent");

  useEffect(() => {
    const keyword = location.pathname.slice(1); // Removes the leading "/"

    dispatch(supportGetViewAccess({ keyword })); // Send in payload
  }, [dispatch, location.pathname]); // Re-run if path changes

  const [show, setShow] = useState(false);
  const handleClose = async () => {
    setShow(false)
    await setComment("")
    await setActiveAgent([])
    dispatch(resetAgentVendorComments());

  };
  const handleShow = async () => {
    setShow(true);
    if (activeAgent?.id) {
      await dispatch(agentVendorComments(activeAgent?.id))
    }
  };

  useEffect(() => {
    if (agentVendorCommentsList?.length > 0) {
      setComment(agentVendorCommentsList[0]?.comment || "");
      setActiveAgent(agentVendorCommentsList[0])
    }
  }, [agentVendorCommentsList]);


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
    setSelectedTickets([]);
    setCheckedRows({});
  };

  const handleAssignShow = () => setShowAssignModal(true);


  const handleCheckboxChange = (e, row) => {
    const isChecked = e.target.checked;

    setCheckedRows((prev) => ({
      ...prev,
      [row.id]: isChecked, // Update the checked state for the row
    }));

    if (isChecked) {
      setSelectedTickets((prev) => [...prev, { id: row.id, name: row.vendor_service_name }]);
    } else {
      setSelectedTickets((prev) => prev.filter((ticket) => ticket.id !== row.id));
    }
  };



  const onHandleAssignSubmit = async (e) => {
    e.preventDefault();

    if (!selectedTickets.length) {
      alert('Please select at least one ticket.');
      return;
    }
    if (!selectedUser) {
      alert('Please select a user to assign tickets.');
      return;
    }

    const payload = {
      vendor_ids: selectedTickets.map((ticket) => ({ id: ticket.id })),
      agent_user_id: selectedUser,
    };

    console.log(payload, "payload");
    try {
      await dispatch(assignAsignAgentVendor(payload))
      await dispatch(fetchSupportFollowUpssList());
      await handleAssignClose()
    } catch (error) {
      console.log(error);
    }
  }


  const onHandleListComments = async (id) => {
    await dispatch(agentVendorComments(id))
  }

  const onHandleCommentSubmit = async (id) => {
    const data = {
      id: id,
      comment: comment
    }
    try {
      await dispatch(updateAgentComment(data))
      await dispatch(fetchSupportFollowUpssList());
      await handleClose()
    } catch (error) {
      console.log(error);
    }
  }

  const onUpdateComment = (id, companyId) => {
    window.open(`/support-list-followups/${id}/${companyId}`, '_blank');
  };

  const columns = [
    {
      name: '',
      selector: (row) => (
        <input
          type="checkbox"
          checked={checkedRows[row.id] || false} // Dynamically bind checked state
          onChange={(e) => handleCheckboxChange(e, row)}
        />
      ),
      width: '50px', // Adjust width for the checkbox
      sortable: false,
    },
    {
      name: 'Business ID',
      cell: (row) => (
        <a className='text-primary cursor-pointer' onClick={() => onUpdateComment(row?.id, row?.company_id)}>
          {row.company_id}
        </a>
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
    },
    { name: 'Business Name', selector: (row) => row.vendor_service_name, sortable: true, width: '300px' },
    {
      name: 'Phone No',
      selector: (row) => (
        <a href={`tel:${row.phone_number}`} style={{ textDecoration: 'none', color: 'blue' }}>
          {row.phone_number}
        </a>
      ),
      sortable: true,
    },
    {
      name: "Vendor Type",
      cell: (row) => {
        let badgeClass = "badge";

        if (row.vendor_type?.toLowerCase() === "caterer") {
          badgeClass += " text-bg-danger-subtle";
        } else if (row.vendor_type?.toLowerCase() === "tiffin") {
          badgeClass += " text-bg-warning-subtle";
        }

        return (
          <span className={badgeClass}>
            {row.vendor_type || "Unknown"}
          </span>
        );
      },
      selector: (row) => row.vendor_type,
      sortable: true,
    },
    {
      name: 'Date Time',
      selector: (row) => moment(row.created_at).format('DD/MMM/YYYY h:mm a'),
      sortable: true,
      width: '250px'
    },
    {
      name: 'Agents',
      selector: (row) => row.assigned_agents?.map(agent => agent.admin_user_name).join(', '), width: '200px',
      sortable: true,
    },
        { name: 'Created By ', selector: (row) => row.created_by, sortable: true, width: '150px' },
    {
      name: 'Update Comment',
      cell: (row) => (
        <Button variant="success"
          // onClick={() => {
          //   handleShow();
          //   onHandleListComments(row?.id)
          // }}
          onClick={() => onUpdateComment(row?.id, row?.company_id)}
        >
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
            Followups - {followUpList?.length}
          </h1>

          {viewAccess ? <div>
            <button className='btn btn-primary fit-content me-4' variant="primary" onClick={() => {
              handleAssignShow();
              // setSelectAgent(row.id)
            }}>
              Assign
            </button>

          </div> : <span></span>}

        </div>
      </div>
      <hr />


      <div className="card">
        <GlobalSearch handleSearch={handleSearch} />
        <DataTable
          columns={columns}
          data={filteredData}
          paginationRowsPerPageOptions={[50, 100, 300, 500, 1000]}
          paginationPerPage="100"
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
              <div className="col-md-6">
                <div className="form-group mb-3">
                  <label htmlFor="assignUser">Select User</label>
                  <select
                    id="assignUser"
                    className="form-control"
                    onChange={(e) => setSelectedUser(e.target.value)} // Handle selection
                    required
                  >
                    <option value="">-- Select a User --</option>
                    {listUsers.map((user) => (
                      <option key={user.id} value={user.id}>
                        {user.name} ({user.username})
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Right Column: Selected Tickets */}
              <div className="col-md-6">
                <div className="form-group">
                  <label>Selected Tickets</label>
                  {selectedTickets.length > 0 ? (
                    <ul className="list-group mt-2">
                      {selectedTickets.map((ticket, index) => (
                        <li key={index} className="list-group-item">
                          Vendor: {ticket.name}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-muted mt-2">No tickets selected.</p>
                  )}
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




      <Modal size="lg" centered show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Update Comment</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {agentVendorCommentsList?.length > 0 && (
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Status</th>
                  <th>Admin User Name</th>
                  <th>Assigned By Name</th>
                  <th>Comment</th>
                  <th>Update</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Active</td>
                  <td>{activeAgent?.admin_user_name}</td>
                  <td>{activeAgent?.assigned_by_name}</td>
                  <td>
                    <FloatingLabel>
                      <Form.Control
                        value={comment || ""}
                        onChange={(e) => setComment(e.target.value)}
                        name="comment"
                        as="textarea"
                        placeholder="Leave a comment here"
                        style={{ height: "50px" }}
                      />
                    </FloatingLabel>
                  </td>
                  <td>
                    <button
                      disabled={isLoading}
                      className="btn bg-success text-white"
                      onClick={() => onHandleCommentSubmit(activeAgent?.id)}
                    >
                      {isLoading ? 'Loading...' : "Update"}
                    </button>
                  </td>
                </tr>
              </tbody>
            </Table>
          )}
        </Modal.Body>
      </Modal>





    </div>
  );
};

export default FollowUps;
