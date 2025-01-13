import React, { FC } from "react"
import Footer from "./Footer"
import { MyNavbar as Navbar } from "./Navbar"

export const Layout: FC<{ children: React.ReactNode }> = ({ children }) => {
    return (
        <>
            <Navbar />
            <main className="py-52 min-h-screen px-10">
                {children}
            </main>
            <Footer />
        </>
    )
}