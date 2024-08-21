'use client'

import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet"
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { navLinks } from '@/constants';
import { Button } from "../ui/button"



const MobileNav = () => {
  const pathname = usePathname()

  return (
    <header className="header">
      <Link href='/' className='flex items-center gap-2 md:py-2'>
        <Image
          src='/assets/images/logo-text.svg'
          alt='Logo'
          width={180}
          height={28}
        />
      </Link>

      <nav className="flex gap-2">
        <SignedIn>
          <UserButton afterSwitchSessionUrl="/" />
          <Sheet>
            <SheetTrigger>
              <Image
                src='/assets/icons/menu.svg'
                alt='Menu'
                width={32}
                height={32}
              />
            </SheetTrigger>
            <SheetContent className="sheet-content sm:w-64">
              <>
                <Image
                  src='/assets/images/logo-text.svg'
                  alt='Logo'
                  width={150}
                  height={20}
                />

                <ul className='header-nav_elements'>
                  {navLinks.map((link, index) => {
                    const isActive = link.route === pathname;

                    return (
                      <li
                        key={index}
                        className={`${isActive && 'gradient-text'} flex whitespace-nowrap text-dark-700`}
                      >
                        <Link href={link.route} className='sidebar-link'>
                          <Image
                            src={link.icon}
                            alt={link.label}
                            width={24}
                            height={24}
                          />
                          {link.label}
                        </Link>
                      </li>
                    )
                  })}
                </ul>
              </>
            </SheetContent>
          </Sheet>
        </SignedIn>
        <SignedOut>
          <Button asChild className='button bg-purple-gradient bg-cover'>
            <Link href='/sign-in'>Sign In</Link>
          </Button>
        </SignedOut>
      </nav>
    </header>
  )
}

export default MobileNav