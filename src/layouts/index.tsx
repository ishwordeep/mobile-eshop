import { Container, Flex, Stack } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

const LayoutWrapper = () => {
  const width = "250px";

  return (
    <Flex w={"100%"} gap={4} maxW={"100dvw"} overflowX={"hidden"}>
      <Sidebar width={width} />

      <Container
        pl={{
          md: `calc(${width} + 10px)`,
          xl: `calc(${width} + 50px)`,
        }}
        pr={{ xl: 20 }}
        maxW={"100vw"}
        px={4}
        py={{ base: 4, md: 10 }}
      >
        <Stack gap={12}>
          <Navbar />
          <Outlet />
        </Stack>
      </Container>
    </Flex>
  );
};

export default LayoutWrapper;
