import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Grid';
import Divider from '@mui/material/Divider';
import { styled } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { useEffect, useState } from "react";
import { useSelector } from 'react-redux'
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { MenuItem, Select } from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';

// import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
// import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
// import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import dayjs from 'dayjs';




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






const Test = () => {

  const [values, setValues] = useState({})
  // const { accessToken } = useSelector((state) => state.user)
  // const { vendor_id } = useSelector((state) => state?.user?.vendorId)
  const [loading, setLoading] = useState(false)
  // const [data, updateBusinessProfile, fetchBusinessProfile] = useBusinessProfile('/get-vendor-business-profile', accessToken)


  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');


  // validation schema 
  const schema = Yup.object().shape({
    vendor_service_name: Yup.string().required('Name is required.'),
    point_of_contact_name: Yup.string().required('Contact person name is required.'),
    business_phone_number: Yup.string()
      .required('Business phone number is required')
  });


  const handleSubmit = async (values, resetForm) => {
    console.log(values, "values");
  }


  // location start
  const [locationPlaceId, setLocationPlaceId] = useState(null)
  const [manualLocation, setManualLocation] = useState("")
  const [selectedLocation, setSelectedLocation] = useState(null);



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

  return (
    <>

      <Container maxWidth="lg">
        {/*   */}
        <Formik enableReinitialize={true} initialValues={values} validationSchema={schema} onSubmit={(values, { resetForm }) => handleSubmit(values, resetForm)}>
          {({ values, errors, handleChange, handleSubmit }) => (
            <form className='card-box-shadow px-5 py-4 mb-4' onSubmit={handleSubmit} autocomplete="off">
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
                <Grid item xs={8} >

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
                        {/* <LocalizationProvider dateAdapter={AdapterDayjs}>
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
                        </LocalizationProvider> */}
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
                        {/* <LocalizationProvider dateAdapter={AdapterDayjs}>
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
                        </LocalizationProvider> */}
                      </Box>

                    </Stack>
                  </div>
                </Grid>
              </Grid>




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


              <Grid container spacing={2} style={{ display: 'flex', justifyContent: 'center' }}>
                <Grid item xs={8} >
                  <div className="mt-5">
                    <p className="business-profile-name">Address</p>
                    {/* <Box sx={{ display: 'flex', flexDirection: 'column' }}>
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
                    </Box> */}
                  </div>

                  {/* {placePredictions?.length > 0 && !selectedLocation && (
                    <p className='ct-box-search-loc mb-1'>Search Results</p>
                  )}

                  {isPlacePredictionsLoading ? (
                    <LoaderSpinner />
                  ) : (
                    !selectedLocation && (
                      placePredictions?.map((item, index) => (
                        <h2 className='ct-box-search-results cursor-pointer' key={index} onClick={() => selectLocation(item)}>{item?.description}</h2>
                      ))
                    )
                  )} */}



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
                <Button type="submit" variant="contained" className="inquiries-red-btn" disabled={loading}>
                  {loading ? 'Loading...' : 'Update'}  </Button>
              </Stack>

            </form>
          )}
        </Formik>
      </Container>
    </>
  )
}
export default Test