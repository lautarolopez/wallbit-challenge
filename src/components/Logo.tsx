import { motion } from "motion/react";

export const Logo: React.FC = () => {
  return (
    <motion.a
      className="flex w-fit items-center"
      href="https://wallbit.io"
      target="_blank"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.1, ease: "easeOut" }}
    >
      <motion.img
        src="/images/logo.png"
        alt="Logo de Wallbit"
        className="size-12"
        initial={{ rotate: -10 }}
        animate={{ rotate: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      />
      <motion.span
        className="font-poppins text-4xl font-semibold text-black dark:text-white"
        initial={{ opacity: 0, translateX: -10 }}
        animate={{ opacity: 1, translateX: 0 }}
        transition={{ delay: 0.2, duration: 0.5, ease: "easeOut" }}
      >
        wallbit
      </motion.span>
    </motion.a>
  );
};
