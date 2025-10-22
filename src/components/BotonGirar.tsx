import { Button } from "@/components/ui/button";

interface BotonGirarProps {
  onClick: () => void;
  disabled: boolean;
}

export const BotonGirar = ({ onClick, disabled }: BotonGirarProps) => {
  return (
    <Button
      onClick={onClick}
      disabled={disabled}
      size="lg"
      className="bg-secondary hover:bg-secondary/90 text-secondary-foreground font-bold text-xl px-12 py-8 rounded-full transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_10px_30px_-10px_hsl(var(--secondary)/0.5)] hover:shadow-[0_15px_40px_-10px_hsl(var(--secondary)/0.7)]"
    >
      Gira la ruleta, mi amor ❤️
    </Button>
  );
};
