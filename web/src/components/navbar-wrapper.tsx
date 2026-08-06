"use client"

import { useEffect, useState } from "react"
import { usePathname } from "next/navigation"
import Navbar from "@/components/navbar"

const NavbarWrapper = () => {
  const pathname = usePathname()
  const isHome = pathname === "/"
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    if (!isHome) return

    const onScroll = () => {
      const isScrolled = window.scrollY > 40
      setScrolled((prev) => (prev === isScrolled ? prev : isScrolled))
    }

    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [isHome])

  return <Navbar variant={isHome && !scrolled ? "transparent" : "solid"} />
}

export default NavbarWrapper
