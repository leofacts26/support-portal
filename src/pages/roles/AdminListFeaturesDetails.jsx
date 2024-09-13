import React, { useEffect, useState } from 'react'
import DataTable from 'react-data-table-component';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useDispatch, useSelector } from 'react-redux';
import GlobalSearch from '../../components/common/GlobalSearch';
import { tableCustomStyles } from '../../components/tableCustomStyles';
import { FaEdit } from "react-icons/fa";
import { adminListFeaturesForRoles } from '../../features/adminRoleSlice';
import { useParams } from 'react-router-dom';



const AdminListFeaturesDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch()
  const { adminFeaturesForRolesList, isLoading } = useSelector((state) => state.roleSlice)

  useEffect(() => {
    dispatch(adminListFeaturesForRoles(id))
  }, [id])


  return (
    <>
      <div className="container-fluid my-5">

        <div className="row mb-4 me-2">
          <div className="d-flex justify-content-between">
            <h2>Total Admin Role List - {adminFeaturesForRolesList?.length} </h2>
          </div>
        </div>


        <div className="row">
          <table class="table">
            <thead>
              <tr>
                <th scope="col">feature_name</th>
                <th scope="col">link</th>
                <th scope="col">parent_name</th>
                <th scope="col">Updated At</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {
                adminFeaturesForRolesList.length > 0 && adminFeaturesForRolesList.map((item) => {
                  return (
                    <tr>
                      <th scope="row">{item?.feature_name}</th>
                      <td>{item?.link}</td>
                      <td>{item?.parent_name ? item?.parent_name : 'N/A'}</td>
                      <td>{item?.updated_at?.slice(0, 10)}</td>
                      <td>
                        <button className="btn btn-success me-1" >
                          Associate
                        </button>
                      </td>
                    </tr>
                  )
                })
              }

            </tbody>
          </table>
        </div>


      </div>

      <br />
    </>
  )
}

export default AdminListFeaturesDetails