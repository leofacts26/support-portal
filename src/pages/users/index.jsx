import React, { useState } from 'react'
import DataTable from 'react-data-table-component';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';


const rows = [
  {
    sNO: 1,
    name: "Mumbai",
    phoneNo: 9874684684,
    DateTime: "02/15/2024",
    EmailID: "test@gmail.com",
  }
];

const Users = () => {
  const [data, setData] = useState(rows);

  const handleSearch = (e) => {
    const searchValue = e.target.value.toLowerCase();
    const newRows = rows.filter((row) => {
      return (
        row.sNO.toString().toLowerCase().includes(searchValue) ||
        row.fullName.toLowerCase().includes(searchValue)
      );
    });
    setData(newRows);
  };

  const columns = [
    {
      name: "S.NO",
      selector: row => row.sNO,
      sortable: true,
    },
    {
      name: "Name",
      selector: row => row.name,
      sortable: true,
    },
    {
      name: "Phone No",
      selector: row => row.phoneNo,
      sortable: true,
    },
    {
      name: "Date Time",
      selector: row => row.DateTime,
      sortable: true,
    },
    {
      name: "Email ID",
      selector: row => row.EmailID,
      sortable: true,
    }
  ];

  const handleEdit = (event) => {
    console.log(event, "event");
  }
  const handleDelete = (event) => {
    console.log(event, "event");
  }

  return (
    <>
      <div className="container my-5">

        <h4>Total Registered Users - 12500</h4>
        <hr />
        <div className="card">
          <input
            type="search"
            className="form-control-sm border ps-3 py-3"
            placeholder="Search"
            onChange={handleSearch}
          />
          <DataTable
            columns={columns}
            data={data}
            fixedHeader
            pagination
            selectableRows
          // title="React-Data-Table-Component Tutorial."
          />
        </div>
      </div>

      <br />


    </>
  )
}

export default Users