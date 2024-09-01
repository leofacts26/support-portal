import React, { useEffect, useState } from 'react'
import DataTable from 'react-data-table-component';
import { useDispatch, useSelector } from 'react-redux';
import GlobalSearch from '../../components/common/GlobalSearch';
import { tableCustomStyles } from '../../components/tableCustomStyles';
import { createRazorpayPlansMapper, fetchRazorpayPlansMapper, fetchSubscriptionTypeCaterer, updateRazorpayPlansMapper } from '../../features/subscriptionSlice';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';


const initialState = {
  // vendor_type: '',
  subscription_type_id: '',
  plan_id: '',
  duration: '',
}

const RazorpayPlansMapper = () => {

  const dispatch = useDispatch()
  const { razorpayPlansMapperList, isLoading, vendorSubscriptionTypesList } = useSelector((state) => state.subscription)
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [values, setValues] = useState(initialState)
  const [editId, setEditId] = useState(null)

  const [type, setType] = useState("")


  console.log(type, "type");


  const [show, setShow] = useState(false);
  const handleClose = () => {
    setShow(false)
    setEditId(null)
  };
  const handleShow = () => setShow(true);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value })
  }

  useEffect(() => {
    dispatch(fetchRazorpayPlansMapper());
  }, [dispatch]);


  useEffect(() => {
    if (type !== '') {
      dispatch(fetchSubscriptionTypeCaterer(type));
    }
  }, [type]);


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




  const onHandleSubmit = async (e) => {
    e.preventDefault();
    const { subscription_type_id, plan_id, duration } = values;
    const data = {
      vendor_type: type,
      subscription_type_id,
      plan_id,
      duration
    }

    if (editId === null) {
      await dispatch(createRazorpayPlansMapper(data))
    } else {
      await dispatch(updateRazorpayPlansMapper(data))
    }
    await dispatch(fetchRazorpayPlansMapper());
    setValues(initialState)
    handleClose()
  }



  return (
    <>
      <div className="container-fluid my-5">
        <div className="row mb-4 me-2">
          <div className="d-flex justify-content-between">
            <h2>Total Razorpay Plans Mapper List - {razorpayPlansMapperList?.length} </h2>
            <button className='btn btn-primary fit-content' variant="primary" onClick={handleShow}>
              Create Razorpay Plans Mapper
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

      <Modal centered show={show} onHide={handleClose}>
        <form onSubmit={onHandleSubmit}>
          <Modal.Header closeButton>
            <Modal.Title> {editId ? 'Edit Budget' : 'Create Budget'} </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="row">
              <div>
                <label htmlFor="vendor_type" className="form-label">Vendor Type</label>
                <select
                  required
                  name="type"
                  className="form-select"
                  value={values.type}
                  onChange={(e) => setType(e.target.value)}
                >
                  <option value="">Select Vendor Type</option>
                  <option value="Caterer">Caterer</option>
                  <option value="Tiffin">Tiffin</option>
                </select>
              </div>

              {type && <div className='mt-4'>
                <label htmlFor="subscription_type_id" className="form-label">Subscription type id </label>
                <select
                  required
                  name="subscription_type_id"
                  className="form-select"
                  value={values.subscription_type_id}
                  onChange={handleChange}
                >
                  {
                    vendorSubscriptionTypesList?.map((item) => (
                      <option value={item?.id}>{item?.display_name}</option>
                    ))
                  }
                </select>
              </div>}


              <div className='col-12 mt-4'>
                <label for="name" className="form-label"> Plan ID </label>
                <input type="text" className="form-control" placeholder="Plan ID" name="plan_id" required onChange={handleChange} value={values.plan_id} />
              </div>

              <div className='mt-4'>
                <label htmlFor="vendor_type" className="form-label">Duration</label>
                <select
                  required
                  name="duration"
                  className="form-select"
                  value={values.duration}
                  onChange={handleChange}
                >
                  <option value="">Select Duration</option>
                  <option value="monthly">Monthly</option>
                  <option value="yearly">Yearly</option>
                </select>
              </div>



            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" type='submit'>
              {isLoading ? 'Loading...' : 'Save Changes'}
            </Button>
          </Modal.Footer>
        </form>
      </Modal>
    </>
  )
}

export default RazorpayPlansMapper