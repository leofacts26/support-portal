import { useEffect } from 'react';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchCateringVendorDetails } from '../../features/catering/cateringSlice';
import Table from 'react-bootstrap/Table';


const VendorListDetails = () => {
  const { cateringVendors, cateringVendorsDetail } = useSelector((state) => state.catering)
  const { foodTypes, kitchenTypes, mealTimes, serviceTypes, servingTypes, vendorDetails } = cateringVendorsDetail;

  console.log(cateringVendorsDetail, "cateringVendorsDetail");


  const { id } = useParams();
  const dispatch = useDispatch()

  useEffect(() => {
    if (!id) {
      toast.error('Vendor Not Found')
      return
    }
    dispatch(fetchCateringVendorDetails(id));
  }, [id])

  return (
    <>
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
                <td>{vendorDetails?.vendor_type ? vendorDetails?.vendor_type : 'N/A'}</td>
                <td>{vendorDetails?.sub_plan ? vendorDetails?.sub_plan : 'N/A'}</td>
                <td>{vendorDetails?.plan_type ? vendorDetails?.plan_type : 'N/A'}</td>
                <td>{vendorDetails?.start_date ? vendorDetails?.start_date : 'N/A'}</td>
                <td>{vendorDetails?.expiry_date ? vendorDetails?.expiry_date : 'N/A'}</td>
              </tr>
            </tbody>
          </Table>
        </div>
        <hr />


        <div className="row mx-2">
          <div className="bg-secondary text-white py-3 d-flex justify-content-between">
            <h3 className='mb-0'>Business Information</h3>
            <h3 className='mb-0 text-warning'>Edit</h3>
          </div>
          <Table responsive="xl" className='m-0'>
            <thead>
              <tr>
                <th style={{ fontSize: '10px' }}>Business Name</th>
                <th style={{ fontSize: '10px' }}>Phone No</th>
                <th style={{ fontSize: '10px' }}>Alt Phone No</th>
                <th style={{ fontSize: '10px' }}>Email ID</th>
                <th style={{ fontSize: '10px' }}>Streer Address</th>
                <th style={{ fontSize: '10px' }}>Area</th>
                <th style={{ fontSize: '10px' }}>City</th>
                <th style={{ fontSize: '10px' }}>Pincode</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{vendorDetails?.vendor_service_name ? vendorDetails?.vendor_service_name : 'N/A'}</td>
                <td>{vendorDetails?.business_phone_number ? vendorDetails?.business_phone_number : 'N/A'}</td>
                <td>{vendorDetails?.landline_number ? vendorDetails?.landline_number : 'N/A'}</td>
                <td>{vendorDetails?.business_email ? vendorDetails?.business_email : 'N/A'}</td>
                <td>
                  {`${vendorDetails?.street_name}`}
                </td>
                <td>{vendorDetails?.area ? vendorDetails?.area : 'N/A'}</td>
                <td>{vendorDetails?.city ? vendorDetails?.city : 'N/A'}</td>
                <td>{vendorDetails?.pincode ? vendorDetails?.pincode : 'N/A'}</td>
              </tr>
            </tbody>
          </Table>
        </div>
        <hr />


        <div className="row mx-2">
          <div className="bg-secondary text-white py-3 d-flex justify-content-between">
            <h3 className='mb-0'>Food Types</h3>
            <h3 className='mb-0 text-warning'>Edit</h3>
          </div>
          <Table responsive="xl" className='m-0'>
            <thead>
              <tr>
                <th style={{ fontSize: '10px' }}>Food Type</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  {foodTypes?.map(item => item.food_type_name)?.join(', ')}
                </td>
              </tr>
            </tbody>
          </Table>
        </div>
        <hr />


        <div className="row mx-2">
          <div className="bg-secondary text-white py-3 d-flex justify-content-between">
            <h3 className='mb-0'>Kitchen Types</h3>
            <h3 className='mb-0 text-warning'>Edit</h3>
          </div>
          <Table responsive="xl" className='m-0'>
            <thead>
              <tr>
                <th style={{ fontSize: '10px' }}>Kitchen Type</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  {kitchenTypes?.map(item => item.kitchen_type_name)?.join(', ')}
                </td>
              </tr>
            </tbody>
          </Table>
        </div>
        <hr />



        <div className="row mx-2">
          <div className="bg-secondary text-white py-3 d-flex justify-content-between">
            <h3 className='mb-0'>Meal Types</h3>
            <h3 className='mb-0 text-warning'>Edit</h3>
          </div>
          <Table responsive="xl" className='m-0'>
            <thead>
              <tr>
                <th style={{ fontSize: '10px' }}>Meal Type</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  {mealTimes?.map(item => item.meal_time_name)?.join(', ')}
                </td>
              </tr>
            </tbody>
          </Table>
        </div>
        <hr />

        <div className="row mx-2">
          <div className="bg-secondary text-white py-3 d-flex justify-content-between">
            <h3 className='mb-0'>Service Types</h3>
            <h3 className='mb-0 text-warning'>Edit</h3>
          </div>
          <Table responsive="xl" className='m-0'>
            <thead>
              <tr>
                <th style={{ fontSize: '10px' }}>Service Type</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  {serviceTypes?.map(item => item.service_type_name)?.join(', ')}
                </td>
              </tr>
            </tbody>
          </Table>
        </div>
        <hr />



        <div className="row mx-2">
          <div className="bg-secondary text-white py-3 d-flex justify-content-between">
            <h3 className='mb-0'>Serving Types</h3>
            <h3 className='mb-0 text-warning'>Edit</h3>
          </div>
          <Table responsive="xl" className='m-0'>
            <thead>
              <tr>
                <th style={{ fontSize: '10px' }}>Serving Type</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  {servingTypes?.map(item => item.serving_type_name)?.join(', ')}
                </td>
              </tr>
            </tbody>
          </Table>
        </div>
        <hr />




      </div>
    </>
  )
}
export default VendorListDetails