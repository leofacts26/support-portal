import { useDispatch, useSelector } from "react-redux"
import { fetchCateringVendorDetails, fetchGetVendorSettingsInfo } from "../../features/catering/cateringSlice"
import { useEffect } from "react"
import { useLocation, useParams } from "react-router-dom"
import Table from 'react-bootstrap/Table';




const TiffinListDetails = () => {
  const { cateringVendors, cateringVendorsDetail, settingsInfo, isLoading } = useSelector((state) => state.catering)
  const { foodTypes, kitchenTypes, mealTimes, branches, cuisines, occasions, serviceTypes, servingTypes, vendorDetails } = cateringVendorsDetail;

  const dispatch = useDispatch()
  const location = useLocation();
  const { id } = useParams();

  const queryParams = new URLSearchParams(location.search);
  const companyId = queryParams.get('company_id');



  useEffect(() => {
    dispatch(fetchCateringVendorDetails(id));
  }, [id]);

  useEffect(() => {
    dispatch(fetchGetVendorSettingsInfo(id));
  }, [id]);

  return (
    <div className="container-fluid my-5">

      <div className="row mx-2">
        <div className="bg-secondary text-white py-3 d-flex justify-content-between">
          <h3 className='mb-0'>Vendor Details</h3>
          {/* <h3 className='mb-0 text-warning'>Upgrade</h3> */}
        </div>
        <Table responsive="xl" className='m-0'>
          <thead>
            <tr>
              <th style={{ fontSize: '10px' }}>Vendor ID</th>
              <th style={{ fontSize: '10px' }}>Login ID</th>
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
              <td>{companyId ? companyId : 'N/A'}</td>
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
            {/* <h3 className='mb-0 text-warning' onClick={handleBusinessProfileEditShow} style={{ cursor: 'pointer' }}>Edit</h3> */}
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
                  <td>{cateringVendorsDetail?.street_name ? cateringVendorsDetail?.street_name : 'N/A'}</td>
                  <td>{cateringVendorsDetail?.state ? cateringVendorsDetail?.state : 'N/A'}</td>
                  <td>{cateringVendorsDetail?.area ? cateringVendorsDetail?.area : 'N/A'}</td>
                  <td>{cateringVendorsDetail?.latitude ? cateringVendorsDetail?.latitude : 'N/A'}</td>
                  <td>{cateringVendorsDetail?.longitude ? cateringVendorsDetail?.longitude : 'N/A'}</td>
                  <td>{cateringVendorsDetail?.pincode ? cateringVendorsDetail?.pincode : 'N/A'}</td>
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
                  <td>{cateringVendorsDetail?.city ? cateringVendorsDetail?.city : 'N/A'}</td>
                  <td>{cateringVendorsDetail?.country ? cateringVendorsDetail?.country : 'N/A'}</td>
                  <td>{cateringVendorsDetail?.formatted_address ? cateringVendorsDetail?.formatted_address : 'N/A'}</td>
                </tr>
              </tbody>
            </>
          </Table>
        </div>
        <hr />


      <div className="row mx-2">
        <div className="bg-secondary text-white py-3 d-flex justify-content-between">
          <h3 className='mb-0'>Culinary Details</h3>
          {/* <h3 className='mb-0 text-warning' style={{ cursor: 'pointer' }}>Edit</h3> */}
        </div>
        <Table responsive="xl" className='m-0'>
          <thead>
            <tr>
              <th style={{ fontSize: '10px' }}>Food Type</th>
              <th style={{ fontSize: '10px' }}>Meal Types</th>
              <th style={{ fontSize: '10px' }}>service Types</th>
              <th style={{ fontSize: '10px' }}>serving Types</th>
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
              <td>{servingTypes?.length > 0 ? servingTypes?.map(item => item.serving_type_name)?.join(', ') : 'N/A'}</td>
              <td>{cateringVendorsDetail?.start_price ? cateringVendorsDetail?.start_price : 'N/A'}</td>
            </tr>
          </tbody>
        </Table>
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
              <th style={{ fontSize: '10px' }}>Work Hours</th>
              <th style={{ fontSize: '10px' }}>Location Link</th>
              <th style={{ fontSize: '10px' }}>Other Branches</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{cateringVendorsDetail?.working_since ? cateringVendorsDetail?.working_since : 'N/A'}</td>
              <td>{cateringVendorsDetail?.total_staffs_approx ? cateringVendorsDetail?.total_staffs_approx : 'N/A'}</td>
              <td>{cateringVendorsDetail?.working_days_hours ? cateringVendorsDetail?.working_days_hours : 'N/A'}</td>
              <td>{'N/A'}</td>
              <td> {branches?.length > 0 ? branches?.map(item => item.catering_service_name)?.join(', ') : 'N/A'}</td>
            </tr>
          </tbody>
        </Table>
      </div>
      <hr />





      <div className="row mx-2">
        <div className="bg-secondary text-white py-3 d-flex justify-content-between">
          <h3 className="mb-0">Documents</h3>
        </div>
        <Table responsive="xl" className="m-0">
          <thead>
            <tr>
              <th style={{ fontSize: '10px' }}>Pan Card</th>
              <th style={{ fontSize: '10px' }}>Aadhar Card (Front)</th>
              <th style={{ fontSize: '10px' }}>Aadhar Card (Back)</th>
              <th style={{ fontSize: '10px' }}>Fssai Licence</th>
              <th style={{ fontSize: '10px' }}>GST Certificate</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              {/* Pan Card */}
              <td>
                {settingsInfo?.["vendor-encp"]?.[0]?.image_name?.[0]?.large ? (
                  <a href={settingsInfo["vendor-encp"][0].image_name[0].large} target="_blank" rel="noopener noreferrer">
                    View Pan Card
                  </a>
                ) : "N/A"}
              </td>

              {/* Aadhar Card Front */}
              <td>
                {settingsInfo?.["vendor-enca"]?.[0]?.image_name?.[0]?.large ? (
                  <a href={settingsInfo["vendor-enca"][0].image_name[0].large} target="_blank" rel="noopener noreferrer">
                    View Aadhar (Front)
                  </a>
                ) : "N/A"}
              </td>

              {/* Aadhar Card Back */}
              <td>
                {settingsInfo?.["vendor-enca-back"]?.[0]?.image_name?.[0]?.large ? (
                  <a href={settingsInfo["vendor-enca-back"][0].image_name[0].large} target="_blank" rel="noopener noreferrer">
                    View Aadhar (Back)
                  </a>
                ) : "N/A"}
              </td>

              {/* Fssai Licence */}
              <td>
                {settingsInfo?.["vendor-encf"]?.[0]?.image_name?.[0]?.large ? (
                  <a href={settingsInfo["vendor-encf"][0].image_name[0].large} target="_blank" rel="noopener noreferrer">
                    View Fssai Licence
                  </a>
                ) : "N/A"}
              </td>

              {/* GST Certificate */}
              <td>
                {settingsInfo?.gstin_number ? settingsInfo.gstin_number : 'N/A'}
              </td>
            </tr>
          </tbody>
        </Table>
      </div>
      <hr />




    </div>
  )
}
export default TiffinListDetails