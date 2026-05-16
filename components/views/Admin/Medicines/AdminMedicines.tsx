/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useSidebar } from "@/components/ui/sidebar";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import instance from "@/lib/instance";
import { cn } from "@/lib/utils";
import { ICategory, ISubcategory } from "@/types/category";
import { IProduct } from "@/types/product";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { BiSearch } from "react-icons/bi";
import { FiPlus } from "react-icons/fi";
import { IoMdClose } from "react-icons/io";
import { IoChatboxOutline, IoGridOutline } from "react-icons/io5";
import {
  MdDeleteOutline,
  MdFilterList,
  MdOutlineModeEditOutline,
  MdOutlineTableRows,
} from "react-icons/md";
import { RemoveScroll } from "react-remove-scroll";
import { toast } from "sonner";
import { useDebouncedCallback } from "use-debounce";

const AdminMedicines = ({ success }: { success: string }) => {
  const { state } = useSidebar();

  const [kategori, setKategori] = useState("semua kategori");
  const [subkategori, setSubkategori] = useState("semua subkategori");
  const [stok, setStok] = useState("semua stok");
  const [kadaluarsa, setKadaluarsa] = useState("aman");
  const [activeFilter, setActiveFilter] = useState({
    kategori: "semua kategori",
    subkategori: "semua subkategori",
    stok: "semua stok",
    kadaluarsa: "aman",
  });
  const [debouncedSearch, setDebouncedSearch] = useState("");

  const handleSearch = useDebouncedCallback((value: string) => {
    setDebouncedSearch(value);
  }, 500);

  const [isOpen, setOpen] = useState(false);

  const [view, setView] = useState("grid");

  const {
    data: products = [],
    isPending: isPendingProducts,
    isError: isErrorProducts,
  } = useQuery({
    queryKey: ["products", activeFilter, debouncedSearch],
    queryFn: async () => {
      const params = new URLSearchParams();

      if (activeFilter.kategori !== "semua kategori")
        params.set("category", activeFilter.kategori);
      if (activeFilter.subkategori !== "semua subkategori")
        params.set("subcategory", activeFilter.subkategori);
      if (activeFilter.stok !== "semua stok")
        params.set("stock", activeFilter.stok);
      if (activeFilter.kadaluarsa)
        params.set("expired", activeFilter.kadaluarsa);
      if (debouncedSearch) params.set("search", debouncedSearch);

      const result = await instance.get(
        `/get-services/product-admin?${params.toString()}`,
      );
      return result.data.data;
    },
  });

  const handleClose = () => {
    setActiveFilter({ kategori, subkategori, stok, kadaluarsa });
    setOpen(false);
  };

  const {
    data: categories = [],
    isPending: isPendingCategories,
    isError: isErrorCategories,
  } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const result = await instance.get("/get-services/category");
      return result.data.data;
    },
  });

  const { data: subcategories = [], isPending: isPendingSubcategories } =
    useQuery({
      queryKey: ["subcategory", kategori],
      queryFn: async () => {
        const category =
          kategori === "semua kategori"
            ? ""
            : encodeURIComponent(kategori || "");
        const data = await instance.get(
          `/get-services/subcategory?category=${category}`,
        );
        return data.data.data;
      },
    });

  useEffect(() => {
    if (success) {
      toast.success("Berhasil menambah produk", { position: "top-right" });
    }

    if (isErrorProducts) {
      toast.error("Gagal memuat produk", { position: "top-right" });
    }

    if (kategori === "semua kategori") {
      setSubkategori("semua subkategori");
    }
  }, [success, isErrorProducts, kategori]);

  return (
    <div className="w-full min-h-screen py-7 bg-background">
      <div className="w-full flex justify-between items-center">
        <h1 className="font-bold text-3xl">Data Obat</h1>
        <Button className="py-5 px-4">
          <Link
            href={"/admin/medicines/add-product"}
            className="flex items-center gap-2"
          >
            <FiPlus />
            Tambah Obat
          </Link>
        </Button>
      </div>

      <div className="pt-5">
        {/* Stat Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-6">
          {/* Total produk */}
          <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-medium text-gray-500">
                Total Produk
              </span>
            </div>
            <div className="text-2xl font-bold text-gray-900 mb-1">
              {!products.totalProducts ? "0" : products.totalProducts}
            </div>
          </div>

          {/* Stok hampir habis */}
          <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-medium text-gray-500">
                Stok Hampir Habis
              </span>
            </div>
            <div className="text-2xl font-bold text-gray-900 mb-1">
              {!products.lowStock ? "0" : products.lowStock}
            </div>
            <div className="text-xs text-gray-400">Di bawah stok minimum</div>
          </div>

          {/* Kadaluarsa */}
          <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-medium text-gray-500">
                Kadaluarsa Segera
              </span>
            </div>
            <div className="text-2xl font-bold text-gray-900 mb-1">
              {!products.nearExpiry ? "0" : products.nearExpiry}
            </div>
            <div className="text-xs text-gray-400">Dalam 30 hari</div>
          </div>

          {/* produk aktif */}
          <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-medium text-gray-500">
                Produk Aktif
              </span>
            </div>
            {products.availableStock ? (
              <>
                <div className="text-2xl font-bold text-gray-900 mb-1">
                  {products.availableStock}
                </div>
                <div className="text-xs text-gray-400">
                  Dari {products.totalProducts} produk obat
                </div>
              </>
            ) : (
              <>
                <div className="text-2xl font-bold text-gray-900 mb-1">0</div>
                <div className="text-xs text-gray-400">Dari 0 produk obat</div>
              </>
            )}
          </div>
        </div>

        {/* Bottom Section */}
        <div className="w-full flex flex-col h-auto">
          <div className="w-full flex flex-col lg:flex-row lg:justify-between gap-x-5 gap-y-3 mb-5">
            {/* search */}
            <InputGroup
              className={cn(
                "h-10",
                state === "collapsed" ? "xl:max-w-md" : "xl:max-w-sm",
              )}
            >
              <InputGroupInput
                onChange={(e) => handleSearch(e.target.value)}
                placeholder="Cari nama obat, merek, dll"
              />
              <InputGroupAddon>
                <BiSearch />
              </InputGroupAddon>
            </InputGroup>

            {/* select & tabs */}
            <div className=" w-full flex justify-end gap-3">
              {/* filter */}
              <Button
                variant="outline"
                className="max-w-25 w-full py-4.5 flex items-center"
                onClick={() => setOpen(true)}
              >
                <MdFilterList />
                Filter
              </Button>

              {/* tabs */}
              <Tabs value={view} onValueChange={setView}>
                <TabsList className="py-5">
                  <TabsTrigger value="grid" className="h-8">
                    <IoGridOutline />
                  </TabsTrigger>
                  <TabsTrigger value="row" className="h-8">
                    <MdOutlineTableRows />
                  </TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
          </div>

          {isPendingProducts ? (
            <div className="grid 2xl:grid-cols-5 xl:grid-cols-4 md:grid-cols-3 grid-cols-2 w-full gap-5">
              {Array.from({ length: 5 }).map((_, index) => (
                <div
                  key={index}
                  className="w-full min-h-60 border-2 hover:border-foreground/20 rounded-md flex flex-col p-3 gap-3"
                >
                  <Skeleton className="h-40 w-full" />
                  <Skeleton className="h-3 w-1/3" />
                  <div className="flex flex-col gap-2">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-full" />
                  </div>
                  <span className="w-full border"></span>
                  <Skeleton className="h-7 w-full" />
                </div>
              ))}
            </div>
          ) : products.products.length === 0 ? (
            <div className="w-full h-80 flex flex-col gap-3 justify-center items-center text-muted-foreground">
              <IoChatboxOutline className="text-[3.5rem] text-muted-foreground/50" />
              <p className="text-[0.9rem]">Tidak ada produk yang ditemukan</p>
            </div>
          ) : view === "grid" ? (
            <div className="grid 2xl:grid-cols-5 xl:grid-cols-4 md:grid-cols-3 grid-cols-2 w-full gap-5">
              {/* card */}
              {products?.products?.map((item: IProduct) => (
                <div
                  key={item._id}
                  className="w-full min-h-60 border-2 hover:border-foreground/20 rounded-md flex flex-col p-3 gap-3"
                >
                  <Image
                    src={item.image}
                    alt={item.productName}
                    width={300}
                    height={300}
                    className="object-cover w-full h-40 rounded-sm"
                  />
                  {/* kategori */}
                  <Badge variant="outline" className="capitalize">
                    {item.category}
                  </Badge>

                  <div className="">
                    {/* nama */}
                    <p className="text-[0.9rem] truncate capitalize">
                      {item.productName}
                    </p>
                    {/* merek */}
                    <p className="text-[0.7rem] truncate capitalize text-muted-foreground">
                      {item.brand}
                    </p>
                  </div>

                  {/* unit */}
                  <p className="text-[0.7rem] truncate capitalize text-muted-foreground">
                    {item.unitLabel}
                  </p>

                  <span className="w-full border"></span>

                  {/* price & stok */}
                  <div className="w-full flex flex-col lg:flex-row gap-2 justify-between">
                    <p className="text-[0.9rem]">
                      Rp. {item.price.toLocaleString("id-ID")}
                    </p>
                    <Badge
                      variant="outline"
                      className={cn(
                        "capitalize text-primary-foreground",
                        item.stock <= item.minStock
                          ? "bg-destructive"
                          : "bg-tertiary",
                      )}
                    >
                      {item.stock} {item.unit}
                    </Badge>
                  </div>

                  {/* edit & delete */}
                  <div className="w-full gap-3 grid grid-cols-1 md:grid-cols-2">
                    <Button variant={"outline"} className="w-full">
                      <MdOutlineModeEditOutline className="hidden lg:block" />
                      Edit
                    </Button>
                    <Button variant={"destructive"} className="w-full">
                      <MdDeleteOutline className="hidden lg:block" />
                      Hapus
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="border rounded-md w-full overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="*:border-border [&>:not(:last-child)]:border-r bg-muted">
                    <TableHead>Nama Produk</TableHead>
                    <TableHead>Kategori</TableHead>
                    <TableHead className="hidden lg:table-cell">
                      Subkategori
                    </TableHead>
                    <TableHead>Harga</TableHead>
                    <TableHead>Satuan</TableHead>
                    <TableHead>Kadaluarsa</TableHead>
                    <TableHead>Stock</TableHead>
                    <TableHead>Aksi</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {products?.products?.map((item: IProduct) => (
                    <TableRow
                      key={item._id}
                      className="*:border-border [&>:not(:last-child)]:border-r"
                    >
                      <TableCell className="w-50">
                        <div className="truncate capitalize max-w-50">
                          {item.productName}
                        </div>
                      </TableCell>
                      <TableCell className="capitalize">
                        {item.category}
                      </TableCell>
                      <TableCell className="capitalize hidden lg:table-cell">
                        {item.subcategory}
                      </TableCell>
                      <TableCell className="capitalize">
                        Rp. {item.price.toLocaleString("id-ID")}
                      </TableCell>
                      <TableCell className="capitalize w-20 lg:w-auto">
                        <div className="overflow-hidden capitalize max-w-20 lg:max-w-none">
                          {item.unitLabel}
                        </div>
                      </TableCell>
                      <TableCell className="capitalize">
                        {new Date(item.expiryDate).toLocaleDateString("id-ID", {
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                        })}
                      </TableCell>
                      <TableCell className="capitalize">
                        <Badge
                          className={cn(
                            item.stock <= item.minStock
                              ? "bg-destructive"
                              : "bg-tertiary",
                          )}
                        >
                          {item.stock} {item.unit}
                        </Badge>
                      </TableCell>
                      <TableCell className="w-50">
                        <div className="w-full gap-3 grid grid-cols-1 xl:grid-cols-2">
                          <Button variant={"outline"} className="w-full">
                            <MdOutlineModeEditOutline />
                            <p className="hidden xl:block">Edit</p>
                          </Button>
                          <Button variant={"destructive"} className="w-full">
                            <MdDeleteOutline />
                            <p className="hidden xl:block">Hapus</p>
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </div>
      </div>

      {/* background blur */}
      <div
        onClick={() => handleClose()}
        className={`fixed inset-0 z-40 bg-black/40 backdrop-blur-sm transition-all duration-300 ${
          isOpen
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0"
        }`}
      />

      {/* filter mobile */}
      <RemoveScroll
        enabled={isOpen}
        className={`fixed right-0 top-0 z-50 h-screen innet w-[85%] max-w-sm border-l bg-background p-6 shadow-2xl transition-all duration-300 overflow-y-auto flex flex-col justify-start gap-5 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex justify-between w-full">
          <p className="font-bold text-[1.1rem]">Filter</p>
          <button
            onClick={() => handleClose()}
            className="flex items-center justify-center"
          >
            <IoMdClose className="text-2xl" />
          </button>
        </div>

        <div className="flex flex-col w-full gap-3">
          <p className="text-[0.9rem]">Kategori</p>
          <Select
            value={kategori}
            onValueChange={(value) => {
              if (value === "empty" || value === "loading") return;
              setKategori(value);
            }}
          >
            <SelectTrigger className="w-full py-5 mb-4">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Kategori</SelectLabel>
                <SelectItem value="semua kategori">Semua Kategori</SelectItem>
                {/* loop kategori */}
                {isPendingCategories ? (
                  <SelectItem value="loading">Loading...</SelectItem>
                ) : isErrorCategories ? (
                  <SelectItem value="empty">Gagal memuat data</SelectItem>
                ) : categories.length === 0 ? (
                  <SelectItem value="empty">
                    Belum ada kategori yang ditambahkan
                  </SelectItem>
                ) : (
                  categories?.map((item: ICategory) => (
                    <SelectItem
                      key={item._id}
                      value={item.category}
                      className="capitalize"
                    >
                      {item.category}
                    </SelectItem>
                  ))
                )}
              </SelectGroup>
            </SelectContent>
          </Select>

          <p className="text-[0.9rem]">Subkategori</p>
          <Select
            value={subkategori}
            onValueChange={(value) => {
              if (value === "empty" || value === "loading") return;
              setSubkategori(value);
            }}
            disabled={kategori === "semua kategori"}
          >
            <SelectTrigger className="w-full py-5 mb-4">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Subkategori</SelectLabel>
                <SelectItem value="semua subkategori">
                  Semua Subkategori
                </SelectItem>
                {/* loop kategori */}
                {isPendingSubcategories ? (
                  <SelectItem value="loading">Loading...</SelectItem>
                ) : subcategories.length === 0 ? (
                  <SelectItem value="empty">
                    Belum ada subkategori yang ditambahkan
                  </SelectItem>
                ) : (
                  subcategories?.map((item: ISubcategory) => (
                    <SelectItem key={item._id} value={item.subcategory}>
                      {item.subcategory}
                    </SelectItem>
                  ))
                )}
              </SelectGroup>
            </SelectContent>
          </Select>

          <p className="text-[0.9rem]">Stok obat</p>
          <Select value={stok} onValueChange={(value) => setStok(value)}>
            <SelectTrigger className="w-full py-5 mb-4">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Stok</SelectLabel>
                <SelectItem value="semua stok">Semua Stok</SelectItem>
                <SelectItem value="stok cukup">Stok Cukup</SelectItem>
                <SelectItem value="hampir habis">
                  Hampir Habis / Habis
                </SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>

          <p className="text-[0.9rem]">Kadaluarsa</p>
          <Select
            value={kadaluarsa}
            onValueChange={(value) => setKadaluarsa(value)}
          >
            <SelectTrigger className="w-full py-5 mb-4">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Kadaluarsa</SelectLabel>
                <SelectItem value="aman">Tidak kadaluarsa</SelectItem>
                <SelectItem value="kadaluarsa">Kadaluarsa</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>

          <div className="w-full flex justify-end">
            <Button
              variant={"outline"}
              type="button"
              onClick={() => {
                setKategori("semua kategori");
                setSubkategori("semua subkategori");
                setStok("semua stok");
                setKadaluarsa("aman");
                setActiveFilter({
                  kategori: "semua kategori",
                  subkategori: "semua subkategori",
                  stok: "semua stok",
                  kadaluarsa: "aman",
                });
                setOpen(false);
              }}
              className="h-10 px-5"
            >
              Reset Filter
            </Button>
          </div>
        </div>
      </RemoveScroll>
    </div>
  );
};

export default AdminMedicines;
