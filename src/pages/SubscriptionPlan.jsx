import TopHeader from '../components/common/TopHeader';
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import { useState } from "react";
import CustomTabs from '../components/CustomTabs';
import YearlyPlan from '../components/common/YearlyPlan';
import MonthlyPlan from '../components/common/MonthlyPlan';



const SubscriptionPlan = () => {

  const [activeTab, setActiveTab] = useState(0);

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  return (
    <>
      {/* <TopHeader
        title="Business Profile"
        description="below is a business overview"
      /> */}
      <Container maxWidth="lg" className='mt-5'>
        <div className="card-box-shadow px-5 py-4 mb-4">
          <p className="sub-plan-title text-center">SUBSCRIPTION PLANS</p>
          <p className="branches-desc text-center">
            Choose your subscription types
          </p>
          <Stack
            direction="row"
            justifyContent="center"
            alignItems="center"
            spacing={2}
            className="mt-3 mb-4"
          >
            <CustomTabs activeTab={activeTab} setActiveTab={setActiveTab} handleTabChange={handleTabChange} />
          </Stack>
          <br />
          <div className="mt-4">
            {activeTab === 0 && <MonthlyPlan />}
            {activeTab === 1 && <YearlyPlan />}
          </div>

        </div>
      </Container>
    </>
  );
};

export default SubscriptionPlan;
