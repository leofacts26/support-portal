import Table from 'react-bootstrap/Table';
import { Modal } from "react-bootstrap";

import React, { useEffect, useState } from 'react'
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Switch from '@mui/material/Switch';
import { useDispatch, useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import { api, BASE_URL } from '../../api/apiConfig';
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

const CssTextFieldSmall = styled(TextField)(({ theme }) => ({
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
    padding: '6px 20px',
  },
  '& input::placeholder': {
    fontSize: '10px', // Adjust the font size here
  },
}));



const Packages = ({ showPackages, handlePackagesClose, handlePackagesShow, foodTypesList, serviceTypesList, servingTypesList, kitchenTypesList, mealTimesList, vendorDetails, searchTerm, companyId }) => {
  const { token } = useSelector((state) => state.authSlice);
  const dispatch = useDispatch()

  const [foodTypes, setFoodTypes] = useState(foodTypesList)
  const [serviceTypes, setServiceTypes] = useState(serviceTypesList)
  const [servingTypes, setServingTypes] = useState(servingTypesList)
  const [mealTypes, setMealTypes] = useState(mealTimesList)
  const [kitchenTypes, setKitchenTypes] = useState(kitchenTypesList)
  const [minimum_capacity, setMinimum_capacity] = useState(vendorDetails?.minimum_capacity ? vendorDetails?.minimum_capacity : " ")
  const [maximum_capacity, setMaximum_capacity] = useState(vendorDetails?.maximum_capacity ? vendorDetails?.maximum_capacity : " ")
  const [start_price, setStart_price] = useState(vendorDetails?.start_price ? vendorDetails?.start_price : null)
  const [loading, setLoading] = useState(false)

  // console.log(vendorDetails, "vendorDetails 111");



  const handleFoodSwitchToggle = (index) => {
    const updatedFoodTypes = foodTypes.map((food, i) =>
      i === index ? { ...food, selected: food.selected === "1" ? "0" : "1" } : food
    );
    setFoodTypes(updatedFoodTypes);
  };

  const handleSwitchToggle = (index) => {
    const updatedServiceTypes = serviceTypes.map((service, i) =>
      i === index ? { ...service, selected: service.selected === "1" ? "0" : "1" } : service
    );
    setServiceTypes(updatedServiceTypes);
  };

  const handleServingSwitchToggle = (index) => {
    const updatedServingTypes = servingTypes.map((serving, i) =>
      i === index ? { ...serving, selected: serving.selected === "1" ? "0" : "1" } : serving
    );
    setServingTypes(updatedServingTypes);
  };


  const handleMealTimeSwitchToggle = (index) => {
    const updatedMealTypes = mealTypes.map((meal, i) =>
      i === index ? { ...meal, selected: meal.selected === "1" ? "0" : "1" } : meal
    );
    setMealTypes(updatedMealTypes);
  };


  const handleKitchenSwitchToggle = (index) => {
    const updatedKitchenTypes = kitchenTypes.map((kitchen, i) =>
      i === index ? { ...kitchen, selected: kitchen.selected === "1" ? "0" : "1" } : kitchen
    );
    setKitchenTypes(updatedKitchenTypes);
  };


  const onHandleSubmit = async (e) => {
    e.preventDefault();

    if (parseInt(minimum_capacity) >= parseInt(maximum_capacity)) {
      toast.error("Minimum capacity should be less than maximum capacity.");
      return;
    }

    setLoading(true)

    const updatedFoodTypes = foodTypes.map(food => ({ id: +food.id, selected: +food.selected }));
    const updatedServiceTypes = serviceTypes.map(service => ({ id: +service.id, selected: +service.selected }));
    const updatedServingTypes = servingTypes.map(serving => ({ id: +serving.id, selected: +serving.selected }));

    const updatedMealTypes = mealTypes.map(mealtype => ({ id: +mealtype.id, selected: +mealtype.selected }));
    const updatedkitchenTypes = kitchenTypes.map(kitchen => ({ id: +kitchen.id, selected: +kitchen.selected }));


    const cateringData = {
      foodTypes: JSON.stringify(updatedFoodTypes),
      serviceTypes: JSON.stringify(updatedServiceTypes),
      servingTypes: JSON.stringify(updatedServingTypes),
      minimumCapacity: minimum_capacity,
      maximumCapacity: maximum_capacity,
      startPrice: start_price,
      company_id: searchTerm || companyId
    };

    const tiffinData = {
      foodTypes: JSON.stringify(updatedFoodTypes),
      serviceTypes: JSON.stringify(updatedServiceTypes),
      mealTimes: JSON.stringify(updatedMealTypes),
      kitchenTypes: JSON.stringify(updatedkitchenTypes),
      startPrice: start_price,
      minimumCapacity: minimum_capacity,
      maximumCapacity: maximum_capacity,
      company_id: searchTerm || companyId
    }

    // Normalize vendor_type
    const vendorType = vendorDetails.vendor_type?.trim().toLowerCase();

    let data, url;
    if (vendorType === "caterer") {
      data = cateringData;
      url = "support-update-vendor-business-package-details";
    } else if (vendorType === "tiffin") {
      data = tiffinData;
      url = "support-update-tiffin-package-details";
    } else {
      toast.error("Invalid vendor type. Please check the input.");
      return;
    }


    try {
      console.log("Sending data:", data);
      const response = await api.post(`${BASE_URL}/${url}`, data, {
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
      handlePackagesClose()
    }
  }




  return (
    <>
      <div className="row mx-2">
        <div className="bg-secondary text-white py-3 d-flex justify-content-between">
          <h3 className='mb-0'>Culinary Details</h3>
          <h3 className='mb-0 text-warning' style={{ cursor: 'pointer' }} onClick={handlePackagesShow}>Edit</h3>
        </div>
        <Table responsive="xl" className='m-0'>
          <thead>
            <tr>
              <th style={{ fontSize: '10px' }}>Food Type</th>
              {/* <th style={{ fontSize: '10px' }}>serviceTypes</th> */}

              {vendorDetails?.vendor_type === "Tiffin" && <th style={{ fontSize: '10px' }}>service Types</th>}
              {vendorDetails?.vendor_type === "Tiffin" && <th style={{ fontSize: '10px' }}>Meal Types</th>}
              {vendorDetails?.vendor_type === "Tiffin" && <th style={{ fontSize: '10px' }}>Kitchen Types</th>}



              {vendorDetails?.vendor_type === "Caterer" && <th style={{ fontSize: '10px' }}>servingTypes</th>}
              {vendorDetails?.vendor_type === "Caterer" && <th style={{ fontSize: '10px' }}>minimum_capacity</th>}
              {vendorDetails?.vendor_type === "Caterer" && <th style={{ fontSize: '10px' }}>maximum_capacity</th>}
              <th style={{ fontSize: '10px' }}>start_price</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                {foodTypes?.length > 0 ? foodTypes?.filter((item)=> item.selected === "1")?.map(item => item.food_type_name)?.join(', ') : 'N/A'}
              </td>
              {/* <td>
                {serviceTypes?.length > 0 ? serviceTypes?.map(item => item.service_type_name)?.join(', ') : 'N/A'}
              </td> */}


              {vendorDetails?.vendor_type === "Tiffin" && <td> {serviceTypes?.length > 0 ? serviceTypes?.filter((item)=> item.selected === "1")?.map(item => item.service_type_name)?.join(', ') : 'N/A'} </td>}
              {vendorDetails?.vendor_type === "Tiffin" && <td>{mealTypes?.length > 0 ? mealTypes?.filter((item) => item.selected === "1").map(item => item.meal_time_name)?.join(', ') : 'N/A'}</td>}
              {vendorDetails?.vendor_type === "Tiffin" && <td> {kitchenTypes?.length > 0 ? kitchenTypes?.filter((item) => item.selected === "1").map(item => item.kitchen_type_name)?.join(', ') : 'N/A'} </td>}



              {vendorDetails?.vendor_type === "Caterer" && <td>{servingTypes?.length > 0 ? servingTypes?.filter((item)=> item.selected === "1")?.map(item => item.serving_type_name)?.join(', ') : 'N/A'}
              </td>}
              {vendorDetails?.vendor_type === "Caterer" && <td>{vendorDetails?.minimum_capacity ? vendorDetails?.minimum_capacity : 'N/A'}</td>}
              {vendorDetails?.vendor_type === "Caterer" && <td>{vendorDetails?.maximum_capacity ? vendorDetails?.maximum_capacity : 'N/A'}</td>}
              <td>{vendorDetails?.start_price ? vendorDetails?.start_price : 'N/A'}</td>
            </tr>
          </tbody>
        </Table>
      </div>





      <Modal
        show={showPackages}
        onHide={handlePackagesClose}
        size="xl"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Update Packages</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Container maxWidth="lg">
            <form onSubmit={onHandleSubmit}>
              <div className='card-box-shadow px-5 pt-2 pb-4 mb-4'>
                <Grid container spacing={2} className='mt-0'>
                  {
                    <Grid item xs={12} lg={6}>
                      <h3 className='package-capacity mt-0'>Choose your food type Below</h3>
                      <p className='max-min-capacity-para text-center mb-3'>If you provide both Veg and Non-Veg, please check both checkboxes.</p>

                      {foodTypes && foodTypes.length > 0 ? (
                        foodTypes.map((food, index) => (
                          <Stack
                            key={food.id}
                            direction="row"
                            alignItems="center"
                            justifyContent="center"
                            spacing={2}
                            className={food.selected ? 'mb-5 green-switch' : 'mb-5'}
                          >
                            <h4
                              className={
                                food.food_type_name === 'Veg'
                                  ? 'package-vn-title-veg'
                                  : 'package-vn-title-nonveg'
                              }
                            >
                              {food.food_type_name}
                            </h4>

                            <Switch
                              size="small"
                              checked={food.selected === "1"}
                              onChange={() => handleFoodSwitchToggle(index)}
                            />
                          </Stack>
                        ))
                      ) : (
                        <p className="text-center text-muted">Food types not available.</p>
                      )}

                    </Grid>
                  }

                  <Grid item xs={12} lg={6}>
                    <Stack direction="row" justifyContent="center" flexDirection="column">
                      <p className='max-min-capacity-para-green text-center mt-2 mb-2'>Enter Starting price / Plate</p>
                      <CssTextFieldSmall
                        value={start_price}
                        onChange={(e) => setStart_price(e.target.value)}
                        id="outlined-number"
                        name='start_price'
                        variant="outlined"
                        placeholder="Enter Minimum Capacity - Eg: 100plates"
                        className='text-center mx-auto'
                        style={{ width: '100%' }}
                        InputLabelProps={{
                          style: { color: '#777777', fontSize: '10px' },
                        }}
                        InputProps={{
                          style: {
                            borderRadius: '8px',
                            width: '100%',
                            backgroundColor: '#FFFFFF',
                          }
                        }}
                      />
                    </Stack>
                  </Grid>
                </Grid>





                <Divider
                  className='mt-4'
                  variant="middle"
                  style={{
                    backgroundColor: '#c33332',
                    margin: '0px'
                  }}
                />

                <Grid container spacing={2} className='mt-2'>
                  {<Grid item xs={12} lg={6}>
                    <h3 className='package-capacity mt-3'>Choose your Service type Below</h3>
                    <p className='max-min-capacity-para text-center'>If you provide both table and buffet service, please check both</p>
                    {serviceTypes && serviceTypes.length > 0 ? (
                      serviceTypes.map((service, index) => (
                        <Stack
                          key={service.id}
                          direction="row"
                          justifyContent="center"
                          alignItems="center"
                          spacing={2}
                          className="mt-3"
                        >
                          <img
                            src={`/img/package/${service.service_type_name.toLowerCase()}.png`}
                            alt=""
                            className="package-icons"
                          />
                          <p className="px-3 package-icon-title">{service.service_type_name}</p>
                          <Switch
                            size="small"
                            checked={service.selected === "1"}
                            onChange={() => handleSwitchToggle(index)}
                          />
                        </Stack>
                      ))
                    ) : (
                      <p className="text-center text-muted">Service types not available.</p>
                    )}

                  </Grid>}


                  {vendorDetails?.vendor_type === "Tiffin" && mealTypes.length > 0 && <Grid item xs={12} lg={6}>
                    <p className='max-min-capacity-para text-center'>Please Select your Meal Time below</p>
                    {
                      mealTypes?.map((mealtype, index) => {
                        return (
                          <Stack direction="row" justifyContent="center" alignItems="center" spacing="2" className='mt-3' key={index}>
                            <p className='px-3 package-icon-title'>{mealtype?.meal_time_name}</p>
                            <Switch size="small" checked={mealtype.selected === "1"} onChange={() => handleMealTimeSwitchToggle(index)} />
                          </Stack>
                        )
                      }
                      )
                    }
                  </Grid>}

                  {vendorDetails?.vendor_type === "Caterer" && <Grid item xs={12} lg={6}>
                    <h3 className='package-capacity mt-3'>Choose your Serving type Below</h3>
                    <p className='max-min-capacity-para text-center'>If you provide both table and buffet service, please check both</p>
                    {servingTypes && servingTypes.length > 0 ? (
                      servingTypes.map((servingType, index) => (
                        <Stack
                          direction="row"
                          justifyContent="center"
                          alignItems="center"
                          spacing={2}
                          className="mt-3"
                          key={index}
                        >
                          <img
                            src={`/img/package/${servingType.serving_type_name.toLowerCase().replace(/\s+/g, '-')}.png`}
                            alt=""
                            className="package-icons"
                          />
                          <p className="px-3 package-icon-title">
                            {servingType.serving_type_name.toLowerCase().replace(/\s+/g, '-')}
                          </p>
                          <Switch
                            size="small"
                            checked={servingType.selected === "1"}
                            onChange={() => handleServingSwitchToggle(index)}
                          />
                        </Stack>
                      ))
                    ) : (
                      <p className="text-center text-muted">Serving types not available.</p>
                    )}

                  </Grid>}
                </Grid>



                {/* <Divider
                  className='mt-4'
                  variant="middle"
                  style={{
                    backgroundColor: '#c33332',
                    margin: '0px'
                  }}
                /> */}


                { vendorDetails.vendor_type !== "Caterer" && kitchenTypes?.length > 0 && <Stack direction="row" justifyContent="center" className="mt-4">
                  <div>
                    <h3 className='package-capacity mt-3'>Choose your Kitchen Type Below</h3>
                    <p className='max-min-capacity-para text-center'>Please Select Only One Kitchen Type below</p>
                    {
                      kitchenTypes.map((kitchen, index) => {
                        return (
                          <Stack direction="row" justifyContent="center" alignItems="center" spacing="2" className='mt-3' key={index}>
                            <p className='px-3 package-icon-title'>{kitchen?.kitchen_type_name}</p>
                            <Switch size="small" checked={kitchen?.selected === "1"} onChange={() => handleKitchenSwitchToggle(index)} />
                          </Stack>
                        )
                      }
                      )
                    }
                  </div>
                </Stack>}


                {/* <Divider
                  className='mt-4'
                  variant="middle"
                  style={{
                    backgroundColor: '#c33332',
                    margin: '0px'
                  }}
                /> */}


                {
                  vendorDetails?.vendor_type === "Caterer" && <>
                    <h3 className='package-capacity mt-3'>Capacity</h3>

                    <Grid container spacing={2} className='mt-2'>
                      <Grid item xs={12} lg={6}>
                        <p className='max-min-capacity mb-2'>Minimum Capacity</p>
                        <CssTextField
                          value={minimum_capacity}
                          onChange={(e) => setMinimum_capacity(e.target.value)}
                          type='number'
                          name='minimum_capacity'
                          id="outlined-number"
                          variant="outlined"
                          placeholder="Enter Minimum Capacity - Eg: 100plates"
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
                      </Grid>
                      <Grid item xs={12} lg={6}>
                        <p className='max-min-capacity mb-2'>Maximum Capacity</p>
                        <CssTextField
                          value={maximum_capacity}
                          onChange={(e) => setMaximum_capacity(e.target.value)}
                          type='number'
                          name='maximum_capacity'
                          id="outlined-number"
                          variant="outlined"
                          placeholder="Enter Maximum Capacity - Eg: 7000plates"
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
                      </Grid>
                    </Grid>
                  </>
                }


                <Stack direction="row" justifyContent="center" className="mt-4">
                  <Button variant="contained" className="inquiries-red-btn" type="submit"> {loading ? 'Loading...' : 'Update'}  </Button>
                </Stack>
              </div>
            </form>
          </Container>


        </Modal.Body>
      </Modal>



    </>
  )
}
export default Packages