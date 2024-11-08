import {
  Icon,
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
  InputProps,
  InputRightElement,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  ResponsiveValue,
  Textarea,
  TextareaProps,
} from "@chakra-ui/react";
import { Eye, EyeClosed, Palette } from "@phosphor-icons/react";
import { Chrome } from "@uiw/react-color";
import React, { ReactNode, useState } from "react";
import { Control, Controller } from "react-hook-form";
import reactTextareaAutosize from "react-textarea-autosize";
import { FormControl, inputAttributes } from "../config";
interface ITextInputProps {
  isControlled?: boolean;
  value?: string;
  name: string;
  label?: string;
  control?: Control<any>;
  setValue?: (value: string) => void;
  placeholder?: string;
  backendError?: string[];
  isDisabled?: boolean;
  isReadOnly?: boolean;
  isRequired?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  width?: ResponsiveValue<number | string>;
  type?: string;
  helperText?: string;
}

const TextInput: React.FC<ITextInputProps & InputProps & TextareaProps> = ({
  isControlled = true,
  value,
  setValue,
  placeholder,
  isDisabled,
  isReadOnly,
  isRequired,
  name,
  label,
  control,
  leftIcon,
  rightIcon,
  width,
  type,
  backendError,
  helperText,
  ...restProps
}) => {
  const [showPassword, setShowPassword] = useState(false);

  return isControlled ? (
    <Controller
      name={name}
      control={control}
      render={({ field: { value, onChange }, fieldState: { error } }) => (
        <FormControl
          error={!!error || !!backendError}
          errorText={backendError?.[0] ?? error?.message}
          label={label}
          isRequired={isRequired}
          isDisabled={isDisabled}
          isReadOnly={isReadOnly}
          width={width}
          name={name}
          helperText={helperText}
        >
          {type === "textarea" ? (
            <Textarea
              {...inputAttributes}
              as={reactTextareaAutosize}
              minH={0}
              minRows={5}
              maxRows={10}
              placeholder={placeholder ?? ""}
              value={value}
              onChange={onChange}
              {...restProps}
            />
          ) : type === "color" ? (
            <InputGroup alignContent={"center"}>
              <Input
                {...inputAttributes}
                value={value}
                placeholder={placeholder ?? ""}
                onChange={onChange}
                {...restProps}
              />
              <InputRightElement mt={1}>
                <Popover placement="left-start" isLazy>
                  <PopoverTrigger>
                    <IconButton
                      aria-label="color-picker"
                      me={2}
                      icon={
                        <Icon
                          as={Palette}
                          boxSize={6}
                          color={value}
                          weight="bold"
                        />
                      }
                      tabIndex={-1}
                      variant="ghost"
                      colorScheme="gray"
                    />
                  </PopoverTrigger>
                  <PopoverContent w={"fit-content"} overflow={"hidden"}>
                    <PopoverHeader>Color Picker</PopoverHeader>
                    <PopoverArrow />
                    <PopoverCloseButton />
                    <PopoverBody p={0}>
                      <Chrome
                        color={value ?? "#FFFFFF"}
                        onChange={(color) => onChange(color.hex)}
                        showEditableInput={false}
                        style={{ float: "right" }}
                      />
                    </PopoverBody>
                  </PopoverContent>
                </Popover>
              </InputRightElement>
            </InputGroup>
          ) : (
            <InputGroup>
              {!!leftIcon && <InputLeftElement>{leftIcon}</InputLeftElement>}
              <Input
                {...inputAttributes}
                type={
                  type === "password"
                    ? showPassword
                      ? "text"
                      : "password"
                    : type
                }
                autoComplete={type === "password" ? "new-password" : "off"}
                value={value}
                placeholder={placeholder ?? ""}
                onChange={(value) => {
                  onChange(value);
                  backendError = undefined;
                }}
                {...restProps}
              />
              {type === "password" && !rightIcon && (
                <InputRightElement mt={1}>
                  <IconButton
                    aria-label="toggle-password"
                    me={2}
                    icon={
                      <Icon as={showPassword ? Eye : EyeClosed} boxSize={6} />
                    }
                    tabIndex={-1}
                    onClick={() => setShowPassword(!showPassword)}
                    variant="ghost"
                    colorScheme="gray"
                  />
                </InputRightElement>
              )}
              {!!rightIcon && type !== "password" && (
                <InputLeftElement>{rightIcon}</InputLeftElement>
              )}
            </InputGroup>
          )}
        </FormControl>
      )}
    />
  ) : (
    <InputGroup>
      {!!leftIcon && <InputLeftElement>{leftIcon}</InputLeftElement>}
      <Input
        {...inputAttributes}
        placeholder={placeholder ?? ""}
        value={value}
        onChange={(e) => setValue && setValue(e.target.value)}
      />
      {!!rightIcon && <InputRightElement mt={1}>{rightIcon}</InputRightElement>}
    </InputGroup>
  );
};

export default TextInput;
