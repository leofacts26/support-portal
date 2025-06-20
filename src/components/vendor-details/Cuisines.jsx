import { useState } from "react";
import { Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col } from 'react-bootstrap';

import { styled } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';


import Checkbox from '@mui/material/Checkbox';
import Autocomplete from '@mui/material/Autocomplete';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import { Box, Grid } from '@mui/material';
import toast from 'react-hot-toast';
import Button from '@mui/material/Button';
import { fetchVendorShowDetailData } from "../../features/menuSlice";
import { api, BASE_URL } from "../../api/apiConfig";


const CssTextFieldMultiSelect = styled(TextField)(({ theme }) => ({
  '& .MuiInputLabel-root': { // Style for the label
    fontSize: '12px', // Set the font size for the label
    color: '#777777',
  },
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      border: '2px solid #F0F1F3',
      borderRadius: '12px',
    },
    '&:hover fieldset': {
      border: '2px solid #F0F1F3',
    },
    '&.Mui-focused fieldset': {
      border: '2px solid #c33332',
    },
  },
  '& input': {
    border: 'none',
    padding: '0px 0px',
    height: '10px'
  },
}));

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));


const Cuisines = ({ cuisines, showCuisines, handleCuisinesClose, handleCuisinesShow, searchTerm, companyId }) => {
  const dispatch = useDispatch()
  const { token } = useSelector((state) => state.authSlice);
  const [cuisinesList, setCuisinesList] = useState(cuisines)
  const [isLoading, setIsLoading] = useState(false)

  const handleAutocompleteChange = (event, value, parentItem) => {
    const updatedCuisinesList = cuisinesList.map(cuisine => {
      if (cuisine.id === parentItem.id) {
        return {
          ...cuisine,
          children: cuisine.children.map(child => ({
            ...child,
            selected: value.includes(child.name) ? "1" : "0"
          }))
        };
      }
      return cuisine;
    });
    setCuisinesList(updatedCuisinesList);
  };

  const handleCheckboxToggle = (event, option, parentItem) => {
    const updatedCuisinesList = cuisinesList.map(cuisine => {
      if (cuisine.id === parentItem.id) {
        if (option === 'All') {
          const allSelected = parentItem.children.every(child => child.selected === "1");
          return {
            ...cuisine,
            children: cuisine.children.map(child => ({
              ...child,
              selected: allSelected ? "0" : "1"
            }))
          };
        }
        return {
          ...cuisine,
          children: cuisine.children.map(child =>
            child.name === option ? { ...child, selected: child.selected === "1" ? "0" : "1" } : child
          )
        };
      }
      return cuisine;
    });
    setCuisinesList(updatedCuisinesList);
  };





  const handleSubmit = async (e) => {
    e.preventDefault()

    setIsLoading(true)
    // const updatedOccasions = await handleAutocompleteChange();

    const cuisinesData = cuisinesList?.map((item) => {
      return item.children.map((childItem) => {
        return {
          cuisine_id: parseInt(childItem?.id),
          selected: parseInt(childItem?.selected)
        }
      })
    }).flat()

    const data = {
      cuisines: JSON.stringify(cuisinesData),
      company_id: searchTerm || companyId,
    }

    // console.log(data, "data");

    await api.post(`${BASE_URL}/support-update-vendor-cuisine`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    })
    toast.success("Cuisines Updated Successfully...")
    setIsLoading(false)
    handleCuisinesClose()
    dispatch(fetchVendorShowDetailData(searchTerm || companyId));
  }


  return (
    <>

      <div className="row mx-2">
        <div className="bg-secondary text-white py-3 d-flex justify-content-between">
          <h3 className='mb-0'>Cuisines You Cater</h3>
          <h3 className='mb-0 text-warning' style={{ cursor: 'pointer' }} onClick={handleCuisinesShow}>Edit</h3>
        </div>

        <div className="row mt-4">
          <div className='mt-3'>
           
              <div className="mt-4">
                {cuisinesList?.length > 0 &&
                  cuisinesList.map((item) => (
                    <div key={item.id}>
                      {item.children.some((childItem) => childItem.selected === "1") ? (
                        <>
                          <h6 className="fw-bold">{item.name}</h6>
                          <Row className="mt-2 mb-3 ps-4">
                            {item.children
                              .filter((childItem) => childItem.selected === "1")
                              .map((childItem) => (
                                <Col key={childItem.id} xs="auto" className="mb-2">
                                  <Button variant="outline-primary" className="me-2">
                                    {childItem.name}
                                  </Button>
                                </Col>
                              ))}
                          </Row>
                        </>
                      ) : null}
                    </div>
                  ))}
                {!cuisinesList.some((item) =>
                  item.children.some((childItem) => childItem.selected === "1")
                ) && <h2 className="text-center">No Cuisines Found</h2>}
              </div>
       
          </div>
        </div>
      </div >


      <Modal
        show={showCuisines}
        onHide={handleCuisinesClose}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        {/* <Modal.Header closeButton>
          <Modal.Title>Update Cuisine</Modal.Title>
        </Modal.Header> */}
        <Modal.Body>
          <form onSubmit={handleSubmit}>
            <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
              <h2 className='cusines-modal-title'>Choose Your Cuisines From the List</h2>
            </DialogTitle>
            <IconButton
              aria-label="close"
              onClick={handleCuisinesClose}
              sx={{
                position: 'absolute',
                right: 8,
                top: 8,
                color: (theme) => theme.palette.grey[500],
              }}
            >
              <CloseIcon />
            </IconButton>
            <DialogContent dividers>
              <Grid container spacing={2}>
                {cuisinesList?.map((item) => (
                  item.children.length > 0 && (
                    <Grid item xs={12} sm={6} md={6} lg={6} xl={6} key={item.id}>
                      <Autocomplete
                        multiple
                        id="checkboxes-tags-demo"
                        options={['All', ...item.children.map(child => child.name)]}
                        disableCloseOnSelect
                        getOptionLabel={(option) => option}
                        renderOption={(props, option, { selected }) => (
                          <li {...props} style={{ fontSize: '10px' }} onClick={(event) => handleCheckboxToggle(event, option, item)}>
                            <Checkbox
                              style={{ marginRight: 8, fontSize: '10px' }}
                              checked={
                                option === 'All'
                                  ? item.children.every(child => child.selected === "1")
                                  : item.children.some(child => child.name === option && child.selected === "1")
                              }
                            />
                            {option}
                          </li>
                        )}
                        renderTags={(value, getTagProps) =>
                          value.map((option, index) => (
                            <li key={index} {...getTagProps({ index })} style={{ fontSize: '10px' }}>
                              {option}
                            </li>
                          ))
                        }
                        style={{ width: '100%' }}
                        renderInput={(params) => (
                          <CssTextFieldMultiSelect
                            label={item?.name}
                            {...params}
                          />
                        )}
                        onChange={(event, value) => handleAutocompleteChange(event, value, item)}
                        value={item.children.filter(child => child.selected === "1").map(child => child.name)}
                      />
                    </Grid>
                  )
                ))}
              </Grid>
            </DialogContent>
            <DialogActions style={{ display: 'flex', justifyContent: 'center' }}>
              <Button type="submit" variant="contained" className="inquiries-btn" disabled={isLoading}> {isLoading ? 'Loading...' : 'Submit'} </Button>
            </DialogActions>
          </form>
        </Modal.Body>
      </Modal>

    </>
  )
}
export default Cuisines