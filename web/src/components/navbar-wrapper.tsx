"use client"

import { usePathname } from "next/navigation"
import Navbar from "@/components/navbar"

const NavbarWrapper = () => {
  const pathname = usePathname()
  return <Navbar variant={pathname === "/" ? "transparent" : "solid"} />
}

export default NavbarWrapper
