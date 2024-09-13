import React, { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useDispatch, useSelector } from 'react-redux';
import GlobalSearch from '../../components/common/GlobalSearch';
import { tableCustomStyles } from '../../components/tableCustomStyles';
import { FaEdit } from "react-icons/fa";
import { createAdminROle, fetchAdminListFuture, updateAdminRole, updateToggleAdminRolesRanges } from '../../features/adminRoleSlice';

const initialState = {
  name: '',
  is_active: 1,
  is_menu: '',
  link: '',
  parent_id: '',
  parent_display_order: '',
  child_display_order: ''
};

const AdminListFeatures = () => {
  const dispatch = useDispatch();
  const { adminFeatureRoleList, isLoading } = useSelector((state) => state.roleSlice);

  const [values, setValues] = useState(initialState);
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [editId, setEditId] = useState(null);
  const [show, setShow] = useState(false);

  const handleClose = () => {
    setShow(false);
    setEditId(null);
  };

  const handleShow = () => setShow(true);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  useEffect(() => {
    dispatch(fetchAdminListFuture());
  }, [dispatch]);

  useEffect(() => {
    if (adminFeatureRoleList) {
      const flattenData = [];

      adminFeatureRoleList.forEach((feature) => {
        flattenData.push({
          feature_id: feature.feature_id,
          feature_name: feature.feature_name,
          is_menu: feature.is_menu,
          link: feature.link,
          is_active: feature.is_active,
          parent: true, // Mark as parent
        });

        // Push child features
        if (feature.children && feature.children.length > 0) {
          feature.children.forEach((child) => {
            flattenData.push({
              feature_id: child.feature_id,
              feature_name: `-- ${child.feature_name}`, // Indent for child
              is_menu: child.is_menu,
              link: child.link,
              is_active: child.is_active,
              parent: false, // Mark as child
            });
          });
        }
      });

      setData(flattenData);
      setFilteredData(flattenData);
    }
  }, [adminFeatureRoleList]);

  const handleSearch = (e) => {
    const searchValue = e.target.value.toLowerCase();
    if (!searchValue) {
      setFilteredData(data);
      return;
    }
    const newFilteredData = data.filter((row) =>
      String(row.feature_id).toLowerCase().includes(searchValue) ||
      (row.feature_name && row.feature_name.toLowerCase().includes(searchValue))
    );
    setFilteredData(newFilteredData);
  };

  const handleStatusToggle = async (item) => {
    const data = {
      feature_id: item.feature_id,
      is_active: item.is_active === 1 ? 0 : 1,
    };
    await dispatch(updateToggleAdminRolesRanges(data));
    await dispatch(fetchAdminListFuture());
  };

  const columns = [
    {
      name: "Feature ID",
      selector: row => row.feature_id,
      sortable: true,
    },
    {
      name: "Feature Name",
      selector: row => row.feature_name,
      sortable: true,
    },
    {
      name: "Is Menu",
      selector: row => row.is_menu ? "Yes" : "No",
      sortable: true,
    },
    {
      name: "Link",
      selector: row => row.link,
      sortable: true,
    },
    {
      name: "Is Active",
      selector: row => row.is_active === 1 ? "Active" : "Inactive",
      sortable: true,
    },
    {
      name: "Status",
      cell: row => (
        <div className="form-check form-switch">
          <input
            className="form-check-input"
            type="checkbox"
            id={`status-${row.feature_id}`}
            checked={row.is_active === 1}
            onChange={() => handleStatusToggle(row)}
          />
          <label className="form-check-label" htmlFor={`status-${row.feature_id}`}>
            {row.is_active === 1 ? 'Active' : 'Inactive'}
          </label>
        </div>
      ),
      sortable: true,
    },
    {
      name: "Action",
      cell: (row) => (
        <>
          <button className="btn btn-success me-1" onClick={() => handleEdit(row)}>
            <FaEdit />
          </button>
        </>
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
    },
  ];

  const handleEdit = (data) => {
    setEditId(data.feature_id);
    handleShow();
    setValues({
      name: data.feature_name.replace("-- ", ""), // Remove child prefix
      is_active: data.is_active,
    });
  };

  const onHandleSubmit = async (e) => {
    e.preventDefault();
    const { name, is_active } = values;
    const data = {
      name,
      is_active,
      role_id: editId,
    };

    if (editId === null) {
      await dispatch(createAdminROle(data));
    } else {
      await dispatch(updateAdminRole(data));
    }
    await dispatch(fetchAdminListFuture());
    setValues(initialState);
    handleClose();
  };

  // Conditional row styling for parent rows
  const conditionalRowStyles = [
    {
      when: row => row.parent === true,  // Applies to parent rows
      style: {
        backgroundColor: '#f0f0f0',  // Gray background for parent rows
        fontWeight: 'bold',  // Bold text
      },
    },
  ];

  return (
    <>
      <div className="container-fluid my-5">
        <div className="row mb-4 me-2">
          <div className="d-flex justify-content-between">
            <h2>Total Admin Feature List - {adminFeatureRoleList?.length}</h2>
            <button className='btn btn-primary' onClick={handleShow}>
              Create Feature Role
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
            conditionalRowStyles={conditionalRowStyles}  // Add the conditionalRowStyles prop
          />
        </div>
      </div>

      <Modal centered show={show} onHide={handleClose}>
        <form onSubmit={onHandleSubmit}>
          <Modal.Header closeButton>
            <Modal.Title>{editId ? 'Edit Feature' : 'Create Feature'}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="row">
              <div className='col-12'>
                <label htmlFor="name" className="form-label"><b>Name</b></label>
                <input type="text" className="form-control" name="name" required onChange={handleChange} value={values.name} />
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" type="submit">
              {isLoading ? 'Loading...' : 'Save Changes'}
            </Button>
          </Modal.Footer>
        </form>
      </Modal>
    </>
  );
};

export default AdminListFeatures;
