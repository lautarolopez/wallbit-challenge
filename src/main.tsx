import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { CartProvider } from "@/contexts/CartContext.tsx";
import { ToastProvider } from "@/components/ToastProvider.tsx";
import App from "@/App.tsx";
import "@/index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ToastProvider>
      <CartProvider>
        <App />
      </CartProvider>
    </ToastProvider>
  </StrictMode>,
);
