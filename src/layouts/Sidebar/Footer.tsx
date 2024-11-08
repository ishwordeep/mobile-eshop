import { useLogout } from "@/services/service-auth";
import { Link as CLink, Icon, Stack, Text } from "@chakra-ui/react";
import { Gear, SignOut } from "@phosphor-icons/react";
import { Link } from "react-router-dom";
const Footer = () => {
  const { mutateAsync: logout } = useLogout();

  return (
    <Stack>
      <CLink
        display={"flex"}
        as={Link}
        to="/settings"
        alignItems={"center"}
        color={"gray.500"}
        gap={2}
        _hover={{ textDecoration: "none", color: "primary.500" }}
        fontSize={{ base: "md", md: "lg" }}
      >
        <Icon as={Gear} boxSize={6} />
        Settings
      </CLink>
      <Text
        display={"flex"}
        alignItems={"center"}
        cursor={"pointer"}
        color={"gray.500"}
        gap={2}
        _hover={{ textDecoration: "none", color: "red.500" }}
        fontSize={{ base: "md", md: "lg" }}
        onClick={async () => {
          await logout();
        }}
      >
        <Icon as={SignOut} boxSize={6} />
        Sign Out
      </Text>
    </Stack>
  );
};

export default Footer;
