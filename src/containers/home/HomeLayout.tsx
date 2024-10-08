import {
  Container,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  Heading,
  TabProps,
  Box,
  Grid,
} from "@chakra-ui/react";
import React, { useState } from "react";
import InterviewSettingsForm from "./InterviewSettingsForm";
import JobDetailsForm from "./JobDetailsForm";
import RequisitionForm from "./RequisitionDetailsForm";
import DisplayCard from "./PreviewCard";
import { useData } from "./DataProvider";

const CustomTab: React.FC<TabProps & { isDisabled?: boolean }> = ({isDisabled, children, ...props }) => {
  return (
    <Tab p="1rem" fontFamily="Poppins" {...props} onClick={(e) => {}}>
      {children}
    </Tab>
  );
};

const HomeLayout = () => {
  const {state} = useData();
  const [tabIndex, setTabIndex] = useState(0);

  const handleNext = () => {
    setTabIndex((prevIndex) => prevIndex + 1);
  };

  const handlePrev = () => {
    setTabIndex((prevIndex) => prevIndex - 1);
  };
  const requisitionTab = state.completedFormTabs.requisitionDetails
  const jobDetailsTab = state.completedFormTabs.jobDetails
  return (
    <Box w="100%">
      <Container maxW="1200px">
        <Heading fontFamily="Poppins" fontSize="1.5rem" my="2rem">
          Create Candidate Requisition
        </Heading>
        <Tabs isLazy index={tabIndex} onChange={(index) => {
            if (
              (index === 1 && requisitionTab) || 
              (index === 2 && jobDetailsTab) || 
              index <= tabIndex
            ) {
              setTabIndex(index);
            }
          }}>
          <TabList>
            <CustomTab >Requistion Details</CustomTab>
            <CustomTab isDisabled={!requisitionTab}>Job Details</CustomTab>
            <CustomTab isDisabled={!jobDetailsTab}>Interview Settings</CustomTab>
          </TabList>
          <Grid display="grid" gridTemplateColumns="3fr 2fr" gap="24px">
            <TabPanels>
              <TabPanel>
                <RequisitionForm onNext={handleNext}/>
              </TabPanel>
              <TabPanel>
                <JobDetailsForm onPrev={handlePrev} onNext={handleNext}/>
              </TabPanel>
              <TabPanel>
                <InterviewSettingsForm onPrev={handlePrev} />
              </TabPanel>
            </TabPanels>
            <DisplayCard />
          </Grid>
        </Tabs>
      </Container>
    </Box>
  );
};

export default HomeLayout;
