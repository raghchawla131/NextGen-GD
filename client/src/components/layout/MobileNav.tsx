import React from 'react';
import { Button } from '../ui/button';
// import { ModeToggle } from '../theme/mode-toggle';
import Container from './Container';
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import MySidebar from './MySidebar';

const MobileNav: React.FC = () => {
  return (
    <SidebarProvider>
      <nav className="w-full py-4 bg-background shadow-sm h-fit">
        <Container>
          <div className="flex justify-between items-center">
            <div className="text-xl font-bold text-foreground">NextGen GD</div>
            <div className="flex items-center gap-3">
              <Button className="px-2 text-muted-foreground" variant="ghost">
                Log in
              </Button>
              <Button className="px-2">Sign up</Button>
              {/* <ModeToggle /> */}

              <SidebarTrigger />
              <MySidebar />
            </div>
          </div>
        </Container>
      </nav>
      
      {/* Sidebar will automatically handle visibility */}
      
    </SidebarProvider>
  );
};

export default MobileNav;
