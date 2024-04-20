import React from "react";
import { Button } from "./ui/button";

interface ToggleFormButtonProps {
  onClick: () => void;
}

const ToggleFormButton = ({ onClick }: ToggleFormButtonProps) => {
  return (
    <Button className="mb-2" onClick={onClick}>
      Toggle Form
    </Button>
  );
};

export default ToggleFormButton;
