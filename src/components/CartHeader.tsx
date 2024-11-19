import { Plus } from "lucide-react";
import { NumericInput } from "@/components/NumericInput";
import { Input } from "@/components/Input";
import { useCart } from "@/contexts/CartContext";
import { useState } from "react";
import { Spinner } from "@/components/Spinner";
import { SelectInput } from "@/components/SelectInput";

export const CartHeader: React.FC = () => {
  const [productId, setProductId] = useState<string>("");
  const [quantity, setQuantity] = useState<number>(1);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { addProductToCart, mode, products } = useCart();

  const handleAddProduct = async () => {
    setIsLoading(true);
    await addProductToCart(Number(productId), quantity);
    setProductId("");
    setQuantity(1);
    setIsLoading(false);
  };

  const handleProductIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProductId(e.target.value);
  };

  const handleProductIdSelection = (
    e: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    setProductId(e.target.value);
  };

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuantity(Number(e.target.value));
  };

  const productOptions = products.map((product) => ({
    label: product.title,
    value: product.id,
  }));

  return (
    <div className="mt-4 rounded-lg bg-stone-200 p-4 dark:bg-containerBackground">
      <div className="flex flex-col items-center gap-4 sm:flex-row">
        <div className="flex flex-row gap-4 sm:flex-1">
          {mode === "junior" ? (
            <SelectInput
              value={productId}
              onChange={handleProductIdSelection}
              options={productOptions}
            />
          ) : (
            <Input
              placeholder="ID del producto"
              value={productId}
              onChange={handleProductIdChange}
            />
          )}
          <NumericInput
            value={quantity}
            onChange={handleQuantityChange}
            min={1}
          />
        </div>
        <div className="flex flex-col items-center justify-center self-end sm:self-auto">
          <button
            type="button"
            onClick={handleAddProduct}
            disabled={isLoading || !productId}
            className="flex w-fit items-center space-x-2 rounded-full bg-wallbitBlue p-2 text-white hover:bg-blue-600 focus:ring focus:ring-blue-300 disabled:cursor-not-allowed disabled:opacity-50"
            aria-label="Agregar producto al carrito"
          >
            {isLoading ? <Spinner /> : <Plus className="size-7" />}
          </button>
          <span className="font-poppins font-semibold">
            <span className="block w-[80px] text-center font-poppins font-semibold">
              {isLoading ? "Cargando" : "Agregar"}
            </span>
          </span>
        </div>
      </div>
    </div>
  );
};
