import { Button } from '../ui/button'
// import { ModeToggle } from '../theme/mode-toggle'
import Container from './Container'
import { NavItems } from './NavItems'
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const handleSignin = () => {
    navigate('/signin');
  };
  return (
    <nav className="w-full border-b shadow-sm py-4 bg-background">
      <Container>
        <div className="flex items-center justify-between">
          <div className="text-xl font-bold text-foreground">
            NextGen GD
          </div>

          <div className="space-x-6 text-foreground font-medium">
            {NavItems.map((item) => (
              <a
                key={item.title}
                href={item.url}
                className="hover:text-muted-foreground transition"
              >
                {item.title}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-3">
            {/* <ModeToggle /> */}
            <Button onClick={handleSignin}>Login</Button>
          </div>
        </div>
      </Container>
    </nav>
  )
}

export default Navbar
