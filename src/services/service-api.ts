export interface IPagination {
  page?: number;
  perPage?: number;
  keyword?: string;
}

const Auth = {
  login: "login",
  me: "user",
  forgot: "forgot-password",
  reset: "reset-password",
};

const Settings = {
  get: "/setting",
  update: "/setting",
};

const Category = {
  create: "/category",
  get: ({ page, perPage, keyword }: IPagination) => {
    let url = `/category?page=${page}&per_page=${perPage}`;
    if (keyword) {
      url += `&keyword=${keyword}`;
    }
    return url;
  },
  getTrashed: "/category/trash",
  restore: "/category/:id/restore",
  getOne: `/category/:id`,
  update: "/category/:id",
  delete: "/category/:id",
  getList: "/category/list",
};

const Brand = {
  create: "/brand",
  get: ({ page, perPage, keyword }: IPagination) => {
    let url = `/brand?page=${page}&per_page=${perPage}`;
    if (keyword) {
      url += `&keyword=${keyword}`;
    }
    return url;
  },
  getTrashed: "/brand/trash",
  restore: "/brand/:id/restore",
  getOne: `/brand/:id`,
  update: "/brand/:id",
  delete: "/brand/:id",
  getList: "/brand/list",
};

const SubCategory = {
  create: "/subcategory",
  get: ({ page, perPage, keyword }: IPagination) => {
    let url = `/subcategory?page=${page}&per_page=${perPage}`;
    if (keyword) {
      url += `&keyword=${keyword}`;
    }
    return url;
  },
  getTrashed: "/subcategory/trash",
  restore: "/subcategory/:id/restore",
  getOne: `/subcategory/:id`,
  update: "/subcategory/:id",
  delete: "/subcategory/:id",
  getList: "/subcategory/list/:categoryId",
};

const Color = {
  create: "/color",
  get: ({ page, perPage, keyword }: IPagination) => {
    let url = `/color?page=${page}&per_page=${perPage}`;
    if (keyword) {
      url += `&keyword=${keyword}`;
    }
    return url;
  },
  getOne: `/color/:id`,
  update: "/color/:id",
  delete: "/color/:id",
  getList: "/color/list",
};

const Specification = {
  create: "/specification",
  get: ({ page, perPage, keyword }: IPagination) => {
    let url = `/specification?page=${page}&per_page=${perPage}`;
    if (keyword) {
      url += `&keyword=${keyword}`;
    }
    return url;
  },
  getOne: `/specification/:id`,
  update: "/specification/:id",
  delete: "/specification/:id",
  getHeaderList: "/specification/header/list",
  getSubHeaderList: "/specification/subheader/list/:id",
};

const Product = {
  createGeneral: "/product",
  createImages: "/product/images/:id",
  createVariant: "/product/variant/:id",
  createSpecification: "/product/specification/:id",
};

export const Api = {
  Auth,
  Category,
  SubCategory,
  Color,
  Settings,
  Brand,
  Specification,
  Product,
};
