import { Button, Flex, Box } from "@chakra-ui/react";
import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";

import FormInput from "../../components/formComponents/FormInput";
import { IJobDetails } from "../../interface/forms";
import { useData } from "./DataProvider";

interface IJobDetailsProps{
  onNext:()=>void;
  onPrev:()=>void;
}

const JobDetailsForm: React.FC<IJobDetailsProps> = ({onNext,onPrev}) => {
  const {state,setState} = useData();
  const { errors, touched, handleBlur,setFieldValue, handleSubmit, values } =
    useFormik<IJobDetails>({
      initialValues:state.jobDetails,
      validationSchema: Yup.object().shape({
        jobTitle: Yup.string().required("Job Title is required"),
        jobDetails: Yup.string().required("Job Details is required"),
        jobLocation: Yup.string().required("Job Location is required"),
      }),
      onSubmit: (values) => {
        setState(prevState => ({
          ...prevState,
          jobDetails: values
        }));
        onNext();
      },
    });
  const handleFieldChange = (name: string, value: any) => {
    setFieldValue(name, value);
    setState(prevState => ({
      ...prevState,
      jobDetails: { ...values, [name]: value }
    }));
  };
  return (
    <Box width="100%" as="form" onSubmit={handleSubmit as any}>
      <Box width="100%">
        <FormInput
          label="Job Title"
          placeholder="Enter job title"
          name="jobTitle"
          onChange={(e) => handleFieldChange(e.target.name, e.target.value)}
          onBlur={handleBlur}
          value={values?.jobTitle}
          error={errors?.jobTitle}
          touched={touched?.jobTitle}
        />
        <FormInput
          label="Job Details"
          placeholder="Enter job details"
          name="jobDetails"
          onChange={(e) => handleFieldChange(e.target.name, e.target.value)}
          onBlur={handleBlur}
          value={values?.jobDetails}
          error={errors?.jobDetails}
          touched={touched?.jobDetails}
        />
        <FormInput
          label="Job Location"
          name="jobLocation"
          placeholder="Enter job location"
          onChange={(e) => handleFieldChange(e.target.name, e.target.value)}
          onBlur={handleBlur}
          error={errors.jobLocation}
          touched={touched.jobLocation}
          value={values.jobLocation}
        />
        <Flex w="100%" justify="flex-end" mt="4rem" gap="20px">
          <Button colorScheme="gray" type="button" onClick={onPrev}>
            Previous
          </Button>
          <Button colorScheme="red" type="submit">
            Next
          </Button>
        </Flex>
      </Box>
    </Box>
  );
};

export default JobDetailsForm;
