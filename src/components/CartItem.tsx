import { useState, useEffect } from "react";
import { Trash2 } from "lucide-react";
import { NumericInput } from "@/components/NumericInput";
import { CartItem as CartItemType } from "@/types";
import { useCart } from "@/contexts/CartContext";
import { useDebouncedValue } from "@/hooks/useDebouncedValue";

interface CartItemProps {
  item: CartItemType;
}

export const CartItem: React.FC<CartItemProps> = ({ item }) => {
  const { id, title, price, image, quantity } = item;
  const [quantityInputValue, setQuantityInputValue] = useState(quantity);
  const { removeProductFromCart, updateProductQuantity } = useCart();

  const debouncedQuantity = useDebouncedValue(quantityInputValue, 500);

  const totalPrice = price * quantityInputValue;

  const handleRemoveProduct = () => {
    removeProductFromCart(id);
  };

  const handleUpdateProductQuantity = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setQuantityInputValue(Number(e.target.value));
  };

  useEffect(() => {
    if (debouncedQuantity !== quantity) {
      updateProductQuantity(id, debouncedQuantity);
    }
  }, [debouncedQuantity]);

  useEffect(() => {
    setQuantityInputValue(quantity);
  }, [quantity]);

  return (
    <div className="flex items-center justify-between gap-4 p-4 sm:grid sm:grid-cols-[auto,1fr,auto,auto]">
      <div className="relative hidden h-20 flex-shrink-0 sm:block sm:w-20">
        <img
          src={image}
          alt={title}
          className="h-20 w-20 rounded-md bg-white object-contain p-2"
        />
      </div>

      <div className="flex h-full w-[55dvw] flex-col justify-between self-start overflow-x-hidden sm:w-auto">
        <h3 className="truncate text-base font-semibold" title={title}>
          {title}
        </h3>
        <span className="text-sm sm:hidden">x{quantity}</span>
        <button
          type="button"
          className="mt-2 flex w-fit items-center gap-2 text-wallbitBlue sm:mt-0"
          onClick={handleRemoveProduct}
          aria-label="Eliminar del carrito"
        >
          <Trash2 className="size-4" />
          <span className="text-xs sm:text-sm">Eliminar del carrito</span>
        </button>
      </div>

      <div className="hidden sm:mt-0 sm:block">
        <NumericInput
          value={quantityInputValue}
          min={1}
          max={99}
          step={1}
          onChange={handleUpdateProductQuantity}
        />
      </div>

      <div className="flex w-28 flex-col items-end space-y-1">
        <span className="break-all text-sm">${price.toFixed(2)} u. </span>
        <span className="break-all text-base font-bold">
          ${totalPrice.toFixed(2)}
        </span>
      </div>
    </div>
  );
};
