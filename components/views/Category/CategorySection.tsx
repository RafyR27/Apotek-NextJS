"use client";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import BRAND from "@/dummy/brand";
import PRODUCTS from "@/dummy/products";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { BiSort } from "react-icons/bi";
import { IoMdClose } from "react-icons/io";
import { MdFilterList } from "react-icons/md";
import { RemoveScroll } from "react-remove-scroll";

const CategorySection = () => {
  const products = PRODUCTS;
  const brands = BRAND;


  const path = usePathname();

  const category = path.split("/").pop();

  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState("all");
  const [isOpen, setOpen] = useState(false);

  const handleCheckboxChange = (brand: string) => {
    setSelectedBrands((prev) =>
      prev.includes(brand)
        ? prev.filter((item) => item !== brand)
        : [...prev, brand],
    );
  };

  return (
    <div className="w-full min-h-screen lg:px-20 px-5">
      <Breadcrumb className="lg:py-7 py-5 font-medium">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/" className="text-primary">
              Home
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="/products" className="text-primary">
              Products
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage className="capitalize">{category}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      {/* Hero */}
      <div className="w-full h-50 rounded-2xl bg-primary"></div>

      {/* products */}
      <div className="w-full h-auto py-7">
        <div className="w-full flex gap-7">
          {/* filter */}
          <div className="w-1/5 bg-background rounded-md border px-3 text-[0.9rem] h-fit hidden lg:block">
            <p className="border-b py-3 font-bold">FILTERS</p>
            <p className="pt-3 font-medium">Brands</p>
            <div className="py-5 px-3 flex flex-col gap-3">
              {brands.map((item) => (
                <FieldGroup
                  key={item.key}
                  className="mx-auto w-full text-muted-foreground"
                >
                  <Field orientation="horizontal">
                    <Checkbox
                      id={item.key}
                      name="brands"
                      checked={selectedBrands.includes(item.key)}
                      onCheckedChange={() => handleCheckboxChange(item.key)}
                    />
                    <FieldLabel
                      className="cursor-pointer flex justify-between"
                      htmlFor={item.key}
                    >
                      {item.name}
                      <p>15</p>
                    </FieldLabel>
                  </Field>
                </FieldGroup>
              ))}
            </div>
          </div>
          {/* product */}
          <div className="lg:w-4/5 w-full bg-background">
            {/* title */}
            <div className="flex justify-between items-center py-3 gap-2 lg:gap-0">
              <p className=" font-bold">Products - Total Items (1675)</p>

              <Button
                variant="outline"
                className="bg-muted max-w-25 w-full lg:hidden flex items-center"
                onClick={() => setOpen(true)}
              >
                <MdFilterList />
                Filter
              </Button>

              <div className="max-w-50 w-full hidden lg:flex items-center gap-2">
                <p className="flex items-center gap-1 text-sm font-medium">
                  <BiSort />
                  Sort:
                </p>
                <Select
                  value={sortBy}
                  onValueChange={(value) => setSortBy(value)}
                >
                  <SelectTrigger className="w-full max-w-48">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Sort by</SelectLabel>
                      <SelectItem value="all">All</SelectItem>
                      <SelectItem value="price">Price</SelectItem>
                      <SelectItem value="featured">Featured</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* product card */}
            <div className="w-full grid lg:grid-cols-4 md:grid-cols-3 grid-cols-2 gap-x-5 gap-y-3">
              {products.map((product, indeks) => (
                <div
                  key={indeks}
                  className={cn(
                    "w-full min-h-55 max-h-80 border rounded-md p-3 text-[0.9rem] flex flex-col gap-2",
                    product.stock == 0 && "cursor-not-allowed",
                  )}
                >
                  <Image
                    src="/paramex.webp"
                    alt={product.name}
                    className={cn(
                      "w-full h-40 object-cover",
                      product.stock == 0 && "opacity-70",
                    )}
                    width={300}
                    height={300}
                  />
                  <div className="w-full flex flex-col justify-between">
                    <p
                      className={cn(
                        "w-full min-h-12 font-semibold line-clamp-2",
                        product.stock == 0 && "text-muted-foreground",
                      )}
                    >
                      {product.name}
                    </p>

                    <p
                      className={cn(
                        "text-[1.1rem] font-medium my-2",
                        product.stock == 0 && "text-muted-foreground",
                      )}
                    >
                      Rp. {product.price}
                    </p>

                    {product.stock == 0 ? (
                      <Button disabled>Out of Stock</Button>
                    ) : (
                      <Button>Add to cart</Button>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* pagination */}
            <div className="pt-7">
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious href="#" />
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink href="#">1</PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink href="#" isActive>
                      2
                    </PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink href="#">3</PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationEllipsis />
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationNext href="#" />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full h-65 flex justify-center items-center mb-7">
        <div className="lg:w-4/5 w-full h-50 bg-primary rounded-2xl"></div>
      </div>

      {/* blur background */}
      <div
        onClick={() => setOpen(false)}
        className={`fixed inset-0 z-40 bg-black/40 backdrop-blur-sm transition-all duration-300 lg:hidden ${
          isOpen
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0"
        }`}
      />

      {/* filter mobile */}
      <RemoveScroll
        enabled={isOpen}
        className={`fixed right-0 top-0 z-50 h-screen innet w-[85%] max-w-sm border-l bg-background p-6 shadow-2xl transition-all duration-300 lg:hidden overflow-y-auto flex flex-col justify-start gap-5 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex justify-between w-full">
          <p className="font-bold text-[1.1rem]">Filter</p>
          <button
            onClick={() => setOpen(false)}
            className="flex items-center justify-center"
          >
            <IoMdClose className="text-2xl" />
          </button>
        </div>

        <div className="flex w-full justify-between">
          <p className="flex items-center font-medium">Sort</p>
          <Select value={sortBy} onValueChange={(value) => setSortBy(value)}>
            <SelectTrigger className="w-full max-w-48">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Sort by</SelectLabel>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="price">Price</SelectItem>
                <SelectItem value="featured">Featured</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        <div>
          <p className="font-medium">Brands</p>
          <div className="py-3 px-5 flex flex-wrap gap-3 h-[50vh]">
            {brands.map((item) => (
              <FieldGroup
                key={item.key}
                className="mx-auto w-full text-muted-foreground"
              >
                <Field orientation="horizontal">
                  <Checkbox
                    id={item.key}
                    name="brands"
                    checked={selectedBrands.includes(item.key)}
                    onCheckedChange={() => handleCheckboxChange(item.key)}
                  />
                  <FieldLabel
                    className="cursor-pointer flex justify-between"
                    htmlFor={item.key}
                  >
                    {item.name}
                    <p>15</p>
                  </FieldLabel>
                </Field>
              </FieldGroup>
            ))}
          </div>
        </div>
      </RemoveScroll>
    </div>
  );
};

export default CategorySection;
