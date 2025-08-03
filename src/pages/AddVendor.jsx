import React, { useEffect, useState } from "react";
import { Form, Button, Container, Row, Col, Stack, Spinner } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { createNewVendor } from "../features/shareLinksSlice";
import { Box } from "@mui/material";
import usePlacesService from "react-google-autocomplete/lib/usePlacesAutocompleteService";
import LoadingSpinner from '../components/LoadingSpinner';
import LoadingAnimation from "../components/LoadingAnimation";
import LoaderSpinnerLoc from "../components/LoaderSpinnerLoc";


const initialState = {
  vendor_service_name: '',
  vendor_type: '',
  point_of_contact_name: '',
  phone_number: '',
  street_name: '',
  country: '',
  state: '',
  city: '',
  // pincode: '', 
  pincode: '',
  latitude: '',
  longitude: '',
  area: '',
  formatted_address: '',
  street_address: '',
  place_id: ''
}



const AddVendor = () => {

  const [loading, setLoading] = useState(false)
  const dispatch = useDispatch()
  // const [vendorData, setVendorData] = useState(initialState);


  // location start
  const [values, setValues] = useState({})
  const [locationPlaceId, setLocationPlaceId] = useState(null)
  const [manualLocation, setManualLocation] = useState("")
  const [selectedLocation, setSelectedLocation] = useState(null);
  // location end 



  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
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

    const { geometry: { location } } = places;
    const { lat, lng } = location;

    setValues((prevValues) => ({
      ...prevValues,
      street_name: street_name?.long_name || "N/A",
      area: name || "N/A",
      pincode: pincode?.long_name || "",
      latitude: lat() || "N/A",
      longitude: lng() || "N/A",
      address: name || "N/A",
      city: city?.long_name || "N/A",
      state: state?.long_name || "N/A",
      country: country?.long_name || "N/A",
      formatted_address: manualLocation || "N/A",
      place_id: locationPlaceId
    }));
  }

  const selectLocation = (item) => {
    console.log(item, "Item");
    setSelectedLocation(item);
    setManualLocation(item.description);
    setLocationPlaceId(item?.place_id)
  }
  // loc end 



  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true)

    try {
      await dispatch(createNewVendor(values))
      setValues(initialState);
      setManualLocation("")
      setLoading(false)
    } catch (error) {
      console.error("Error adding vendor:", error);
      alert("An error occurred while adding the vendor.");
    } finally {
      setLoading(false)
    }
  };

  return (
    <Container>
      <h1 className="header-title mt-4 mb-4">
        + Add New Vendor
      </h1>
      <Form onSubmit={handleSubmit}>
        <Row className="mb-3">
          <Col md={6}>
            <Form.Group controlId="vendor_service_name">
              <Form.Label>Vendor Service Name *</Form.Label>
              <Form.Control
                type="text"
                name="vendor_service_name"
                placeholder="Enter vendor service name"
                value={values.vendor_service_name}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId="vendor_type">
              <Form.Label>Vendor Type *</Form.Label>
              <Form.Control
                as="select"
                name="vendor_type"
                value={values.vendor_type}
                onChange={handleChange}
                required
              >
                <option value="">Select Vendor Type</option>
                <option value="Caterer">Caterer</option>
                <option value="Tiffin">Tiffin</option>
              </Form.Control>
            </Form.Group>
          </Col>
        </Row>
        <Row className="mb-3">
          <Col md={6}>
            <Form.Group controlId="point_of_contact_name">
              <Form.Label>Point of Contact Name *</Form.Label>
              <Form.Control
                type="text"
                name="point_of_contact_name"
                placeholder="Enter point of contact name"
                value={values.point_of_contact_name}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId="phone_number">
              <Form.Label>Phone Number *</Form.Label>
              <Form.Control
                type="text"
                name="phone_number"
                placeholder="Enter phone number"
                value={values.phone_number}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Col>
        </Row>
        <Row className="mb-3">
          <Col md={12}>
            <Form.Group controlId="area">
              <Form.Label>Street Name *</Form.Label>
              <Form.Control
                type="text"
                name="street_address"
                placeholder="Enter Street Name"
                value={values.street_address}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Col>
          <Col md={12}>
            <div className="mt-3">
              <p className="business-profile-name">Select your Area *</p>
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
              <Spinner animation="border" role="status" className="mt-2">
                <span className="visually-hidden">Loading...</span>
              </Spinner>
            ) : (
              !selectedLocation && (
                placePredictions?.map((item, index) => (
                  <h2 className='ct-box-search-results cursor-pointer' key={index} onClick={() => selectLocation(item)}>{item?.description}</h2>
                ))
              )
            )}
          </Col>
        </Row>
        <Row className="mb-3">
          <Col md={12}>
            <Form.Group controlId="city">
              <Form.Label>City *</Form.Label>
              <Form.Control
                type="text"
                name="city"
                placeholder="Enter city"
                value={values.city}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Col>
          <Col md={12}>
            <Form.Group controlId="pincode" className="mt-3">
              <Form.Label>Pin Code *</Form.Label>
              <Form.Control
                type="text"
                name="pincode"
                placeholder="Enter pin code"
                value={values.pincode}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Col>

        </Row>


        {/* <Row className="mb-3">
          <Col md={6}>
            <div className="mt-5">
              <p className="business-profile-name">Select your Area</p>
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
              <LoadingSpinner />
            ) : (
              !selectedLocation && (
                placePredictions?.map((item, index) => (
                  <h2 className='ct-box-search-results cursor-pointer' key={index} onClick={() => selectLocation(item)}>{item?.description}</h2>
                ))
              )
            )}
          </Col>
        </Row> */}





        <div style={{ display: 'flex', justifyContent: 'end' }}>
          <Button variant="primary" type="submit" disabled={loading}>
            {loading ? 'Loading...' : 'Save & Submit'}
          </Button>
        </div>
      </Form>
    </Container >
  );
};

export default AddVendor;
