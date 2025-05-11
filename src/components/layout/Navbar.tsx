import { Button } from '../ui/button'
import { ModeToggle } from '../theme/mode-toggle'
import NavLinks from './NavLinks'
import Container from './Container'

const Navbar = () => {
  return (
    <>
      <nav className="w-full border-b shadow-sm py-4 bg-background">
        <Container>
          <div className="flex items-center justify-between">
            <div className="text-xl font-bold text-foreground">
              NextGen GD
            </div>

            <NavLinks />

            <div className="flex items-center gap-3">
              <ModeToggle />
              <Button>
                Login
              </Button>
            </div>
          </div>
        </Container>
      </nav>
    </>
  )
}

export default Navbar