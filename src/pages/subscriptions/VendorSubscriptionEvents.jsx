import React, { useEffect, useState } from 'react'
import DataTable from 'react-data-table-component';
import { useDispatch, useSelector } from 'react-redux';
import GlobalSearch from '../../components/common/GlobalSearch';
import { tableCustomStyles } from '../../components/tableCustomStyles';
import { fetchVendorSubscriptionEvents } from '../../features/subscriptionSlice';



const VendorSubscriptionEvents = () => {

  const dispatch = useDispatch()
  const { vendorSubscriptionEvents, isLoading } = useSelector((state) => state.subscription)
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);

  console.log(vendorSubscriptionEvents, "vendorSubscriptionEvents");


  useEffect(() => {
    dispatch(fetchVendorSubscriptionEvents());
  }, [dispatch]);


  useEffect(() => {
    if (vendorSubscriptionEvents) {
      const formattedData = vendorSubscriptionEvents?.map((subscription, index) => ({
        id: subscription?.id,
        vendor_id: subscription?.vendor_id,
        vendor_subscription_id: subscription?.vendor_subscription_id,
        event_type: subscription?.event_type,
        razorpay_subscription_id: subscription?.razorpay_subscription_id,
        vendor_service_name: subscription?.vendor_service_name,
      }));
      setData(formattedData);
      setFilteredData(formattedData);
    }
  }, [vendorSubscriptionEvents]);


  const handleSearch = (e) => {
    const searchValue = e.target.value.toLowerCase();
    if (!searchValue) {
      setFilteredData(data);
      return;
    }
    const newFilteredData = data?.filter((row) => {
      return (
        String(row?.id).toLowerCase().includes(searchValue) ||
        String(row?.vendor_id).toLowerCase().includes(searchValue)
      );
    });
    setFilteredData(newFilteredData);
  };


  const columns = [
    {
      name: "ID",
      selector: row => row.id,
      sortable: true,
    },
    {
      name: "Vendor Id",
      selector: row => row.vendor_id,
      sortable: true,
    },
    {
      name: "vendor subscription id",
      selector: row => row.vendor_subscription_id,
      sortable: true,
    },
    {
      name: "Event Type",
      selector: row => row.event_type,
      sortable: true,
    },
    {
      name: "Razorpay Subscription Id",
      selector: row => row.razorpay_subscription_id,
      sortable: true,
    },
    {
      name: "Vendor Service Name",
      selector: row => row.vendor_service_name,
      sortable: true,
    },
  ];


  return (
    <>
      <div className="container-fluid my-5">
        <div className="row mb-4 me-2">
          <div className="d-flex justify-content-between">
            <h2>Total Vendor Subscription Events - {vendorSubscriptionEvents?.length} </h2>
            {/* <button className='btn btn-primary fit-content' variant="primary">
              Create Subscription List
            </button> */}
          </div>
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
    </>
  )
}

export default VendorSubscriptionEvents