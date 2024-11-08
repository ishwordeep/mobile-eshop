import {
  Checkbox,
  CheckboxGroup,
  HStack,
  ResponsiveValue,
} from "@chakra-ui/react";
import React, { ReactElement } from "react";
import { Control, Controller } from "react-hook-form";
import FormControl from "../config/FormControl";

interface ICheckboxInputProps {
  name: string;
  label?: string;
  control: Control<any>;
  backendError?: string[];
  isDisabled?: boolean;
  isReadOnly?: boolean;
  isRequired?: boolean;
  width?: ResponsiveValue<number | string>;
  my?: ResponsiveValue<number | string>;
  options: { label: string | ReactElement; value: string | number }[]; // List of options
}

const CheckboxInput: React.FC<ICheckboxInputProps> = ({
  name,
  label,
  control,
  options,
  backendError,
  isDisabled,
  isReadOnly,
  isRequired,
  width,
  my,
}) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { value, onChange }, fieldState: { error } }) => (
        <FormControl
          error={!!error || !!backendError}
          errorText={backendError ? backendError[0] : error?.message}
          isRequired={isRequired}
          isDisabled={isDisabled}
          isReadOnly={isReadOnly}
          width={width}
          my={my}
          label={label}
        >
          <CheckboxGroup
            value={value} // List of selected values
            onChange={onChange} // Chakra CheckboxGroup automatically handles the array of selected values
          >
            <HStack flexWrap="wrap" gap={4}>
              {options.map((option, index) => (
                <Checkbox
                  border={"1px solid var(--chakra-colors-gray-300)"}
                  boxShadow={"0px 1px 2px 0px rgba(16,24,40,0.2)"}
                  p={2}
                  borderRadius={5}
                  name={name[index]}
                  key={option.value}
                  value={option.value}
                  colorScheme="primary"
                >
                  {option.label}
                </Checkbox>
              ))}
            </HStack>
          </CheckboxGroup>
        </FormControl>
      )}
    />
  );
};

export default CheckboxInput;
