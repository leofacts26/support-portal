import toast from 'react-hot-toast';
import { api, BASE_URL } from '../api/apiConfig';
import { datavalidationerror, successToast } from '../utils';
import { setIsLoading } from '../features/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import { fetchOccasionList } from '../features/catering/occasionSlice';

const useUploadOccasionPhotoos = () => {
    const dispatch = useDispatch()
    const { occasionId } = useSelector((state) => state.occasion)
    const { token } = useSelector((state) => state.authSlice);


    const onUploadOccasionImage = async (event) => {
        const formData = new FormData();
        formData.append('id', occasionId);
        formData.append('image', event.target.files[0]);
        formData.append('table', 'occasions')

        dispatch(setIsLoading(true))
        try {
            toast.loading('Uploading Images...');
            const response = await api.post(`${BASE_URL}/admin-upload-occasion`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${token}`,
                },
            });
            dispatch(fetchOccasionList());
            toast.success(successToast(response))
        } catch (error) {
            console.log(error);
            toast.error(datavalidationerror(error))
        } finally {
            dispatch(setIsLoading(false))
            toast.dismiss();
        }
    }

    return {
        onUploadOccasionImage
    }
}

export default useUploadOccasionPhotoos