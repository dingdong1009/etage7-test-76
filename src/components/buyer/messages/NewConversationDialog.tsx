
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { BrandSelector } from "./BrandSelector";
import { CollectionSelector } from "./CollectionSelector";
import { ProductSelector } from "./ProductSelector";
import { MessageTypeSelector } from "./MessageTypeSelector";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";

type NewConversationDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export const NewConversationDialog = ({ open, onOpenChange }: NewConversationDialogProps) => {
  const [step, setStep] = useState<"brand" | "collection" | "product" | "type">("brand");
  const [selectedBrand, setSelectedBrand] = useState<string | null>(null);
  const [selectedCollection, setSelectedCollection] = useState<string | null>(null);
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);
  const [messageType, setMessageType] = useState<string | null>(null);

  const handleNext = () => {
    if (step === "brand" && selectedBrand) {
      setStep("collection");
    } else if (step === "collection" && selectedCollection) {
      setStep("product");
    } else if (step === "product" && selectedProducts.length > 0) {
      setStep("type");
    }
  };

  const handleBack = () => {
    if (step === "collection") {
      setStep("brand");
    } else if (step === "product") {
      setStep("collection");
    } else if (step === "type") {
      setStep("product");
    }
  };

  const handleStartConversation = () => {
    console.log({
      brand: selectedBrand,
      collection: selectedCollection,
      products: selectedProducts,
      messageType
    });
    onOpenChange(false);
    // Reset state
    setStep("brand");
    setSelectedBrand(null);
    setSelectedCollection(null);
    setSelectedProducts([]);
    setMessageType(null);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="text-xl font-light">New Conversation</DialogTitle>
          <DialogDescription>
            Start a conversation with a brand to inquire about their products.
          </DialogDescription>
        </DialogHeader>

        <Tabs value={step} className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger 
              value="brand" 
              onClick={() => step !== "brand" && selectedBrand && setStep("brand")}
              disabled={!selectedBrand && step !== "brand"}
              className="text-xs"
            >
              BRAND
            </TabsTrigger>
            <TabsTrigger 
              value="collection" 
              onClick={() => step !== "collection" && selectedCollection && setStep("collection")}
              disabled={!selectedCollection && step !== "collection"}
              className="text-xs"
            >
              COLLECTION
            </TabsTrigger>
            <TabsTrigger 
              value="product" 
              onClick={() => step !== "product" && selectedProducts.length > 0 && setStep("product")}
              disabled={selectedProducts.length === 0 && step !== "product"}
              className="text-xs"
            >
              PRODUCTS
            </TabsTrigger>
            <TabsTrigger 
              value="type" 
              onClick={() => step !== "type" && messageType && setStep("type")}
              disabled={!messageType && step !== "type"}
              className="text-xs"
            >
              MESSAGE TYPE
            </TabsTrigger>
          </TabsList>
        </Tabs>

        <div className="py-4">
          {step === "brand" && (
            <BrandSelector 
              selectedBrand={selectedBrand} 
              onSelectBrand={setSelectedBrand}
            />
          )}
          
          {step === "collection" && (
            <CollectionSelector 
              brandId={selectedBrand as string}
              selectedCollection={selectedCollection} 
              onSelectCollection={setSelectedCollection}
            />
          )}
          
          {step === "product" && (
            <ProductSelector 
              brandId={selectedBrand as string}
              collectionId={selectedCollection as string}
              selectedProducts={selectedProducts} 
              onSelectProducts={setSelectedProducts}
            />
          )}
          
          {step === "type" && (
            <MessageTypeSelector 
              selectedType={messageType} 
              onSelectType={setMessageType}
            />
          )}
        </div>

        <Separator />
        
        <DialogFooter className="flex flex-col sm:flex-row sm:justify-between gap-4">
          <div>
            {step !== "brand" && (
              <Button 
                type="button" 
                variant="outline" 
                className="rounded-none"
                onClick={handleBack}
              >
                Back
              </Button>
            )}
          </div>
          <div className="flex gap-2">
            <Button 
              type="button" 
              variant="outline" 
              className="rounded-none"
              onClick={() => {
                onOpenChange(false);
                setStep("brand");
                setSelectedBrand(null);
                setSelectedCollection(null);
                setSelectedProducts([]);
                setMessageType(null);
              }}
            >
              Cancel
            </Button>
            {step !== "type" ? (
              <Button 
                type="button"
                className="bg-black hover:bg-gray-800 text-white rounded-none"
                disabled={
                  (step === "brand" && !selectedBrand) || 
                  (step === "collection" && !selectedCollection) || 
                  (step === "product" && selectedProducts.length === 0)
                }
                onClick={handleNext}
              >
                Next
              </Button>
            ) : (
              <Button 
                type="button"
                className="bg-black hover:bg-gray-800 text-white rounded-none"
                disabled={!messageType}
                onClick={handleStartConversation}
              >
                Start Conversation
              </Button>
            )}
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
