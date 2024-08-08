import React, { useEffect, useState } from 'react'
import DataTable from 'react-data-table-component';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useDispatch, useSelector } from 'react-redux';
import { fetchOccasionList } from '../../features/catering/occasionSlice';
import GlobalSearch from '../../components/common/GlobalSearch';
import { tableCustomStyles } from '../../components/tableCustomStyles';
import { FaEdit } from "react-icons/fa";
import { FaCloudUploadAlt } from "react-icons/fa";


const rows = [
  {
    personID: 1,
    fullName: "Mumbai",
    image: "https://dashkit.goodthemes.co/assets/img/avatars/profiles/avatar-1.jpg",
  },
  {
    personID: 2,
    fullName: "Bangalore",
    image: "https://dashkit.goodthemes.co/assets/img/avatars/profiles/avatar-1.jpg",
  },
  {
    personID: 3,
    fullName: "Chennai",
    image: "https://dashkit.goodthemes.co/assets/img/avatars/profiles/avatar-1.jpg",
  },
  {
    personID: 4,
    fullName: "Hyderabad",
    image: "https://dashkit.goodthemes.co/assets/img/avatars/profiles/avatar-1.jpg",
  },
  {
    personID: 5,
    fullName: "Pune",
    image: "https://dashkit.goodthemes.co/assets/img/avatars/profiles/avatar-1.jpg",
  },
  {
    personID: 6,
    fullName: "Gurgaon",
    image: "https://dashkit.goodthemes.co/assets/img/avatars/profiles/avatar-1.jpg",
  },
  {
    personID: 7,
    fullName: "Ranchi",
    image: "https://dashkit.goodthemes.co/assets/img/avatars/profiles/avatar-1.jpg",
  },
  {
    personID: 8,
    fullName: "Kolkata",
    image: "https://dashkit.goodthemes.co/assets/img/avatars/profiles/avatar-1.jpg",
  },
  {
    personID: 9,
    fullName: "Goa",
    image: "https://dashkit.goodthemes.co/assets/img/avatars/profiles/avatar-1.jpg",
  },
  {
    personID: 10,
    fullName: "Madurai",
    image: "https://dashkit.goodthemes.co/assets/img/avatars/profiles/avatar-1.jpg",
  },
  {
    personID: 11,
    fullName: "Coiambator",
    image: "https://dashkit.goodthemes.co/assets/img/avatars/profiles/avatar-1.jpg",
  },
];

const Occasions = () => {
  const dispatch = useDispatch()
  const { occasionsList, isLoading } = useSelector((state) => state.occasion)
  // console.log(occasionsList, "occasionsList");


  useEffect(() => {
    dispatch(fetchOccasionList());
  }, [dispatch]);


  const [data, setData] = useState(rows);
  const [filteredData, setFilteredData] = useState([]);

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleImageError = (e) => {
    e.target.src = 'https://www.cateringsandtiffins.com/img/no-image.jpg'; // Provide the path to your error image here
  };

  useEffect(() => {
    if (occasionsList) {
      const formattedData = occasionsList?.map((occasion, index) => ({
        id: occasion?.occasion_id,
        name: occasion?.occasion_name,
        image: occasion?.file_name?.medium
      }));
      setData(formattedData);
      setFilteredData(formattedData);
    }
  }, [occasionsList]);


  const handleSearch = (e) => {
    const searchValue = e.target.value.toLowerCase();
    if (!searchValue) {
      setFilteredData(data);
      return;
    }
    const newFilteredData = data.filter((row) => {
      return (
        row?.id?.toString().toLowerCase().includes(searchValue) ||
        row?.name?.toLowerCase().includes(searchValue)
      );
    });
    setFilteredData(newFilteredData);
  };


  // const handleSearch = (e) => {
  //   const searchValue = e.target.value.toLowerCase();
  //   const newRows = rows.filter((row) => {
  //     return (
  //       row.id.toString().toLowerCase().includes(searchValue) ||
  //       row.name.toLowerCase().includes(searchValue)
  //     );
  //   });
  //   setData(newRows);
  // };

  const columns = [
    {
      name: "ID",
      selector: row => row.id,
      sortable: true,
    },
    {
      name: "City Name",
      selector: row => row.name,
      sortable: true,
    },
    {
      name: "Image Preview",
      cell: row => (
        row.image ? (
          <>
            <input
              accept="image/*"
              id="onUploadCityImage"
              multiple
              type="file"
              style={{ display: 'none' }}
              // onChange={(e) => onUploadCityImage(e)}
            />
            <label htmlFor="onUploadCityImage">
              <span variant="contained" component="span" style={{ cursor: 'pointer' }}
                // onClick={() => dispatch(setCuisineId(row?.id))}
              >
                <img onError={handleImageError} src={row?.image} style={{ width: '30px', borderRadius: '5px' }} alt="" className="img-fluid" />
              </span>
            </label>
          </>
        ) : (
          <>
            <input
              accept="image/*"
              id="onUploadCityImage"
              multiple
              type="file"
              style={{ display: 'none' }}
              // onChange={(e) => onUploadCityImage(e)}
            />
            <label htmlFor="onUploadCityImage">
              <span variant="contained" component="span" style={{ cursor: 'pointer' }}
                // onClick={() => dispatch(setCuisineId(row?.id))}
              >
                <FaCloudUploadAlt size={30} />
              </span>
            </label>
          </>
        )
      ),
      sortable: false,
    },
    {
      name: "Action",
      cell: (row) => (
        <>
          <button className="btn btn-success me-1" onClick={() => handleEdit(row)}>
            <FaEdit />
          </button>
          {/* <button className="btn btn-danger" onClick={() => handleDelete(row.id)}>
            <MdDeleteForever />
          </button> */}
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

  return (
    <>
      <div className="container my-5">

        <div className="row mb-4 d-flex justify-content-end me-2">
          <button className='btn btn-primary fit-content' variant="primary" onClick={handleShow}>
            Create Occasion
          </button>
        </div>
        <hr />

        <h4>Total Occasions - 12</h4>

        <div className="card">
          <GlobalSearch handleSearch={handleSearch} />
          <DataTable
            columns={columns}
            data={filteredData}
            fixedHeader
            pagination
            selectableRows
            customStyles={tableCustomStyles}
          // title="React-Data-Table-Component Tutorial."
          />
        </div>
      </div>

      <br />

      <Modal centered show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Create City</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <label for="name" className="form-label">Add Occasion</label>
            <input type="text" className="form-control" placeholder="City Name" />
          </div>
          <div className='mt-3'>
            <label for="image" className="form-label">Add Image</label>
            <input className="form-control" type="file" id="formFile" accept="image/*" />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default Occasions