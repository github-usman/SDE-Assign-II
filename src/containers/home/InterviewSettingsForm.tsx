import { Button, Flex, Box } from "@chakra-ui/react";
import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";

import FormSelect from "../../components/formComponents/FormSelect";
import { IInterViewSettings } from "../../interface/forms";
import {
  interviewDurationOptions,
  interviewLanguageOptions,
  interviewModeOptions,
} from "./constants";
import { useData } from "./DataProvider";

interface IInterviewDetailsProps{
  onPrev:()=>void;
}
const InterviewDetailsForm: React.FC<IInterviewDetailsProps> = ({onPrev}) => {
  const {state, setState} = useData();
  const {
    errors,
    touched,
    handleSubmit,
    handleBlur,
    values,
    setFieldValue,
  } = useFormik<IInterViewSettings>({
    initialValues: state.interviewSettings,
    validationSchema: Yup.object().shape({
      interviewMode: Yup.string().required("interview mode is required"),
      interviewDuration: Yup.string().required("interview duration is required"),
      interviewLanguage: Yup.string().required("interview language is required"),
    }),
    onSubmit: (values) => {
      console.log({ values });
      setState(prevState => ({
        ...prevState,
        interviewSettings: values
      }));
      alert("Form successfully submitted");
      console.log('all values',state);
    },
  });

  const handleFieldChange = (name: string, value: any) => {
    setFieldValue(name, value);
    setState(prevState => ({
      ...prevState,
      interviewSettings: { ...values, [name]: value }
    }));
  };

  return (
    <Box width="100%" as="form" onSubmit={handleSubmit as any}>
      <Box width="100%">
        <FormSelect
          label="Interview Mode"
          placeholder="Select interview mode"
          name="interviewMode"
          options={interviewModeOptions}
          onChange={handleFieldChange}
          onBlur={handleBlur}
          value={values?.interviewMode}
          error={errors?.interviewMode}
          touched={touched?.interviewMode}
        />
        <FormSelect
          label="Interview Duration"
          placeholder="Select interview duration"
          name="interviewDuration"
          options={interviewDurationOptions}
          onChange={handleFieldChange}
          onBlur={handleBlur}
          value={values?.interviewDuration}
          error={errors?.interviewDuration}
          touched={touched?.interviewDuration}
        />
        <FormSelect
          label="Job Location"
          name="interviewLanguage"
          placeholder="Select interview language"
          options={interviewLanguageOptions}
          onChange={handleFieldChange}
          onBlur={handleBlur}
          error={errors.interviewLanguage}
          touched={touched.interviewLanguage}
          value={values.interviewLanguage}
        />
        <Flex w="100%" justify="flex-end" mt="4rem" gap="20px">
          <Button colorScheme="gray" type="button" onClick={onPrev}>
            Previous
          </Button>
          <Button colorScheme="red" type="submit">
            Submit
          </Button>
        </Flex>
      </Box>
    </Box>
  );
};

export default InterviewDetailsForm;
