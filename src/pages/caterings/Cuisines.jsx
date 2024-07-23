import React, { useEffect, useState } from 'react'
import DataTable from 'react-data-table-component';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useSelector, useDispatch } from 'react-redux'
import { addCateringParentCuisine, deleteCateringCuisine, editCateringParentCuisine, fetchCateringCuisines } from '../../features/catering/cateringSlice';
import { FaCloudUploadAlt } from "react-icons/fa";
import useUploadCusinePhotoos from '../../hooks/useUploadCusinePhotoos';
import GlobalSearch from '../../components/common/GlobalSearch';
import { FaEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import { tableCustomStyles } from '../../components/tableCustomStyles';
import { setCuisineId } from '../../features/userSlice';
import useToggle from '../../hooks/useToggle';



const rows = [
  {
    personID: 1,
    mainCategory: "Mumbai",
    image: "https://dashkit.goodthemes.co/assets/img/avatars/profiles/avatar-1.jpg",
    status: "Active",
  },
  {
    personID: 2,
    mainCategory: "Bangalore",
    image: "https://dashkit.goodthemes.co/assets/img/avatars/profiles/avatar-1.jpg",
    status: "De Active",
  }
];


const rowsSubCategory = [
  {
    personID: 1,
    mainCategory: "Mumbai",
    subCategory: "Mumbai",
    image: "https://dashkit.goodthemes.co/assets/img/avatars/profiles/avatar-1.jpg",
    status: "Active",
  },
  {
    personID: 2,
    mainCategory: "Bangalore",
    subCategory: "Bangalore",
    image: "https://dashkit.goodthemes.co/assets/img/avatars/profiles/avatar-1.jpg",
    status: "De Active",
  }
];

const Cuisines = () => {

  const { onHandleToggleStatus, toggleStatus } = useToggle()
  const { onUploadParentCuisine } = useUploadCusinePhotoos()

  const [show, setShow] = useState(false);
  const handleClose = () => {
    setShow(false)
    setMainCategory("")
    setMainCategoryId(null)
  };
  const handleShow = () => {
    setShow(true)
  };
  const [mainCategory, setMainCategory] = useState("")
  const [mainCategoryId, setMainCategoryId] = useState(null)

  const dispatch = useDispatch()
  const { cuisineList, isLoading } = useSelector((state) => state.catering)
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);

  const [subCatdata, setSubCatData] = useState([]);
  const [filteredSubcatData, setFilteredSubcatData] = useState([]);

  const parentList = cuisineList?.filter((item) => item?.parent_id === null)
  const childList = cuisineList?.filter((item) => item?.parent_id !== null)
  // console.log(parentList, "parentList parentList");

  useEffect(() => {
    dispatch(fetchCateringCuisines())
  }, [])

  // const count = useSelector((state) => state.cuisine.value)

  useEffect(() => {
    if (cuisineList) {
      const formattedData = parentList?.map((parent, index) => ({
        personID: parent?.id,
        mainCategory: parent?.name,
        image: parent?.file_name?.medium,
        status: "N/A",
      }));
      setData(formattedData);
      setFilteredData(formattedData);
    }
  }, [cuisineList]);


  useEffect(() => {
    if (cuisineList) {
      const formattedData = childList?.map((child, index) => ({
        personID: child?.id,
        parentID: child?.parent_id,
        mainCategory: child?.parent_name,
        subCategory: child?.name,
        image: child?.file_name?.medium,
        status: "N/A",
      }));
      setSubCatData(formattedData);
      setFilteredSubcatData(formattedData);
    }
  }, [cuisineList]);

  const [showSubCategory, setSubCategory] = useState(false);
  const [mainCategoryChild, setMainCategoryChild] = useState("")
  const [mainCategorySubChild, setMainCategorySubChild] = useState("")
  const [mainCategoryChildId, setMainCategoryChildId] = useState(null)

  // console.log(mainCategoryChild, "mainCategoryChild mainCategoryChild");

  const handleImageError = (e) => {
    e.target.src = 'https://www.cateringsandtiffins.com/img/no-image.jpg'; // Provide the path to your error image here
  };

  const handleSubClose = () => {
    setSubCategory(false)
    setMainCategoryChild("")
    setMainCategorySubChild("")
    setMainCategoryChildId(null)
  };
  const handleSubShow = () => setSubCategory(true);


  const handleSearch = (e) => {
    const searchValue = e.target.value.toLowerCase();
    if (!searchValue) {
      setFilteredData(data);
      return;
    }
    const newFilteredData = data.filter((row) => {
      return (
        row?.personID?.toString().toLowerCase().includes(searchValue) ||
        row?.mainCategory?.toLowerCase().includes(searchValue)
      );
    });
    setFilteredData(newFilteredData);
  };


  const handleSubCategorySearch = (e) => {
    const searchValue = e.target.value.toLowerCase();
    if (!searchValue) {
      setFilteredSubcatData(subCatdata);
      return;
    }
    const newFilteredData = subCatdata?.filter((row) => {
      return (
        row?.personID?.toString().toLowerCase().includes(searchValue) ||
        row?.mainCategory?.toLowerCase().includes(searchValue) ||
        row?.subCategory?.toLowerCase().includes(searchValue)
      );
    });
    setFilteredSubcatData(newFilteredData);
  };

  const columns = [
    {
      name: "ID",
      selector: row => row.personID,
      sortable: true,
    },
    {
      name: "Main Category",
      selector: row => row.mainCategory,
      sortable: true,
    },
    {
      name: "Image Upload",
      cell: row => (
        row.image ? (
          <>
            <input
              accept="image/*"
              id="onUploadParentCuisine"
              multiple
              type="file"
              style={{ display: 'none' }}
              onChange={(e) => onUploadParentCuisine(e)}
            />
            <label htmlFor="onUploadParentCuisine">
              <span variant="contained" component="span" style={{ cursor: 'pointer' }}
                onClick={() => dispatch(setCuisineId(row?.personID))}
              >
                <img onError={handleImageError} src={row.image} style={{ width: '30px', borderRadius: '5px' }} alt="" className="img-fluid" />
              </span>
            </label>
          </>
        ) : (
          <>
            <input
              accept="image/*"
              id="onUploadParentCuisine"
              multiple
              type="file"
              style={{ display: 'none' }}
              onChange={(e) => onUploadParentCuisine(e)}
            />
            <label htmlFor="onUploadParentCuisine">
              <span variant="contained" component="span" style={{ cursor: 'pointer' }}
                onClick={() => dispatch(setCuisineId(row?.personID))}
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
      name: "Status",
      selector: row => row.status,
      sortable: true,
    },
    {
      name: "Action",
      cell: (row) => (
        <>
          <button className="btn btn-success me-1" onClick={() => handleEdit(row)}>
            <FaEdit />
          </button>
          <button className="btn btn-danger" onClick={() => handleDelete(row.personID)}>
            <MdDeleteForever />
          </button>

          {/* <span className='text-primary cursor-pointer' onClick={() => handleEdit(row.personID)}>Edit / </span>
          <span className='text-primary cursor-pointer' onClick={() => handleDelete(row.personID)}> {" "} Delete </span> */}
        </>
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
    },
  ];


  const columnsSubCategory = [
    {
      name: "ID",
      selector: row => row.personID,
      sortable: true,
    },
    {
      name: "Main Category",
      selector: row => row.mainCategory,
      sortable: true,
    },
    {
      name: "Sub Category",
      selector: row => row.subCategory,
      sortable: true,
    },
    {
      name: "Image Upload",
      cell: row => (
        row.image ? (
          <>
            <input
              accept="image/*"
              id="onUploadParentCuisine"
              multiple
              type="file"
              style={{ display: 'none' }}
              onChange={(e) => onUploadParentCuisine(e)}
            />
            <label htmlFor="onUploadParentCuisine">
              <span variant="contained" component="span" style={{ cursor: 'pointer' }}
                onClick={() => dispatch(setCuisineId(row?.personID))}
              >
                <img onError={handleImageError} src={row.image} style={{ width: '30px', borderRadius: '5px' }} alt="" className="img-fluid" />
              </span>
            </label>
          </>
        ) : (
          <>
            <input
              accept="image/*"
              id="onUploadParentCuisine"
              multiple
              type="file"
              style={{ display: 'none' }}
              onChange={(e) => onUploadParentCuisine(e)}
            />
            <label htmlFor="onUploadParentCuisine">
              <span variant="contained" component="span" style={{ cursor: 'pointer' }}
                onClick={() => dispatch(setCuisineId(row?.personID))}
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
      name: "Status",
      selector: row => row.status,
      sortable: true,
    },
    {
      name: "Action",
      cell: (row) => (
        <>

          <button className="btn btn-success me-1" onClick={() => handleEditChild(row)}>
            <FaEdit />
          </button>
          <button className="btn btn-danger" onClick={() => handleDeleteChild(row.personID)}>
            <MdDeleteForever />
          </button>

          {/* <span className='text-primary cursor-pointer' onClick={() => handleEdit(row.personID)}>Edit / </span>
          <span className='text-primary cursor-pointer' onClick={() => handleDelete(row.personID)}> {" "} Delete </span> */}
        </>
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
    },
  ];


  // handleEditChild 
  const handleEditChild = (row) => {
    console.log(row, "row row");
    setMainCategoryChild(row.mainCategory)
    setMainCategorySubChild(row.subCategory)
    setMainCategoryChildId(row)
    handleSubShow()
    // handleSubClose()   
  }

  const handleDeleteChild = () => {

  }

  // console.log(mainCategoryId, "mainCategoryId mainCategoryId");

  const handleEdit = (row) => {
    setMainCategoryId(row.personID)
    setMainCategory(row.mainCategory);
    handleShow()
  }
  const handleDelete = (cusineId) => {
    // console.log(cusineId, "cusineId");
    const data = {
      is_active: '',
      id: cusineId
    }
    // dispatch(deleteCateringCuisine(data)) 
  }


  const onSubmitMainCategory = async (e) => {
    e.preventDefault();
    const addData = {
      name: mainCategory,
      id: parentList.length + 1
    }
    const data = {
      name: mainCategory,
      id: mainCategoryId
    }
    if (mainCategoryId === null) {
      await dispatch(addCateringParentCuisine(addData))
    } else {
      await dispatch(editCateringParentCuisine(data))
    }
    dispatch(fetchCateringCuisines())
    handleClose()
  }

  // console.log(mainCategoryChildId, "mainCategoryChildId");

  const onSubmitMainCategoryChild = async (e) => {
    e.preventDefault();
    const data = {
      name: mainCategorySubChild,
      id: mainCategoryChildId.personID,
      parent_id: mainCategoryChildId?.parentID
    }

    if (mainCategoryChildId === null) {
      alert("test")
    } else {
      await dispatch(editCateringParentCuisine(data))
    }
    dispatch(fetchCateringCuisines())
    handleSubClose()
  }

  return (
    <>
      <div className="container-fluid my-5">

        <div className="row mb-4 d-flex justify-content-end me-2">
          <button className='btn btn-primary fit-content' variant="primary" onClick={handleShow}>
            Create Main Category
          </button>

          <button className='btn btn-primary fit-content ms-3' variant="primary" onClick={handleSubShow}>
            Create Sub Category
          </button>
        </div>

        <hr />

        <h2>Total Main Categories - {parentList?.length} </h2>

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

        <hr />

        <h2>Total Sub Categories - {childList?.length} </h2>

        <div className="card">
          <GlobalSearch handleSearch={handleSubCategorySearch} />
          <DataTable
            columns={columnsSubCategory}
            data={filteredSubcatData}
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
        <form onSubmit={onSubmitMainCategory}>
          <Modal.Header closeButton>
            <Modal.Title> {mainCategoryId ? 'Edit Main Category' : 'Add Main Category'} </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div>
              <label for="name" className="form-label"> {mainCategoryId ? 'Edit Category' : 'Add Category'} </label>
              <input required type="text" className="form-control" placeholder="Category" value={mainCategory} onChange={(e) => setMainCategory(e.target.value)} />
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



      <Modal centered show={showSubCategory} onHide={handleSubClose}>
        <form onSubmit={onSubmitMainCategoryChild}>
          <Modal.Header closeButton>
            <Modal.Title> {mainCategoryChildId ? 'Edit Sub Category' : 'Add Sub Category'}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {/* <div className='mt-3'>
              <label for="name" className="form-label">{mainCategoryChildId ? 'Edit Category' : 'Add Category'}</label>
              <input type="text" className="form-control" placeholder="Category" value={mainCategoryChild} onChange={(e) => setMainCategoryChild(e.target.value)} />
            </div> */}

            <select
              style={{ backgroundColor: `${mainCategoryChildId !== null && 'rgb(0 0 0 / 4%)'}` }}
              disabled={mainCategoryChildId !== null}
              className="form-select"
              value={mainCategoryChild}
              onChange={(e) => setMainCategoryChild(e.target.value)}
            >
              {parentList?.map((item) => {
                return (
                  <>
                    <option value={item?.id} disabled={mainCategoryChildId !== null}>{item?.name}</option>
                  </>
                )
              })}
            </select>

            <div className='mt-3'>
              <label for="name" className="form-label"> {mainCategoryChildId ? 'Edit Sub Category' : 'Add Sub Category'} </label>
              <input required type="text" className="form-control" placeholder="Sub Category" value={mainCategorySubChild} onChange={(e) => setMainCategorySubChild(e.target.value)} />
            </div>

          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleSubClose}>
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

export default Cuisines