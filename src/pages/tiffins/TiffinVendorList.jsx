import React, { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCateringVendors, setVendorListId } from '../../features/catering/cateringSlice';
import * as XLSX from "xlsx";
import useExportData from '../../hooks/useExportData';
import toast from 'react-hot-toast';
import Table from 'react-bootstrap/Table';
import { tableCustomStyles } from '../../components/tableCustomStyles';
import GlobalSearch from '../../components/common/GlobalSearch';
import { Link } from 'react-router-dom';
import { cater_vendor_type, tiffin_vendor_type } from '../../constants';
import DatePicker from 'react-datepicker'; // Import DatePicker
import 'react-datepicker/dist/react-datepicker.css';


const TiffinVendorList = () => {
  const dispatch = useDispatch();
  const { cateringVendors, cateringVendorsDetail } = useSelector((state) => state.catering);
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const { exportToExcel } = useExportData();
  const { foodTypes, kitchenTypes, mealTimes, serviceTypes, servingTypes, vendorDetails } = cateringVendorsDetail;

  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    dispatch(fetchCateringVendors(tiffin_vendor_type));
  }, [dispatch]);

  useEffect(() => {
    if (cateringVendors) {
      const formattedData = cateringVendors.map((catering, index) => ({
        id: catering.id,
        company_id: catering?.company_id,
        vendor_service_name: catering?.vendor_service_name || 'N/A',
        phone_number: catering?.phone_number || 'N?A',
        city: catering?.city || 'N/A',
        subscription_type_name: catering?.subscription_type_name || "N/A",
        subscription: catering?.subscription || "N/A",
        subscription_start_date: new Date(catering?.subscription_start_date).toLocaleDateString(),
        final_status_description: catering?.final_status_description || 'N/A',
        final_status: catering?.final_status || 'N/A',
      }));
      setData(formattedData);
      setFilteredData(formattedData);
    }
  }, [cateringVendors]);

  // Function to handle date range filtering
  const handleDateFilter = () => {
    const filtered = data.filter((item) => {
      const itemDate = new Date(item.subscription_start_date);
      return (
        (!startDate || itemDate >= startDate) &&
        (!endDate || itemDate <= endDate)
      );
    });
    setFilteredData(filtered);
  };

  // Apply date filter whenever the date range is updated
  useEffect(() => {
    handleDateFilter();
  }, [startDate, endDate]);

  const handleSearch = (e) => {
    const searchValue = e.target.value.toLowerCase().trim();
    if (!searchValue) {
      setFilteredData(data);
      return;
    }

    const searchKeywords = searchValue.split(/[, ]+/).filter(Boolean);

    const newFilteredData = data.filter((row) => {
      return searchKeywords.some((keyword) =>
        Object.values(row).some(value =>
          value !== null && value.toString().toLowerCase().includes(keyword)
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
      name: "City",
      selector: row => row.city,
      sortable: true,
    },
    {
      name: "Plan Type",
      cell: (row) => {
        let badgeClass = "badge mt-n1";

        switch (row.subscription_type_name.toLowerCase()) {
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

        return (
          <span className={badgeClass}>
            {row.subscription_type_name}
          </span>
        );
      },
      sortable: true,
    },
    {
      name: "Subscription",
      selector: row => row.subscription,
      sortable: true,
    },
    {
      name: "Start Date",
      selector: row => row.subscription_start_date,
      sortable: true,
    },
    {
      name: "Status Description",
      selector: row => row.final_status_description,
      sortable: true,
    },
    {
      name: "Is Active",
      cell: (row) => {
        let badgeClass = "badge mt-n1";

        switch (row.final_status.toLowerCase()) {
          case "yes":
            badgeClass += " text-bg-branded-bage";
            break;
          case "no":
            badgeClass += " text-bg-default-bage";
            break;
          default:
            badgeClass += " text-bg-default-bage";
            break;
        }
        return (
          <span className={badgeClass}>
            {row.final_status}
          </span>
        );
      },
      sortable: true,
    },
    {
      name: "Details",
      cell: (row) => (
        <>
          {row?.company_id ? (
            <Link
              onClick={() => onHandleCateringDetails(row)}
              to={`/tiffin-list/${row.id}?company_id=${row.company_id}`}
              className='text-primary cursor-pointer'
            >
              View
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


  const formatDataForExport = () => {
    return filteredData.map((row) => {
      // Create a new formatted row object
      const formattedRow = {};

      // Loop through each column and get the value using the selector function
      columns.forEach((col) => {
        formattedRow[col.name] = col.selector ? col.selector(row) : row[col.name];
      });

      return formattedRow;
    });
  };


  return (
    <>
      <div className="container-fluid my-5">

        <div className="row mb-4  me-2">
          <div className="d-flex justify-content-between align-items-center">
            <h1 className="header-title">
              Total Registered Tiffins - {cateringVendors?.length}
            </h1>
          </div>
        </div>
        <hr />


        {/* Date filter */}
        {/* <div className="row d-flex justify-content-between mb-4"> */}

        <div className="row d-flex justify-content-between mb-4">
          <div className="col-lg-6">
            <div className=" d-flex justify-content-between">
              <div>
                <label className='me-2'>Start Date</label>
                <DatePicker
                  selected={startDate}
                  onChange={(date) => setStartDate(date)}
                  showYearDropdown
                  scrollableYearDropdown
                  yearDropdownItemNumber={50}
                  placeholderText="Select start date"
                  dateFormat="dd/MM/yyyy"
                  className="form-control"
                  popperClassName="higher-zindex"
                />
              </div>
              <div className="">
                <label className='me-2'>End Date</label>
                <DatePicker
                  selected={endDate}
                  onChange={(date) => setEndDate(date)}
                  showYearDropdown
                  scrollableYearDropdown
                  yearDropdownItemNumber={50}
                  placeholderText="Select end date"
                  dateFormat="dd/MM/yyyy"
                  className="form-control"
                  popperClassName="higher-zindex"
                />
              </div>
            </div>
          </div>

          <div className="col-lg-6">
            <div className="d-flex justify-content-end">
              <Button variant="primary" onClick={() => exportToExcel(formatDataForExport(), 'vendorlist')}>
                Export
              </Button>
            </div>
          </div>

        </div>

        <hr />



        {/* </div> */}

        <div className="card">
          <GlobalSearch handleSearch={handleSearch} />
          <DataTable
            columns={columns}
            data={filteredData}
            paginationRowsPerPageOptions={[50, 100, 300, 500, 1000]}
            paginationPerPage="100"
            fixedHeader
            pagination
            selectableRows
            customStyles={tableCustomStyles}
          />
        </div>
      </div>

      <br />

      <Modal centered show={show} onHide={handleClose} size="xl">
        <Modal.Header closeButton>
          <Modal.Title>Vendor Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* Vendor details table goes here */}
        </Modal.Body>
      </Modal>
    </>
  );
};

export default TiffinVendorList;
