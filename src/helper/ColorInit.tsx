import { useEffect } from "react";

interface ColorInitProps {
    color: boolean;
}

const ColorInit = ({ color }: ColorInitProps) => {
    useEffect(() => {
        if (color === true) {
            // localStorage.setItem('theme', 'color-two');
            document.documentElement.classList.add("color-two");
        } else {
            document.documentElement.classList.remove("color-two");
        }
    }, [color]);
    return null;
};

export default ColorInit;
