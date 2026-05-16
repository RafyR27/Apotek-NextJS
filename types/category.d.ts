interface ICategory {
  _id?: string,
  category: string;
}

interface ISubcategory {
  _id?: string;
  subcategory: string;
  category: string;
}

export {
    ICategory,
    ISubcategory
}