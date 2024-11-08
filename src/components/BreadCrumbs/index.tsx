import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Card,
  Flex,
  ResponsiveValue,
  Stack,
  Text,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";

interface BreadCrumbsProps {
  items: { path: string; label: string }[];
  children?: React.ReactNode;
  heading?: string;
  flexWrap?: ResponsiveValue<"wrap" | "nowrap" | "wrap-reverse">;
}

const BreadCrumbs = ({
  items,
  children,
  heading,
  flexWrap,
}: BreadCrumbsProps) => (
  <Card
    p={4}
    border="1px solid var(--chakra-colors-gray-200)"
    boxShadow="0px 1px 2px 0px rgba(16,24,40,0.2)"
  >
    <Flex justify="space-between" flexWrap={flexWrap} gap={2}>
      <Stack gap={2}>
        {heading && (
          <Text fontSize={20} fontWeight={600}>
            {heading}
          </Text>
        )}
        <Breadcrumb>
          <BreadcrumbItem>
            <BreadcrumbLink
              as={Link}
              to="/"
              fontSize={16}
              fontWeight={500}
              color="primary.500"
            >
              Home
            </BreadcrumbLink>
          </BreadcrumbItem>
          {items.map((item, index) => (
            <BreadcrumbItem
              key={index}
              isCurrentPage={index === items.length - 1}
            >
              <BreadcrumbLink
                as={Link}
                to={item.path}
                fontSize={16}
                fontWeight={500}
                color={index === items.length - 1 ? "gray.800" : "primary.500"}
              >
                {item.label}
              </BreadcrumbLink>
            </BreadcrumbItem>
          ))}
        </Breadcrumb>
      </Stack>
      {children}
    </Flex>
  </Card>
);

export default BreadCrumbs;
