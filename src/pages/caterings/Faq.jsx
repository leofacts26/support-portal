import React, { useEffect, useState } from 'react'
import DataTable from 'react-data-table-component';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCatteringFaqs } from '../../features/catering/cateringFaq';
import { FaEdit } from "react-icons/fa";


const rows = [
  {
    personID: 1,
    question: "How can i register as a Caterer",
    answer: "Simple, Just Open the Given URl and Register yourself",
  }
];

const Faq = () => {
  const { faqList } = useSelector((state) => state.faq)
  const dispatch = useDispatch()
  const [data, setData] = useState(rows);
  const [filteredData, setFilteredData] = useState([]);

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


  const [showUser, setShowUser] = useState(false);
  const handleShowUserClose = () => setShowUser(false);
  const handleShowUserShow = () => setShowUser(true);


  useEffect(() => {
    dispatch(fetchCatteringFaqs())
  }, [])


  useEffect(() => {
    if (faqList) {
      const formattedData = faqList?.map((item, index) => ({
        question_id: item?.question_id,
        answer_id: item?.answer_id,
        question_text: item?.question_text,
        answer_text: item?.answer_text
      }));
      setData(formattedData);
      setFilteredData(formattedData);
    }
  }, [faqList]);


  const handleSearch = (e) => {
    const searchValue = e.target.value.toLowerCase();
    if (!searchValue) {
      setFilteredData(data);
      return;
    }
    const newFilteredData = data?.filter((row) => {
      return (
        row?.question_text?.toString().toLowerCase().includes(searchValue) ||
        row?.answer_text?.toLowerCase().includes(searchValue)
      );
    });
    setFilteredData(newFilteredData);
  };


  const handleUserSearch = (e) => {
    const searchValue = e.target.value.toLowerCase();
    const newRows = rows.filter((row) => {
      return (
        row.personID.toString().toLowerCase().includes(searchValue) ||
        row.question.toLowerCase().includes(searchValue) ||
        row.answer.toLowerCase().includes(searchValue)
      );
    });
    setData(newRows);
  };

  const columns = [
    {
      name: "S.No",
      selector: row => row.question_id,
      sortable: true,
      width: '10%',
    },
    {
      name: "Question",
      selector: row => row.question_text,
      sortable: true,
      width: '20%',
    },
    {
      name: "Answer",
      selector: row => row.answer_text,
      sortable: true,
      width: '30%',
    },
    {
      name: "Status",
      width: '10%',
      cell: row => (
        <div className="form-check form-switch">
          <input
            className="form-check-input"
            type="checkbox"
            id={`status-${row.id}`}
            checked={row.is_active === 1}
          // onChange={() => handleStatusToggle(row)}
          />
        </div>
      ),
      sortable: true,
    },
    {
      name: "Action",
      width: '5%',
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

  console.log(faqList, "faqList faqList");


  return (
    <>
      <div className="container-fluid my-5">

        <div className="row mb-4 d-flex justify-content-between me-2">
          <button className='btn btn-primary fit-content ms-3' variant="primary" onClick={handleShow}>
            Create Vendor FAQ's
          </button>
          <button className='btn btn-primary fit-content' variant="primary" onClick={handleShowUserShow}>
            Create User FAQ's
          </button>
        </div>

        <hr />

        <h4>Vendor Catering FAQ's</h4>
        <div className="card">
          <input
            type="search"
            className="form-control-sm border ps-3 py-3"
            placeholder="Search"
            onChange={handleSearch}
          />
          <DataTable
            columns={columns}
            data={filteredData}
            fixedHeader
            pagination
            selectableRows
          // title="React-Data-Table-Component Tutorial."
          />
        </div>


        {/* <h4>Vendor User FAQ's</h4>
        <div className="card">
          <input
            type="search"
            className="form-control-sm border ps-3 py-3"
            placeholder="Search"
            onChange={handleUserSearch}
          />
          <DataTable
            columns={columns}
            data={data}
            fixedHeader
            pagination
            selectableRows
          // title="React-Data-Table-Component Tutorial."
          />
        </div> */}


      </div>

      <br />

      <Modal centered show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Create Vendor FAQ's</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <label for="name" className="form-label">Add Question</label>
            <input type="text" className="form-control" placeholder="City Name" />
          </div>
          <div className='mt-4'>
            <label for="name" className="form-label">Write Answer</label>
            <textarea class="form-control" data-autosize rows="1" placeholder="Try typing something..."></textarea>
          </div>

        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Add FAQ
          </Button>
        </Modal.Footer>
      </Modal>



      <Modal centered show={showUser} onHide={handleShowUserClose}>
        <Modal.Header closeButton>
          <Modal.Title>Create User FAQ's</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <label for="name" className="form-label">Add Question</label>
            <input type="text" className="form-control" placeholder="City Name" />
          </div>
          <div className='mt-4'>
            <label for="name" className="form-label">Write Answer</label>
            <textarea class="form-control" data-autosize rows="1" placeholder="Try typing something..."></textarea>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleShowUserClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleShowUserClose}>
            Add FAQ
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default Faq