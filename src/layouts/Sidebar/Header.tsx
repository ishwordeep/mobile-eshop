import { Stack, Text } from "@chakra-ui/react";

const Header = () => {
  return (
    <Stack align={"center"} gap={0}>
      <Text fontSize={"4xl"} fontWeight={"bold"}>
        CodeTara
        <Text as={"span"} color={"primary.500"}>
          .
        </Text>
      </Text>
      <Text fontSize={"md"} color={"gray.500"}>
        Modern Admin Dashboard
      </Text>
    </Stack>
  );
};

export default Header;
