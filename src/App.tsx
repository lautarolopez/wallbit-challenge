import { ThemeToggle } from "@/components/ThemeToggle";
import { Logo } from "@/components/Logo";
import { CartHeader } from "@/components/CartHeader";
import { Cart } from "@/components/Cart";
import { CartButton } from "./components/CartButton";

function App() {
  return (
    <div className="min-h-screen bg-lightBackground transition-colors duration-200 dark:bg-black">
      <CartButton />
      <ThemeToggle />
      <main className="container mx-auto flex h-screenDynamic w-screenDynamic flex-col items-center justify-center text-black dark:text-white">
        <Logo />
        <p className="mb-8 text-lg text-gray-600 dark:text-gray-300">
          Carrito para devs. Si no sabés el id de los productos todavía sos muy
          junior.
        </p>
        <div className="flex w-full max-w-[900px] flex-col">
          <CartHeader />
          <Cart />
        </div>
      </main>
    </div>
  );
}

export default App;
