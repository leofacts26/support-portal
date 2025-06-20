
import { useEffect, useState } from "react";
import Modal from 'react-bootstrap/Modal';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Stack from '@mui/material/Stack';
import Checkbox from '@mui/material/Checkbox';
import { api, BASE_URL } from "../../api/apiConfig";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { fetchVendorShowDetailData } from "../../features/menuSlice";


const label = { inputProps: { 'aria-label': 'Checkbox demo' } };


const Occations = ({ occasions, showOccation, handleOccationClose, handleOccationShow, searchTerm, companyId }) => {
  const { token } = useSelector((state) => state.authSlice);
  const [occasionsList, setOccasionsList] = useState(occasions)
  const [isLoading, setIsLoading] = useState(false)
  // const [open, setOpen] = useState(false);
  const dispatch = useDispatch()

  console.log(occasionsList, "occasionsListoccasionsListoccasionsList");


  const handleSelectChange = async (item) => {
    const updatedOccasions = occasionsList?.map((occasion) => {
      if (occasion?.id === item?.id) {
        return { ...occasion, selected: item?.selected === "1" ? "0" : "1" };
      } else {
        return occasion;
      }
    })
    setOccasionsList(updatedOccasions);
    return updatedOccasions
  }




  const handleOccasionSubmit = async (event) => {
    event.preventDefault()
    setIsLoading(true)
    const updatedOccasions = await handleSelectChange();

    const occasionsData = updatedOccasions?.map((updatedOccasion) => {
      return {
        occasion_id: parseInt(updatedOccasion?.id),
        selected: parseInt(updatedOccasion?.selected)
      }
    })

    const data = {
      occasions: JSON.stringify(occasionsData),
      company_id: searchTerm || companyId,
    }

    console.log(data, "datadatadata");
    await api.post(`${BASE_URL}/support-update-vendor-occasion`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    })
    toast.success("Occasions Updated Successfully...")
    setIsLoading(false)
    handleOccationClose()
    dispatch(fetchVendorShowDetailData(searchTerm || companyId));
  }


  return (
    <>
      <div className="row mx-2">
        <div className="bg-secondary text-white py-3 d-flex justify-content-between">
          <h3 className='mb-0'>Occasions You Cater</h3>
          <h3 className='mb-0 text-warning' style={{ cursor: 'pointer' }} onClick={handleOccationShow}>Edit</h3>
        </div>

        <div className="row mt-4">
          <div className='mt-3'>
            {occasions && occasions.length > 0 ? occasions
              .filter((item) => item.selected === '1')
              .map((item, index, filteredOccasions) => (
                <span key={item.occasion_name} className='cuisine-item'>
                  {item.occasion_name}
                  {index < filteredOccasions.length - 1 && ', '}
                </span>
              ))
              : 'N/A'}
            {!occasions.some((item) =>
              item.selected === "1")
              && <h2 className="text-center">No Occasions Found</h2>}
          </div>
        </div>

      </div >
      <hr />




      <Modal
        show={showOccation}
        onHide={handleOccationClose}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        {/* <Modal.Header closeButton>
          <Modal.Title>Update Occation</Modal.Title>
        </Modal.Header> */}
        <Modal.Body>
          <form onSubmit={handleOccasionSubmit} >
            <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
              <h2 className='cusines-modal-title'>Select Occasions from below</h2>
            </DialogTitle>
            <IconButton
              aria-label="close"
              onClick={handleOccationClose}
              sx={{
                position: 'absolute',
                right: 8,
                top: 8,
                color: (theme) => theme.palette.grey[500],
              }}
            >
              <CloseIcon />
            </IconButton>
            <DialogContent dividers style={{ height: '70vh' }}>

              {occasionsList?.length >= 0 && occasionsList?.map((occasion) => (
                <div className='card-box-shadow px-1 py-1 mb-3' key={occasion?.id}>
                  <Stack direction="row" justifyContent="space-between" >
                    <Stack direction="row" alignItems="center" spacing={1}>
                      <p className='occasions-modal-desc ps-2'>{occasion?.occasion_name}</p>
                    </Stack>
                    <div>
                      <Checkbox {...label} size="small" checked={occasion?.selected === "1"} onChange={() => handleSelectChange(occasion)} />
                    </div>
                  </Stack>
                </div>
              ))}

            </DialogContent>
            <DialogActions style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', position: 'absolute', bottom: 0 }}>
              <Button variant="contained" className="inquiries-btn" type="submit" onClick={handleOccationShow}>
                {isLoading ? 'Loading...' : '+ Update Occasions'} </Button>
            </DialogActions>
          </form>
        </Modal.Body>
      </Modal>


    </>
  )
}
export default Occations