import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  ResponsiveValue,
  Stack,
} from "@chakra-ui/react";
import { FC, useState } from "react";
import { sidebarItems } from "../data";
import Footer from "./Footer";
import Header from "./Header";
import SidebarItem from "./SidebarItem";
interface ISidebarProps {
  width: ResponsiveValue<number | string>;
}

const Sidebar: FC<ISidebarProps> = ({ width }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const handleToggle = (index: number) => {
    setOpenIndex((prevIndex) => (prevIndex === index ? null : index));
  };
  return (
    <Card
      pos={"fixed"}
      h={"100dvh"}
      w={width}
      display={{ base: "none", md: "flex" }}
      borderRadius={0}
      shadow={"none"}
      transition={"all 0.25s cubic-bezier(.17,.67,.17,.88)"}
      bg={"white"}
    >
      <CardHeader>
        <Header />
      </CardHeader>
      <CardBody
        sx={{
          "&::-webkit-scrollbar": {
            width: "4px",
          },
          "&::-webkit-scrollbar-thumb": {
            bg: "primary.500",
            borderRadius: "full",
          },
        }}
        overflowY={"scroll"}
      >
        <Stack gap={4}>
          {sidebarItems.map((item, index) => (
            <SidebarItem
              key={index}
              item={item}
              subItems={item.subItems}
              width={"250px"}
              isOpen={openIndex === index}
              onToggle={() => handleToggle(index)}
              onClose={() => {}}
            />
          ))}
        </Stack>
      </CardBody>
      <CardFooter>
        <Footer />
      </CardFooter>
    </Card>
  );
};

export default Sidebar;
