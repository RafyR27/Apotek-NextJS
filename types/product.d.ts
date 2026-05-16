interface IProductForm {
  productName: string;
  brand: string;
  kategori: string;
  subkategori: string;

  price: number;
  labelNumber: number;
  unitLabel?: string;
  satuanLabel: string;
  unit: string;

  stock: number;
  minStock: number;

  expiryDate: Date;

  description?: string;
  image?: string;
  publicIdImage?: string;
}

interface IProduct {
  _id?: string;
  productName: string;
  brand: string;
  category: string;
  subcategory: string;
  description?: string;

  price: number;
  labelNumber: number;
  satuanLabel: string;
  unit: string;
  unitLabel: string;

  stock: number;
  minStock: number;

  expiryDate: Date;

  image: string;
  publicIdImage: string;
}

export { IProductForm, IProduct };
