import {
  FormControl as CFormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  ResponsiveValue,
} from "@chakra-ui/react";
import { ReactNode } from "react";

interface IFormControl {
  label?: string;
  isRequired?: boolean;
  isReadOnly?: boolean;
  isDisabled?: boolean;
  helperText?: string;
  width?: ResponsiveValue<number | string>;
  children: ReactNode;
  name?: string;
  error?: boolean;
  errorText?: string;
  my?: ResponsiveValue<number | string>;
}

const FormControl: React.FC<IFormControl> = ({
  children,
  label,
  isRequired,
  isReadOnly,
  isDisabled,
  helperText,
  width,
  name,
  error,
  errorText,
  my,
}) => {
  return (
    <CFormControl
      isRequired={!!isRequired}
      isReadOnly={!!isReadOnly}
      isDisabled={!!isDisabled}
      isInvalid={error}
      w={width ?? "100%"}
      my={my ?? 2}
    >
      {label && (
        <FormLabel mb={2} htmlFor={name}>
          {label}
        </FormLabel>
      )}
      {children}
      {helperText && (
        <FormHelperText fontStyle={"italic"} color={"gray.500"} mt={2}>
          *{helperText}
        </FormHelperText>
      )}
      <FormErrorMessage>{errorText}</FormErrorMessage>
    </CFormControl>
  );
};

export default FormControl;
