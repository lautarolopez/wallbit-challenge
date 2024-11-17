import React, { useState, useEffect } from "react";
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

  const debouncedQuantity = useDebouncedValue(quantityInputValue, 1000);

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

  return (
    <li className="grid items-center gap-4 p-4 sm:grid-cols-[auto,1fr,auto,auto]">
      <div className="relative h-20 w-full flex-shrink-0 sm:w-20">
        <img
          src={image}
          alt={title}
          className="h-20 w-20 rounded-md bg-white object-contain p-2"
        />
      </div>

      <div className="flex h-full flex-col justify-between overflow-x-hidden">
        <h3 className="truncate text-base font-semibold" title={title}>
          {title}
        </h3>
        <button
          className="flex items-center gap-2"
          type="button"
          onClick={handleRemoveProduct}
        >
          <Trash2 className="h-4 w-4" />
          <span>Eliminar</span>
        </button>
      </div>

      <div className="mt-2 sm:mt-0">
        <NumericInput
          value={quantityInputValue}
          min={1}
          max={99}
          step={1}
          onChange={handleUpdateProductQuantity}
        />
      </div>

      <div className="flex w-28 flex-col items-start space-y-1 sm:items-end">
        <span className="break-all text-sm">${price.toFixed(2)} u.</span>
        <span className="break-all text-base font-bold">
          ${totalPrice.toFixed(2)}
        </span>
      </div>
    </li>
  );
};
