import { FC } from "react";

const Button: FC<{ text: String, handler: () => void }> = ({ text, handler }) => {
    return (
        <>
            <button
                onClick={handler}
                className="w-14 rounded-lg shadow-lg border transition-transform hover:scale-110 font-semibold p-3 focus:dark:bg-fuchsia-500">
                {text}
            </button>
        </>
    )
}

export default Button;