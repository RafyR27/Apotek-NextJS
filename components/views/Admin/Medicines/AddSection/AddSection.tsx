/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { Button } from "@/components/ui/button";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { BiPlus } from "react-icons/bi";
import { IoCalendarClearOutline, IoImageOutline } from "react-icons/io5";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import useAdd from "./useAdd";
import { Controller } from "react-hook-form";
import { IProductForm } from "@/types/product";
import { useEffect, useState } from "react";
import instance from "@/lib/instance";
import { toast } from "sonner";
import SpinnerCircle from "@/components/ui/spinner";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { ICategory, ISubcategory } from "@/types/category";
import { IBrand } from "@/types/brand";
import { CldUploadWidget } from "next-cloudinary";
import Image from "next/image";
import { MdOutlineDelete } from "react-icons/md";
import { cn } from "@/lib/utils";

const AddSection = () => {
  const queryClient = useQueryClient();
  const { control, handleSubmit, isPendingAddProduct, handleAdd } = useAdd();
  const [kategori, setKategori] = useState<string>();
  const [image, setImage] = useState<string>();
  const [public_id, setPublic_id] = useState<string>();

  const [addBrand, setAddBrand] = useState<string>("");
  const [addKategori, setAddKategori] = useState<string>("");
  const [addSubkategori, setAddSubkategori] = useState<string>("");
  const [isPending, setIsPending] = useState(false);

  useEffect(() => {
    const imageLocal = localStorage.getItem("image");
    const publicIdLocal = localStorage.getItem("public_id");

    if (imageLocal && publicIdLocal) {
      setImage(imageLocal);
      setPublic_id(publicIdLocal);
    }
  }, []);

  const {
    data: dataCategory = [],
    isPending: isPendingCategory,
    isError: isErrorCategory,
  } = useQuery({
    queryKey: ["category"],
    queryFn: async () => {
      const data = await instance.get("/get-services/category");
      return data.data.data;
    },
  });

  const { data: dataSubcategory = [], isPending: isPendingSubcategory } =
    useQuery({
      queryKey: ["subcategory", kategori],
      queryFn: async () => {
        const data = await instance.get(
          `/get-services/subcategory?category=${encodeURIComponent(kategori || "")}`,
        );
        return data.data.data;
      },
    });

  const {
    data: dataBrand = [],
    isPending: isPendingBrand,
    isError: isErrorBrand,
  } = useQuery({
    queryKey: ["brand"],
    queryFn: async () => {
      const data = await instance.get(`/get-services/brand`);
      return data.data.data;
    },
  });

  const handleKategori = async (payload: string) => {
    if (!payload) return;

    setIsPending(true);

    const result = await instance.post(
      "/add-services/category",
      {
        category: payload.trim(),
      },
      {
        withCredentials: true,
      },
    );

    if (result.data.status === 500) {
      if (result.data.message.includes("duplicate")) {
        setIsPending(false);
        return toast.error("Kategori sudah tersedia", {
          position: "top-right",
        });
      }

      setIsPending(false);
      return toast.error("Terjadi kesalahan, coba beberapa saat lagi", {
        position: "top-right",
      });
    }

    await queryClient.invalidateQueries({ queryKey: ["category"] });

    setAddKategori("");
    setIsPending(false);
    return toast.success("Kategori berhasil ditambahkan", {
      position: "top-right",
    });
  };

  const handleBrand = async (payload: string) => {
    if (!payload) return;

    setIsPending(true);

    const result = await instance.post(
      "/add-services/brand",
      {
        brand: payload.trim(),
      },
      {
        withCredentials: true,
      },
    );

    if (result.data.status === 500) {
      if (result.data.message.includes("duplicate")) {
        setIsPending(false);
        return toast.error("Brand sudah tersedia", {
          position: "top-right",
        });
      }

      setIsPending(false);
      return toast.error("Terjadi kesalahan, coba beberapa saat lagi", {
        position: "top-right",
      });
    }

    await queryClient.invalidateQueries({ queryKey: ["brand"] });

    setAddBrand("");
    setIsPending(false);
    return toast.success("Brand berhasil ditambahkan", {
      position: "top-right",
    });
  };

  const handleSubKategori = async (subcategory: string, category: string) => {
    if (!category || !subcategory) return;

    setIsPending(true);

    const result = await instance.post(
      "/add-services/subcategory",
      {
        category: category.trim(),
        subcategory: subcategory.trim(),
      },
      {
        withCredentials: true,
      },
    );

    if (result.data.status === 500) {
      if (result.data.message.includes("duplicate")) {
        setIsPending(false);
        return toast.error("Subkategori sudah tersedia", {
          position: "top-right",
        });
      }

      setIsPending(false);
      return toast.error("Terjadi kesalahan, coba beberapa saat lagi", {
        position: "top-right",
      });
    }

    await queryClient.invalidateQueries({
      queryKey: ["subcategory", kategori],
    });

    setAddSubkategori("");
    setIsPending(false);
    return toast.success("Subkategori berhasil ditambahkan", {
      position: "top-right",
    });
  };

  const blockDecimalKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "." || e.key === "," || e.key === "e" || e.key === "E") {
      e.preventDefault();
    }
  };

  const handleRemoveImage = async () => {
    if (!image || !public_id) return;

    toast.promise(
      instance.delete("/cloudinary/image-delete-cloudinary", {
        data: { public_id },
      }),
      {
        loading: "Menghapus gambar...",
        success: () => {
          localStorage.removeItem("public_id");
          localStorage.removeItem("image");
          setImage("");
          setPublic_id("");
          return "Gambar berhasil dihapus";
        },
        error: "Gagal menghapus gambar",
        position: "top-right",
      },
    );
  };

  const handleAddProduct = (payload: IProductForm) => {
    if (!image) {
      return toast.error("Gambar wajib diisi", {
        position: "top-right",
      });
    }

    const unitLabel = `${payload.labelNumber} ${payload.satuanLabel}/${payload.unit}`;

    const data = {
      ...payload,
      image,
      unitLabel,
      publicIdImage: public_id,
    };

    handleAdd(data);
  };

  return (
    <div className="w-full min-h-screen py-7 bg-background">
      <div className="w-full flex justify-between items-center mb-5">
        <h1 className="font-bold text-3xl">Tambah Obat</h1>
      </div>

      {/* form */}
      <form
        className="flex flex-col gap-3"
        onSubmit={handleSubmit(handleAddProduct)}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 w-full">
          {/* nama obat */}
          <FieldGroup>
            <Controller
              name="productName"
              control={control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="productName">Nama Obat*</FieldLabel>
                  <Input
                    {...field}
                    className="h-10"
                    type="text"
                    id="productName"
                    placeholder="Masukkan nama obat"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </FieldGroup>

          {/* brand */}
          <FieldGroup>
            <Controller
              name="brand"
              control={control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel>Brand*</FieldLabel>

                  <div className="flex gap-2">
                    <Select
                      onValueChange={(value) => {
                        if (value === "empty" || value === "loading") return;
                        field.onChange(value);
                      }}
                      value={field.value}
                      disabled={isErrorBrand}
                    >
                      <SelectTrigger className="py-4.5 w-full" size="default">
                        <SelectValue placeholder="Pilih brand" />
                      </SelectTrigger>

                      <SelectContent>
                        {isPendingBrand ? (
                          <SelectItem value="loading">Loading...</SelectItem>
                        ) : dataBrand.length === 0 ? (
                          <SelectItem value="empty">
                            Belum ada brand yang ditambahkan...
                          </SelectItem>
                        ) : (
                          dataBrand.map((item: IBrand) => (
                            <SelectItem
                              key={item._id}
                              value={item.brand}
                              className="capitalize"
                            >
                              {item.brand}
                            </SelectItem>
                          ))
                        )}
                      </SelectContent>
                    </Select>

                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant="outline" size={"icon-lg"}>
                          <BiPlus />
                        </Button>
                      </PopoverTrigger>

                      <PopoverContent align="end">
                        <PopoverHeader>
                          <FieldGroup>
                            <Field>
                              <FieldLabel htmlFor="addBrand">
                                Nama Brand
                              </FieldLabel>

                              <Input
                                className="h-10"
                                type="text"
                                id="addBrand"
                                placeholder="Masukkan nama brand"
                                name="addBrand"
                                onChange={(e) => setAddBrand(e.target.value)}
                                value={addBrand}
                              />

                              <Button
                                variant="outline"
                                size={"icon-lg"}
                                type="button"
                                onClick={() => {
                                  if (!addBrand?.trim()) return;
                                  handleBrand(addBrand);
                                }}
                              >
                                {isPending ? (
                                  <SpinnerCircle className="w-5 h-5" />
                                ) : (
                                  <BiPlus />
                                )}
                              </Button>
                            </Field>
                          </FieldGroup>
                        </PopoverHeader>
                      </PopoverContent>
                    </Popover>
                  </div>

                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </FieldGroup>

          {/* kategori */}
          <FieldGroup>
            <Controller
              name="kategori"
              control={control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel>Kategori*</FieldLabel>

                  <div className="flex gap-2 capitalize">
                    <Select
                      onValueChange={(value) => {
                        if (value === "empty" || value === "loading") return;
                        field.onChange(value);
                        setKategori(value);
                      }}
                      value={field.value}
                      disabled={isErrorCategory}
                    >
                      <SelectTrigger className="py-4.5 w-full" size="default">
                        <SelectValue placeholder="Pilih kategori" />
                      </SelectTrigger>

                      <SelectContent>
                        {isPendingCategory ? (
                          <SelectItem value="loading">Loading...</SelectItem>
                        ) : dataCategory.length === 0 ? (
                          <SelectItem value="empty">
                            Belum ada kategori yang ditambahkan...
                          </SelectItem>
                        ) : (
                          dataCategory.map((item: ICategory) => (
                            <SelectItem
                              key={item._id}
                              value={item.category}
                              className="capitalize"
                            >
                              {item.category}
                            </SelectItem>
                          ))
                        )}
                      </SelectContent>
                    </Select>

                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant="outline" size={"icon-lg"}>
                          <BiPlus />
                        </Button>
                      </PopoverTrigger>

                      <PopoverContent align="end">
                        <PopoverHeader>
                          <FieldGroup>
                            <Field>
                              <FieldLabel htmlFor="addKategori">
                                Kategori
                              </FieldLabel>

                              <Input
                                className="h-10"
                                type="text"
                                id="addKategori"
                                placeholder="Masukkan nama kategori"
                                name="addKategori"
                                onChange={(e) => setAddKategori(e.target.value)}
                                value={addKategori}
                              />

                              <Button
                                variant="outline"
                                type="button"
                                size={"icon-lg"}
                                onClick={() => {
                                  if (!addKategori?.trim()) return;
                                  handleKategori(addKategori);
                                }}
                              >
                                {isPending ? (
                                  <SpinnerCircle className="w-5 h-5" />
                                ) : (
                                  <BiPlus />
                                )}
                              </Button>
                            </Field>
                          </FieldGroup>
                        </PopoverHeader>
                      </PopoverContent>
                    </Popover>
                  </div>

                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </FieldGroup>

          {/* subkategori */}
          <FieldGroup>
            <Controller
              name="subkategori"
              control={control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel>Subkategori*</FieldLabel>

                  <div className="flex gap-2">
                    <Select
                      onValueChange={(value) => {
                        if (value === "empty" || value === "loading") return;
                        field.onChange(value);
                      }}
                      value={field.value}
                      disabled={!kategori}
                    >
                      <SelectTrigger className="py-4.5 w-full" size="default">
                        <SelectValue placeholder="Pilih subkategori" />
                      </SelectTrigger>

                      <SelectContent>
                        {isPendingSubcategory ? (
                          <SelectItem value="loading">Loading...</SelectItem>
                        ) : dataSubcategory.length === 0 ? (
                          <SelectItem value="empty">
                            Belum ada subkategori yang ditambahkan...
                          </SelectItem>
                        ) : (
                          dataSubcategory.map((item: ISubcategory) => (
                            <SelectItem
                              key={item._id}
                              value={item.subcategory}
                              className="capitalize"
                            >
                              {item.subcategory}
                            </SelectItem>
                          ))
                        )}
                      </SelectContent>
                    </Select>

                    <Popover>
                      <PopoverTrigger asChild disabled={!kategori}>
                        <Button variant="outline" size={"icon-lg"}>
                          <BiPlus />
                        </Button>
                      </PopoverTrigger>

                      <PopoverContent align="end">
                        <PopoverHeader>
                          <FieldGroup>
                            <Field>
                              <FieldLabel
                                htmlFor="addSubkategori"
                                className="truncate"
                              >
                                Subkategori dari {kategori}
                              </FieldLabel>

                              <Input
                                className="h-10"
                                type="text"
                                id="addSubkategori"
                                placeholder="Masukkan nama subkategori"
                                name="addSubkategori"
                                onChange={(e) =>
                                  setAddSubkategori(e.target.value)
                                }
                                value={addSubkategori}
                              />

                              <Button
                                variant="outline"
                                size={"icon-lg"}
                                type="button"
                                onClick={() => {
                                  if (!addSubkategori?.trim()) return;
                                  handleSubKategori(addSubkategori, kategori!);
                                }}
                              >
                                {isPending ? (
                                  <SpinnerCircle className="w-5 h-5" />
                                ) : (
                                  <BiPlus />
                                )}
                              </Button>
                            </Field>
                          </FieldGroup>
                        </PopoverHeader>
                      </PopoverContent>
                    </Popover>
                  </div>

                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </FieldGroup>

          {/* price */}
          <FieldGroup>
            <Controller
              name="price"
              control={control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="price">Harga*</FieldLabel>

                  <Input
                    {...field}
                    className="h-10"
                    type="number"
                    id="price"
                    placeholder="Masukkan harga obat"
                    value={field.value === 0 ? "" : field.value}
                    onChange={(e) => {
                      const val = e.target.valueAsNumber;
                      field.onChange(isNaN(val) ? 0 : val);
                    }}
                    onKeyDown={blockDecimalKey}
                  />

                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </FieldGroup>

          {/* unit & unit label */}
          <div className="flex items-start gap-3">
            {/* Label Number */}
            <FieldGroup className="w-60">
              <Controller
                name="labelNumber"
                control={control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="labelNumber">Label*</FieldLabel>

                    <Input
                      {...field}
                      className="h-10 max-w-20"
                      type="number"
                      id="labelNumber"
                      placeholder="10"
                      value={field.value === 0 ? "" : field.value}
                      onChange={(e) => {
                        const val = e.target.valueAsNumber;
                        field.onChange(isNaN(val) ? 0 : val);
                      }}
                      onKeyDown={blockDecimalKey}
                    />

                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
            </FieldGroup>

            {/* Unit of label */}
            <FieldGroup>
              <Controller
                name="satuanLabel"
                control={control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel className="truncate">Satuan Label*</FieldLabel>

                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <SelectTrigger className="py-4.5" size="default">
                        <SelectValue placeholder="Pilih" />
                      </SelectTrigger>

                      <SelectContent>
                        <SelectItem value="tablet">Tablet</SelectItem>
                        <SelectItem value="ml">Mililiter (ml)</SelectItem>
                        <SelectItem value="gram">Gram (gr)</SelectItem>
                        <SelectItem value="sachet">Sachet</SelectItem>
                        <SelectItem value="pcs">Pcs</SelectItem>
                        <SelectItem value="kapsul">Kapsul</SelectItem>
                      </SelectContent>
                    </Select>

                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
            </FieldGroup>

            {/* Divider */}
            <span className="pb-1.5 w-10 md:w-30 h-15 text-muted-foreground flex items-end justify-center">
              /
            </span>

            {/* Unit per item */}
            <FieldGroup>
              <Controller
                name="unit"
                control={control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel>Satuan*</FieldLabel>

                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <SelectTrigger className="py-4.5" size="default">
                        <SelectValue placeholder="Pilih" />
                      </SelectTrigger>

                      <SelectContent>
                        <SelectItem value="strip">Strip</SelectItem>
                        <SelectItem value="box">Box</SelectItem>
                        <SelectItem value="botol">Botol</SelectItem>
                        <SelectItem value="pack">Pack</SelectItem>
                        <SelectItem value="dus">Dus</SelectItem>
                      </SelectContent>
                    </Select>

                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
            </FieldGroup>
          </div>

          {/* stock & minstock */}
          <div className="flex gap-3">
            {/* stock */}
            <FieldGroup>
              <Controller
                name="stock"
                control={control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="stock">Stok*</FieldLabel>

                    <Input
                      {...field}
                      className="h-10"
                      type="number"
                      id="stock"
                      placeholder="Masukkan jumlah"
                      value={field.value === 0 ? "" : field.value}
                      onChange={(e) => {
                        const val = e.target.valueAsNumber;
                        field.onChange(isNaN(val) ? 0 : val);
                      }}
                      onKeyDown={blockDecimalKey}
                    />

                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
            </FieldGroup>

            {/* minstock */}
            <FieldGroup>
              <Controller
                name="minStock"
                control={control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="minStock">Minimum Stok*</FieldLabel>

                    <Input
                      {...field}
                      className="h-10"
                      type="number"
                      id="minStock"
                      placeholder="Masukkan jumlah"
                      value={field.value === 0 ? "" : field.value}
                      onChange={(e) => {
                        const val = e.target.valueAsNumber;
                        field.onChange(isNaN(val) ? 0 : val);
                      }}
                      onKeyDown={blockDecimalKey}
                    />

                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
            </FieldGroup>
          </div>

          {/* expiryDate */}
          <FieldGroup>
            <Controller
              name="expiryDate"
              control={control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="expired">Tanggal Kadaluarsa*</FieldLabel>

                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        data-empty={!field.value}
                        className="w-70 justify-start text-left font-normal data-[empty=true]:text-muted-foreground h-10"
                      >
                        <IoCalendarClearOutline />

                        {field.value ? (
                          format(field.value, "PPP")
                        ) : (
                          <span>Pick a date</span>
                        )}
                      </Button>
                    </PopoverTrigger>

                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        captionLayout="dropdown"
                        startMonth={new Date(new Date().getFullYear() - 5, 0)}
                        endMonth={new Date(new Date().getFullYear() + 7, 11)}
                      />
                    </PopoverContent>
                  </Popover>

                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </FieldGroup>

          {/* description */}
          <FieldGroup className="col-span-1 md:col-span-2">
            <Controller
              name="description"
              control={control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel>Deskripsi Obat (Opsional)</FieldLabel>

                  <Textarea
                    {...field}
                    placeholder="Masukkan deskripsi obat..."
                    className="min-h-24"
                  />

                  <FieldDescription>
                    Jelaskan fungsi, aturan pakai, atau informasi tambahan obat.
                  </FieldDescription>

                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </FieldGroup>

          {/* image */}
          <div className="space-y-2 col-span-1 md:col-span-2">
            <FieldLabel>Gambar*</FieldLabel>
            <Empty
              className={cn(
                "border-2 border-dashed justify-center",
                image ? " py-5" : "py-10",
              )}
            >
              {image ? (
                <div className="relative w-70 h-70">
                  <Image
                    src={image}
                    alt="product-pic"
                    width={300}
                    height={300}
                    className="object-cover w-70 h-70"
                  />
                  <Button
                    type="button"
                    size={"icon-lg"}
                    variant={"destructive"}
                    className="absolute top-0 right-0 rounded-full "
                    onClick={() => handleRemoveImage()}
                  >
                    <MdOutlineDelete />
                  </Button>
                </div>
              ) : (
                <>
                  <EmptyHeader>
                    <EmptyMedia variant="icon">
                      <IoImageOutline />
                    </EmptyMedia>
                    <EmptyTitle>Belum ada gambar yang ditambahkan</EmptyTitle>
                    <EmptyDescription>
                      Unggah gambar produk dengan menekan tombol dibawah.
                    </EmptyDescription>
                  </EmptyHeader>
                  <EmptyContent>
                    <CldUploadWidget
                      signatureEndpoint="/api/cloudinary/sign-cloudinary-params"
                      options={{
                        sources: ["local", "url"],
                        multiple: false,
                        maxFileSize: 5000000,
                        clientAllowedFormats: ["jpg", "jpeg", "png", "webp"],
                      }}
                      onSuccess={(result) => {
                        const info = result.info as {
                          public_id: string;
                          secure_url: string;
                        };

                        if (!info) {
                          return toast.error("Gagal mengunggah gambar", {
                            position: "top-right",
                          });
                        }

                        setImage(info.secure_url);
                        setPublic_id(info.public_id);
                        localStorage.setItem("public_id", info.public_id);
                        localStorage.setItem("image", info.secure_url);

                        return toast.success("Berhasil mengunggah gambar", {
                          position: "top-right",
                        });
                      }}
                      onQueuesEnd={(result, { widget }) => {
                        widget.close();
                      }}
                    >
                      {({ open }) => {
                        return (
                          <Button
                            variant="outline"
                            size="sm"
                            type="button"
                            onClick={() => open()}
                          >
                            Unggah Gambar
                          </Button>
                        );
                      }}
                    </CldUploadWidget>
                  </EmptyContent>
                </>
              )}
            </Empty>
          </div>
        </div>
        <div className="w-full flex justify-end mt-4">
          <Button size="lg" className="w-full md:w-50 h-10" type="submit">
            {isPendingAddProduct ? <SpinnerCircle></SpinnerCircle> : "Simpan"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AddSection;
