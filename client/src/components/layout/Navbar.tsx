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
    <nav className="w-full shadow-sm py-4 bg-foreground">
      <Container>
        <div className="flex items-center justify-between">
          <div className="text-xl font-bold text-background">
            NextGen GD
          </div>

          <div className="space-x-6 text-background font-medium">
            {NavItems.map((item) => (
              <a
                key={item.title}
                href={item.url}
                className="hover:opacity-80 transition-colors duration-200"
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
  );
};

export default Navbar;
