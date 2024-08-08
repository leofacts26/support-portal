import React, { useEffect, useState } from 'react'
import DataTable from 'react-data-table-component';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { tableCustomStyles } from '../../components/tableCustomStyles';
import { useDispatch, useSelector } from 'react-redux';
import { fetchNewsletter } from '../../features/homepage/homeSlice';
import * as XLSX from "xlsx";
import GlobalSearch from '../../components/common/GlobalSearch';


const NewsLetter = () => {
  const dispatch = useDispatch()
  const { newsLetters, isLoading } = useSelector((state) => state.homepage)

  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    dispatch(fetchNewsletter());
  }, [dispatch]);


  useEffect(() => {
    if (newsLetters) {
      const formattedData = newsLetters?.map((city, index) => ({
        name: city?.email,
        status: city?.status
      }));
      setData(formattedData);
      setFilteredData(formattedData);
    }
  }, [newsLetters]);



  const handleSearch = (e) => {
    const searchValue = e.target.value.toLowerCase();
    if (!searchValue) {
      setFilteredData(data);
      return;
    }
    const newFilteredData = data?.filter((row) => {
      return (
        row?.name?.toString().toLowerCase().includes(searchValue) ||
        row?.status?.toLowerCase().includes(searchValue)
      );
    });
    setFilteredData(newFilteredData);
  };


  const columns = [
    {
      name: "Email",
      selector: row => row.name,
      sortable: true,
    },
    {
      name: "Status",
      selector: row => row.status,
      sortable: true,
    }
  ];

  const handleEdit = (event) => {
    console.log(event, "event");
  }
  const handleDelete = (event) => {
    console.log(event, "event");
  }

  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(filteredData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
    XLSX.writeFile(workbook, "newsletter.xlsx");
  };

  console.log(tableCustomStyles, "tableCustomStyles");
  

  return (
    <>
      <div className="container-fluid my-5">

        <div className="row mb-4 d-flex justify-content-end me-2">
          <button className='btn btn-primary fit-content' variant="primary" onClick={handleShow}>
            Send Offers
          </button>
          <button className='btn btn-secondary fit-content ms-2' variant="primary" onClick={exportToExcel}>
            Export
          </button>
        </div>


        <div className="card">
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


      </div>
      <br />

      <Modal centered show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Offers Email Templates</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <label for="name" className="form-label">title</label>
            <input type="text" className="form-control" placeholder="City Name" />
          </div>
          <div className='mt-3'>
            <label for="name" className="form-label">Description</label>
            <textarea className="form-control" data-autosize rows={3} placeholder="Try typing something..." defaultValue={""} />
          </div>
          <div className='mt-3'>
            <label for="name" className="form-label">Add Discounts</label>
            <input type="text" className="form-control" placeholder="10% Early Bird Offer" />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Send Email
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default NewsLetter