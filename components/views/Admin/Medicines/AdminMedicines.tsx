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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PRODUCTS from "@/dummy/products";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { useState } from "react";
import { BiSearch } from "react-icons/bi";
import { FiPlus } from "react-icons/fi";
import { IoGridOutline } from "react-icons/io5";
import {
  MdDeleteOutline,
  MdOutlineModeEditOutline,
  MdOutlineTableRows,
} from "react-icons/md";

const AdminMedicines = () => {
  const { state } = useSidebar();

  const [kategori, setKategori] = useState("semua kategori");
  const [subkategori, setSubkategori] = useState("semua subkategori");
  const [stok, setStok] = useState("semua stok");
  const [kadaluarsa, setKadaluarsa] = useState("aman");

  const [view, setView] = useState("grid");

  const products = PRODUCTS;

  return (
    <div className="w-full min-h-screen py-7 bg-background">
      <div className="w-full flex justify-between items-center">
        <h1 className="font-bold text-3xl">Data Obat</h1>
        <Button className="py-5 px-4">
          <FiPlus />
          Tambah Obat
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
              {/* <Icon size={16} className="text-gray-400" /> */}
            </div>
            <div className="text-2xl font-bold text-gray-900 mb-1">8</div>
          </div>

          {/* Stok hampir habis */}
          <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-medium text-gray-500">
                Stok Hampir Habis
              </span>
              {/* <Icon size={16} className="text-gray-400" /> */}
            </div>
            <div className="text-2xl font-bold text-gray-900 mb-1">3</div>
            <div className="text-xs text-gray-400">Di bawah stok minimum</div>
          </div>

          {/* Kadaluarsa */}
          <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-medium text-gray-500">
                Kadaluarsa Segera
              </span>
              {/* <Icon size={16} className="text-gray-400" /> */}
            </div>
            <div className="text-2xl font-bold text-gray-900 mb-1">0</div>
            <div className="text-xs text-gray-400">Dalam 30 hari</div>
          </div>

          {/* produk aktif */}
          <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-medium text-gray-500">
                Produk Aktif
              </span>
              {/* <Icon size={16} className="text-gray-400" /> */}
            </div>
            <div className="text-2xl font-bold text-gray-900 mb-1">7</div>
            <div className="text-xs text-gray-400">Dari 8 produk obat</div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="w-full flex flex-col h-auto">
          <div className="w-full flex flex-col lg:flex-row lg:justify-between gap-x-5 gap-y-3 mb-5 overflow-hidden min-w-0">
            {/* search */}
            <InputGroup
              className={cn(
                "h-10",
                state === "collapsed" ? "xl:max-w-md" : "xl:max-w-sm",
              )}
            >
              <InputGroupInput placeholder="Cari nama obat, merek, dll" />
              <InputGroupAddon>
                <BiSearch />
              </InputGroupAddon>
            </InputGroup>

            {/* select & tabs */}
            <div className=" w-full flex flex-col md:flex-col xl:flex-row gap-3">
              <div className="flex gap-3 w-full">
                <Select
                  value={kategori}
                  onValueChange={(value) => setKategori(value)}
                >
                  <SelectTrigger className="w-full py-5">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Kategori</SelectLabel>
                      <SelectItem value="semua kategori">
                        Semua Kategori
                      </SelectItem>
                      {/* loop kategori */}
                      <SelectItem value="price">Price</SelectItem>
                      <SelectItem value="featured">Featured</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>

                <Select
                  value={subkategori}
                  onValueChange={(value) => setSubkategori(value)}
                  disabled={kategori === "semua kategori"}
                >
                  <SelectTrigger className="w-full py-5">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Subkategori</SelectLabel>
                      <SelectItem value="semua subkategori">
                        Semua Subkategori
                      </SelectItem>
                      {/* loop kategori */}
                      <SelectItem value="price">Price</SelectItem>
                      <SelectItem value="featured">Featured</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex gap-3 w-full">
                <Select value={stok} onValueChange={(value) => setStok(value)}>
                  <SelectTrigger className="w-full py-5">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Stok</SelectLabel>
                      <SelectItem value="semua stok">Semua Stok</SelectItem>
                      {/* loop kategori */}
                      <SelectItem value="stok cukup">Stok Cukup</SelectItem>
                      <SelectItem value="hampir habis">
                        Hampir Habis / Habis
                      </SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>

                <Select
                  value={kadaluarsa}
                  onValueChange={(value) => setKadaluarsa(value)}
                >
                  <SelectTrigger className="max-w-[40%] lg:w-full py-5">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Kadaluarsa</SelectLabel>
                      <SelectItem value="aman">Tidak kadaluarsa</SelectItem>
                      {/* loop kategori */}
                      <SelectItem value="kadaluarsa">Kadaluarsa</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>

                <Tabs
                  value={view}
                  onValueChange={setView}
                  className="w-full items-end xl:w-auto"
                >
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
          </div>

          {view === "grid" ? (
            <div className="grid 2xl:grid-cols-5 xl:grid-cols-4 md:grid-cols-3 grid-cols-2 w-full gap-5">
              {/* card */}
              {products.map((item, index) => (
                <div
                  key={index}
                  className="w-full min-h-60 border-2 hover:border-foreground/20 rounded-md flex flex-col p-3 gap-3"
                >
                  <Image
                    src={item.image}
                    alt={item.name}
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
                      {item.name}
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
                    <TableHead>Subkategori</TableHead>
                    <TableHead>Harga</TableHead>
                    <TableHead>Satuan</TableHead>
                    <TableHead>Kadaluarsa</TableHead>
                    <TableHead>Stock</TableHead>
                    <TableHead>Aksi</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {products.map((item, index) => (
                    <TableRow
                      key={index}
                      className="*:border-border [&>:not(:last-child)]:border-r"
                    >
                      <TableCell className="w-50 ">
                        <div className="truncate capitalize max-w-50">
                          {item.name}
                        </div>
                      </TableCell>
                      <TableCell className="capitalize">
                        {item.category}
                      </TableCell>
                      <TableCell className="capitalize">
                        {item.subcategory}
                      </TableCell>
                      <TableCell className="capitalize">
                        Rp. {item.price.toLocaleString("id-ID")}
                      </TableCell>
                      <TableCell className="capitalize">
                        {item.unitLabel}
                      </TableCell>
                      <TableCell className="capitalize">
                        {item.expiryDate}
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
                        <div className="w-full gap-3 grid grid-cols-1 lg:grid-cols-2">
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
    </div>
  );
};

export default AdminMedicines;
