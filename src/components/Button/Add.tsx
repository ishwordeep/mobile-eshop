import { Button, ButtonProps, Icon } from "@chakra-ui/react";
import { Plus } from "@phosphor-icons/react";
import { FC } from "react";

interface AddButtonProps extends ButtonProps {
  label?: string;
}

const AddButton: FC<AddButtonProps> = ({ label, ...rest }) => {
  return (
    <Button
      {...rest}
      colorScheme="primary"
      leftIcon={<Icon as={Plus} boxSize={6} />}
    >
      {label ?? "Add"}
    </Button>
  );
};

export default AddButton;
