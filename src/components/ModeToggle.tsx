import { MODE } from "@/constants/mode";
import { useCart } from "@/contexts/CartContext";

type ToggleButtonProps = {
  onClick: () => void;
  text: string;
};

const ToggleButton: React.FC<ToggleButtonProps> = ({ onClick, text }) => (
  <button
    type="button"
    className="text-wallbitBlue underline"
    onClick={onClick}
    aria-label="Botón divertido para pasar de junior a senior y viceversa."
  >
    {text}
  </button>
);

export const ModeToggle: React.FC = () => {
  const { mode, toggleMode } = useCart();

  return (
    <p className="mb-8 text-center text-lg text-gray-600 dark:text-gray-300">
      {mode === MODE.SENIOR ? (
        <>
          Esta es la tienda para devs de Wallbit. Si no programás en Assembler
          con Vim{" "}
          <ToggleButton
            onClick={toggleMode}
            text="este modo es mejor para vos."
          />
        </>
      ) : (
        <>
          Esta es la tienda para devs de Wallbit. Si ya tenés tres monitores y
          muchos leds rgb{" "}
          <ToggleButton
            onClick={toggleMode}
            text="subile la dificultad un poco."
          />
        </>
      )}
    </p>
  );
};
