import { Plus } from "lucide-react";
import { NumericInput } from "@/components/NumericInput";
import { RegularInput } from "@/components/RegularInput";
import { useCart } from "@/contexts/CartContext";
import { useState } from "react";
import { Spinner } from "@/components/Spinner";

export const CartHeader: React.FC = () => {
  const [productId, setProductId] = useState<string>("");
  const [quantity, setQuantity] = useState<number>(1);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { addProductToCart } = useCart();

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

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuantity(Number(e.target.value));
  };

  return (
    <div className="mt-4 rounded-lg bg-stone-200 p-4 dark:bg-containerBackground">
      <div className="flex items-center space-x-4">
        <RegularInput
          placeholder="ID del producto"
          value={productId}
          onChange={handleProductIdChange}
        />
        <NumericInput value={quantity} onChange={handleQuantityChange} />
        <div className="flex flex-col items-center justify-center">
          <button
            onClick={handleAddProduct}
            disabled={isLoading}
            className="w-fit rounded-full bg-wallbitBlue p-2 text-white hover:bg-blue-600 focus:ring focus:ring-blue-300"
          >
            {isLoading ? <Spinner /> : <Plus className="size-7" />}
          </button>
          <span className="font-poppins font-semibold">
            {isLoading ? "Cargando..." : "Agregar"}
          </span>
        </div>
      </div>
    </div>
  );
};
