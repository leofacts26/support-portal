import React from 'react'
import toast from 'react-hot-toast';
import { api, BASE_URL } from '../api/apiConfig';
import { datavalidationerror, successToast } from '../utils';
import { setIsLoading } from '../features/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCateringCuisines } from '../features/catering/cateringSlice';
import { fetchexplorecitiesData } from '../features/homepage/homeSlice';

const useUploadCusinePhotoos = () => {
    const dispatch = useDispatch()
    const { cuisineId } = useSelector((state) => state.users)

    const onUploadParentCuisine = async (event) => {
        const formData = new FormData();
        formData.append('id', cuisineId);
        formData.append('image', event.target.files[0]);
        formData.append('table', 'cuisines')

        dispatch(setIsLoading(true))
        try {
            toast.loading('Uploading Image...');
            const response = await api.post(`${BASE_URL}/admin-upload-cuisine`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    // Authorization: `Bearer ${accessToken}`,
                },
            });
            dispatch(fetchCateringCuisines());
            toast.success(successToast(response))
        } catch (error) {
            console.log(error);
            toast.error(datavalidationerror(error))
        } finally {
            dispatch(setIsLoading(false))
            toast.dismiss();
        }
    }

    const onUploadCityImage = async (event) => {
        const formData = new FormData();
        formData.append('id', cuisineId);
        formData.append('image', event.target.files[0]);
        formData.append('table', 'explore_cities')

        dispatch(setIsLoading(true))
        try {
            toast.loading('Uploading Image...');
            const response = await api.post(`${BASE_URL}/admin-upload-explore-city`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    // Authorization: `Bearer ${accessToken}`,
                },
            });
            dispatch(fetchexplorecitiesData());
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
        onUploadParentCuisine,
        onUploadCityImage
    }
}

export default useUploadCusinePhotoos