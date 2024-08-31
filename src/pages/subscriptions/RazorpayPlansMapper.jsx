import React, { useEffect, useState } from 'react'
import DataTable from 'react-data-table-component';
import { useDispatch, useSelector } from 'react-redux';
import GlobalSearch from '../../components/common/GlobalSearch';
import { tableCustomStyles } from '../../components/tableCustomStyles';
import { fetchRazorpayPlansMapper } from '../../features/subscriptionSlice';



const RazorpayPlansMapper = () => {

  const dispatch = useDispatch()
  const { razorpayPlansMapperList, isLoading } = useSelector((state) => state.subscription)
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);

  console.log(razorpayPlansMapperList, "razorpayPlansMapperList");


  useEffect(() => {
    dispatch(fetchRazorpayPlansMapper());
  }, [dispatch]);


  useEffect(() => {
    if (razorpayPlansMapperList) {
      const formattedData = razorpayPlansMapperList?.map((subscription, index) => ({
        id: subscription?.id,
        duration: subscription?.duration,
        plan_id: subscription?.plan_id,
        subscription_type_id: subscription?.subscription_type_id,
        subscription_type_name: subscription?.subscription_type_name,
        vendor_type: subscription?.vendor_type,
      }));
      setData(formattedData);
      setFilteredData(formattedData);
    }
  }, [razorpayPlansMapperList]);


  const handleSearch = (e) => {
    const searchValue = e.target.value.toLowerCase();
    if (!searchValue) {
      setFilteredData(data);
      return;
    }
    const newFilteredData = data?.filter((row) => {
      return (
        String(row?.id).toLowerCase().includes(searchValue) ||
        String(row?.subscription_type_name).toLowerCase().includes(searchValue) ||
        String(row?.vendor_type).toLowerCase().includes(searchValue) 
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
      name: "Plan Id",
      selector: row => row.plan_id,
      sortable: true,
    },
    {
      name: "Subscription Type Id",
      selector: row => row.subscription_type_id,
      sortable: true,
    },
    {
      name: "Duration",
      selector: row => row.duration,
      sortable: true,
    },
    {
      name: "Subscription Type Name",
      selector: row => row.subscription_type_name,
      sortable: true,
    },
    {
      name: "Vendor Type",
      selector: row => row.vendor_type,
      sortable: true,
    },
  ];


  return (
    <>
      <div className="container-fluid my-5">
        <div className="row mb-4 me-2">
          <div className="d-flex justify-content-between">
            <h2>Total Razorpay Plans Mapper List - {razorpayPlansMapperList?.length} </h2>
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

export default RazorpayPlansMapper