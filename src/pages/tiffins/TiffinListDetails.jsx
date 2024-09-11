import { useDispatch } from "react-redux"
import { fetchCateringVendorDetails } from "../../features/catering/cateringSlice"
import { useEffect } from "react"
import { useLocation, useParams } from "react-router-dom"

const TiffinListDetails = () => {

  const dispatch = useDispatch()
  const location = useLocation();
  const { id } = useParams();

  useEffect(() => {
    dispatch(fetchCateringVendorDetails(id));
  }, [id]);



  return (
    <div>TiffinListDetails</div>
  )
}
export default TiffinListDetails