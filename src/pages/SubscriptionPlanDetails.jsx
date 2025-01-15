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

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };



const SubscriptionPlanDetails = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { subscribeData, discoundedData, couponCode, selectedSubscription, calculaterOrderData } = useSelector((state) => state.subscription);
  const [loading, setLoading] = useState(false);
  const [recurringPayments, setRecurringPayments] = useState(true);
  const { vendorId, subscriptionTypeId } = useParams();

  // console.log(subscribeData, "subscribeData");
  // console.log(discoundedData, "discoundedData");
  // console.log(recurringPayments, "recurringPayments");
  
  // console.log(calculaterOrderData, "calculaterOrderDatacalculaterOrderData");


  useEffect(() => {
    if (discoundedData?.is_one_recurring_subscription_already_present === true) {
      setRecurringPayments(discoundedData?.is_one_recurring_subscription_already_present)
    }
  }, [discoundedData?.is_one_recurring_subscription_already_present])


  useEffect(() => {
    if (discoundedData === null) {
      navigate(`/dashboard/subscription-plan/${vendorId}`);
    }
  }, [discoundedData])

  // loadScript 
  // function loadScript(src) {
  //   return new Promise((resolve) => {
  //     const script = document.createElement("script");
  //     script.src = src;
  //     script.onload = () => {
  //       resolve(true);
  //     };
  //     script.onerror = () => {
  //       resolve(false);
  //     };
  //     document.body.appendChild(script);
  //   });
  // }

  const onCouponCodeSubmit = async (e) => {
    e.preventDefault()
    await dispatch(setCouponCode(couponCode));
    const subscriptionDuration = discoundedData?.subType.toLowerCase();
    const newItem = {
      ...subscribeData,
      subscriptionDuration
    }
    const response = await dispatch(calculateOrderTotal(newItem));
    if (response.payload.status === "success") {
      await dispatch(setDiscountedData(response?.payload));
    }
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
      alert(`token:- ${response.payload.token}`)
      console.log(response, "data");
      setLoading(false)
    } catch (error) {
      console.log(error);
    }
  }

  // displayRazorpay 
  // async function displayRazorpay() {
  //   setLoading(true);

  //   if (discoundedData?.is_one_recurring_subscription_already_present === false && discoundedData?.is_recurring_subscription_pending_for_authentication) {
  //     toast.error("Subscription Payment is Pending, After Success you can proceed with OneTime Payment")
  //     setLoading(false)
  //     navigate('/dashboard/subscription')
  //     return;
  //   }


  //   const res = await loadScript(
  //     "https://checkout.razorpay.com/v1/checkout.js"
  //   );

  //   if (!res) {
  //     alert("Razorpay SDK failed to load. Are you online?");
  //     setLoading(false);
  //     return;
  //   }

  //   const { plans = [] } = subscribeData || {};

  //   const planIndex = discoundedData?.subType?.toLowerCase() === 'monthly' ? 1 : 0;

  //   const recurringMonthlydata = {
  //     vendorId: vendorId,
  //     subscription_type_id: plans[planIndex]?.subscriptionTypeId || null,
  //     subscription_duration: plans[planIndex]?.durations?.[0] || null,
  //     plan_id: plans[planIndex]?.id || null,
  //   };

  //   let result;

  //   if (recurringPayments && discoundedData?.is_one_recurring_subscription_already_present === false) {
  //     result = await dispatch(createRecurringTimePayment(recurringMonthlydata));
  //   } else {
  //     result = await dispatch(createOneTimePayment());
  //   }


  //   if (!result || result.payload.error || result.payload.status === "failure") {
  //     toast.error("Server error: " + (result.payload?.error?.message || result.payload.message || "Unknown error occurred."));
  //     setLoading(false);
  //     return;
  //   }

  //   let options;

  //   if (discoundedData?.is_one_recurring_subscription_already_present === false && recurringPayments) {
  //     const {
  //       id: subscriptionId,
  //       plan_id,
  //       customer_id,
  //       short_url,
  //       total_count,
  //       start_at,
  //       end_at
  //     } = result.payload;


  //     options = {
  //       key: "rzp_test_2M5D9mQwHZp8iP",
  //       subscription_id: subscriptionId,
  //       amount: discoundedData.finalAmount,
  //       currency: "INR",
  //       name: "Caterings And Tiffins",
  //       description: "Subscription Payment",
  //       image: "/img/catering-service-logo.png",
  //       handler: async function (response) {
  //         // console.log(response, "recurring response");
  //         const data = {
  //           subscriptionId,
  //           razorpayPaymentId: response.razorpay_payment_id,
  //           razorpayOrderId: response.razorpay_order_id,
  //           razorpaySignature: response.razorpay_signature,
  //         };
  //         await dispatch(setCouponCode(""));
  //         navigate('/dashboard/subscription');
  //       },
  //       prefill: {
  //         name: "Caterings And Tiffins",
  //         email: "cateringsandtiffin@example.com",
  //         contact: "9879879879",
  //       },
  //       notes: {
  //         address: "Caterings And Tiffins Corporate Office",
  //         subscriptionId: subscriptionId,
  //         short_url: short_url
  //       },
  //       options: {
  //         label: "Pay Now",
  //         image: "/img/catering-service-logo.png"
  //       },
  //       theme: {
  //         color: "#a81e1e",
  //       },
  //     };
  //   } else {
  //     const { amount, id, currency } = result?.payload?.data?.order;
  //     options = {
  //       key: "rzp_test_2M5D9mQwHZp8iP",
  //       amount: amount.toString(),
  //       currency: currency,
  //       name: "Caterings And Tiffins",
  //       description: "One Time Payment",
  //       order_id: id,
  //       handler: async function (response) {
  //         const data = {
  //           orderCreationId: id,
  //           razorpayPaymentId: response.razorpay_payment_id,
  //           razorpayOrderId: response.razorpay_order_id,
  //           razorpaySignature: response.razorpay_signature,
  //         };
  //         await dispatch(setCouponCode(""));
  //         navigate('/dashboard/subscription');
  //       },
  //       prefill: {
  //         name: "Caterings And Tiffins",
  //         email: "cateringsandtiffin@example.com",
  //         contact: "9879879879",
  //       },
  //       notes: {
  //         address: "Caterings And Tiffins Corporate Office",
  //       },
  //       theme: {
  //         color: "#a81e1e",
  //       },
  //     };
  //   }

  //   const paymentObject = new window.Razorpay(options);
  //   paymentObject.open();

  //   setLoading(false);
  // }



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
                        <form className="search-wrapper cf mt-3" onSubmit={onCouponCodeSubmit}>
                          <input
                            name="couponCode" value={couponCode} onChange={(e) => dispatch(setCouponCode(e.target.value))}
                            type="text" placeholder="Enter Coupon Code" required style={{ boxShadow: 'none' }} />
                          <button type="submit">Apply</button>
                        </form>

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
                        <p className="sub-text">Coupon Code:</p> <p className="sub-text"> {discoundedData?.couponCode ? discoundedData?.couponCode : 'N/A'} </p>
                      </Stack>
                      <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={2} className="mb-3 mt-2">
                        <p className="sub-text">Discount Percent:</p> <p className="sub-text"> {discoundedData?.discountPercent ? discoundedData?.discountPercent : 'N/A'}</p>
                      </Stack>

                      <hr />

                      <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={2} className="mb-1 mt-3">
                        <p className="sub-text">Sub Amount:</p> <p className="sub-text"> {discoundedData?.subAmount ? discoundedData?.subAmount : 'N/A'} </p>
                      </Stack>
                      <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={2} className="mb-1 mt-2">
                        <p className="sub-text">Discount Amount:</p> <p className="sub-text"> {discoundedData?.discountAmount ? discoundedData?.discountAmount : 'N/A'}</p>
                      </Stack>
                      <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={2} className="mb-3 mt-2">
                        <p className="sub-text">Final Amount:</p>
                        <Stack direction="row" alignItems="center">
                          <CurrencyRupeeIcon className="text-success mt-1" style={{ fontSize: '14px' }} />
                          <p className="sub-text m-0">{discoundedData?.finalAmount ? discoundedData?.finalAmount : 'N/A'}</p>
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
                            <Checkbox
                              disabled={discoundedData?.is_one_recurring_subscription_already_present}
                              size="small" {...label}
                              checked={recurringPayments}
                              onChange={(e) => setRecurringPayments(e.target.checked)}
                              className={recurringPayments ? 'checkbox-enabled' : 'checkbox-disabled'}
                            />
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
                  > {loading ? 'Loading...' : 'Creare Link'} </Button>
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