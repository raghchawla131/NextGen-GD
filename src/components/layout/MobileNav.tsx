import React, { useState } from 'react';
import { Button } from '../ui/button';
import { Menu, X } from 'lucide-react';
import { ModeToggle } from '../theme/mode-toggle';
import Container from './Container';

const MobileNav : React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="w-full py-4 bg-background border-b">
      <Container>
        <div className="flex justify-between items-center">
          <div className="text-xl font-bold text-foreground">NextGen GD</div>
          <div className="flex items-center gap-3">
            <Button className="px-2 text-muted-foreground" variant="ghost">
              Log in
            </Button>
            <Button className="px-2">Sign up</Button>
            {/* <ModeToggle /> */}
            <Button onClick={toggleMenu} variant="ghost">
              {isOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </Button>
          </div>
        </div>
      </Container>
    </nav>
  );
};

export default MobileNav;
