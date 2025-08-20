import { useDispatch, useSelector } from "react-redux"
import { fetchVendorShowDetailData, fetchVendorTiffinShowDetailData } from "../features/menuSlice"
import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { IoMdArrowRoundBack } from "react-icons/io";
import { useLocation, useParams } from "react-router-dom"
import Table from 'react-bootstrap/Table';
import { Form, FormControl, Button } from 'react-bootstrap';
import { Spinner } from 'react-bootstrap';
import LoadingSpinner from "../components/LoadingSpinner";
import BusinessInformation from "../components/vendor-details/BusinessInformation";
import Occations from "../components/vendor-details/Occations";
import { v4 as uuidv4 } from 'uuid';
import Cuisines from "../components/vendor-details/Cuisines";
import Packages from "../components/vendor-details/Packages";
import { setSearchTerm } from "../features/supportTicketSlice";
import Subscription from "./Subscription";
import moment from "moment";




const VendorDetails = ({ searchBox, companyId, selectedTicket }) => {

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { vendorDetails, isLoading } = useSelector((state) => state.menu)
  const { searchTerm } = useSelector((state) => state.supportTickets)
  const { foodTypes, kitchenTypes, mealTimes, subscriptionDetails, occasions, cuisines, branches, serviceTypes, servingTypes } = vendorDetails;
  const [editTrigger, setEditTrigger] = useState(false);

  // const [debouncedSearchTerm, setDebouncedSearchTerm] = useState(searchTerm);


  // console.log(searchTerm, "searchTermsear");
  // console.log(selectedTicket, "selectedTicket");
  // console.log(companyId, "companyId");


  // useEffect(() => {
  //   const handler = setTimeout(() => {
  //     setDebouncedSearchTerm(searchTerm);
  //   }, 1000); 

  //   return () => clearTimeout(handler);
  // }, [searchTerm]);

  // useEffect(() => {
  //   if (debouncedSearchTerm) {
  //     dispatch(fetchVendorShowDetailData(debouncedSearchTerm));
  //   }
  // }, [debouncedSearchTerm, dispatch]);


  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => {
    setEditTrigger(prev => !prev);
    setShow(true)
  };


  const [showOccation, setShowOccation] = useState(false);
  const handleOccationClose = () => setShowOccation(false);
  const handleOccationShow = () => {
    setEditTrigger(prev => !prev);
    setShowOccation(true)
  };


  const [showCuisines, setShowCuisines] = useState(false);
  const handleCuisinesClose = () => setShowCuisines(false);
  const handleCuisinesShow = () => {
    setEditTrigger(prev => !prev);
    setShowCuisines(true)
  };



  const [showPackages, setShowPackages] = useState(false);
  const handlePackagesClose = () => setShowPackages(false);
  const handlePackagesShow = () => {
    setEditTrigger(prev => !prev);
    setShowPackages(true)
  };



  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchTerm.trim() !== '') {
      // Dispatch the action with the searchTerm as an argument
      dispatch(fetchVendorShowDetailData(searchTerm));
      // if (vendorDetails?.vendor_type === "Caterer") {
      // } else {
      //   dispatch(fetchVendorTiffinShowDetailData(searchTerm));
      // }
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
            onChange={(e) => dispatch(setSearchTerm(e.target.value))}
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

        {
          searchBox ? <>
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
                onChange={(e) => dispatch(setSearchTerm(e.target.value))}
              />
              <Button variant="outline-success" type="submit">Search</Button>
            </Form>
          </> : <span></span>
        }







        {/* <div className="row mx-2">
          <div className="bg-secondary text-white py-3 d-flex justify-content-between">
            <h3 className='mb-0'>Vendor Details</h3> */}
        {/* <h3 className='mb-0 text-warning'>Upgrade</h3> */}
        {/* </div> */}
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
        {/* </div>
        <hr /> */}





        <div className="row mx-2">

            <div className="bg-secondary text-white py-3 d-flex justify-content-between">
              <h3 className='mb-0'>Vendor Details</h3>
            </div>
            <Table responsive="xl" className='m-0'>
              <thead>
                <tr>
                  <th style={{ fontSize: '10px' }}>Company ID</th>
                  <th style={{ fontSize: '10px' }}>Vendor Type</th>
                  <th style={{ fontSize: '10px' }}>Created By</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{selectedTicket?.company_id ? selectedTicket?.company_id : searchTerm || companyId}</td>
                  <td>{vendorDetails?.vendor_type ? vendorDetails?.vendor_type : 'N/A'}</td>
                  <td>{vendorDetails?.created_by ? vendorDetails?.created_by : 'N/A'}</td>
                </tr>
              </tbody>
            </Table>
          <hr />

          <div className="bg-secondary text-white py-3 d-flex justify-content-between">
            <h3 className='mb-0'>Subscription Details</h3>
            <Link to={`/dashboard/subscription/${vendorDetails?.id}`} className="text-warning" style={{ cursor: 'pointer' }}>View Subscription</Link>
            {/* <h3 className='mb-0 text-warning' style={{ cursor: 'pointer' }}>Edit</h3> */}
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
                          ? moment(subscription.subscriptionStartDate).format("DD MMM, YYYY")
                          : "N/A"}
                      </td>
                      <td>
                        {subscription?.subscriptionExpiryDate
                          ? moment(subscription.subscriptionExpiryDate).format("DD MMM, YYYY")
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

        <BusinessInformation vendorDetails={vendorDetails} show={show} handleClose={handleClose} handleShow={handleShow} editTrigger={editTrigger} searchTerm={searchTerm} BusinessInformation={BusinessInformation} companyId={companyId} />
        <hr />

        <div className="row mx-2">

          <div className="bg-secondary text-white py-3 d-flex justify-content-between">
            <h3 className='mb-0'>Vintage Details</h3>
            <h3 className='mb-0 text-warning' style={{ cursor: 'pointer' }} onClick={handleShow}>Edit</h3>
          </div>

          <Table responsive="xl" className='m-0'>
            <thead>
              <tr>
                <th style={{ fontSize: '10px' }}>Working Since</th>
                <th style={{ fontSize: '10px' }}>Total Staffs</th>
                <th style={{ fontSize: '10px' }}>Work Hours (Start)</th>
                <th style={{ fontSize: '10px' }}>Work Hours (End)</th>
                <th style={{ fontSize: '10px' }}>Location Link</th>
                {/* <th style={{ fontSize: '10px' }}>Other Branches</th> */}
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
                {/* <td> {vendorDetails?.branches?.length > 0 ? vendorDetails?.branches?.map(item => item.catering_service_name)?.join(', ') : 'N/A'}</td> */}
              </tr>
            </tbody>
          </Table>
        </div>
        <hr />

        <Packages companyId={companyId} uid={uuidv4()} handlePackagesClose={handlePackagesClose} handlePackagesShow={handlePackagesShow} showPackages={showPackages}
          foodTypesList={foodTypes} kitchenTypesList={kitchenTypes} mealTimesList={mealTimes} serviceTypesList={serviceTypes} servingTypesList={servingTypes} vendorDetails={vendorDetails} searchTerm={searchTerm} />
        <hr />

        {
          // occasions?.filter((item) => item.selected === '1')?.length > 0 && 
          <Occations occasions={occasions} editTrigger={editTrigger} showOccation={showOccation} handleOccationClose={handleOccationClose}
            handleOccationShow={handleOccationShow} uid={uuidv4()} searchTerm={searchTerm} companyId={companyId} />}

        <Cuisines cuisines={cuisines} editTrigger={editTrigger} showCuisines={showCuisines} handleCuisinesClose={handleCuisinesClose}
          handleCuisinesShow={handleCuisinesShow} uid={uuidv4()} searchTerm={searchTerm} companyId={companyId}
        />
        <hr />


        {/* <Link to={`/dashboard/subscription/${vendorDetails?.id}`}>View Subscription</Link> */}

        {/* {vendorDetails?.id && <Subscription vendorId={vendorDetails?.id} />} */}





      </div>}
    </>

  )
}
export default VendorDetails