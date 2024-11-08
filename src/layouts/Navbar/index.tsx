import Avatar1 from "@/assets/avatars/2.jpg";
import {
  Avatar,
  Box,
  Divider,
  HStack,
  Icon,
  IconButton,
  Stack,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { Bell, ChatDots, Gift, List } from "@phosphor-icons/react";

const icons = [
  {
    label: "Notification",
    icon: Bell,
    bg: "primary.500",
    color: "white",
    bgHover: "primary.600",
    iconColor: "white",
  },
  {
    label: "Messages",
    icon: ChatDots,
    color: "primary.500",
    bg: "primary.100",
    bgHover: "primary.200",
    iconColor: "primary.500",
  },
  {
    label: "Orders",
    icon: Gift,
    color: "primary.500",
    bg: "primary.100",
    bgHover: "primary.200",
    iconColor: "primary.500",
  },
];

import { useStoreHeaderData } from "@/store/headerStore";
import MobileNav from "./MobileNav";
const Navbar = () => {
  const { headerData } = useStoreHeaderData();
  const {
    isOpen: isNavOpen,
    onOpen: onNavOpen,
    onClose: onNavClose,
  } = useDisclosure();
  const attributes = {
    top: "-2",
    right: "-2",
    bg: "primary.500",
    borderRadius: "full",
    width: "24px",
    height: "24px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    border: "2px solid white",
  };

  return (
    <HStack gap={6} align={"center"} justify={"space-between"}>
      <HStack gap={2} hideFrom={"md"}>
        <IconButton
          aria-label="Menu"
          icon={<Icon as={List} boxSize={5} />}
          onClick={onNavOpen}
          variant={"outline"}
        />
      </HStack>

      <MobileNav isOpen={isNavOpen} onClose={onNavClose} />
      <Stack gap={0} textAlign={{ base: "center", md: "start" }}>
        <Text
          fontSize={{ base: "xl", sm: "2xl", lg: "4xl" }}
          fontWeight={"bold"}
        >
          {headerData?.heading}
        </Text>
        <Text color={"gray.500"} fontSize={{ base: "sm", md: "md" }}>
          {headerData?.description}
        </Text>
      </Stack>
      <HStack align={"center"} gap={6}>
        <HStack hideBelow={"md"}>
          {icons.map((item, index) => (
            <Box key={index} position="relative" display="inline-block">
              <IconButton
                aria-label={item.label}
                borderRadius="8px"
                icon={<Icon as={item.icon} boxSize={5} weight="bold" />}
                color={item.iconColor}
                bg={item.bg || "transparent"}
                _hover={{ bg: item.bgHover }}
              />
              <Box pos="absolute" {...attributes}>
                <Text fontSize="xs" color="white">
                  21
                </Text>
              </Box>
            </Box>
          ))}
          <Divider
            opacity={1}
            orientation="vertical"
            borderColor={"gray.400"}
            h={"50px"}
            borderRadius={8}
          />
        </HStack>
        <HStack align={"center"}>
          <Box borderRadius={"full"} bg={"white"} p={1}>
            <Avatar src={Avatar1} name={"Samantha"} />
          </Box>
        </HStack>
      </HStack>
    </HStack>
  );
};

export default Navbar;
