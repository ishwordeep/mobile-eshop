const TabItems = [
  {
    name: "General Information",
  },
  {
    name: "Social Media",
  },
  {
    name: "Google Account",
  },
];

import { useFetchSettings } from "@/services/service-settings";
import Loader from "@/utils/Loader";
import {
  Flex,
  HStack,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from "@chakra-ui/react";
import GeneralInformation from "./panels/GeneralInformation";
import GoogleAccount from "./panels/GoogleAccount";
import SocialMedia from "./panels/SocialMedia";

const Settings = () => {
  const { isPending } = useFetchSettings();
  return (
    <Flex flexDir={"column"} gap={4}>
      <HStack justify={"space-between"} align={"center"} mb={4}>
        <Text fontSize={"4xl"} fontWeight={"bold"}>
          Settings
        </Text>
      </HStack>
      <Tabs
        isLazy
        colorScheme="primary"
        variant={"enclosed"}
        maxW={{ base: "100vw", sm: "90vw", md: "70vw", xl: "60vw" }}
      >
        <TabList whiteSpace={"nowrap"} overflowX={"auto"} overflowY={"hidden"}>
          {TabItems.map((tab, index) => (
            <Tab _selected={{ bg: "primary.50" }} key={index}>
              {tab.name}
            </Tab>
          ))}
        </TabList>
        {isPending ? (
          <Loader height={"70dvh"} width={{ md: "70dvh" }} />
        ) : (
          <TabPanels>
            <TabPanel>
              <GeneralInformation />
            </TabPanel>
            <TabPanel>
              <SocialMedia />
            </TabPanel>
            <TabPanel>
              <GoogleAccount />
            </TabPanel>
          </TabPanels>
        )}
      </Tabs>
    </Flex>
  );
};

export default Settings;
