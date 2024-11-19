import { ThemeToggle } from "@/components/ThemeToggle";
import { Logo } from "@/components/Logo";
import { CartHeader } from "@/components/CartHeader";
import { Cart } from "@/components/Cart";
import { CartButton } from "@/components/CartButton";
import { ModeToggle } from "@/components/ModeToggle";

function App() {
  return (
    <div className="min-h-screen bg-lightBackground transition-colors duration-200 dark:bg-black">
      <CartButton />
      <ThemeToggle />
      <main className="mx-auto flex h-screenDynamic w-screenDynamic flex-col items-center justify-center px-8 py-16 text-black dark:text-white">
        <Logo />
        <ModeToggle />
        <div className="flex w-full max-w-[900px] flex-col">
          <CartHeader />
          <Cart />
        </div>
      </main>
    </div>
  );
}

export default App;
