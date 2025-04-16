
import { Product } from "../../types/product";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";

interface QuickViewModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
  onToggleFavorite: (productId: string) => void;
}

export const QuickViewModal = ({ 
  product, 
  isOpen, 
  onClose,
  onToggleFavorite
}: QuickViewModalProps) => {
  if (!product) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-3xl p-0 overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-2">
          <div className="aspect-[3/4] bg-gray-50 flex items-center justify-center">
            <div className="text-gray-400 text-xs">{product.imagePlaceholder}</div>
          </div>
          <div className="p-6 space-y-4">
            <DialogHeader>
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wide">
                    {product.category}{product.subCategory ? ` / ${product.subCategory}` : ''}
                  </p>
                  <DialogTitle className="font-light tracking-tight mt-1">{product.name}</DialogTitle>
                </div>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="h-8 w-8 rounded-full bg-white border border-gray-200 hover:bg-gray-50"
                  onClick={() => onToggleFavorite(product.id)}
                >
                  <Heart 
                    size={16} 
                    className={product.favorite ? "fill-black text-black" : "text-gray-600"}
                  />
                </Button>
              </div>
            </DialogHeader>

            <div className="space-y-4">
              <div>
                <h3 className="font-medium text-sm mb-1">Price</h3>
                <p className="text-lg font-light">{product.price}</p>
              </div>

              <div>
                <h3 className="font-medium text-sm mb-1">Material</h3>
                <p className="font-light">{product.material}</p>
              </div>

              <div>
                <h3 className="font-medium text-sm mb-1">Season</h3>
                <p className="font-light">{product.season}</p>
              </div>

              <div>
                <h3 className="font-medium text-sm mb-1">Color</h3>
                <p className="font-light">{product.color}</p>
              </div>

              <div className="flex justify-between items-center pt-2">
                <p className={`text-sm ${product.availability === "In Stock" ? "text-gray-500" : "text-gray-400"}`}>
                  {product.availability}
                </p>
                {product.minimumOrder && (
                  <p className="text-sm text-gray-500">Min. order: {product.minimumOrder} units</p>
                )}
              </div>
            </div>

            <div className="pt-4 flex justify-between">
              <Button variant="outline" onClick={onClose}>
                Close
              </Button>
              <Button className="bg-black text-white hover:bg-gray-800">
                Add to Bag
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
