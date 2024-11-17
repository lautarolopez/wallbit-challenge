import { Loader2Icon } from "lucide-react";

export const Spinner: React.FC = () => {
  return (
    <div className="flex items-center justify-center">
      <Loader2Icon className="size-7 animate-spin" />
    </div>
  );
};
