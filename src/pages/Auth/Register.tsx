import { TextInput } from "@/components/Form";
import { Button, Center, Flex } from "@chakra-ui/react";
import { useForm } from "react-hook-form";

const Register = () => {
  const { control } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  return (
    <Center w={"100dvw"} h={"100dvh"}>
      <Flex
        flexDir={"column"}
        gap={1}
        border={"1px solid var(--chakra-colors-gray-300)"}
        boxShadow={"0px 1px 2px 0px rgba(16,24,40,0.1)"}
        w={"600px"}
        borderRadius={10}
        p={16}
      >
        <TextInput isRequired name="name" label="Name" control={control} />
        <TextInput isRequired name="email" label="Email" control={control} />
        <TextInput
          isRequired
          name="password"
          label="Password"
          control={control}
          type="password"
        />
        <TextInput isRequired name="phone" label="Phone" control={control} />

        <Button mt={3} type="submit">
          Register
        </Button>
      </Flex>
    </Center>
  );
};

export default Register;
