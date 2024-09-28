import React, { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCateringVendors, setVendorListId } from '../../features/catering/cateringSlice';
import useExportData from '../../hooks/useExportData';
import GlobalSearch from '../../components/common/GlobalSearch';
import { Link } from 'react-router-dom';
import { cater_vendor_type } from '../../constants';
import { tableCustomStyles } from '../../components/tableCustomStyles';

const VendorList = () => {
  const dispatch = useDispatch();
  const { cateringVendors, cateringVendorsDetail } = useSelector((state) => state.catering);
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const { exportToExcel } = useExportData();

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    dispatch(fetchCateringVendors(cater_vendor_type));
  }, [dispatch]);

  useEffect(() => {
    if (cateringVendors) {
      const formattedData = cateringVendors.map((catering, index) => ({
        // businessID: index + 1,
        // id: catering.id,
        company_id: catering?.company_id || 'N/A',
        vendor_service_name: catering?.vendor_service_name || 'N/A',
        phone_number: catering?.phone_number || 'N/A',
        city: catering?.city || 'N/A',
        subscription_type_name: catering?.subscription_type_name || "N/A",
        subscription: catering?.subscription || "N/A",
        created_at: new Date(catering?.created_at).toLocaleDateString(),
        final_status: catering?.final_status || 'N/A',
        
        // status: catering?.status || 'N/A',
        // listing_status: catering?.listing_status || 'N/A',
        // vendor_type: catering?.vendor_type || 'N/A',
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
        Object.values(row).some(value =>
          value.toString().toLowerCase().includes(keyword)
        )
      );
    });

    setFilteredData(newFilteredData);
  };

  const onHandleCateringDetails = (row) => {
    handleShow();
    dispatch(setVendorListId(row?.id));
  };

  const columns = [
    {
      name: "Company ID",
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
      name: "City",
      selector: row => row.city,
      sortable: true,
    },
    {
      name: "Plan Type",
      selector: row => row.subscription_type_name,
      sortable: true,
    },
    {
      name: "Subscription",
      selector: row => row.subscription,
      sortable: true,
    },
    {
      name: "Start Date",
      selector: row => row.created_at,
      sortable: true,
    },
    {
      name: "Final Status",
      selector: row => row.final_status,
      sortable: true,
    },
    {
      name: "Details",
      cell: (row) => (
        <Link
          onClick={() => onHandleCateringDetails(row)}
          to={`/vendor-list/${row.id}?company_id=${row.company_id}`}
          className='text-primary cursor-pointer'
        >
          View
        </Link>
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


    </>
  )
}

export default VendorList