import { useDispatch, useSelector } from "react-redux"
import { fetchVendorShowDetailData } from "../features/menuSlice"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { IoMdArrowRoundBack } from "react-icons/io";
import { useLocation, useParams } from "react-router-dom"
import Table from 'react-bootstrap/Table';
import { Form, FormControl, Button } from 'react-bootstrap';
import { Spinner } from 'react-bootstrap';
import LoadingSpinner from "../components/LoadingSpinner";


const VendorDetails = () => {

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { vendorDetails, isLoading } = useSelector((state) => state.menu)
  const { foodTypes, kitchenTypes, mealTimes, subscriptionDetails, cuisines, occasions, branches, serviceTypes, servingTypes } = vendorDetails;
  const [searchTerm, setSearchTerm] = useState('');


  console.log(vendorDetails, "vendorDetails");



  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchTerm.trim() !== '') {
      // Dispatch the action with the searchTerm as an argument
      dispatch(fetchVendorShowDetailData(searchTerm));
    } else {
      // Optional: handle empty search case (e.g., show a message or re-fetch with default data)
      alert("Please enter a search term");
    }
  };






  // Check if vendorDetails is an empty object
  if (Object.keys(vendorDetails).length === 0) {
    return <>

      <div className="container-fluid">
        <Form className="d-flex my-4" onSubmit={handleSubmit}>
          <FormControl
            type="search"
            placeholder="Company ID: 748398"
            className="me-2 w-25"
            aria-label="Search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Button variant="outline-success" type="submit">Search</Button>
        </Form>
      </div>
      <div className="container-fluid my-5">
        <h2>No Data Found</h2>
      </div>
    </>
  }



  return (

    <>
      {isLoading ? <div>
          <LoadingSpinner />
      </div> : <div className="container-fluid my-5">

        <div className="mb-4 cursor-pointer">
          <button className="btn btn-success me-1" onClick={() => navigate(-1)}>
            <IoMdArrowRoundBack /> Back
          </button>
        </div>

        <Form className="d-flex my-4" onSubmit={handleSubmit}>
          <FormControl
            type="search"
            placeholder="Company ID: 748398"
            className="me-2 w-25"
            aria-label="Search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Button variant="outline-success" type="submit">Search</Button>
        </Form>





        <div className="row mx-2">
          <div className="bg-secondary text-white py-3 d-flex justify-content-between">
            <h3 className='mb-0'>Vendor Details</h3>
            {/* <h3 className='mb-0 text-warning'>Upgrade</h3> */}
          </div>
          {/* <Table responsive="xl" className='m-0'>
    <thead>
      <tr>
        <th style={{ fontSize: '10px' }}>Vendor ID</th>
        <th style={{ fontSize: '10px' }}>Login ID</th>
        <th style={{ fontSize: '10px' }}>Vendor Type</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>{id ? id : 'N/A'}</td>
        <td>{companyId ? companyId : 'N/A'}</td>
        <td>{cateringVendorsDetail?.vendor_type ? cateringVendorsDetail?.vendor_type : 'N/A'}</td>
      </tr>
    </tbody>
  </Table> */}
        </div>
        <hr />





        <div className="row mx-2">
          <div className="bg-secondary text-white py-3 d-flex justify-content-between">
            <h3 className='mb-0'>Subscription Details</h3>
          </div>

          <Table responsive="xl" className='m-0'>
            <thead>
              <tr>
                <th style={{ fontSize: '10px' }}>Subscription Plan</th>
                <th style={{ fontSize: '10px' }}>Plan Type</th>
                <th style={{ fontSize: '10px' }}>Start Date</th>
                <th style={{ fontSize: '10px' }}>Expiry Date</th>
                <th style={{ fontSize: '10px' }}>Remaining Days</th>
              </tr>
            </thead>
            <tbody>
              {subscriptionDetails && subscriptionDetails.length > 0 ? (
                subscriptionDetails.map((subscription, index) => {
                  const subscriptionType = subscription?.subscription_type_display
                    ? subscription.subscription_type_display.toLowerCase() // Convert to lowercase for consistency
                    : "";

                  // Determine the appropriate badge class based on subscription type
                  let badgeClass = "badge mt-n1";
                  switch (subscriptionType) {
                    case "popular":
                      badgeClass += " text-bg-popular-bage";
                      break;
                    case "normal":
                      badgeClass += " text-bg-normal-bage";
                      break;
                    case "branded":
                      badgeClass += " text-bg-branded-bage";
                      break;
                    default:
                      badgeClass += " text-bg-default-bage";
                      break;
                  }

                  // Plan Type Handling
                  const planType = subscription?.subscription_pattern ? subscription?.subscription_pattern.toLowerCase() : "";
                  let planBadgeClass = "badge mt-n1";
                  switch (planType) {
                    case "subscription-monthly":
                      planBadgeClass += " monthly-tag";
                      break;
                    case "one_time_monthly":
                      planBadgeClass += " monthly-tag";
                      break;
                    case "one_time_yearly":
                      planBadgeClass += " annually-tag";
                      break;
                    default:
                      planBadgeClass += " text-bg-default-bage";
                      break;
                  }

                  return (
                    <tr key={index}>
                      <td>
                        <span className={badgeClass}>
                          {subscription?.subscription_type_display ? subscription.subscription_type_display : "N/A"}
                        </span>
                      </td>
                      <td>
                        <span className={planBadgeClass}>
                          {subscription?.subscription_pattern ? subscription.subscription_pattern : "N/A"}
                        </span>
                      </td>
                      <td>
                        {subscription?.subscriptionStartDate
                          ? new Date(subscription.subscriptionStartDate).toLocaleDateString()
                          : "N/A"}
                      </td>
                      <td>
                        {subscription?.subscriptionExpiryDate
                          ? new Date(subscription.subscriptionExpiryDate).toLocaleDateString()
                          : "N/A"}
                      </td>
                      <td>
                        <span>
                          {subscription?.remaining_days ? subscription.remaining_days : "N/A"}
                        </span>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan="4">No Subscription Details Available</td>
                </tr>
              )}
            </tbody>
          </Table>
        </div>
        <hr />





        <div className="row mx-2">
          <div className="bg-secondary text-white py-3 d-flex justify-content-between">
            <h3 className='mb-0'>Business Information</h3>
            {/* <h3 className='mb-0 text-warning' onClick={handleBusinessProfileEditShow} style={{ cursor: 'pointer' }}>Edit</h3> */}
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
                  <th style={{ fontSize: '10px' }}>street_name</th>
                  <th style={{ fontSize: '10px' }}>state</th>
                  <th style={{ fontSize: '10px' }}>area</th>
                  <th style={{ fontSize: '10px' }}>latitude</th>
                  <th style={{ fontSize: '10px' }}>longitude</th>
                  <th style={{ fontSize: '10px' }}>pincode</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{vendorDetails?.street_name ? vendorDetails?.street_name : 'N/A'}</td>
                  <td>{vendorDetails?.state ? vendorDetails?.state : 'N/A'}</td>
                  <td>{vendorDetails?.area ? vendorDetails?.area : 'N/A'}</td>
                  <td>{vendorDetails?.latitude ? vendorDetails?.latitude : 'N/A'}</td>
                  <td>{vendorDetails?.longitude ? vendorDetails?.longitude : 'N/A'}</td>
                  <td>{vendorDetails?.pincode ? vendorDetails?.pincode : 'N/A'}</td>
                </tr>
              </tbody>





              <thead>
                <tr>
                  <th style={{ fontSize: '10px' }}>city</th>
                  <th style={{ fontSize: '10px' }}>country</th>
                  <th style={{ fontSize: '10px' }}>formatted_address</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{vendorDetails?.city ? vendorDetails?.city : 'N/A'}</td>
                  <td>{vendorDetails?.country ? vendorDetails?.country : 'N/A'}</td>
                  <td>{vendorDetails?.formatted_address ? vendorDetails?.formatted_address : 'N/A'}</td>
                </tr>
              </tbody>
            </>
          </Table>
        </div>
        <hr />






        <div className="row mx-2">
          <div className="bg-secondary text-white py-3 d-flex justify-content-between">
            <h3 className='mb-0'>Culinary Details</h3>
          </div>
          <Table responsive="xl" className='m-0'>
            <thead>
              <tr>
                <th style={{ fontSize: '10px' }}>Food Type</th>
                <th style={{ fontSize: '10px' }}>serviceTypes</th>
                <th style={{ fontSize: '10px' }}>servingTypes</th>
                <th style={{ fontSize: '10px' }}>maximum_capacity</th>
                <th style={{ fontSize: '10px' }}>minimum_capacity</th>
                <th style={{ fontSize: '10px' }}>start_price</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  {foodTypes?.length > 0 ? foodTypes?.map(item => item.food_type_name)?.join(', ') : 'N/A'}
                </td>
                <td>
                  {serviceTypes?.length > 0 ? serviceTypes?.map(item => item.service_type_name)?.join(', ') : 'N/A'}
                </td>
                <td>
                  {servingTypes?.length > 0 ? servingTypes?.map(item => item.serving_type_name)?.join(', ') : 'N/A'}
                </td>
                <td>{vendorDetails?.maximum_capacity ? vendorDetails?.maximum_capacity : 'N/A'}</td>
                <td>{vendorDetails?.minimum_capacity ? vendorDetails?.minimum_capacity : 'N/A'}</td>
                <td>{vendorDetails?.start_price ? vendorDetails?.start_price : 'N/A'}</td>
              </tr>
            </tbody>
          </Table>

          <div className="row mt-4">
            <div className="text-secondary d-flex justify-content-between">
              <h4 className='mb-0'> Occastions You Cater</h4>
            </div>
            <div className='mt-3'>
              {occasions && occasions.length > 0
                ? occasions
                  .filter((item) => item.selected === '1')
                  .map((item, index, filteredOccasions) => (
                    <span key={item.occasion_name} className='cuisine-item'>
                      {item.occasion_name}
                      {index < filteredOccasions.length - 1 && ', '}
                    </span>
                  ))
                : 'N/A'}
            </div>

          </div>


          <div className="row mt-4">
            <div className="text-secondary d-flex justify-content-between">
              <h4 className='mb-0'>Cuisines You Cater</h4>
            </div>
            <div className='mt-3'>
              {cuisines && cuisines.length > 0
                ? cuisines
                  .filter((item) => item.selected === '1')
                  .map((item, index, filteredCuisines) => (
                    <span key={item.cuisine_name} className='cuisine-item'>
                      {item.cuisine_name}
                      {index < filteredCuisines.length - 1 && ', '}
                    </span>
                  ))
                : 'N/A'}
            </div>
          </div>
        </div>
        <hr />





        <div className="row mx-2">
          <div className="bg-secondary text-white py-3 d-flex justify-content-between">
            <h3 className='mb-0'>Vintage Details</h3>
          </div>
          <Table responsive="xl" className='m-0'>
            <thead>
              <tr>
                <th style={{ fontSize: '10px' }}>Working Since</th>
                <th style={{ fontSize: '10px' }}>Total Staffs</th>
                <th style={{ fontSize: '10px' }}>Work Hours (Start)</th>
                <th style={{ fontSize: '10px' }}>Work Hours (End)</th>
                <th style={{ fontSize: '10px' }}>Location Link</th>
                <th style={{ fontSize: '10px' }}>Other Branches</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{vendorDetails?.working_since ? vendorDetails?.working_since : 'N/A'}</td>
                <td>{vendorDetails?.total_staffs_approx ? vendorDetails?.total_staffs_approx : 'N/A'}</td>
                <td>{vendorDetails?.start_day ? vendorDetails?.start_day + ' ' + vendorDetails?.start_time : 'N/A'}</td>
                <td>{vendorDetails?.end_day ? vendorDetails?.end_day + ' ' + vendorDetails?.end_time : 'N/A'}</td>
                <td>
                  {vendorDetails?.latitude && vendorDetails?.longitude ? (
                    <a
                      href={`https://www.google.com/maps?q=${vendorDetails.latitude},${vendorDetails.longitude}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      View on Map
                    </a>
                  ) : 'N/A'}
                </td>
                <td> {vendorDetails?.branches?.length > 0 ? vendorDetails?.branches?.map(item => item.catering_service_name)?.join(', ') : 'N/A'}</td>
              </tr>
            </tbody>
          </Table>
        </div>
        <hr />




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
        <hr />








      </div>}
    </>

  )
}
export default VendorDetails