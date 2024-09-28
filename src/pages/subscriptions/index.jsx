import React, { useEffect, useState } from 'react'
import DataTable from 'react-data-table-component';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useDispatch, useSelector } from 'react-redux';
import {  fetchCateringVendors, setVendorListId } from '../../features/catering/cateringSlice';
import * as XLSX from "xlsx";
import useExportData from '../../hooks/useExportData';
import toast from 'react-hot-toast';
import Table from 'react-bootstrap/Table';
import { tableCustomStyles } from '../../components/tableCustomStyles';
import GlobalSearch from '../../components/common/GlobalSearch';
import { Link } from 'react-router-dom'
import { cater_vendor_type } from '../../constants';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';



const VendorList = () => {
  const dispatch = useDispatch()
  const { cateringVendors, cateringVendorsDetail } = useSelector((state) => state.catering)
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const { exportToExcel } = useExportData()
  // console.log(cateringVendorsDetail.vendorDetails, "cateringVendorsDetail");
  const { foodTypes, kitchenTypes, mealTimes, serviceTypes, servingTypes, vendorDetails } = cateringVendorsDetail;

  // const { token } = useSelector((state) => state.authSlice)


  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    dispatch(fetchCateringVendors(cater_vendor_type));
  }, [dispatch]);


  useEffect(() => {
    if (cateringVendors) {
      const formattedData = cateringVendors.map((catering, index) => ({
        businessID: index + 1,
        id: catering.id,
        vendor_service_name: catering?.vendor_service_name || 'N/A',
        phone_number: catering?.phone_number || 'N/A',
        subscription_type_name: catering?.subscription_type_name || "N/A",
        subscription: catering?.subscription || "N/A",
        status: catering?.status || 'N/A',
        listing_status: catering?.listing_status || 'N/A',
        final_status: catering?.final_status || 'N/A',
        vendor_type: catering?.vendor_type || 'N/A',
        city: catering?.city || 'N/A',
        company_id: catering?.company_id || 'N/A',
        created_at: new Date(catering?.created_at).toLocaleDateString(),
      }));
      setData(formattedData);
      setFilteredData(formattedData);
    }
  }, [cateringVendors]);


  const handleSearch = (e) => {
    const searchValue = e.target.value.toLowerCase().trim();
    if (!searchValue) {
      setFilteredData(data);
      return;
    }
  
    // Split the input value into multiple keywords based on commas or spaces
    const searchKeywords = searchValue.split(/[, ]+/).filter(Boolean);
  
    const newFilteredData = data.filter((row) => {
      // Check if any of the keywords match the values in the row
      return searchKeywords.some((keyword) =>
        row.id.toString().toLowerCase().includes(keyword) ||
        row.phone_number.toString().toLowerCase().includes(keyword) ||
        row.subscription_type_name.toString().toLowerCase().includes(keyword) ||
        row.subscription.toString().toLowerCase().includes(keyword) ||
        row.status.toString().toLowerCase().includes(keyword) ||
        row.listing_status.toString().toLowerCase().includes(keyword) ||
        row.final_status.toString().toLowerCase().includes(keyword) ||
        row.vendor_type.toString().toLowerCase().includes(keyword) ||
        row.city.toString().toLowerCase().includes(keyword) ||
        row.company_id.toString().toLowerCase().includes(keyword) ||
        row.created_at.toString().toLowerCase().includes(keyword) ||
        row.vendor_service_name.toLowerCase().includes(keyword)
      );
    });
  
    setFilteredData(newFilteredData);
  };
  

  const onHandleCateringDetails = (row) => {
    handleShow()
    dispatch(setVendorListId(row?.id));
  }

  const columns = [
    {
      name: "ID",
      selector: row => row.id,
      sortable: true,
    },
    {
      name: "company id",
      selector: row => row.company_id,
      sortable: true,
    },
    {
      name: "Business Name",
      selector: row => row.vendor_service_name,
      sortable: true,
    },
    {
      name: "Phone No",
      selector: row => row.phone_number,
      sortable: true,
    },
    {
      name: "Plan type",
      selector: row => row.subscription_type_name,
      sortable: true,
    },
    {
      name: "Subscription",
      selector: row => row.subscription,
      sortable: true,
    },
    {
      name: "Status",
      selector: row => row.status,
      sortable: true,
    },
    {
      name: "listing status",
      selector: row => row.listing_status,
      sortable: true,
    },
    {
      name: "Final status",
      selector: row => row.final_status,
      sortable: true,
    },
    {
      name: "City",
      selector: row => row.city,
      sortable: true,
    },
    {
      name: "vendor type",
      selector: row => row.vendor_type,
      sortable: true,
    },
    {
      name: "Start Date",
      selector: row => row.created_at,
      sortable: true,
    },
    {
      name: "Details",
      cell: (row) => (
        <>
          {row?.company_id ? (
            <Link
              onClick={() => onHandleCateringDetails(row)}
              to={`/vendor-list/${row.id}?company_id=${row.company_id}`}
              className='text-primary cursor-pointer'
            >
            {row.company_id ? 'View' : 'N/A'}  
            </Link>
          ) : (
            <span>N/A</span>
          )}
        </>
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
    },
  ];


  return (
    <>
      <div className="container-fluid my-5">

        <h2>Total Registered Caterers - {cateringVendors?.length} </h2>
        <div className="row mb-4 d-flex justify-content-end me-2">
          <button className='btn btn-secondary fit-content' variant="primary" onClick={() => exportToExcel(filteredData, 'vendorlist')}>
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



      {/* <Modal centered show={show} onHide={handleClose} size="xl">
        <Modal.Header closeButton>
          <Modal.Title>Vendor Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>

          <div>
            <Table responsive="xl">
              <thead>
                <tr>
                  <th style={{ fontSize: '10px' }}>vendor_service_name</th>
                  <th style={{ fontSize: '10px' }}>vendor_type</th>
                  <th style={{ fontSize: '10px' }}>point_of_contact_name</th>
                  <th style={{ fontSize: '10px' }}>working_days_hours</th>
                  <th style={{ fontSize: '10px' }}>working_since</th>
                  <th style={{ fontSize: '10px' }}>about_description</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{vendorDetails?.vendor_service_name ? vendorDetails?.vendor_service_name : 'N/A'}</td>
                  <td>{vendorDetails?.vendor_type ? vendorDetails?.vendor_type : 'N/A'}</td>
                  <td>{vendorDetails?.point_of_contact_name ? vendorDetails?.point_of_contact_name : 'N/A'}</td>
                  <td>{vendorDetails?.working_days_hours ? vendorDetails?.working_days_hours : 'N/A'}</td>
                  <td>{vendorDetails?.working_since ? vendorDetails?.working_since : 'N/A'}</td>
                  <td>{vendorDetails?.about_description ? vendorDetails?.about_description : 'N/A'}</td>
                </tr>
              </tbody>
            </Table>

            <Table responsive="xl">
              <thead>
                <tr>
                  <th style={{ fontSize: '10px' }}>total_staffs_approx</th>
                  <th style={{ fontSize: '10px' }}>pincode</th>
                  <th style={{ fontSize: '10px' }}>business_email</th>
                  <th style={{ fontSize: '10px' }}>business_phone_number</th>
                  <th style={{ fontSize: '10px' }}>landline_number</th>
                  <th style={{ fontSize: '10px' }}>whatsapp_business_phone_number</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{vendorDetails?.total_staffs_approx ? vendorDetails?.total_staffs_approx : 'N/A'}</td>
                  <td>{vendorDetails?.pincode ? vendorDetails?.pincode : 'N/A'}</td>
                  <td>{vendorDetails?.business_email ? vendorDetails?.business_email : 'N/A'}</td>
                  <td>{vendorDetails?.business_phone_number ? vendorDetails?.business_phone_number : 'N/A'}</td>
                  <td>{vendorDetails?.landline_number ? vendorDetails?.landline_number : 'N/A'}</td>
                  <td>{vendorDetails?.whatsapp_business_phone_number ? vendorDetails?.whatsapp_business_phone_number : 'N/A'}</td>
                </tr>
              </tbody>
            </Table>

            <Table responsive="xl">
              <thead>
                <tr>
                  <th style={{ fontSize: '10px' }}>website_link</th>
                  <th style={{ fontSize: '10px' }}>twitter_id</th>
                  <th style={{ fontSize: '10px' }}>instagram_link</th>
                  <th style={{ fontSize: '10px' }}>facebook_link</th>
                  <th style={{ fontSize: '10px' }}>latitude</th>
                  <th style={{ fontSize: '10px' }}>longitude</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{vendorDetails?.website_link ? vendorDetails?.website_link : 'N/A'}</td>
                  <td>{vendorDetails?.twitter_id ? vendorDetails?.twitter_id : 'N/A'}</td>
                  <td>{vendorDetails?.instagram_link ? vendorDetails?.instagram_link : 'N/A'}</td>
                  <td>{vendorDetails?.facebook_link ? vendorDetails?.facebook_link : 'N/A'}</td>
                  <td>{vendorDetails?.latitude ? vendorDetails?.latitude : 'N/A'}</td>
                  <td>{vendorDetails?.longitude ? vendorDetails?.longitude : 'N/A'}</td>
                </tr>
              </tbody>
            </Table>


            <Table responsive="xl">
              <thead>
                <tr>
                  <th style={{ fontSize: '10px' }}>area</th>
                  <th style={{ fontSize: '10px' }}>street_name</th>
                  <th style={{ fontSize: '10px' }}>country</th>
                  <th style={{ fontSize: '10px' }}>state</th>
                  <th style={{ fontSize: '10px' }}>formatted_address</th>
                  <th style={{ fontSize: '10px' }}>city</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{vendorDetails?.area ? vendorDetails?.area : 'N/A'}</td>
                  <td>{vendorDetails?.street_name ? vendorDetails?.street_name : 'N/A'}</td>
                  <td>{vendorDetails?.country ? vendorDetails?.country : 'N/A'}</td>
                  <td>{vendorDetails?.state ? vendorDetails?.state : 'N/A'}</td>
                  <td>{vendorDetails?.formatted_address ? vendorDetails?.formatted_address : 'N/A'}</td>
                  <td>{vendorDetails?.city ? vendorDetails?.city : 'N/A'}</td>
                </tr>
              </tbody>
            </Table>

            <Table responsive="xl">
              <thead>
                <tr>
                  <th style={{ fontSize: '10px' }}>place_id</th>
                  <th style={{ fontSize: '10px' }}>minimum_capacity</th>
                  <th style={{ fontSize: '10px' }}>maximum_capacity</th>
                  <th style={{ fontSize: '10px' }}>start_price</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{vendorDetails?.place_id ? vendorDetails?.place_id : 'N/A'}</td>
                  <td>{vendorDetails?.minimum_capacity ? vendorDetails?.minimum_capacity : 'N/A'}</td>
                  <td>{vendorDetails?.maximum_capacity ? vendorDetails?.maximum_capacity : 'N/A'}</td>
                  <td>{vendorDetails?.start_price ? vendorDetails?.start_price : 'N/A'}</td>
                </tr>
              </tbody>
            </Table>
          </div>

          <hr />

          <div className="row">
            <div className="col-lg-6">
              <div>
                <h2 className='vd-detail-headings'>Food Types</h2>
                <p>{foodTypes?.map((item) => {
                  return (
                    <span>
                      {item?.food_type_name}, {" "}
                    </span>
                  )
                })}</p>
              </div>
            </div>
            <div className="col-lg-6">
              <div>
                <h2 className='vd-detail-headings'>kitchen Types</h2>
                <p>{kitchenTypes?.map((item) => {
                  return (
                    <span>
                      {item?.kitchen_type_name}, {" "}
                    </span>
                  )
                })}</p>
              </div>
            </div>
          </div>

          <hr />


          <div className="row">
            <div className="col-lg-6">
              <div>
                <h2 className='vd-detail-headings'>Meal Types</h2>
                <p>{mealTimes?.map((item) => {
                  return (
                    <span>
                      {item?.meal_time_name}, {" "}
                    </span>
                  )
                })}</p>
              </div>
            </div>
            <div className="col-lg-6">
              <div>
                <h2 className='vd-detail-headings'>Service Types</h2>
                <p>{serviceTypes?.map((item) => {
                  return (
                    <span>
                      {item?.service_type_name}, {" "}
                    </span>
                  )
                })}</p>
              </div>

            </div>
          </div>

          <hr />


          <div>
            <h2 className='vd-detail-headings'>Serving Types</h2>
            <p>{servingTypes?.map((item) => {
              return (
                <span>
                  {item?.serving_type_name}, {" "}
                </span>
              )
            })}</p>
          </div>




        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal> */}



    </>
  )
}

export default VendorList