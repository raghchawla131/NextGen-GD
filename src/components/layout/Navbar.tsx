import React from 'react'
import { Button } from '../ui/button'
import { ModeToggle } from '../theme/mode-toggle'
import NavLinks from './NavLinks'

const Navbar = () => {
  return (
    <>
      <nav className="hidden md:flex items-center justify-between px-6 py-4 border-b bg-background shadow-sm">
        <div className="text-xl font-bold text-foreground">
          NextGen GD
        </div>

        <NavLinks />

        <div className='flex items-center gap-3'>
          <ModeToggle />
          <Button>
            Login
          </Button>
        </div>
      </nav>
    </>
  )
}

export default Navbar