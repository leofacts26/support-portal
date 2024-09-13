import { useDispatch, useSelector } from "react-redux"
import { fetchCateringVendorDetails } from "../../features/catering/cateringSlice"
import { useEffect } from "react"
import { useLocation, useParams } from "react-router-dom"
import Table from 'react-bootstrap/Table';




const TiffinListDetails = () => {
  const { cateringVendors, cateringVendorsDetail, isLoading } = useSelector((state) => state.catering)
  const { foodTypes, kitchenTypes, mealTimes, branches, cuisines, occasions, serviceTypes, servingTypes, vendorDetails } = cateringVendorsDetail;

  const dispatch = useDispatch()
  const location = useLocation();
  const { id } = useParams();
  
  const queryParams = new URLSearchParams(location.search);
  const companyId = queryParams.get('company_id');



  useEffect(() => {
    dispatch(fetchCateringVendorDetails(id));
  }, [id]);



  return (
    <div className="container-fluid my-5">

      <div className="row mx-2">
        <div className="bg-secondary text-white py-3 d-flex justify-content-between">
          <h3 className='mb-0'>Vendor Details</h3>
          <h3 className='mb-0 text-warning'>Upgrade</h3>
        </div>
        <Table responsive="xl" className='m-0'>
          <thead>
            <tr>
              <th style={{ fontSize: '10px' }}>Vendor ID</th>
              <th style={{ fontSize: '10px' }}>Vendor Type</th>
              <th style={{ fontSize: '10px' }}>Subscription Plan</th>
              <th style={{ fontSize: '10px' }}>Plan Type</th>
              <th style={{ fontSize: '10px' }}>Start Date</th>
              <th style={{ fontSize: '10px' }}>Expiry Date</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{id ? id : 'N/A'}</td>
              <td>{cateringVendorsDetail?.vendor_type ? cateringVendorsDetail?.vendor_type : 'N/A'}</td>
              <td>{cateringVendorsDetail?.subscription_type_display ? cateringVendorsDetail?.subscription_type_display : 'N/A'}</td>
              <td>{cateringVendorsDetail?.plan_type ? cateringVendorsDetail?.plan_type : 'N/A'}</td>
              <td>{cateringVendorsDetail?.start_date ? cateringVendorsDetail?.start_date : 'N/A'}</td>
              <td>{cateringVendorsDetail?.expiry_date ? cateringVendorsDetail?.expiry_date : 'N/A'}</td>
            </tr>
          </tbody>
        </Table>
      </div>
      <hr />


      <div className="row mx-2">
        <div className="bg-secondary text-white py-3 d-flex justify-content-between">
          <h3 className='mb-0'>Business Information</h3>
          <h3 className='mb-0 text-warning' style={{ cursor: 'pointer' }}>Edit</h3>
        </div>
        <Table responsive="xl" className='m-0'>
          <>
            <thead>
              <tr>
                <th style={{ fontSize: '10px' }}>vendor_service_name</th>
                <th style={{ fontSize: '10px' }}>vendor_type</th>
                <th style={{ fontSize: '10px' }}>business_email</th>
                <th style={{ fontSize: '10px' }}>business_phone_number</th>
                <th style={{ fontSize: '10px' }}>landline_number</th>
                <th style={{ fontSize: '10px' }}>point_of_contact_name</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{cateringVendorsDetail?.vendor_service_name ? cateringVendorsDetail?.vendor_service_name : 'N/A'}</td>
                <td>{cateringVendorsDetail?.vendor_type ? cateringVendorsDetail?.vendor_type : 'N/A'}</td>
                <td>{cateringVendorsDetail?.business_email ? cateringVendorsDetail?.business_email : 'N/A'}</td>
                <td>{cateringVendorsDetail?.business_phone_number ? cateringVendorsDetail?.business_phone_number : 'N/A'}</td>
                <td>{cateringVendorsDetail?.landline_number ? cateringVendorsDetail?.landline_number : 'N/A'}</td>
                <td>{cateringVendorsDetail?.point_of_contact_name ? cateringVendorsDetail?.point_of_contact_name : 'N/A'}</td>
              </tr>
            </tbody>


            <thead>
              <tr>
                <th style={{ fontSize: '10px' }}>whatsapp_business_phone_number</th>
                <th style={{ fontSize: '10px' }}>about_description</th>
                <th style={{ fontSize: '10px' }}>facebook_link</th>
                <th style={{ fontSize: '10px' }}>instagram_link</th>
                <th style={{ fontSize: '10px' }}>twitter_id</th>
                <th style={{ fontSize: '10px' }}>website_link</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{cateringVendorsDetail?.whatsapp_business_phone_number ? cateringVendorsDetail?.whatsapp_business_phone_number : 'N/A'}</td>
                <td>{cateringVendorsDetail?.about_description ? cateringVendorsDetail?.about_description : 'N/A'}</td>
                <td>{cateringVendorsDetail?.facebook_link ? cateringVendorsDetail?.facebook_link : 'N/A'}</td>
                <td>{cateringVendorsDetail?.instagram_link ? cateringVendorsDetail?.instagram_link : 'N/A'}</td>
                <td>{cateringVendorsDetail?.twitter_id ? cateringVendorsDetail?.twitter_id : 'N/A'}</td>
                <td>{cateringVendorsDetail?.website_link ? cateringVendorsDetail?.website_link : 'N/A'}</td>
              </tr>
            </tbody>



            <thead>
              <tr>
                <th style={{ fontSize: '10px' }}>total_staffs_approx</th>
                <th style={{ fontSize: '10px' }}>working_days_hours</th>
                <th style={{ fontSize: '10px' }}>working_since</th>
                <th style={{ fontSize: '10px' }}>street_name</th>
                <th style={{ fontSize: '10px' }}>state</th>
                <th style={{ fontSize: '10px' }}>area</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{cateringVendorsDetail?.total_staffs_approx ? cateringVendorsDetail?.total_staffs_approx : 'N/A'}</td>
                <td>{cateringVendorsDetail?.working_days_hours ? cateringVendorsDetail?.working_days_hours : 'N/A'}</td>
                <td>{cateringVendorsDetail?.working_since ? cateringVendorsDetail?.working_since : 'N/A'}</td>
                <td>{cateringVendorsDetail?.street_name ? cateringVendorsDetail?.street_name : 'N/A'}</td>
                <td>{cateringVendorsDetail?.state ? cateringVendorsDetail?.state : 'N/A'}</td>
                <td>{cateringVendorsDetail?.area ? cateringVendorsDetail?.area : 'N/A'}</td>
              </tr>
            </tbody>
            <thead>
              <tr>
                <th style={{ fontSize: '10px' }}>city</th>
                <th style={{ fontSize: '10px' }}>country</th>
                <th style={{ fontSize: '10px' }}>formatted_address</th>
                <th style={{ fontSize: '10px' }}>latitude</th>
                <th style={{ fontSize: '10px' }}>longitude</th>
                <th style={{ fontSize: '10px' }}>pincode</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{cateringVendorsDetail?.city ? cateringVendorsDetail?.city : 'N/A'}</td>
                <td>{cateringVendorsDetail?.country ? cateringVendorsDetail?.country : 'N/A'}</td>
                <td>{cateringVendorsDetail?.formatted_address ? cateringVendorsDetail?.formatted_address : 'N/A'}</td>
                <td>{cateringVendorsDetail?.latitude ? cateringVendorsDetail?.latitude : 'N/A'}</td>
                <td>{cateringVendorsDetail?.longitude ? cateringVendorsDetail?.longitude : 'N/A'}</td>
                <td>{cateringVendorsDetail?.pincode ? cateringVendorsDetail?.pincode : 'N/A'}</td>
              </tr>
            </tbody>
          </>
        </Table>
      </div>
      <hr />


      <div className="row mx-2">
        <div className="bg-secondary text-white py-3 d-flex justify-content-between">
          <h3 className='mb-0'>Culinary Details</h3>
          <h3 className='mb-0 text-warning' style={{ cursor: 'pointer' }}>Edit</h3>
        </div>
        <Table responsive="xl" className='m-0'>
          <thead>
            <tr>
              <th style={{ fontSize: '10px' }}>Food Type</th>
              <th style={{ fontSize: '10px' }}>serviceTypes</th>
              <th style={{ fontSize: '10px' }}>servingTypes</th>
              <th style={{ fontSize: '10px' }}>Starting Price</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                {foodTypes?.length > 0 ? foodTypes?.map(item => item.food_type_name)?.join(', ') : 'N/A'}
              </td>
              <td>
                {mealTimes?.length > 0 ? mealTimes?.map(item => item.meal_time_name)?.join(', ') : 'N/A'}
              </td>
              <td>
                {serviceTypes?.length > 0 ? serviceTypes?.map(item => item.service_type_name)?.join(', ') : 'N/A'}
              </td>
              <td>{cateringVendorsDetail?.start_price ? cateringVendorsDetail?.start_price : 'N/A'}</td>
            </tr>
          </tbody>
        </Table>
      </div>
      <hr />


      <div className="row mx-2">
        <div className="bg-secondary text-white py-3 d-flex justify-content-between">
          <h3 className='mb-0'>Other Branches</h3>
          <h3 className='mb-0 text-warning' style={{ cursor: 'pointer' }}>Edit</h3>
        </div>
        <Table responsive="xl" className='m-0'>
          <thead>
            <tr>
              <th style={{ fontSize: '10px' }}>Other Branches</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                {branches?.length > 0 ? branches?.map(item => item.catering_service_name)?.join(', ') : 'N/A'}
              </td>
            </tr>
          </tbody>
        </Table>
      </div>
      <hr />


      <div className="row mx-2">
        <div className="bg-secondary text-white py-3 d-flex justify-content-between">
          <h3 className='mb-0'>Profile</h3>
          <h3 className='mb-0 text-warning' style={{ cursor: 'pointer' }}>Edit</h3>
        </div>
        <div className='mt-3'>
          <Table responsive="xl" className='m-0'>
            <thead>
              <tr>
                <th style={{ fontSize: '10px' }}>Login ID</th>
                <th style={{ fontSize: '10px' }}>Password</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{companyId}</td>
                <td>XXXXXXXXXX</td>
              </tr>
            </tbody>
          </Table>
        </div>
      </div>
      <hr />



    </div>
  )
}
export default TiffinListDetails