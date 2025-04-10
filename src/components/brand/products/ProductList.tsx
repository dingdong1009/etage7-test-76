
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ProductFilters } from "./ProductFilters";
import { ProductTable } from "./ProductTable";
import { ColorOption, Product } from "../../../types/product";

interface ProductListProps {
  products: Product[];
  colorOptions: ColorOption[];
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  categoryFilter: string;
  setCategoryFilter: (category: string) => void;
  seasonFilter: string;
  setSeasonFilter: (season: string) => void;
  statusFilter: string;
  setStatusFilter: (status: string) => void;
  handleSort: (key: string) => void;
  sortConfig: { key: string, direction: string };
  toggleProductStatus: (id: number, newStatus: string) => void;
  deleteProduct: (id: number) => void;
  onEditProduct: () => void;
}

export const ProductList = ({
  products,
  colorOptions,
  searchQuery,
  setSearchQuery,
  categoryFilter,
  setCategoryFilter,
  seasonFilter,
  setSeasonFilter,
  statusFilter,
  setStatusFilter,
  handleSort,
  sortConfig,
  toggleProductStatus,
  deleteProduct,
  onEditProduct
}: ProductListProps) => {
  return (
    <Card className="border border-gray-200">
      <CardHeader>
        <CardTitle className="text-1xl md:text-2xl uppercase font-thin">Product Catalog</CardTitle>
      </CardHeader>
      <CardContent>
        <ProductFilters
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          categoryFilter={categoryFilter}
          setCategoryFilter={setCategoryFilter}
          seasonFilter={seasonFilter}
          setSeasonFilter={setSeasonFilter}
          statusFilter={statusFilter}
          setStatusFilter={setStatusFilter}
        />

        <ProductTable
          products={products}
          colorOptions={colorOptions}
          handleSort={handleSort}
          sortConfig={sortConfig}
          toggleProductStatus={toggleProductStatus}
          deleteProduct={deleteProduct}
          onEditProduct={onEditProduct}
        />
      </CardContent>
    </Card>
  );
};
