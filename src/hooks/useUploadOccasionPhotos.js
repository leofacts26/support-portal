import React from 'react'
import toast from 'react-hot-toast';
import { api, BASE_URL } from '../api/apiConfig';
import { datavalidationerror, successToast } from '../utils';
import { setIsLoading } from '../features/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCateringCuisines } from '../features/catering/cateringSlice';
import { fetchOccasionList } from '../features/catering/occasionSlice';
// import { fetchexplorecitiesData } from '../features/homepage/homeSlice';

const useUploadOccasionPhotoos = () => {
    const dispatch = useDispatch()
    const { occasionId } = useSelector((state) => state.occasion)
    console.log(occasionId, "occasionId occasionId occasionId occasionId occasionId");
    

    // const onUploadParentCuisine = async (event) => {
    //     const formData = new FormData();
    //     formData.append('id', occasionId);
    //     formData.append('image', event.target.files[0]);
    //     formData.append('table', 'cuisines')

    //     dispatch(setIsLoading(true))
    //     try {
    //         toast.loading('Uploading Image...');
    //         const response = await api.post(`${BASE_URL}/admin-upload-cuisine`, formData, {
    //             headers: {
    //                 'Content-Type': 'multipart/form-data',
    //                 // Authorization: `Bearer ${accessToken}`,
    //             },
    //         });
    //         dispatch(fetchCateringCuisines());
    //         toast.success(successToast(response))
    //     } catch (error) {
    //         console.log(error);
    //         toast.error(datavalidationerror(error))
    //     } finally {
    //         dispatch(setIsLoading(false))
    //         toast.dismiss();
    //     }
    // }

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
                    // Authorization: `Bearer ${accessToken}`,
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
        // onUploadParentCuisine,
        onUploadOccasionImage
    }
}

export default useUploadOccasionPhotoos