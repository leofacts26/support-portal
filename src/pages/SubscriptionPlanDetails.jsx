import { useDispatch, useSelector } from "react-redux";
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import TopHeader from '../components/common/TopHeader';
import Container from "@mui/material/Container";
import { calculateOrderTotal, createOneTimePayment, createQuickPayment, createRecurringTimePayment, setCouponCode, setDiscountedData } from "../features/subscriptionSlice";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import { Checkbox } from "@mui/material";
import moment from 'moment';
import CloseIcon from '@mui/icons-material/Close'

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };



const SubscriptionPlanDetails = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { subscribeData, discoundedData, couponCode, selectedSubscription, calculaterOrderData } = useSelector((state) => state.subscription);
  const [loading, setLoading] = useState(false);
  // const [recurringPayments, setRecurringPayments] = useState(true);  make recurringPayments true, uncomment below useeffect
  const [recurringPayments, setRecurringPayments] = useState(false);
  const { vendorId, subscriptionTypeId } = useParams();


  // useEffect(() => {
  //   if (discoundedData?.is_one_recurring_subscription_already_present === true) {
  //     setRecurringPayments(discoundedData?.is_one_recurring_subscription_already_present)
  //   }
  // }, [discoundedData?.is_one_recurring_subscription_already_present])

  // console.log(discoundedData, "discoundedData in SubscriptionPlanDetails");


  useEffect(() => {
    if (discoundedData === null) {
      navigate(`/dashboard/subscription-plan/${vendorId}`);
    }
  }, [discoundedData])



  const onCouponCodeSubmit = async (e) => {
    e.preventDefault()
    await dispatch(setCouponCode(couponCode));
    const subscriptionDuration = discoundedData?.subType.toLowerCase();
    const newItem = {
      ...subscribeData,
      vendorId,
      subscriptionDuration
    }
    const response = await dispatch(calculateOrderTotal(newItem));
    if (response.payload.status === "success") {
      await dispatch(setDiscountedData(response?.payload));
    }
  }

  const onHandleClearCouponCode = async () => {
    await dispatch(setCouponCode(""));
    const subscriptionDuration = discoundedData?.subType.toLowerCase();
    const newItem = {
      ...subscribeData,
      vendorId,
      subscriptionDuration
    }
    const response = await dispatch(calculateOrderTotal(newItem));
    if (response.payload.status === "success") {
      await dispatch(setDiscountedData(response?.payload));
    }
    dispatch(setCouponCode(''))
  }



  const displayRazorpay = async () => {
    setLoading(true)
    // Extract startDate and expiryDate from calculaterOrderData
    const rawStartDate = calculaterOrderData?.startDate;
    const rawEndDate = calculaterOrderData?.expiryDate;

    // Format the dates to YYYY-MM-DD using moment
    const startDate = rawStartDate ? moment(rawStartDate).format("YYYY-MM-DD") : "";
    const endDate = rawEndDate ? moment(rawEndDate).format("YYYY-MM-DD") : "";

    const data = {
      vendorId,
      subscriptionTypeId,
      subscriptionDuration: calculaterOrderData?.subType,
      startDate,
      endDate,
      couponCode: couponCode,
    }
    try {
      const response = await dispatch(createQuickPayment(data))
      // alert(`token:- ${response.payload.token}`)
      toast.success(response?.payload?.message);
      navigate(`/dashboard/subscription/${vendorId}`);
      setLoading(false)
    } catch (error) {
      console.log(error);
    }
  }



  return (
    <>
      <TopHeader
        title="Subscription Profile Details"
        description="Below is a Subscription Profile Details"
      />

      <Container maxWidth="lg">
        <div className="card-box-shadow px-5 py-4 mb-4">
          <p className="sub-plan-title text-center">SELECTED SUBSCRIPTION PLAN</p>
          <Grid container spacing={2} sx={{ display: 'flex', justifyContent: "center" }}>
            <Grid item xs={12} sm={8} md={6} lg={4.5} xl={4.5} className='mb-3 mt-5' style={{ display: 'flex', justifyContent: 'center', padding: '0px 5px' }}>
              <Stack className="subscription-plans-shadow" sx={{ display: 'flex', justifyContent: "center" }}>
                <div className="sub-box-violet sub-plan-det-card">
                  <div className={`sub-box-violet-title`} style={{ backgroundColor: `${calculaterOrderData.display_color}` }}>
                    <h3 className="sub-box-name"> <span style={{ textTransform: 'capitalize' }}>{discoundedData?.subPlan}</span> Caterer</h3>
                  </div>
                  <div className="sub-body px-2 pt-2">
                    <div className="mb-3 mt-3">
                      <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={2} className="mb-1 mt-3">
                        <p className="sub-text">Subscription Plan:</p> <p className="sub-text"> {discoundedData?.subPlan ? discoundedData?.subPlan : 'N/A'} Caterer</p>
                      </Stack>
                      <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={2} className="mb-3 mt-1">
                        <p className="sub-text">Subscription Type:</p> <p className="sub-text"> {discoundedData?.subType ? discoundedData?.subType : 'N/A'} /
                          {recurringPayments ? 'Subscription' : 'One Time'} </p>
                      </Stack>

                      <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={2} className="mb-1 mt-4">
                        <p className="sub-text">Start Date:</p>
                        <p className="sub-text">
                          {discoundedData?.startDate ? moment(discoundedData.startDate).format('MMMM DD, YYYY') : 'N/A'}
                        </p>
                      </Stack>
                      <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={2} className="mb-3 mt-2">
                        <p className="sub-text">Expiry Date:</p>
                        <p className="sub-text">
                          {discoundedData?.expiryDate ? moment(discoundedData.expiryDate).format('MMMM DD, YYYY') : 'N/A'}
                        </p>
                      </Stack>

                      <hr />


                      {recurringPayments === false && <>
                        <Stack direction="row" justifyContent="start">
                          {discoundedData?.subType.toLowerCase() === "monthly" ? (
                            <p
                              className={`coupon-small ms-2 mt-3 me-2 text-gray`}
                            >
                              'Use "CNT100" to claim free subscription for 3 months'
                            </p>
                          ) : (
                            <p
                              className={`coupon-small ms-2 mt-3 me-2 text-gray`}
                            >
                            </p>
                          )
                          }
                        </Stack>
                        <div className="search-wrapper cf mt-1" style={{ position: 'relative' }}>
                          <form onSubmit={onCouponCodeSubmit} style={{ display: 'flex', width: '100%' }}>
                            <input
                              name="couponCode" value={couponCode} onChange={(e) => dispatch(setCouponCode(e.target.value))}
                              type="text" placeholder="Enter Coupon Code" required
                              style={{
                                boxShadow: 'none',
                                paddingLeft: '20px',
                                paddingRight: couponCode ? '35px' : '20px',
                                flex: 1,
                              }} />

                            {couponCode && (
                              <CloseIcon
                                onClick={onHandleClearCouponCode}
                                fontSize="small"
                                style={{
                                  position: 'absolute',
                                  right: '118px', // adjust according to button position
                                  top: '50%',
                                  transform: 'translateY(-50%)',
                                  cursor: 'pointer',
                                  color: '#888',
                                }}
                              />
                            )}

                            <button type="submit">Apply</button>
                          </form>
                        </div>

                        <Stack direction="row" justifyContent="end">
                          <p
                            className={`coupon-small mb-4 ms-2 mt-2 me-2 ${discoundedData?.couponStatus === 'Applied'
                              ? 'text-success'
                              : discoundedData?.couponStatus === 'Invalid or Expired' || discoundedData?.couponStatus === 'Expired'
                                ? 'text-danger'
                                : 'text-gray'
                              }`}
                          >
                            {discoundedData?.couponStatus ? `Coupon ${discoundedData?.couponStatus}` : null}
                          </p>
                        </Stack>
                      </>}



                      <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={2} className="mb-1 mt-3">
                        <p className="sub-text">Coupon Code:</p> <p className="sub-text"> {discoundedData?.couponDetails?.code ? discoundedData?.couponDetails?.code : 'N/A'} </p>
                      </Stack>
                      <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={2} className="mb-3 mt-2">
                        <p className="sub-text">Discount Percent:</p> <p className="sub-text"> {discoundedData?.couponDetails?.discountPercent ? discoundedData?.couponDetails?.discountPercent : 'N/A'}</p>
                      </Stack>

                      <hr />

                      <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={2} className="mb-1 mt-3">
                        <p className="sub-text">Sub Amount:</p> <p className="sub-text"> {discoundedData?.subAmount ? discoundedData?.subAmount : 'N/A'} </p>
                      </Stack>
                      {recurringPayments === false && <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={2} className="mb-1 mt-2">
                        <p className="sub-text">Discount Amount:</p> <p className="sub-text"> {discoundedData?.discountAmount ? discoundedData?.discountAmount : 'N/A'}</p>
                      </Stack>}

                      <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={2} className="mb-3 mt-2">
                        <p className="sub-text">Final Amount:</p>
                        <Stack direction="row" alignItems="center">
                          <CurrencyRupeeIcon className="text-success mt-1" style={{ fontSize: '14px' }} />
                          <p className="sub-text  mb-0">{discoundedData?.finalAmount ?? 'N/A'}</p>
                        </Stack>
                      </Stack>

                      <hr />

                      <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={2} className="mb-1 mt-3">
                        <p className="sub-text">Payment Terms:</p>
                        <Stack direction="column">
                          <div className="coupon-flex">
                            <span className='coupon-text'>
                              {recurringPayments ? 'Monthly Recurring Activated' : 'One time Payment Enabled'}
                            </span>
                            {/* <Checkbox
                              disabled={discoundedData?.is_one_recurring_subscription_already_present}
                              size="small" {...label}
                              checked={recurringPayments}
                              onChange={(e) => setRecurringPayments(e.target.checked)}
                              className={recurringPayments ? 'checkbox-enabled' : 'checkbox-disabled'}
                            /> */}
                          </div>
                          <p className="due-date"> {discoundedData?.paymentTerms ? discoundedData?.paymentTerms : 'N/A'}</p>
                        </Stack>
                      </Stack>

                    </div>
                  </div>
                </div>
                <div className="">
                  <Button disabled={loading} variant="contained" className={`sub-plan-btn mx-auto taxt-center `}
                    onClick={displayRazorpay}
                  > {loading ? 'Loading...' : 'Create Link'} </Button>
                  <br />
                </div>
              </Stack>
            </Grid>
          </Grid>

        </div>
      </Container>
    </>

  )
}


export default SubscriptionPlanDetails