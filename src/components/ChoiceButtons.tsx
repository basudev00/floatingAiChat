import { Button } from "./ui/button";

interface Choice {
  id: string;
  label: string;
  icon?: React.ReactNode;
}

interface ChoiceButtonsProps {
  choices: Choice[];
  onSelect: (id: string) => void;
}

export const ChoiceButtons = ({ choices, onSelect }: ChoiceButtonsProps) => {
  return (
    <div className="flex flex-wrap gap-2 animate-fade-in">
      {choices.map((choice) => (
        <Button
          key={choice.id}
          variant="outline"
          onClick={() => onSelect(choice.id)}
          className="bg-card hover:bg-primary-light hover:text-primary hover:border-primary transition-all"
        >
          {choice.icon && <span className="mr-2">{choice.icon}</span>}
          {choice.label}
        </Button>
      ))}
    </div>
  );
};
