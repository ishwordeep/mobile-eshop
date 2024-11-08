// import { useAddProduct } from "@/services/service-product";
import BreadCrumbs from "@/components/BreadCrumbs";
import {
  Card,
  CardProps,
  Flex,
  Icon,
  ResponsiveValue,
  Stack,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from "@chakra-ui/react";
import { At, Images as ImagesIcon, Tag, User } from "@phosphor-icons/react";
import { ReactNode } from "react";
import General from "./panels/General";
import Images from "./panels/Images";
import Specifications from "./panels/Specifications";
import Variants from "./panels/Variants";

const TabHeaders = [
  {
    id: 1,
    title: "General",
    icon: User,
    tab: "general",
  },
  {
    id: 2,
    title: "Images",
    icon: ImagesIcon,
    tab: "images",
  },
  {
    id: 3,

    title: "Specifications",
    icon: Tag,
    tab: "specifications",
  },
  {
    id: 4,
    title: "Variants",
    icon: At,
    tab: "variants",
  },
];

interface ProductCardProps {
  children: ReactNode;
  heading?: string;
  display?: ResponsiveValue<string>;
}

export const ProductCard: React.FC<ProductCardProps & CardProps> = ({
  children,
  heading,
  display,
  ...rest
}) => {
  return (
    <Card
      border={"1px solid var(--chakra-colors-gray-300)"}
      borderRadius={10}
      p={4}
      boxShadow="0px 1px 2px 0px rgba(16,24,40,0.2)"
      w={"full"}
      display={display}
      {...rest}
    >
      <Stack gap={2}>
        <Text fontSize={"xl"} fontWeight={600}>
          {heading}
        </Text>
        {children}
      </Stack>
    </Card>
  );
};

const Form = () => {
  // const defaultValues = {
  //   category_id: "",
  //   subcategory_id: "",
  //   variants: [] as IVariant[],
  //   name: "",
  //   price: "" as never as number,
  //   description: "",
  //   delivery_charge: "" as never as number,
  //   stock: "" as never as number,
  //   discount_percentage: "" as never as number,
  //   is_active: "1",
  //   low_stock_threshold: "" as never as number,
  //   tags: [],
  //   images: [],
  //   specifications: [] as ISpecification[],
  // };

  const panelAttributes = {
    px: 0,
    py: 8,
  };

  return (
    <Flex gap={4} flexDir="column">
      <BreadCrumbs
        heading={"Product"}
        items={[
          { path: "/product", label: "Product" },
          { path: "#", label: "Add" },
        ]}
        flexWrap={"wrap"}
      />
      <Tabs variant="unstyled" colorScheme="primary" isLazy>
        <TabList
          whiteSpace={"nowrap"}
          overflowX={"auto"}
          overflowY={"hidden"}
          px={0}
        >
          {TabHeaders.map((tab) => (
            <Tab
              fontWeight={500}
              fontSize={"lg"}
              _selected={{ borderColor: "primary.500", color: "primary.500" }}
              borderBottom={"4px solid"}
              borderColor={"gray.200"}
              key={tab.id}
              // onClick={() => setTabIndex(tab.id - 1)}
            >
              <Icon as={tab.icon} mr={2} boxSize={6} />
              {tab.title}
            </Tab>
          ))}
        </TabList>
        <TabPanels>
          <TabPanel {...panelAttributes}>
            <General />
          </TabPanel>
          <TabPanel {...panelAttributes}>
            <Images />
          </TabPanel>
          <TabPanel {...panelAttributes}>
            <Specifications />
          </TabPanel>
          <TabPanel {...panelAttributes}>
            <Variants />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Flex>
  );
};

export default Form;
