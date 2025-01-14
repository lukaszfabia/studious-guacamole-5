import { Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, Button } from "@nextui-org/react";



export const MyNavbar = () => {
    return (
        <Navbar>
            <NavbarBrand>
            </NavbarBrand>
            <NavbarContent className="hidden sm:flex gap-4" justify="center">
                <NavbarItem>
                    <Link color="foreground" href="/">
                        Home
                    </Link>
                </NavbarItem>
                <NavbarItem>
                    <Link color="foreground" href="/notes/new">
                        Create new note
                    </Link>
                </NavbarItem>
                <NavbarItem>
                    <Link aria-current="page" color="foreground" href="/notes">
                        Your notes
                    </Link>
                </NavbarItem>
            </NavbarContent>
            <NavbarContent justify="end">
                <NavbarItem className="hidden lg:flex">
                    <Link href="#">Login</Link>
                </NavbarItem>
                <NavbarItem>
                    <Button as={Link} color="primary" href="#" variant="flat">
                        Sign Up
                    </Button>
                </NavbarItem>
            </NavbarContent>
        </Navbar>
    )
}