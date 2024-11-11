import React, { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useDispatch, useSelector } from 'react-redux';
import { createSupportTicketData, fetchSupportTicketData, updateSupportTicketData, updateSupportTicketStatus } from '../features/supportTicketSlice';
import GlobalSearch from '../components/common/GlobalSearch';
import { tableCustomStyles } from '../components/tableCustomStyles';
import { FaEdit } from "react-icons/fa";
import { format, parse, isValid, compareAsc } from 'date-fns';
import DatePicker from 'react-datepicker'; // Import DatePicker
import 'react-datepicker/dist/react-datepicker.css';




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
  const { supportTicketList, isLoading } = useSelector((state) => state.supportTickets);

  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [show, setShow] = useState(false);
  const [editId, setEditId] = useState(null);
  const [values, setValues] = useState(initialState);

  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  // State to store search values for each column
  const [searchValues, setSearchValues] = useState({
    id: "",
    ticket_id: "",
    user_type: "",
    raised_on: "",
    issue: "",
    comments: "",
    status: "",
    internal_type: "",
    vendor_service_name: "",
    agent_name: "",
  });


  const handleClose = () => {
    setShow(false);
    setEditId(null);
    setValues(initialState);
  };
  const handleShow = () => setShow(true);

  useEffect(() => {
    dispatch(fetchSupportTicketData());
  }, [dispatch]);


  // Format subscription data
  useEffect(() => {
    if (supportTicketList) {
      const formattedData = supportTicketList.map((subscription) => ({
        id: subscription?.id,
        ticket_id: subscription?.ticket_id,
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
    setEditId(ticket.id);
    setValues({
      ticketId: ticket.ticket_id || '',
      raisedBy: ticket.raised_by || '',
      userType: ticket.user_type || '',
      issue: ticket.issue || '',
      comments: ticket.comments || '',
      agentId: ticket.agent_id || '',
      status: ticket.status || '',
    });
    handleShow();
  };


  const handleStatusToggle = async (ticket) => {
    const updatedTicket = { ...ticket, status: ticket.status === 'Active' ? 'Inactive' : 'Active' };
    // await dispatch(updateSupportTicketStatus(updatedTicket));
    dispatch(fetchSupportTicketData());
  };


  const onHandleSubmit = async (e) => {
    e.preventDefault();
    const { ticketId, raisedBy, userType, issue, comments, agentId, status } = values;
    const data = {
      ticketId, raisedBy, userType, issue, comments, agentId, status,
    }

    if (editId === null) {
      await dispatch(createSupportTicketData(data))
    } else {
      await dispatch(updateSupportTicketData(data))
    }
    await dispatch(fetchSupportTicketData());
    setValues(initialState)
    handleClose()
  }



  const columns = [
    // { name: 'ID', selector: (row) => row.id, sortable: true },
    { name: 'Ticket ID', selector: (row) => row.ticket_id, sortable: true, width: '150px' },
    { name: 'Vendor Service Name', selector: (row) => row.vendor_service_name, sortable: true, width: '250px' },
    // { name: 'Raised By', selector: (row) => row.raised_by, sortable: true },
    { name: 'User Type', selector: (row) => row.user_type, sortable: true },
    { name: 'Raised On', selector: (row) => new Date(row.raised_on).toLocaleDateString(), sortable: true, width: '150px' },
    { name: 'Issue', selector: (row) => row.issue, sortable: true },
    { name: 'Comments', selector: (row) => row.comments, sortable: true },
    // { name: 'Agent ID', selector: (row) => row.agent_id, sortable: true },
    { name: 'Agent Name', selector: (row) => row.agent_name, sortable: true },
    { name: 'Status', selector: (row) => row.status, sortable: true, },
    // { name: 'Internal Type', selector: (row) => row.internal_type, sortable: true, width: '150px' },
    // {
    //   name: "Start Date",
    //   selector: row => {
    //     const startDate = new Date(row.start_date);
    //     return isValid(startDate) ? format(startDate, 'dd/MMM/yyyy') : 'N/A';
    //   },
    //   sortable: true,
    //   sortFunction: (rowA, rowB) => {
    //     const dateA = new Date(rowA.start_date);
    //     const dateB = new Date(rowB.start_date);

    //     // Handle invalid dates by sorting them to the end
    //     if (!isValid(dateA)) return 1;
    //     if (!isValid(dateB)) return -1;

    //     return dateA - dateB; // For ascending order
    //   },
    //   width: '150px'
    // },
    // {
    //   name: "End Date",
    //   selector: row => {
    //     const endDate = new Date(row.end_date);
    //     return isValid(endDate) ? format(endDate, 'dd/MMM/yyyy') : 'N/A';
    //   },
    //   sortable: true,
    //   sortFunction: (rowA, rowB) => {
    //     const dateA = new Date(rowA.end_date);
    //     const dateB = new Date(rowB.end_date);

    //     // Handle invalid dates by sorting them to the end
    //     if (!isValid(dateA)) return 1;
    //     if (!isValid(dateB)) return -1;

    //     return dateA - dateB; // For ascending order
    //   },
    //   width: '150px'
    // },
    {
      name: 'Action',
      cell: (row) => (
        <Button variant="success" onClick={() => handleEdit(row)}>
          <FaEdit />
        </Button>
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
    },
  ];




  return (
    <>
      <div className="container-fluid my-5">

        <div className="row mb-4  me-2">
          <div className="d-flex justify-content-between align-items-center">
            <h1 className="header-title">
              Support Tickets - {supportTicketList?.length}
            </h1>
            <button className='btn btn-primary fit-content' variant="primary" onClick={handleShow}>
              Create Support Ticket
            </button>
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
              <div className="col-lg-3 mb-2">
                <input
                  type="text"
                  value={searchValues.raised_on}
                  onChange={(e) => handleSearch("raised_on", e.target.value)}
                  placeholder="Raised On"
                  className="form-control"
                />
              </div>
              <div className="col-lg-3 mb-2">
                <input
                  type="text"
                  value={searchValues.issue}
                  onChange={(e) => handleSearch("issue", e.target.value)}
                  placeholder="Issue"
                  className="form-control"
                />
              </div>
              <div className="col-lg-3 mb-2">
                <input
                  type="text"
                  value={searchValues.comments}
                  onChange={(e) => handleSearch("comments", e.target.value)}
                  placeholder="comments"
                  className="form-control"
                />
              </div>

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

            <div className="mb-3 ps-3 d-flex justify-content-start">
              <div className='me-4'>
                {/* <label className='me-2'>Start Date</label> */}
                <DatePicker
                  selected={startDate}
                  onChange={(date) => setStartDate(date)}
                  showYearDropdown
                  scrollableYearDropdown
                  yearDropdownItemNumber={50}
                  placeholderText="Select start date"
                  dateFormat="dd/MM/yyyy"
                  className="form-control"
                  popperClassName="higher-zindex"
                />
              </div>
              <div className="">
                {/* <label className='me-2'>End Date</label> */}
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
              </div>

            </div>
          </div>

          <DataTable
            columns={columns}
            data={filteredData}
            pagination
            fixedHeader
            customStyles={tableCustomStyles}
          />
        </div>
      </div>



      <Modal centered show={show} onHide={handleClose}>
        <form onSubmit={onHandleSubmit}>
          <Modal.Header closeButton>
            <Modal.Title>{editId ? 'Edit Support Ticket' : 'Create Support Ticket'}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="form-group">
              <label htmlFor="ticketId">Ticket ID</label>
              <input
                type="text"
                className="form-control"
                name="ticketId"
                value={values.ticketId}
                onChange={(e) => setValues({ ...values, ticketId: e.target.value })}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="raisedBy">Raised By</label>
              <input
                type="text"
                className="form-control"
                name="raisedBy"
                value={values.raisedBy}
                onChange={(e) => setValues({ ...values, raisedBy: e.target.value })}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="userType">User Type</label>
              <select
                id="userType"
                className="form-control"
                name="userType"
                value={values.userType}
                onChange={(e) => setValues({ ...values, userType: e.target.value })}
                required
              >
                <option value="">Select User Type</option> {/* Placeholder option */}
                <option value="Caterer">Caterer</option>
                <option value="Tiffin">Tiffin</option>
                {/* <option value="Customer">Customer</option>
                <option value="Admin">Admin</option> */}
              </select>
            </div>

            <div className="form-group">
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
            <div className="form-group">
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
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>Close</Button>
            <Button variant="primary" type="submit">
              {isLoading ? 'Loading...' : 'Save Changes'}
            </Button>
          </Modal.Footer>
        </form>
      </Modal>
    </>


  );
};

export default SupportTickets;
