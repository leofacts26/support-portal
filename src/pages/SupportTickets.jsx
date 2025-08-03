import React, { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useDispatch, useSelector } from 'react-redux';
import { assignSupportTicket, createSupportTicketData, fetchSupportListUsers, fetchSupportTicketData, fetchVendorListtData, setSearchTerm, supportGetViewAccess, updateSupportTicketData, updateSupportTicketStatus } from '../features/supportTicketSlice';
import GlobalSearch from '../components/common/GlobalSearch';
import { tableCustomStyles } from '../components/tableCustomStyles';
import { FaEdit } from "react-icons/fa";
import { format, parse, isValid, compareAsc } from 'date-fns';
import DatePicker from 'react-datepicker'; // Import DatePicker
import 'react-datepicker/dist/react-datepicker.css';
import Select from 'react-select';
import { Table } from "react-bootstrap";
import VendorDetails from './VendorDetails';
import { fetchVendorShowDetailData } from '../features/menuSlice';
import { Form } from "react-bootstrap";
import LoadingSpinner from '../components/LoadingSpinner';
import Subscription from './Subscription';
import { useLocation } from "react-router-dom";


const initialState = {
  ticketId: '',
  raisedBy: '',
  userType: '',
  issue: '',
  comments: '',
  agentId: '',
  status: '',
}


