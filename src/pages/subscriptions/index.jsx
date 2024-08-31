import React, { useEffect, useState } from 'react'
import DataTable from 'react-data-table-component';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useDispatch, useSelector } from 'react-redux';
import {  updateTogglePriceRanges } from '../../features/catering/priceSlice';
import GlobalSearch from '../../components/common/GlobalSearch';
import { tableCustomStyles } from '../../components/tableCustomStyles';
import { FaEdit } from "react-icons/fa";
import { fetchSubscriptionData } from '../../features/subscriptionSlice';



const Subscriptions = () => {

  const dispatch = useDispatch()
  const { subscriptionList, isLoading } = useSelector((state) => state.subscription)
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    dispatch(fetchSubscriptionData());
  }, [dispatch]);


  useEffect(() => {
    if (subscriptionList) {
      const formattedData = subscriptionList?.map((subscription, index) => ({
        id: subscription?.id,
        auth_status: subscription?.auth_status,
        carried_forward_days: subscription?.carried_forward_days,
        created_at: subscription?.created_at,
        discount_amount: subscription?.discount_amount,
        final_amount: subscription?.final_amount,
        payment_status: subscription?.payment_status,
        razorpay_subscription_id: subscription?.razorpay_subscription_id,
        status: subscription?.status,
        sub_amount: subscription?.sub_amount,
        subscription_pattern: subscription?.subscription_pattern,
        vendor_id: subscription?.vendor_id,
        vendor_service_name: subscription?.vendor_service_name,
      }));
      setData(formattedData);
      setFilteredData(formattedData);
    }
  }, [subscriptionList]);


  const handleSearch = (e) => {
    const searchValue = e.target.value.toLowerCase();
    if (!searchValue) {
      setFilteredData(data);
      return;
    }
    const newFilteredData = data?.filter((row) => {
      return (
        String(row?.id).toLowerCase().includes(searchValue) ||
        (row?.startprice && String(row.startprice).toLowerCase().includes(searchValue)) ||
        (row?.endprice && String(row.endprice).toLowerCase().includes(searchValue))
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
      name: "auth_status",
      selector: row => row.auth_status,
      sortable: true,
    },
    {
      name: "carried_forward_days",
      selector: row => row.carried_forward_days,
      sortable: true,
    },
    {
      name: "created_at",
      selector: row => row.created_at,
      sortable: true,
    },
    {
      name: "discount_amount",
      selector: row => row.discount_amount,
      sortable: true,
    },
    {
      name: "final_amount",
      selector: row => row.final_amount,
      sortable: true,
    },
    {
      name: "payment_status",
      selector: row => row.payment_status,
      sortable: true,
    },
    {
      name: "razorpay_subscription_id",
      selector: row => row.razorpay_subscription_id,
      sortable: true,
    },
    {
      name: "status",
      selector: row => row.status,
      sortable: true,
    },
    {
      name: "sub_amount",
      selector: row => row.sub_amount,
      sortable: true,
    },
    {
      name: "subscription_pattern",
      selector: row => row.subscription_pattern,
      sortable: true,
    },
    {
      name: "vendor_id",
      selector: row => row.vendor_id,
      sortable: true,
    },
    {
      name: "vendor_service_name",
      selector: row => row.vendor_service_name,
      sortable: true,
    },
    {
      name: "Action",
      cell: (row) => (
        <>
          <button className="btn btn-success me-1">
            <FaEdit />
          </button>
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
        <div className="row mb-4 me-2">
          <div className="d-flex justify-content-between">
            <h2>Total Subscription List - {subscriptionList?.length} </h2>
            <button className='btn btn-primary fit-content' variant="primary">
              Create Subscription List
            </button>
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

export default Subscriptions