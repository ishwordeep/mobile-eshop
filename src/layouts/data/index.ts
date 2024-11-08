import {
  AsteriskSimple,
  CoatHanger,
  Coin,
  House,
  Palette,
  QuestionMark,
  SquaresFour,
  Star,
  Tag,
} from "@phosphor-icons/react";

export const sidebarItems = [
  {
    title: "Dashboard",
    icon: House,
    to: "/",
  },
  {
    title: "Master",
    icon: AsteriskSimple,
    to: "/master",
    subItems: [
      {
        title: "Specification",
        icon: Tag,
        to: "/master/specification",
      },

      {
        title: "Brand",
        icon: Tag,
        to: "/master/brand",
      },
      {
        title: "Category",
        icon: SquaresFour,
        to: "/master/category",
      },
      {
        title: "Sub Category",
        icon: SquaresFour,
        to: "/master/sub-category",
      },

      {
        title: "Color",
        icon: Palette,
        to: "/master/color",
      },
    ],
  },
  {
    title: "Product",
    icon: CoatHanger,
    to: "/product",
    subItems: [
      {
        title: "Information",
        icon: CoatHanger,
        to: "/product",
      },
      {
        title: "Query",
        icon: QuestionMark,
        to: "/product/query",
      },
      {
        title: "Reviews",
        icon: Star,
        to: "/product/reviews",
      },
    ],
  },
  {
    title: "Charges",
    icon: Coin,
    to: "/charges",
  },
];