const SupportTickets = () => {
  const dispatch = useDispatch();
  const { viewAccess, supportTicketList, vendorSupportList, isLoading, listUsers, ticketStatus } = useSelector((state) => state.supportTickets);
  const location = useLocation();
  const { searchTerm } = useSelector((state) => state.supportTickets)
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [editId, setEditId] = useState(null);
  const [values, setValues] = useState(initialState);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [status, setStatus] = useState('');
  const [show, setShow] = useState(false);
  const [showCreateTicket, setShowreateTicket] = useState(false);
  const [showAssignModal, setShowAssignModal] = useState(false);
  const [selectedTickets, setSelectedTickets] = useState([]);
  const [checkedRows, setCheckedRows] = useState({}); // Tracks checkbox states
  const [selectedUser, setSelectedUser] = useState('');

  useEffect(() => {
    setStatus(selectedTicket?.status || '');
  }, [selectedTicket]);

  useEffect(() => {
    const keyword = location.pathname.slice(1); // Removes the leading "/"

    dispatch(supportGetViewAccess({ keyword })); // Send in payload
  }, [dispatch, location.pathname]); // Re-run if path changes

  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  // State to store search values for each column
  const [searchValues, setSearchValues] = useState({
    id: "",
    ticket_id: "",
    company_id: "",
    user_type: "",
    raised_on: "",
    issue: "",
    comments: "",
    status: "",
    internal_type: "",
    vendor_service_name: "",
    agent_name: "",
  });



  const handleCloseCreateTicket = () => {
    setShowreateTicket(false);
    setEditId(null);
    setValues(initialState);
  };
  const handleShowCreateTicket = () => setShowreateTicket(true);

  const handleAssignClose = () => {
    setShowAssignModal(false)
    setSelectedTickets([]);
    setCheckedRows({});
    setSelectedUser('');
  };
  const handleAssignShow = () => setShowAssignModal(true);

  const handleClose = () => { setShow(false); };
  const handleShow = () => setShow(true);

  useEffect(() => {
    dispatch(fetchSupportTicketData());
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchVendorListtData());
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchSupportListUsers());
  }, [dispatch]);


  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value })
  }


  // Prepare options from vendorNotificationList
  const receiverOptions = vendorSupportList?.map((item) => ({
    value: item.id,
    label: item.vendor_service_name,
  }));



  // Format subscription data
  useEffect(() => {
    if (supportTicketList) {
      const formattedData = supportTicketList.map((subscription) => ({
        id: subscription?.id,
        ticket_id: subscription?.ticket_id,
        company_id: subscription?.company_id,
        user_type: subscription?.user_type,
        raised_on: new Date(subscription?.raised_on).toLocaleDateString(),
        // raised_on: subscription?.raised_on,
        issue: subscription?.issue,
        comments: subscription?.comments,
        status: subscription?.status,
        internal_type: subscription?.internal_type,
        vendor_service_name: subscription?.vendor_service_name,
        agent_name: subscription?.agent_name,

      }));
      setData(formattedData);
      setFilteredData(formattedData);
    }
  }, [supportTicketList]);


  useEffect(() => {
    if (startDate || endDate) {
      const filtered = data.filter((row) => {
        const rowDate = parse(row.raised_on, 'MM/dd/yyyy', new Date());

        // Check if the row date falls within the selected date range
        return (
          (!startDate || compareAsc(rowDate, startDate) >= 0) &&
          (!endDate || compareAsc(rowDate, endDate) <= 0)
        );
      });
      setFilteredData(filtered);
    } else {
      setFilteredData(data); // Reset filter if no date range selected
    }
  }, [startDate, endDate, data]);


  // useEffect(() => {
  //   setFilteredData(supportTicketList);
  // }, [supportTicketList]);

  // const handleSearch = (e) => {
  //   const searchValue = e.target.value.toLowerCase();
  //   if (!searchValue) {
  //     setFilteredData(supportTicketList);
  //     return;
  //   }
  //   const newFilteredData = supportTicketList.filter((ticket) =>
  //     Object.values(ticket).some((value) =>
  //       String(value).toLowerCase().includes(searchValue)
  //     )
  //   );
  //   setFilteredData(newFilteredData);
  // };



  const handleSearch = (column, value) => {
    const newSearchValues = { ...searchValues, [column]: value };
    setSearchValues(newSearchValues);

    const newFilteredData = data.filter((row) => {
      return Object.keys(newSearchValues).every((key) => {
        const searchValue = newSearchValues[key].trim();

        // If no search value for this column, skip filtering
        if (!searchValue) return true;

        // Handle date filtering for 'raised_on'
        if (key === "raised_on") {
          const rowDate = parse(row.raised_on, 'MM/dd/yyyy', new Date()); // Parse row date
          if (!isValid(rowDate)) return false;

          const filterDate = parse(searchValue, 'MM/dd/yyyy', new Date()); // Parse input date
          return isValid(filterDate) && compareAsc(rowDate, filterDate) === 0; // Match exact dates
        }

        // Handle string-based filtering for other columns
        const rowValue = (row[key] || '').toString().toLowerCase(); // Ensure a string
        return rowValue.includes(searchValue.toLowerCase());
      });
    });

    setFilteredData(newFilteredData);
  };





  const handleEdit = (ticket) => {
    if (ticket?.company_id) {
      dispatch(fetchVendorShowDetailData(ticket?.company_id));
      dispatch(setSearchTerm(ticket?.company_id))
    }
    setSelectedTicket(ticket);
    handleShow();
  };


  // const handleStatusToggle = async (ticket) => {
  //   const updatedTicket = { ...ticket, status: ticket.status === 'Active' ? 'Inactive' : 'Active' };
  //   // await dispatch(updateSupportTicketStatus(updatedTicket));
  //   dispatch(fetchSupportTicketData());
  // };


  const onHandleSubmit = async (e) => {
    e.preventDefault();
    const { raisedBy, issue, comments } = values;
    const internalType = 'internal';
    const status = 'Open';
    // const userType = 'Caterer';
    const data = {
      raisedBy, issue, comments, status, internalType
    }

    if (editId === null) {
      await dispatch(createSupportTicketData(data))
    } else {
      await dispatch(updateSupportTicketData(data))
    }
    await dispatch(fetchSupportTicketData());
    setValues(initialState)
    handleCloseCreateTicket()
    handleClose()
  }


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
      width: '100px',
      name: 'Ticket ID',
      cell: (row) => (
        <a className='text-primary cursor-pointer' onClick={() => handleEdit(row)}>
          {row.ticket_id}
        </a>
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
    },
    // { name: 'Ticket ID', selector: (row) => row.ticket_id, sortable: true, width: '150px' },
    { name: 'Company ID', selector: (row) => row.company_id, sortable: true, width: '100px' },
    { name: 'Vendor Service Name', selector: (row) => row.vendor_service_name, sortable: true, width: '250px' },
    // { name: 'User Type', selector: (row) => row.user_type, sortable: true, width: '100px' },
    {
      name: "User Type",

      cell: (row) => {
        let badgeClass = "badge";

        if (row.user_type?.toLowerCase() === "caterer") {
          badgeClass += " text-bg-danger-subtle";
        } else if (row.user_type?.toLowerCase() === "tiffin") {
          badgeClass += " text-bg-warning-subtle";
        }

        return (
          <span className={badgeClass}>
            {row.user_type || "Unknown"}
          </span>
        );

      },
      selector: (row) => row.user_type,
      width: '125px',
      sortable: true,
    },
    { name: 'Raised On', selector: (row) => new Date(row.raised_on).toLocaleDateString(), sortable: true, width: '150px' },
    { name: 'Issue', selector: (row) => row.issue, sortable: true },
    { name: 'Agent Name', selector: (row) => row.agent_name, sortable: true, width: '150px' },
    // { name: 'Status', selector: (row) => row.status, sortable: true, width: '100px' },
    {
      name: "Status",
      cell: (row) => {
        let badgeClass = "badge";

        if (row.status?.toLowerCase() === "closed") {
          badgeClass += " text-bg-danger-subtle";
        } else if (row.status?.toLowerCase() === "active") {
          badgeClass += " text-bg-success-subtle";
        }

        return (
          <span className={badgeClass}>
            {row.status || "Unknown"}
          </span>
        );
      },
      selector: (row) => row.status,
      width: '125px',
      sortable: true,
    },
    {
      name: 'Action',
      cell: (row) => (
        <Button variant="success" onClick={() => handleEdit(row)}>
          View
        </Button>
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
    },
  ];


  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("Selected Status:", status);
    const ticketId = selectedTicket.ticket_id;
    const data = {
      status,
      ticketId
    }
    await dispatch(updateSupportTicketData(data));
    await dispatch(fetchSupportTicketData());
    setStatus('')
    handleClose()
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
      tickets: selectedTickets.map((ticket) => ({ id: ticket.id })),
      agentId: selectedUser, // Assuming selectedUser contains the user ID
    };

    try {
      await dispatch(assignSupportTicket(payload))
      setSelectedTickets([]);
      setCheckedRows({});
      setSelectedUser('');
      handleAssignClose();
      dispatch(fetchSupportTicketData());
    } catch (error) {
      console.error('Error assigning tickets:', error);
      alert('An error occurred while assigning tickets. Please try again.');
    }
  };


  return (
    <>
      <div className="container-fluid my-5">

        <div className="row mb-4  me-2">
          <div className="d-flex justify-content-between align-items-center">
            <h1 className="header-title">
              Support Tickets - {supportTicketList?.length}
            </h1>
            <div>
              {viewAccess ? <button className='btn btn-primary fit-content me-4' variant="primary" onClick={handleAssignShow}>
                Assign
              </button> : <span></span>}
              <button className='btn btn-primary fit-content' variant="primary" onClick={handleShowCreateTicket}>
                Create Support Ticket
              </button>
            </div>
          </div>
        </div>
        <hr />


        {/* <div className="card">
        <GlobalSearch handleSearch={handleSearch} />
        <DataTable
          columns={columns}
          data={filteredData}
          pagination
          fixedHeader
          customStyles={tableCustomStyles}
        />
      </div> */}


        {/* Add a single row for column-based searches */}
        <div className="card">
          <div className="table-search-row mb-0">
            <div className="row p-3">
              {/* <div className="col-lg-3 mb-2">
                <input
                  type="text"
                  value={searchValues.id}
                  onChange={(e) => handleSearch("id", e.target.value)}
                  placeholder="ID"
                  className="form-control"
                />
              </div> */}
              <div className="col-lg-3 mb-2">
                <input
                  type="text"
                  value={searchValues.ticket_id}
                  onChange={(e) => handleSearch("ticket_id", e.target.value)}
                  placeholder="Ticket Id"
                  className="form-control"
                />
              </div>
              <div className="col-lg-3 mb-2">
                <input
                  type="text"
                  value={searchValues.company_id}
                  onChange={(e) => handleSearch("company_id", e.target.value)}
                  placeholder="Vendor Company ID"
                  className="form-control"
                />
              </div>
              <div className="col-lg-3 mb-2">
                <input
                  type="text"
                  value={searchValues.vendor_service_name}
                  onChange={(e) => handleSearch("vendor_service_name", e.target.value)}
                  placeholder="Vendor Service Name"
                  className="form-control"
                />
              </div>
              <div className="col-lg-3 mb-2">
                <input
                  type="text"
                  value={searchValues.user_type}
                  onChange={(e) => handleSearch("user_type", e.target.value)}
                  placeholder="User Type"
                  className="form-control"
                />
              </div>
              {/* <div className="col-lg-3 mb-2 ">
                <input
                  type="text"
                  value={searchValues.raised_on}
                  onChange={(e) => handleSearch("raised_on", e.target.value)}
                  placeholder="Raised On"
                  className="form-control"
                />
              </div> */}
              <div className="col-lg-3 mb-2">
                <input
                  type="text"
                  value={searchValues.issue}
                  onChange={(e) => handleSearch("issue", e.target.value)}
                  placeholder="Issue"
                  className="form-control"
                />
              </div>
              {/* <div className="col-lg-3 mb-2">
                <input
                  type="text"
                  value={searchValues.comments}
                  onChange={(e) => handleSearch("comments", e.target.value)}
                  placeholder="comments"
                  className="form-control"
                />
              </div> */}

              <div className="col-lg-3 mb-2">
                <input
                  type="text"
                  value={searchValues.agent_name}
                  onChange={(e) => handleSearch("agent_name", e.target.value)}
                  placeholder="Agent Name"
                  className="form-control"
                />
              </div>

              <div className="col-lg-3 mb-2">
                <input
                  type="text"
                  value={searchValues.status}
                  onChange={(e) => handleSearch("status", e.target.value)}
                  placeholder="status"
                  className="form-control"
                />
              </div>
              <div className='col-lg-3 mb-2'>
                {/* <label className='me-2'>Start Date</label> */}
                <DatePicker
                  selected={startDate}
                  onChange={(date) => setStartDate(date)}
                  showYearDropdown
                  scrollableYearDropdown
                  yearDropdownItemNumber={50}
                  placeholderText="Select Raised On"
                  dateFormat="dd/MM/yyyy"
                  className="form-control"
                  popperClassName="higher-zindex"
                />
              </div>
              {/* <div className="col-lg-3 mb-2">
                <input
                  type="text"
                  value={searchValues.internal_type}
                  onChange={(e) => handleSearch("internal_type", e.target.value)}
                  placeholder="Internal Type"
                  className="form-control"
                />
              </div> */}


            </div>

            {/* <div className="mb-3 ps-3 d-flex justify-content-start"> */}

            {/* <div className="">
                <DatePicker
                  selected={endDate}
                  onChange={(date) => setEndDate(date)}
                  showYearDropdown
                  scrollableYearDropdown
                  yearDropdownItemNumber={50}
                  placeholderText="Select end date"
                  dateFormat="dd/MM/yyyy"
                  className="form-control"
                  popperClassName="higher-zindex"
                />
              </div> */}

            {/* </div> */}
          </div>

          <DataTable
            columns={columns}
            data={filteredData}
            paginationRowsPerPageOptions={[50, 100, 300, 500, 1000]}
            paginationPerPage="100"
            pagination
            fixedHeader
            customStyles={tableCustomStyles}
            progressPending={isLoading}
            progressComponent={<LoadingSpinner />}
          />
        </div>
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




      <Modal centered show={showCreateTicket} onHide={handleCloseCreateTicket}>
        <form onSubmit={onHandleSubmit}>
          <Modal.Header closeButton>
            <Modal.Title>{editId ? 'Edit Support Ticket' : 'Create Support Ticket'}</Modal.Title>
          </Modal.Header>
          <Modal.Body>



            <div>
              <label htmlFor="raisedBy" className="form-label">Select Vendor</label>
              <Select
                options={receiverOptions}
                onChange={(selectedOption) =>
                  handleChange({ target: { name: 'raisedBy', value: selectedOption ? selectedOption.value : '' } })
                }
                placeholder="Select Vendor"
                isClearable
                isSearchable
              />
            </div>


            <div className="form-group mt-3">
              <label htmlFor="issue">Issue</label>
              <input
                type="text"
                className="form-control"
                name="issue"
                value={values.issue}
                onChange={(e) => setValues({ ...values, issue: e.target.value })}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="comments">Comments</label>
              <textarea
                className="form-control"
                name="comments"
                rows="3"
                value={values.comments}
                onChange={(e) => setValues({ ...values, comments: e.target.value })}
                required
              />
            </div>
            {/* <div className="form-group">
              <label htmlFor="agentId">Agent ID</label>
              <input
                type="text"
                className="form-control"
                name="agentId"
                value={values.agentId}
                onChange={(e) => setValues({ ...values, agentId: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label htmlFor="status">Status</label>
              <select
                className="form-control"
                name="status"
                value={values.status}
                onChange={(e) => setValues({ ...values, status: e.target.value })}
                required
              >
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div> */}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseCreateTicket}>Close</Button>
            <Button variant="primary" type="submit">
              {isLoading ? 'Loading...' : 'Save Changes'}
            </Button>
          </Modal.Footer>
        </form>
      </Modal>


      <Modal centered size="xl" show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Support Ticket Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {isLoading ? (
            <p>Loading...</p>
          ) : selectedTicket ? (
            <>

              <div className="my-4">
                <Form onSubmit={handleSubmit}>
                  <div className="d-flex align-items-center justify-content-end">
                    <Form.Group controlId="statusSelect" className='w-25'>
                      <Form.Control
                        as="select"
                        name='status'
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                      >
                        {/* <option value="" disabled>
                          Select Status
                        </option> */}
                        <option value="Open">Active</option>
                        <option value="Closed">Closed</option>
                      </Form.Control>
                    </Form.Group>

                    <Button variant="primary" type="submit" className='ms-2'>
                      Submit
                    </Button>
                  </div>
                </Form>
              </div>

              <div style={{ overflowX: 'auto', maxHeight: 'auto' }}>
                <Table responsive="xl" className="m-0" bordered>
                  <tbody>
                    <tr>
                      <th style={{ fontSize: '16px', fontWeight: 'bold' }}>Ticket ID</th>
                      <td style={{ fontSize: '16px' }}>{selectedTicket.ticket_id || 'N/A'}</td>
                    </tr>
                    <tr>
                      <th style={{ fontSize: '16px', fontWeight: 'bold' }}>Raised By</th>
                      <td style={{ fontSize: '16px' }}>{selectedTicket.raised_by || 'N/A'}</td>
                    </tr>
                    <tr>
                      <th style={{ fontSize: '16px', fontWeight: 'bold' }}>User Type</th>
                      <td style={{ fontSize: '16px' }}>{selectedTicket.user_type || 'N/A'}</td>
                    </tr>
                    <tr>
                      <th style={{ fontSize: '16px', fontWeight: 'bold' }}>Raised On</th>
                      <td style={{ fontSize: '16px' }}>
                        {new Date(selectedTicket.raised_on).toLocaleString() || 'N/A'}
                      </td>
                    </tr>
                    <tr>
                      <th style={{ fontSize: '16px', fontWeight: 'bold' }}>Issue</th>
                      <td style={{ fontSize: '16px' }}>{selectedTicket.issue || 'N/A'}</td>
                    </tr>
                    <tr>
                      <th style={{ fontSize: '16px', fontWeight: 'bold' }}>Comments</th>
                      <td style={{ fontSize: '16px' }}>{selectedTicket.comments || 'N/A'}</td>
                    </tr>
                    <tr>
                      <th style={{ fontSize: '16px', fontWeight: 'bold' }}>Agent Name</th>
                      <td style={{ fontSize: '16px' }}>{selectedTicket.agent_name || 'N/A'}</td>
                    </tr>
                    <tr>
                      <th style={{ fontSize: '16px', fontWeight: 'bold' }}>Status</th>
                      <td style={{ fontSize: '16px' }}>{selectedTicket.status || 'N/A'}</td>
                    </tr>
                    <tr>
                      <th style={{ fontSize: '16px', fontWeight: 'bold' }}>Assigned Date</th>
                      <td style={{ fontSize: '16px' }}>
                        {new Date(selectedTicket.agent_assigned_date_time).toLocaleString() || 'N/A'}
                      </td>
                    </tr>
                    <tr>
                      <th style={{ fontSize: '16px', fontWeight: 'bold' }}>Vendor Service Name</th>
                      <td style={{ fontSize: '16px' }}>
                        {selectedTicket.vendor_service_name || 'N/A'}
                      </td>
                    </tr>
                    <tr>
                      <th style={{ fontSize: '16px', fontWeight: 'bold' }}>Company ID</th>
                      <td style={{ fontSize: '16px' }}>{selectedTicket.company_id || 'N/A'}</td>
                    </tr>
                    <tr>
                      <th style={{ fontSize: '16px', fontWeight: 'bold' }}>Created By</th>
                      <td style={{ fontSize: '16px' }}>{selectedTicket.created_by_name || 'N/A'}</td>
                    </tr>
                    <tr>
                      <th style={{ fontSize: '16px', fontWeight: 'bold' }}>Assigned By</th>
                      <td style={{ fontSize: '16px' }}>{selectedTicket.agent_assigned_by_name || 'N/A'}</td>
                    </tr>
                  </tbody>
                </Table>
              </div>

              <VendorDetails searchBox={false} selectedTicket={selectedTicket}/>


            </>
          ) : (
            <p>No ticket selected.</p>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>Close</Button>
        </Modal.Footer>
      </Modal>




    </>


  );
};

export default SupportTickets;
