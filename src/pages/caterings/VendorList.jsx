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
import DatePicker from 'react-datepicker'; // Import DatePicker
import 'react-datepicker/dist/react-datepicker.css';


const VendorList = () => {
  const dispatch = useDispatch();
  const { cateringVendors } = useSelector((state) => state.catering);
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const { exportToExcel } = useExportData();

  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  // State to store search values for each column
  const [searchValues, setSearchValues] = useState({
    company_id: "",
    vendor_service_name: "",
    phone_number: "",
    city: "",
    plan_type_name: "",
    subscription_text: "",
    start_date: "",
    end_date: "",
    final_status_description: "",
    final_status: "",
  });

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    dispatch(fetchCateringVendors(cater_vendor_type));
  }, [dispatch]);

  useEffect(() => {
    if (cateringVendors) {
      const formattedData = cateringVendors.map((catering) => ({
        id: catering.id,
        company_id: catering?.company_id || 'N/A',
        vendor_service_name: catering?.vendor_service_name || 'N/A',
        phone_number: catering?.phone_number || 'N/A',
        city: catering?.city || 'N/A',
        plan_type_name: catering?.plan_type_name || "N/A",
        subscription_text: catering?.subscription_text || "N/A",
        subscription_subscription_start_date_text: new Date(catering?.subscription_subscription_start_date_text).toLocaleDateString(),
        subscription_subscription_end_date_text: new Date(catering?.subscription_subscription_end_date_text).toLocaleDateString(),
        final_status_description: catering?.final_status_description || 'N/A',
        final_status: catering?.final_status || 'N/A',
      }));
      setData(formattedData);
      setFilteredData(formattedData);
    }
  }, [cateringVendors]);

  const handleDateFilter = () => {
    const filtered = data.filter((item) => {
      const itemDate = new Date(item.subscription_subscription_start_date_text);
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

  // Handle individual column searching
  const handleSearch = (column, value) => {
    const newSearchValues = { ...searchValues, [column]: value };
    setSearchValues(newSearchValues);

    const newFilteredData = data.filter((row) => {
      return Object.keys(newSearchValues).every((key) => {
        const searchValue = newSearchValues[key].toLowerCase().trim();
        if (!searchValue) return true; // If no search value for this column, skip filtering
        return row[key]?.toString().toLowerCase().includes(searchValue);
      });
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
      cell: (row) => {
        let badgeClass = "badge mt-n1";
        const planType = row.plan_type_name ? row.plan_type_name.toLowerCase() : "";

        switch (planType) {
          case "monthly":
            badgeClass += " text-bg-monthly-bage";
            break;
          case "yearly":
            badgeClass += " text-bg-yearly-bage";
            break;
          default:
            badgeClass += " text-bg-default-bage";
            break;
        }

        return (
          <span className={badgeClass}>
            {row.plan_type_name || "Unknown Plan"}
          </span>
        );
      },
      sortable: true,
    },
    {
      name: "Subscription",
      cell: (row) => {
        let badgeClass = "badge mt-n1";
        const subscriptionType = row.subscription_text ? row.subscription_text.toLowerCase() : "";

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

        return (
          <span className={badgeClass} style={{ width: '100px' }}>
            {row.subscription_text || "Unknown Subscription"}
          </span>
        );
      },
      sortable: true,
    },


    {
      name: "Start Date",
      selector: row => row.subscription_subscription_start_date_text,
      sortable: true,
    },
    {
      name: "End Date",
      selector: row => row.subscription_subscription_end_date_text,
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
      sortFunction: (rowA, rowB) => {
        const statusA = rowA.final_status.toLowerCase();
        const statusB = rowB.final_status.toLowerCase();

        // Define a custom order for sorting
        const order = { "yes": 1, "no": 0 };

        return (order[statusA] || 0) - (order[statusB] || 0);
      },
    },
    {
      name: "Details",
      cell: (row) => (
        <Link
          onClick={() => onHandleCateringDetails(row)}
          to={`/vendor-list/${row.id}?company_id=${row.company_id}`} // Use backticks for template strings
          className='text-primary cursor-pointer'
        >
          View
        </Link>
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
    }
  ];




  const formatDataForExport = () => {
    return filteredData.map((row) => {
      const formattedRow = {};
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
              Total Registered Caterers - {cateringVendors?.length}
            </h1>
            <Button variant="primary" onClick={() => exportToExcel(formatDataForExport(), 'vendorlist')}>
              Export
            </Button>
          </div>
        </div>
        <hr />

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
        </div>

        <hr />

        <div className="card">
          {/* <GlobalSearch handleSearch={handleSearch} /> */}

          {/* Add a single row for column-based searches */}
          <div className="table-search-row mb-0">
            <div className="row p-3">
              <div className="col-lg-2 mb-2">
                <input
                  type="text"
                  value={searchValues.company_id}
                  onChange={(e) => handleSearch("company_id", e.target.value)}
                  placeholder="Company ID"
                  className="form-control"
                />
              </div>
              <div className="col-lg-2 mb-2">
                <input
                  type="text"
                  value={searchValues.vendor_service_name}
                  onChange={(e) => handleSearch("vendor_service_name", e.target.value)}
                  placeholder="Business Name"
                  className="form-control"
                />
              </div>
              <div className="col-lg-2 mb-2">
                <input
                  type="text"
                  value={searchValues.phone_number}
                  onChange={(e) => handleSearch("phone_number", e.target.value)}
                  placeholder="Phone"
                  className="form-control"
                />
              </div>
              <div className="col-lg-2 mb-2">
                <input
                  type="text"
                  value={searchValues.city}
                  onChange={(e) => handleSearch("city", e.target.value)}
                  placeholder="City"
                  className="form-control"
                />
              </div>
              <div className="col-lg-2 mb-2">
                <input
                  type="text"
                  value={searchValues.plan_type_name}
                  onChange={(e) => handleSearch("plan_type_name", e.target.value)}
                  placeholder="Plan Type"
                  className="form-control"
                />
              </div>
              <div className="col-lg-2 mb-2">
                <input
                  type="text"
                  value={searchValues.subscription_text}
                  onChange={(e) => handleSearch("subscription_text", e.target.value)}
                  placeholder="Subscription"
                  className="form-control"
                />
              </div>
              <div className="col-lg-2 mb-2">
                <input
                  type="text"
                  value={searchValues.start_date}
                  onChange={(e) => handleSearch("start_date", e.target.value)}
                  placeholder="Start Date"
                  className="form-control"
                />
              </div>
              <div className="col-lg-2 mb-2">
                <input
                  type="text"
                  value={searchValues.end_date}
                  onChange={(e) => handleSearch("end_date", e.target.value)}
                  placeholder="End Date"
                  className="form-control"
                />
              </div>
              <div className="col-lg-2 mb-2">
                <input
                  type="text"
                  value={searchValues.final_status_description}
                  onChange={(e) => handleSearch("final_status_description", e.target.value)}
                  placeholder="Status Description"
                  className="form-control"
                />
              </div>
              <div className="col-lg-2 mb-2">
                <input
                  type="text"
                  value={searchValues.final_status}
                  onChange={(e) => handleSearch("final_status", e.target.value)}
                  placeholder="Is Active"
                  className="form-control"
                />
              </div>
            </div>
          </div>

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
    </>
  );
};

export default VendorList;
