import Table from 'react-bootstrap/Table';
import Modal from 'react-bootstrap/Modal';

import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Grid';
import Divider from '@mui/material/Divider';
import { styled } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux'
import usePlacesService from "react-google-autocomplete/lib/usePlacesAutocompleteService";
import { Formik } from 'formik';
import * as Yup from 'yup';
import { MenuItem, Select } from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import dayjs from 'dayjs';
import { api, BASE_URL } from '../../api/apiConfig';
import toast from 'react-hot-toast';
import { datavalidationerror, successToast } from '../../utils';
import { fetchVendorShowDetailData } from '../../features/menuSlice';



const CssTextField = styled(TextField)(({ theme }) => ({
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      border: '2px solid #F0F1F3',
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
    fontSize: '16px',
    padding: '10px 20px',
  },
}));



const formatPhoneNumber = (phoneNumber) => {

  let formatedNumber = "";
  if (phoneNumber.startsWith('+91-')) {
    formatedNumber += phoneNumber;
  } else {
    formatedNumber += '+91-' + phoneNumber;
  }
  console.log(formatedNumber, "formatedNumber");
  return formatedNumber

};



const BusinessInformation = ({ vendorDetails, show, handleClose, handleShow, editTrigger, searchTerm, companyId }) => {

  const { token } = useSelector((state) => state.authSlice);
  const dispatch = useDispatch()

  const [values, setValues] = useState(vendorDetails)
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);

  const [locationPlaceId, setLocationPlaceId] = useState(null)
  const [manualLocation, setManualLocation] = useState("")
  const [selectedLocation, setSelectedLocation] = useState(null);

  const [loading, setLoading] = useState(false)

  // validation schema 
  const schema = Yup.object().shape({
    vendor_service_name: Yup.string().required('Name is required.'),
    point_of_contact_name: Yup.string().required('Contact person name is required.'),
    business_phone_number: Yup.string()
      .required('Business phone number is required')
      .matches(/^[+]?[0-9-]+$/, 'Phone number must contain only digits, +, or -')
      .min(10, 'Phone number must be at least 10 digits')
      .max(15, 'Phone number must not exceed 15 digits'),
    // whatsapp_business_phone_number: Yup.string()
    //   .matches(/^\+?[0-9]{1,4}[-]?[0-9]{6,14}$/,
    //     'Enter a valid phone number')
    //   .min(10, 'Phone number must be at least 10 characters')
    //   .max(15, 'Phone number must not exceed 15 characters')
  });


  useEffect(() => {
    if (vendorDetails) {
      // console.log(vendorDetails, "vendorDetailsvendorDetails");

      setStartDate(vendorDetails?.start_day);
      setEndDate(vendorDetails?.end_day);
      setStartTime(vendorDetails.start_time ? dayjs(vendorDetails.start_time, 'HH:mm:ss') : null);
      setEndTime(vendorDetails.end_time ? dayjs(vendorDetails.end_time, 'HH:mm:ss') : null);
    }
  }, [vendorDetails, editTrigger]);







  const handleStartChange = (event) => {
    setStartDate(event.target.value);
  };

  const handleEndChange = (event) => {
    setEndDate(event.target.value);
  };

  const handleStartTimeChange = (newValue) => {
    setStartTime(newValue);
  };

  const handleEndTimeChange = (newValue) => {
    setEndTime(newValue);
  };



  // loc start
  const {
    placesService,
    placePredictions,
    getPlacePredictions,
    isPlacePredictionsLoading,
  } = usePlacesService({
    apiKey: process.env.REACT_APP_GOOGLE,
    options: {
      componentRestrictions: { country: 'in' }
    }
  });

  useEffect(() => {
    if (placePredictions.length)
      placesService?.getDetails(
        {
          placeId: locationPlaceId,
        },
        (placeDetails) => savePlaceDetailsToState(placeDetails)
      );
  }, [placePredictions, locationPlaceId]);


  const savePlaceDetailsToState = (places) => {
    const { formatted_address, name } = places;
    const { address_components } = places;

    const country = address_components?.find(c => c?.types?.includes('country')) || {};
    const state = address_components?.find(c => c?.types?.includes('administrative_area_level_1')) || {};
    const city = address_components?.find(c => c?.types?.includes('locality')) || {};
    const pincode = address_components?.find(c => c?.types?.includes('postal_code')) || {};
    const area = address_components?.find(c => c?.types?.includes('locality')) || {};
    const street_name = address_components?.find(c => c?.types?.includes('locality')) || {};

    // console.log(pincode, "pincode pincode 123");

    const { geometry: { location } } = places;
    const { lat, lng } = location;

    setValues({
      ...values,
      street_name: street_name?.long_name || "",
      area: area?.long_name || "",
      pincode: pincode?.long_name || "",
      latitude: lat() || "",
      longitude: lng() || "",
      address: name || "",
      city: city?.long_name || "",
      state: state?.long_name || "",
      country: country?.long_name || "",
      formatted_address: manualLocation || "",
      place_id: locationPlaceId
    })
  }

  const selectLocation = (item) => {
    console.log(item, "Item");
    setSelectedLocation(item);
    setManualLocation(item.description);
    setLocationPlaceId(item?.place_id)
  }
  // loc end 


  const handleSubmit = async (values, resetForm) => {
    console.log(values, "values 123");
    setLoading(true)
    const {
      vendor_service_name,
      vendor_type,
      street_name,
      point_of_contact_name,
      total_staffs_approx,
      street_address,
      pin_code,
      about_description,
      working_since,
      business_email,
      business_phone_number,
      landline_number,
      whatsapp_business_phone_number,
      website_link,
      twitter_id,
      instagram_link,
      facebook_link,
      country,
      state,
      city,
      pincode,
      place_id,
      latitude,
      longitude,
      area,
      formatted_address,
    } = values;

    const newData = {
      vendor_service_name,
      vendor_type,
      street_name,
      point_of_contact_name,
      total_staffs_approx,
      street_address,
      pin_code,
      about_description,
      working_since,
      business_email,
      business_phone_number,
      landline_number,
      whatsapp_business_phone_number,
      website_link,
      twitter_id,
      instagram_link,
      facebook_link,
      country,
      state,
      city,
      pincode,
      place_id,
      latitude,
      longitude,
      area,
      formatted_address,
    }

    const formattedStartTime = startTime ? dayjs(startTime).format('hh:mm:ss A') : '';
    const formattedEndTime = endTime ? dayjs(endTime).format('hh:mm:ss A') : '';

    const data = {
      ...newData,
      working_hours_start: formattedStartTime || startTime,
      working_hours_end: formattedEndTime || endTime,
      working_days_start: startDate,
      working_days_end: endDate,
      company_id: searchTerm || companyId
    }

    console.log(data, "dataddd");

    try {
      const response = await api.post(`${BASE_URL}/support-update-vendor-business-profile-detailed`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      })
      toast.success(successToast(response))
      dispatch(fetchVendorShowDetailData(searchTerm || companyId));
    } catch (error) {
      console.log(error);
      toast.error(datavalidationerror(error))
    } finally {
      setLoading(false)
      handleClose()
    }
  }







  return (
    <>
      <div className="row mx-2">
        <div className="bg-secondary text-white py-3 d-flex justify-content-between">
          <h3 className='mb-0'>Business Information</h3>
          <h3 className='mb-0 text-warning' onClick={handleShow} style={{ cursor: 'pointer' }}>Edit</h3>
        </div>
        <Table responsive="xl" className='m-0'>
          <>
            <thead>
              <tr>
                <th style={{ fontSize: '10px' }}>vendor_service_name</th>
                {/* <th style={{ fontSize: '10px' }}>vendor_type</th> */}
                <th style={{ fontSize: '10px' }}>business_email</th>
                <th style={{ fontSize: '10px' }}>business_phone_number</th>
                <th style={{ fontSize: '10px' }}>phone_number</th>
                <th style={{ fontSize: '10px' }}>point_of_contact_name</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{vendorDetails?.vendor_service_name ? vendorDetails?.vendor_service_name : 'N/A'}</td>
                {/* <td>{vendorDetails?.vendor_type ? vendorDetails?.vendor_type : 'N/A'}</td> */}
                <td>{vendorDetails?.business_email ? vendorDetails?.business_email : 'N/A'}</td>
                <td>{vendorDetails?.business_phone_number ? vendorDetails?.business_phone_number : 'N/A'}</td>
                <td>{vendorDetails?.phone_number ? vendorDetails?.phone_number : 'N/A'}</td>
                <td>{vendorDetails?.point_of_contact_name ? vendorDetails?.point_of_contact_name : 'N/A'}</td>
              </tr>
            </tbody>


            <thead>
              <tr>
                <th style={{ fontSize: '10px' }}>whatsapp_business_phone_number</th>
                {/* <th style={{ fontSize: '10px' }}>about_description</th> */}
                <th style={{ fontSize: '10px' }}>facebook_link</th>
                <th style={{ fontSize: '10px' }}>instagram_link</th>
                <th style={{ fontSize: '10px' }}>twitter_id</th>
                <th style={{ fontSize: '10px' }}>website_link</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{vendorDetails?.whatsapp_business_phone_number ? vendorDetails?.whatsapp_business_phone_number : 'N/A'}</td>
                {/* <td>{vendorDetails?.about_description ? vendorDetails?.about_description : 'N/A'}</td> */}
                <td>{vendorDetails?.facebook_link ? vendorDetails?.facebook_link : 'N/A'}</td>
                <td>{vendorDetails?.instagram_link ? vendorDetails?.instagram_link : 'N/A'}</td>
                <td>{vendorDetails?.twitter_id ? vendorDetails?.twitter_id : 'N/A'}</td>
                <td>{vendorDetails?.website_link ? vendorDetails?.website_link : 'N/A'}</td>
              </tr>
            </tbody>



            <thead>
              <tr>
                <th style={{ fontSize: '10px' }}>street Address</th>
                <th style={{ fontSize: '10px' }}>area</th>
                <th style={{ fontSize: '10px' }}>city</th>

                <th style={{ fontSize: '10px' }}>state</th>

                <th style={{ fontSize: '10px' }}>pincode</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{vendorDetails?.street_address ? vendorDetails?.street_address : 'N/A'}</td>
                <td>{vendorDetails?.area ? vendorDetails?.area : 'N/A'}</td>
                <td>{vendorDetails?.city ? vendorDetails?.city : 'N/A'}</td>
                <td>{vendorDetails?.state ? vendorDetails?.state : 'N/A'}</td>
                <td>{vendorDetails?.pincode ? vendorDetails?.pincode : 'N/A'}</td>

              </tr>
            </tbody>

            <thead>
              <tr>
                <th style={{ fontSize: '10px' }}>country</th>
                <th style={{ fontSize: '10px' }}>latitude</th>
                <th style={{ fontSize: '10px' }}>longitude</th>
                <th style={{ fontSize: '10px' }}>Full Address</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{vendorDetails?.country ? vendorDetails?.country : 'N/A'}</td>
                <td>{vendorDetails?.longitude ? vendorDetails?.longitude : 'N/A'}</td>
                <td>{vendorDetails?.latitude ? vendorDetails?.latitude : 'N/A'}</td>
                <td style={{ width: '300px' }}>{`${`${vendorDetails?.street_address}, ` + `${vendorDetails?.formatted_address} - ` + vendorDetails?.pincode}`}</td>
              </tr>
            </tbody>
          </>
        </Table>
      </div>

      <div className="row mx-2">
        <div className="bg-secondary text-white py-3 d-flex justify-content-between">
          <h3 className="mb-0">About</h3>
        </div>
        <Table responsive="xl" className="m-0">
          <thead>
            <tr>
              <th style={{ fontSize: '10px' }}>About Description</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              {/* about_description */}
              <td>{vendorDetails?.about_description ? vendorDetails?.about_description : 'N/A'}</td>
            </tr>
          </tbody>
        </Table>
      </div>
      {/* <hr /> */}





      <Modal
        centered
        show={show}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        onHide={handleClose}
      >
        <Modal.Header closeButton>
          <Modal.Title>Update Business Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Container maxWidth="xl">
            {/*   */}
            <Formik enableReinitialize={true} initialValues={values} validationSchema={schema} onSubmit={(values, { resetForm }) => handleSubmit(values, resetForm)}>
              {({ values, errors, handleChange, handleSubmit }) => (
                <form className='card-box-shadow px-2 py-4 mb-4' onSubmit={handleSubmit} autocomplete="off">
                  <p className='cuisines-title text-center'>BUSINESS INFORMATION</p>
                  <Divider
                    className='mt-2'
                    variant="middle"
                    style={{
                      backgroundColor: '#c33332',
                      margin: '0px',
                      width: '35%',
                      margin: '0px auto'
                    }}
                  />


                  <Grid container spacing={2} className="mt-4">
                    <Grid item xs={6}>
                      <div>
                        <p className="business-profile-name">Catering Name</p>
                        <CssTextField
                          value={values.vendor_service_name}
                          onChange={handleChange}
                          name="vendor_service_name"
                          variant="outlined"
                          placeholder="Enter Your Catering Service Name"
                          className='mt-0'
                          style={{ width: '100%' }}
                          InputLabelProps={{
                            style: { color: '#777777', fontSize: '10px' },
                          }}
                          InputProps={{
                            style: {
                              borderRadius: '8px',
                              backgroundColor: '#FFFFFF',
                            }
                          }}
                        />
                        {errors.vendor_service_name && <small className='text-danger mt-2 ms-1'>{errors.vendor_service_name}</small>}
                      </div>
                    </Grid>



                    <Grid item xs={6}>
                      <div className="mt-0">
                        <p className="business-profile-name">Contact person Name</p>
                        <CssTextField
                          value={values.point_of_contact_name}
                          onChange={handleChange}
                          name="point_of_contact_name"
                          variant="outlined"
                          placeholder="Enter Contact person name"
                          className='mt-0'
                          style={{ width: '100%' }}
                          InputLabelProps={{
                            style: { color: '#777777', fontSize: '10px' },
                          }}
                          InputProps={{
                            style: {
                              borderRadius: '8px',
                              backgroundColor: '#FFFFFF',
                            }
                          }}
                        />
                        {errors.point_of_contact_name && <small className='text-danger mt-2 ms-1'>{errors.point_of_contact_name}</small>}
                      </div>

                    </Grid>
                  </Grid>


                  <Grid container spacing={2} style={{ display: 'flex', justifyContent: 'center' }}>
                    <Grid item xs={12} >

                      <div className="mt-5">
                        <p className="business-profile-name">Working days/hours</p>

                        <Stack direction="row" justifyContent="start" alignItems="center" spacing={2}>
                          <Box>
                            <FormControl>
                              <InputLabel id="demo-simple-select-label">Monday</InputLabel>
                              <Select
                                style={{ width: '150px' }}
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={startDate}
                                label="startDate"
                                onChange={handleStartChange}
                              >
                                <MenuItem value="Monday">Monday</MenuItem>
                                <MenuItem value="Tuesday">Tuesday</MenuItem>
                                <MenuItem value="Wednesday">Wednesday</MenuItem>
                                <MenuItem value="Thursday">Thursday</MenuItem>
                                <MenuItem value="Friday">Friday</MenuItem>
                                <MenuItem value="Saturday">Saturday</MenuItem>
                                <MenuItem value="Sunday">Sunday</MenuItem>
                              </Select>
                            </FormControl>
                          </Box>

                          <Box sx={{ width: '150px' }}>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                              <TimePicker
                                label="Select Time"
                                value={startTime ? dayjs(startTime, 'hh:mm:ss A') : null}
                                onChange={(newValue) => {
                                  handleStartTimeChange(newValue, setStartTime);
                                }}
                                renderInput={(params) => <TextField
                                  {...params}
                                />}
                              />
                            </LocalizationProvider>
                          </Box>

                          <span>-</span>

                          <Box>
                            <FormControl>
                              <InputLabel id="demo-simple-select-label1">Monday</InputLabel>
                              <Select
                                style={{ width: '150px' }}
                                labelId="demo-simple-select-label1"
                                id="demo-simple-select1"
                                value={endDate}
                                label="endDate"
                                onChange={handleEndChange}
                              >
                                <MenuItem value="Monday">Monday</MenuItem>
                                <MenuItem value="Tuesday">Tuesday</MenuItem>
                                <MenuItem value="Wednesday">Wednesday</MenuItem>
                                <MenuItem value="Thursday">Thursday</MenuItem>
                                <MenuItem value="Friday">Friday</MenuItem>
                                <MenuItem value="Saturday">Saturday</MenuItem>
                                <MenuItem value="Sunday">Sunday</MenuItem>
                              </Select>
                            </FormControl>
                          </Box>

                          <Box sx={{ width: '150px' }}>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                              <TimePicker
                                label="Select Time"
                                value={endTime ? dayjs(endTime, 'hh:mm:ss A') : null}
                                onChange={(newValue) => {
                                  handleEndTimeChange(newValue, setEndTime);
                                }}
                                renderInput={(params) => <TextField
                                  {...params}
                                  sx={{ gridColumn: "span 1" }}
                                />}
                              />
                            </LocalizationProvider>
                          </Box>

                        </Stack>
                      </div>
                    </Grid>
                  </Grid>



                  {
                    values?.vendor_type?.toLowerCase() !== "tiffin" && (
                      <Grid container spacing={2} style={{ display: 'flex', justifyContent: 'center' }}>
                        <Grid item xs={8} >

                          <div style={values.working_days_hours ? { marginTop: '50px' } : { marginTop: '50px' }}>
                            <p className="business-profile-name">Total No. of Staffs Approx</p>
                            <CssTextField
                              value={values.total_staffs_approx}
                              onChange={handleChange}
                              name="total_staffs_approx"
                              variant="outlined"
                              placeholder="Eg. 10 - 15"
                              className='mt-0'
                              style={{ width: '100%' }}
                              InputLabelProps={{
                                style: { color: '#777777', fontSize: '10px' },
                              }}
                              InputProps={{
                                style: {
                                  borderRadius: '8px',
                                  backgroundColor: '#FFFFFF',
                                }
                              }}
                            />
                            {/* {errors.total_staffs_approx && <small className='text-danger mt-2 ms-1'>{errors.total_staffs_approx}</small>} */}
                          </div>

                        </Grid>
                      </Grid>
                    )
                  }


                  <Grid container spacing={2} style={{ display: 'flex', justifyContent: 'center' }}>
                    <Grid item xs={8} >
                      <div style={{ marginTop: '50px' }}>
                        <p className="business-profile-name">Street Address</p>

                        <CssTextField
                          value={values.street_address}
                          onChange={handleChange}
                          name="street_address"
                          variant="outlined"
                          placeholder="E.g.. 15"
                          className='mt-0'
                          style={{ width: '100%' }}
                          InputLabelProps={{
                            style: { color: '#777777', fontSize: '10px' },
                          }}
                          InputProps={{
                            style: {
                              borderRadius: '8px',
                              backgroundColor: '#FFFFFF',
                            }
                          }}
                        />
                      </div>
                    </Grid>
                  </Grid>


                  <Grid container spacing={2} style={{ display: 'flex', justifyContent: 'center' }}>
                    <Grid item xs={8} >
                      <div className="mt-5">
                        <p className="business-profile-name">Address</p>
                        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                          <textarea
                            autocomplete="false"
                            required
                            style={{ height: '65px' }}
                            onChange={(evt) => {
                              setSelectedLocation(null);
                              setManualLocation(evt.target.value);
                              getPlacePredictions({ input: evt.target.value });
                              handleChange(evt); // This line ensures Formik's handleChange is called
                            }}
                            value={manualLocation ? manualLocation : values.formatted_address}
                            name="formatted_address" // Make sure the name matches the field name in initialValues
                            rows="20" id="comment_text" cols="40"
                            className="job-textarea" autoComplete="off" role="textbox"
                            aria-autocomplete="list" aria-haspopup="true"
                          ></textarea>
                        </Box>
                      </div>

                      {placePredictions?.length > 0 && !selectedLocation && (
                        <p className='ct-box-search-loc mb-1'>Search Results</p>
                      )}

                      {isPlacePredictionsLoading ? (
                        // <LoaderSpinner /> 
                        <h2>Loading...</h2>
                      ) : (
                        !selectedLocation && (
                          placePredictions?.map((item, index) => (
                            <h2 className='ct-box-search-results cursor-pointer' key={index} onClick={() => selectLocation(item)}>{item?.description}</h2>
                          ))
                        )
                      )}



                    </Grid>
                  </Grid>


                  <Grid className="mb-4" container spacing={2} style={{ display: 'flex', justifyContent: 'center' }}>
                    <Grid item xs={8} >
                      <div style={{ marginTop: '50px' }}>
                        <p className="business-profile-name">Pincode</p>
                        <CssTextField
                          value={values.pincode}
                          onChange={handleChange}
                          name="pincode"
                          variant="outlined"
                          placeholder="Enter Pincode"
                          className='mt-0'
                          style={{ width: '100%' }}
                          InputLabelProps={{
                            style: { color: '#777777', fontSize: '10px' },
                          }}
                          InputProps={{
                            style: {
                              borderRadius: '8px',
                              backgroundColor: '#FFFFFF',
                            }
                          }}
                        />
                      </div>
                    </Grid>
                  </Grid>



                  <Grid container spacing={2} style={{ display: 'flex', justifyContent: 'center' }} className={`${!selectedLocation && 'mt-5'}`}>
                    <Grid item xs={8} >
                      <div className="mt-5">
                        <p className="business-profile-name">About</p>
                        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                          <textarea value={values.about_description}
                            onChange={handleChange}
                            name="about_description" rows="20" id="comment_text" cols="40"
                            className="job-textarea" autoComplete="off" role="textbox"
                            aria-autocomplete="list" aria-haspopup="true"></textarea>
                        </Box>
                        {/* {errors.about_description && <small className='text-danger mt-2 ms-1'>{errors.about_description}</small>} */}
                      </div>
                    </Grid>
                  </Grid>




                  <Grid container spacing={2} style={{ display: 'flex', justifyContent: 'center' }}>
                    <Grid item xs={8} >
                      <div className="mt-3">
                        <p className="business-profile-name">Working Since</p>
                        {/* <select name="working_since" id="working_since" onChange={handleChange} value={values.working_since} className="select-box">
                    <option value="">Select Year</option> 
                      {years.map((year) => (
                         <option key={year} value={year}>{year+1}</option>
                      ))}
                    </select> */}
                        <CssTextField
                          value={values.working_since}
                          onChange={handleChange}
                          placeholder="Enter Year"
                          name="working_since"
                          variant="outlined"
                          className='mt-0'
                          style={{ width: '100%' }}
                          InputLabelProps={{
                            style: { color: '#777777', fontSize: '10px' },
                          }}
                          inputProps={{ maxLength: 4 }}
                          InputProps={{
                            style: {
                              borderRadius: '8px',
                              backgroundColor: '#FFFFFF',
                            }
                          }}
                        />
                        {/* {errors.working_since && <small className='text-danger mt-2 ms-1'>{errors.working_since}</small>} */}
                      </div>
                    </Grid>
                  </Grid>

                  <p className='cuisines-title text-center mt-5'>CONTACT DETAILS</p>

                  <Divider
                    className='mt-2 mb-5'
                    variant="middle"
                    style={{
                      backgroundColor: '#c33332',
                      margin: '0px',
                      width: '35%',
                      margin: '0px auto'
                    }}
                  />

                  <Grid container spacing={2} style={{ display: 'flex', justifyContent: 'center' }}>
                    <Grid item xs={8} >
                      <div>
                        <p className="business-profile-name">Business Email Id</p>
                        <CssTextField
                          value={values.business_email}
                          onChange={handleChange}
                          name="business_email"
                          variant="outlined"
                          className='mt-0'
                          style={{ width: '100%' }}
                          InputLabelProps={{
                            style: { color: '#777777', fontSize: '10px' },
                          }}
                          InputProps={{
                            style: {
                              borderRadius: '8px',
                              backgroundColor: '#FFFFFF',
                            }
                          }}
                        />
                        {/* {errors.business_email && <small className='text-danger mt-2 ms-1'>{errors.business_email}</small>} */}
                      </div>

                      <div className="mt-3">
                        <p className="business-profile-name">Business Phone Number</p>
                        <CssTextField
                          value={values.business_phone_number}
                          onChange={handleChange}
                          placeholder="Enter your business number"
                          name="business_phone_number"
                          variant="outlined"
                          className='mt-0'
                          style={{ width: '100%' }}
                          InputLabelProps={{
                            style: { color: '#777777', fontSize: '10px' },
                          }}
                          inputProps={{ maxLength: 10 }}
                          InputProps={{
                            style: {
                              borderRadius: '8px',
                              backgroundColor: '#FFFFFF',
                            }
                          }}
                        />
                        {errors.business_phone_number && <small className='text-danger mt-2 ms-1'>{errors.business_phone_number}</small>}
                      </div>

                      <div className="mt-3">
                        <p className="business-profile-name">Alternative Phone Number / Landline Number</p>
                        <CssTextField
                          value={values.landline_number}
                          onChange={handleChange}
                          name="landline_number"
                          variant="outlined"
                          className='mt-0'
                          style={{ width: '100%' }}
                          InputLabelProps={{
                            style: { color: '#777777', fontSize: '10px' },
                          }}
                          inputProps={{ maxLength: 10 }}
                          InputProps={{
                            style: {
                              borderRadius: '8px',
                              backgroundColor: '#FFFFFF',
                            }
                          }}
                        />
                      </div>

                      <div className="mt-3">
                        <p className="business-profile-name">Whatsapp Business Number</p>
                        <CssTextField
                          value={values.whatsapp_business_phone_number}
                          onChange={handleChange}
                          placeholder="Enter Your Number"
                          name="whatsapp_business_phone_number"
                          variant="outlined"
                          className='mt-0'
                          inputProps={{ maxLength: 10 }}
                          style={{ width: '100%' }}
                          InputLabelProps={{
                            style: { color: '#777777', fontSize: '10px' },
                          }}
                          InputProps={{
                            style: {
                              borderRadius: '8px',
                              backgroundColor: '#FFFFFF',
                            }
                          }}
                        />
                        {/* {errors.whatsapp_business_phone_number && <small className='text-danger mt-2 ms-1'>{errors.whatsapp_business_phone_number}</small>} */}
                      </div>
                    </Grid>
                  </Grid>

                  <p className='cuisines-title text-center mt-5'>OTHERS</p>

                  <Divider
                    className='mt-2 mb-5'
                    variant="middle"
                    style={{
                      backgroundColor: '#c33332',
                      margin: '0px',
                      width: '35%',
                      margin: '0px auto'
                    }}
                  />

                  <Grid container spacing={2} style={{ display: 'flex', justifyContent: 'center' }}>
                    <Grid item xs={8}>


                      <div>
                        <p className="business-profile-name">Website link(optional)</p>
                        <CssTextField
                          value={values.website_link}
                          onChange={handleChange}
                          name="website_link"
                          variant="outlined"
                          className='mt-0'
                          style={{ width: '100%' }}
                          InputLabelProps={{
                            style: { color: '#777777', fontSize: '10px' },
                          }}
                          InputProps={{
                            style: {
                              borderRadius: '8px',
                              backgroundColor: '#FFFFFF',
                            }
                          }}
                        />
                      </div>

                      <div className="mt-3">
                        <p className="business-profile-name">Twitter Id (optional)</p>
                        <CssTextField
                          value={values.twitter_id}
                          onChange={handleChange}
                          name="twitter_id"
                          variant="outlined"
                          className='mt-0'
                          style={{ width: '100%' }}
                          InputLabelProps={{
                            style: { color: '#777777', fontSize: '10px' },
                          }}
                          InputProps={{
                            style: {
                              borderRadius: '8px',
                              backgroundColor: '#FFFFFF',
                            }
                          }}
                        />
                      </div>

                      <div className="mt-3">
                        <p className="business-profile-name">Instagram Link (optional)</p>
                        <CssTextField
                          value={values.instagram_link}
                          onChange={handleChange}
                          name="instagram_link"
                          variant="outlined"
                          className='mt-0'
                          style={{ width: '100%' }}
                          InputLabelProps={{
                            style: { color: '#777777', fontSize: '10px' },
                          }}
                          InputProps={{
                            style: {
                              borderRadius: '8px',
                              backgroundColor: '#FFFFFF',
                            }
                          }}
                        />
                      </div>

                      <div className="mt-3">
                        <p className="business-profile-name">Facebook link (optional)</p>
                        <CssTextField
                          value={values.facebook_link}
                          onChange={handleChange}
                          name="facebook_link"
                          variant="outlined"
                          className='mt-0'
                          style={{ width: '100%' }}
                          InputLabelProps={{
                            style: { color: '#777777', fontSize: '10px' },
                          }}
                          InputProps={{
                            style: {
                              borderRadius: '8px',
                              backgroundColor: '#FFFFFF',
                            }
                          }}
                        />
                      </div>
                    </Grid>
                  </Grid>


                  <Stack direction="row" justifyContent="center" className="mt-4">
                    <Button type="submit" variant="contained" className="inquiries-red-btn" >
                      {loading ? 'Loading...' : 'Update'}  </Button>
                  </Stack>

                </form>
              )}
            </Formik>
          </Container>
        </Modal.Body>
      </Modal>


    </>
  )
}
export default BusinessInformation