import {
  Box,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  Stack,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { sidebarItems } from "../data";
import Footer from "../Sidebar/Footer";
import Header from "../Sidebar/Header";
import SidebarItem from "../Sidebar/SidebarItem";

interface IMobileNav {
  isOpen: boolean;
  onClose: () => void;
}

const MobileNav: React.FC<IMobileNav> = ({ isOpen, onClose }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const handleToggle = (index: number) => {
    setOpenIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  return (
    <Drawer placement="left" isOpen={isOpen} onClose={onClose}>
      <Box
        pos={"fixed"}
        top={0}
        left={0}
        right={0}
        bottom={0}
        bg={"rgba(0,0,0,0.5)"}
        zIndex={999}
        display={isOpen ? "block" : "none"}
      />

      <DrawerContent>
        <DrawerHeader>
          <Header />
          <DrawerCloseButton />
        </DrawerHeader>
        <DrawerBody>
          <Stack gap={4}>
            {sidebarItems.map((item, index) => (
              <SidebarItem
                key={index}
                item={item}
                subItems={item.subItems}
                width={"250px"}
                isOpen={openIndex === index}
                onToggle={() => handleToggle(index)}
                onClick={onClose} // Call the handleItemClick
              />
            ))}
          </Stack>
        </DrawerBody>
        <DrawerFooter>
          <Footer />
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default MobileNav;
