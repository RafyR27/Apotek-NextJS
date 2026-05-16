/* eslint-disable @typescript-eslint/no-explicit-any */
import instance from "@/lib/instance";
import { IProductForm } from "@/types/product";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";

const formSchema = z.object({
  productName: z.string("Nama obat wajib diisi").trim(),
  brand: z.string("Nama merek wajib diisi"),
  kategori: z.string("Kategori wajib diisi"),
  subkategori: z.string("Subkategori wajib diisi"),
  price: z
    .number("Harga wajib diisi")
    .int("Harga tidak boleh menggunakan titik")
    .positive("Harga harus lebih dari 0"),
  labelNumber: z
    .number("Label wajib diisi")
    .int("Label tidak boleh menggunakan titik")
    .positive("Label harus lebih dari 0"),
  satuanLabel: z.string("Satuan label wajib diisi"),
  unit: z.string("Satuan obat wajib diisi"),
  stock: z
    .number("Stok obat wajib diisi")
    .int("Stok tidak boleh menggunakan titik")
    .nonnegative("Stok tidak boleh negatif"),
  minStock: z
    .number("Minimum stok wajib diisi")
    .int("Minimum stok tidak boleh menggunakan titik")
    .nonnegative("Minimum stok tidak boleh negatif"),
  expiryDate: z.date("Tanggal expired wajib diisi"),
  description: z.string().optional(),
});

const useAdd = () => {
  const router = useRouter();

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
    setError,
  } = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      productName: "",
      brand: "",
      kategori: "",
      subkategori: "",
      price: 0,
      labelNumber: 0,
      satuanLabel: "",
      unit: "",
      stock: 0,
      minStock: 0,
      expiryDate: undefined,
      description: "",
    },
  });

  const addProductService = async (payload: IProductForm) => {
    await instance.post("/add-services/product", payload, {
      withCredentials: true,
    });
  };

  const {
    mutate: mutateAddProduct,
    isPending: isPendingAddProduct,
    isError: isErrorAddProduct,
  } = useMutation({
    mutationFn: addProductService,
    onError(error: any) {
      const status = error?.response?.status;
      const message = error?.response?.data?.message || error.message;

      if (status === 400) {
        setError("root", { type: "400", message });
        toast.error(`Validasi gagal: ${message}`, { position: "top-right" });
      } else if (status === 500) {
        setError("root", { type: "500", message });
        toast.error("Terjadi kesalahan server", { position: "top-right" });
      } else {
        toast.error(message, { position: "top-right" });
      }
    },
    onSuccess: () => {
      localStorage.removeItem("image");
      localStorage.removeItem("public_id");
      router.push("/admin/medicines?add=success");
      reset({
        productName: "",
        brand: "",
        kategori: "",
        subkategori: "",
        price: 0,
        labelNumber: 0,
        satuanLabel: "",
        unit: "",
        stock: 0,
        minStock: 0,
        expiryDate: undefined,
        description: "",
      });
    },
  });

  const handleAdd = (data: IProductForm) => mutateAddProduct(data);

  return {
    control,
    handleSubmit,
    errors,
    isPendingAddProduct,
    handleAdd,
    isErrorAddProduct,
  };
};

export default useAdd;
