import { useState } from "react";
import { useCart } from "@/contexts/CartContext";
import { ShoppingCart } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export const CartButton: React.FC = () => {
  const { totalItems } = useCart();
  const [isAnimating, setIsAnimating] = useState(false);

  const handleClick = () => {
    setIsAnimating(true);
    setTimeout(() => {
      setIsAnimating(false);
    }, 500);
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className="fixed right-16 top-4 rounded-lg bg-gray-200 p-2 transition-colors hover:bg-gray-300 dark:bg-containerBackground dark:hover:bg-containerHover"
      aria-label="No hace nada. Solo una animación de un ícono de carrito"
    >
      <div className="relative size-5">
        <AnimatePresence>
          {!isAnimating ? (
            <motion.div
              key="cart-icon"
              initial={{ opacity: 1, x: 0 }}
              exit={{
                opacity: 0,
                x: 50,
                transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
              }}
              className="absolute inset-0"
            >
              <ShoppingCart className="size-5 text-black dark:text-white" />
            </motion.div>
          ) : (
            <motion.div
              key="placeholder"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="absolute inset-0"
            />
          )}
        </AnimatePresence>
      </div>
      {totalItems > 0 && (
        <motion.span
          className="absolute -right-1 -top-1 flex size-4 items-center justify-center rounded-full bg-wallbitBlue text-[10px] font-bold text-white"
          animate={
            isAnimating
              ? {
                  x: [0, -2, 2, -2, 2, 0],
                  transition: {
                    duration: 0.5,
                    times: [0, 0.2, 0.4, 0.6, 0.8, 1],
                  },
                }
              : {}
          }
        >
          {totalItems}
        </motion.span>
      )}
    </button>
  );
};
