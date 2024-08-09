import React from "react";
import { Input } from "@chakra-ui/react";
import FormWrapper from "./FormWrapper";
import { IFormInputProps } from "@src/interface/forms";

interface IFormSelectProps
  extends Omit<IFormInputProps, "onBlur"> {
  onBlur?: any;
}

const FormInput = React.forwardRef<HTMLInputElement, IFormSelectProps>(
  (
    {
      name,
      label,
      placeholder,
      type,
      value,
      onChange,
      onBlur,
      error,
      touched,
      inputProps = {},
      children,
      helperText,
      wrapperProps = {},
    },
    ref
  ) => {
    const handleBlur = () => {
      onBlur(name);
    };
    return (
      <FormWrapper
        isInvalid={Boolean(error && touched)}
        wrapperProps={wrapperProps}
        helperText={helperText}
        label={label}
        touched={touched}
        error={error as string}
      >
        <Input
          name={name}
          placeholder={placeholder}
          type={type}
          value={value}
          onChange={onChange}
          onBlur={handleBlur}
          // styles
          width="100%"
          maxHeight="none !important"
          minW="272px"
          height="45px"
          fontSize="0.875rem"
          fontWeight="500"
          px="20px"
          border="1px solid #c0bcd7"
          borderColor={touched ? (error ? "1px solid #c0bcd7" : "1px solid #c0bcd7") : "1px solid #c0bcd7"}
          _focus={{
            borderColor: touched && error ? "1px solid #c0bcd7" : "#428df7",
            boxShadow: "none",
            border:"2px solid #428df7"
          }}
          _invalid={{
            borderColor: "1px solid #c0bcd7",
          }}
          bg="inputBg"
          borderRadius="10px"
          _placeholder={{
            color: "text.placeholder",
          }}
          ref={ref}
          {...inputProps}
        />
        {children}
      </FormWrapper>
    );
  }
);

FormInput.displayName = "FormInput";

export default FormInput;
