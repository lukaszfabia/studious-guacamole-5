import { FC } from "react";

export const Navbar: FC = () => {
    return (
        <header className="p-5 bg-slate-900">
            <nav className="flex justify-between">
                <div>
                    <h1 className="font-extrabold text-2xl">Logo</h1>
                </div>
                <ul className="gap-2 flex items-center">
                    <li>Home</li>
                    <li>About</li>
                    <li>Docs</li>
                </ul>
            </nav>
        </header>
    )
}