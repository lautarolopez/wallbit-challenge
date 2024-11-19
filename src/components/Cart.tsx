import { AnimatePresence, motion } from "motion/react";
import { ShoppingCart } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { CartItem } from "@/components/CartItem";
import { formatDate } from "@/utils/date";

export const Cart: React.FC = () => {
  const { cartItems, cartCreatedAt, totalCost, totalItems } = useCart();
  return (
    <div className="mt-4 rounded-md bg-stone-200 p-4 dark:bg-containerBackground">
      {!Boolean(cartItems.length) ? (
        <div className="flex flex-col items-center justify-center gap-4 py-12">
          <ShoppingCart className="size-14" />
          <span className="font-poppins text-lg font-semibold">
            El carrito está vacío
          </span>
        </div>
      ) : (
        <>
          <span className="font-poppins">
            Carrito iniciado el {formatDate(cartCreatedAt)}
          </span>
          <ul className="max-h-[35dvh] overflow-y-auto scrollbar-thin scrollbar-track-white scrollbar-thumb-stone-400 dark:scrollbar-track-containerHover dark:scrollbar-thumb-black sm:max-h-[45dvh]">
            <AnimatePresence>
              {cartItems.map((item, index) => (
                <motion.li
                  key={`${item.id}_${item.title}`}
                  initial={{ opacity: 0, translateY: 20 }}
                  animate={{ opacity: 1, translateY: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  exit={{ opacity: 0, translateY: -20 }}
                  className="mb-2"
                >
                  <CartItem item={item} />
                </motion.li>
              ))}
            </AnimatePresence>
          </ul>
          <div className="mt-4 flex justify-between">
            <span className="font-poppins text-lg font-semibold">
              Artículos: {totalItems}
            </span>
            <span className="font-poppins text-lg font-semibold">
              Total: ${totalCost.toFixed(2)}
            </span>
          </div>
        </>
      )}
    </div>
  );
};
