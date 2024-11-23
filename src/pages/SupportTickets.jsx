import React, { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useDispatch, useSelector } from 'react-redux';
import { createSupportTicketData, fetchSupportTicketData, fetchVendorListtData, updateSupportTicketData, updateSupportTicketStatus } from '../features/supportTicketSlice';
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
  const { supportTicketList, vendorSupportList, isLoading, ticketStatus } = useSelector((state) => state.supportTickets);

  // console.log(vendorSupportList, "vendorSupportList vendorSupportList");

  const { searchTerm } = useSelector((state) => state.supportTickets)
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [show, setShow] = useState(false);
  const [editId, setEditId] = useState(null);
  const [values, setValues] = useState(initialState);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [status, setStatus] = useState('');


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


  const handleClose = () => {
    setShow(false);
    setEditId(null);
    setValues(initialState);
  };
  const handleShow = () => setShow(true);

  useEffect(() => {
    dispatch(fetchSupportTicketData());
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchVendorListtData());
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
    }
    setSelectedTicket(ticket);
    handleShow();
  };


  // const handleStatusToggle = async (ticket) => {
  //   const updatedTicket = { ...ticket, status: ticket.status === 'Active' ? 'Inactive' : 'Active' };
  //   // await dispatch(updateSupportTicketStatus(updatedTicket));
  //   dispatch(fetchSupportTicketData());
  // };


  // const onHandleSubmit = async (e) => {
  //   e.preventDefault();
  //   const { raisedBy, issue, comments } = values;
  //   const internalType = 'internal';
  //   const status = 'Open';
  //   // const userType = 'Caterer';
  //   const data = {
  //     raisedBy, issue, comments, status, internalType
  //   }

  //   if (editId === null) {
  //     await dispatch(createSupportTicketData(data))
  //   } else {
  //     await dispatch(updateSupportTicketData(data))
  //   }
  //   await dispatch(fetchSupportTicketData());
  //   setValues(initialState)
  //   handleClose()
  // }



  const columns = [
    // { name: 'ID', selector: (row) => row.id, sortable: true },
    { name: 'Ticket ID', selector: (row) => row.ticket_id, sortable: true, width: '150px' },
    { name: 'Company ID', selector: (row) => row.company_id, sortable: true, width: '150px' },
    { name: 'Vendor Service Name', selector: (row) => row.vendor_service_name, sortable: true, width: '250px' },
    // { name: 'Raised By', selector: (row) => row.raised_by, sortable: true },
    { name: 'User Type', selector: (row) => row.user_type, sortable: true },
    { name: 'Raised On', selector: (row) => new Date(row.raised_on).toLocaleDateString(), sortable: true, width: '150px' },
    { name: 'Issue', selector: (row) => row.issue, sortable: true },
    // { name: 'Comments', selector: (row) => row.comments, sortable: true },
    // { name: 'Agent ID', selector: (row) => row.agent_id, sortable: true },
    { name: 'Agent Name', selector: (row) => row.agent_name, sortable: true, width: '150px' },
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
  };


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
              <div className="col-lg-3 mb-2 ">
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
                        value={supportTicketList?.status}
                        onChange={(e) => setStatus(e.target.value)}
                      >
                        <option value="" disabled>
                          Select Status
                        </option>
                        <option value="Open">Open</option>
                        <option value="Closed">Closed</option>
                      </Form.Control>
                    </Form.Group>

                    <Button variant="primary" type="submit" className='ms-2'>
                      Submit
                    </Button>
                  </div>
                </Form>
              </div>

              <div style={{ overflowX: 'auto', maxHeight: '500px' }}>
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

              <VendorDetails searchBox={false} />
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
