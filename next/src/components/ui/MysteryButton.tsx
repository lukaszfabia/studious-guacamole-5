import React, { useRef } from 'react';
import { Button, Spinner } from '@nextui-org/react';
import confetti from 'canvas-confetti';

interface MysteryButtonProps {
    isCreating: boolean;
}

export const MysteryButton: React.FC<MysteryButtonProps> = ({ isCreating }) => {
    const buttonRef = useRef<HTMLButtonElement>(null);

    const handleConfetti = () => {
        confetti({
            particleCount: 100,
            spread: 70,
            origin: {
                x: 0.5,
                y: 0.5,
            },
            colors: ["#FFC700", "#FF0000", "#00FF00", "#0000FF"],
        });
    };

    const handleClick = () => {
        if (!isCreating) {
            handleConfetti();
        }
    };

    return (
        <Button
            ref={buttonRef}
            color="primary"
            type="submit"
            isDisabled={isCreating}
            onPress={handleClick}
            className="relative overflow-visible rounded-full hover:-translate-y-1 px-12 shadow-xl bg-background/30 after:content-[''] after:absolute after:rounded-full after:inset-0 after:bg-background/40 after:z-[-1] after:transition after:!duration-500 hover:after:scale-150 hover:after:opacity-0"
        >
            {isCreating ? <Spinner size="sm" /> : "Submit"}
        </Button>
    );
};
