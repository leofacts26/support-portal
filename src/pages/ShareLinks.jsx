import React, { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useDispatch, useSelector } from 'react-redux';
import { createSupportTicketData, fetchSupportTicketData, updateSupportTicketData, updateSupportTicketStatus } from '../features/supportTicketSlice';
import GlobalSearch from '../components/common/GlobalSearch';
import { tableCustomStyles } from '../components/tableCustomStyles';
import { FaEdit } from "react-icons/fa";
import { createSupportshareLinksData, fetchSupportSharedLinksData, updateSupportshareLinksData } from '../features/shareLinksSlice';
import moment from 'moment';
import LoadingSpinner from '../components/LoadingSpinner';


const initialState = {
  shared_by: '',
  shared_via: '',
  phone_email: '',
  email_id: '',
}


const ShareLinks = () => {
  const dispatch = useDispatch();
  const { supportSharedLinksList, isLoading } = useSelector((state) => state.shareLinks);

  const [filteredData, setFilteredData] = useState([]);
  const [show, setShow] = useState(false);
  const [editId, setEditId] = useState(null);
  const [values, setValues] = useState(initialState);

  const handleClose = () => {
    setShow(false);
    setEditId(null);
    setValues(initialState);
  };
  const handleShow = () => setShow(true);

  useEffect(() => {
    dispatch(fetchSupportSharedLinksData());
  }, [dispatch]);

  useEffect(() => {
    setFilteredData(supportSharedLinksList);
  }, [supportSharedLinksList]);

  const handleSearch = (e) => {
    const searchValue = e.target.value.toLowerCase();
    if (!searchValue) {
      setFilteredData(supportSharedLinksList);
      return;
    }
    const newFilteredData = supportSharedLinksList.filter((ticket) =>
      Object.values(ticket).some((value) =>
        String(value).toLowerCase().includes(searchValue)
      )
    );
    setFilteredData(newFilteredData);
  };



  const handleEdit = (ticket) => {
    setEditId(ticket.id);
    setValues({
      shared_by: ticket.shared_by || '',
      shared_via: ticket.shared_via || '',
      phone_email: ticket.phone_email || '',
      email_id: ticket.email_id || ''
    });
    handleShow();
  };


  const handleStatusToggle = async (ticket) => {
    const updatedTicket = { ...ticket, status: ticket.status === 'Active' ? 'Inactive' : 'Active' };
    // await dispatch(updateSupportTicketStatus(updatedTicket));
    dispatch(fetchSupportSharedLinksData());
  };


  const onHandleSubmit = async (e) => {
    e.preventDefault();
    const { shared_by, shared_via, phone_email, email_id } = values;
    const data = {
      shared_by,
      shared_via,
      phone_email,
      email_id,
      id: editId
    }

    if (editId === null) {
      await dispatch(createSupportshareLinksData(data))
    } else {
      await dispatch(updateSupportshareLinksData(data))
    }
    await dispatch(fetchSupportSharedLinksData());
    setValues(initialState)
    handleClose()
  }



  const columns = [
    // { name: 'ID', selector: (row) => row.id, sortable: true },
    { name: 'Shared By', selector: (row) => row.shared_by_name, sortable: true, width: '200px' },
    { name: 'Shared Via', selector: (row) => row.shared_via, sortable: true, },
    {
      name: 'Phone',
      selector: (row) => (
        <a href={`tel:${row.phone_email}`} style={{ textDecoration: 'none', color: 'blue' }}>
          {row.phone_email}
        </a>
      ),
      sortable: true,
    },
    {
      name: 'Date Time',
      selector: (row) => moment(row.date_time).format('DD/MMM/YYYY h:mm a'),
      sortable: true,
      width: '250px'
    },
    {
      name: 'Email Id',
      selector: (row) => (
        <a href={`mailto:${row.email_id}`} style={{ textDecoration: 'none', color: 'blue' }}>
          {row.email_id}
        </a>
      ),
      sortable: true,
      width: '250px',
    },
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
    <div className="container-fluid my-5">

      <div className="row mb-4  me-2">
        <div className="d-flex justify-content-between align-items-center">
          <h1 className="header-title">
            Share Tickets - {supportSharedLinksList?.length}
          </h1>
          <button className='btn btn-primary fit-content' variant="primary" onClick={handleShow}>
            Create Share Link
          </button>
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
          progressPending={isLoading}
          progressComponent={<LoadingSpinner />}
        />
      </div>



      <Modal centered show={show} onHide={handleClose}>
        <form onSubmit={onHandleSubmit}>
          <Modal.Header closeButton>
            <Modal.Title>{editId ? 'Edit Support Ticket' : 'Create Support Ticket'}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {/* <div className="form-group">
              <label htmlFor="sharedBy">Shared By</label>
              <input
                type="number"
                className="form-control"
                name="shared_by"
                value={values.shared_by}
                onChange={(e) => setValues({ ...values, shared_by: e.target.value })}
                required
              />
            </div> */}
            {/* <div className="form-group">
              <label htmlFor="sharedBy">Shared Via</label>
              <input
                type="number"
                className="form-control"
                name="shared_via"
                value={values.shared_via}
                onChange={(e) => setValues({ ...values, shared_via: e.target.value })}
                required
              />
            </div> */}
            <div className="form-group">
              <label htmlFor="phoneEmail">Phone</label>
              <input
                type="text"
                className="form-control"
                name="phone_email"
                value={values.phone_email}
                onChange={(e) => setValues({ ...values, phone_email: e.target.value })}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="emailId">Email ID</label>
              <input
                type="email"
                className="form-control"
                name="email_id"
                value={values.email_id}
                onChange={(e) => setValues({ ...values, email_id: e.target.value })}
              />
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



    </div>
  );
};

export default ShareLinks;
