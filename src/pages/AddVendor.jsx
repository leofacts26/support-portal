import React, { useState } from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { createNewVendor } from "../features/shareLinksSlice";


const initialState = {
  vendor_service_name: '',
  vendor_type: "Caterer",
  point_of_contact_name: "",
  phone_number: "",
  area: "",
  city: "",
  pincode: "",
  state: "",
}

const AddVendor = () => {

  const dispatch = useDispatch()

  const [vendorData, setVendorData] = useState(initialState);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setVendorData({ ...vendorData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(vendorData, "vendorData");

    try {
      const response = await dispatch(createNewVendor(vendorData))
      if (response.status === 200) {
        alert("Vendor added successfully!");
        setVendorData(vendorData);
      } else {
        alert("Failed to add vendor.");
      }
    } catch (error) {
      console.error("Error adding vendor:", error);
      alert("An error occurred while adding the vendor.");
    }
  };

  return (
    <Container>
      <h3 className="mt-4 mb-4">Add New Vendor</h3>
      <Form onSubmit={handleSubmit}>
        <Row className="mb-3">
          <Col md={6}>
            <Form.Group controlId="vendor_service_name">
              <Form.Label>Vendor Service Name *</Form.Label>
              <Form.Control
                type="text"
                name="vendor_service_name"
                placeholder="Enter vendor service name"
                value={vendorData.vendor_service_name}
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
                value={vendorData.vendor_type}
                onChange={handleChange}
                required
              >
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
                value={vendorData.point_of_contact_name}
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
                value={vendorData.phone_number}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Col>
        </Row>
        <Row className="mb-3">
          <Col md={6}>
            <Form.Group controlId="area">
              <Form.Label>Area *</Form.Label>
              <Form.Control
                type="text"
                name="area"
                placeholder="Enter area"
                value={vendorData.area}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId="city">
              <Form.Label>City *</Form.Label>
              <Form.Control
                type="text"
                name="city"
                placeholder="Enter city"
                value={vendorData.city}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Col>
        </Row>
        <Row className="mb-3">
          <Col md={6}>
            <Form.Group controlId="pincode">
              <Form.Label>Pin Code *</Form.Label>
              <Form.Control
                type="text"
                name="pincode"
                placeholder="Enter pin code"
                value={vendorData.pincode}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId="state">
              <Form.Label>State *</Form.Label>
              <Form.Control
                type="text"
                name="state"
                placeholder="Enter state"
                value={vendorData.state}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Col>
        </Row>
        <Button variant="primary" type="submit">
          Save & Submit
        </Button>
      </Form>
    </Container>
  );
};

export default AddVendor;
