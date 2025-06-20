import React from 'react'
import Container from './Container'

const Footer: React.FC = () => {
  return (
    <footer className=" py-6 text-sm border-t text-background bg-foreground">
      <Container>
        <div className=" bg-foreground flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>&copy; {new Date().getFullYear()} NextGen-GD. All rights reserved.</span>
          <div className="flex space-x-4">
            <a href="/privacy" className="hover:underline">Privacy</a>
            <a href="/terms" className="hover:underline">Terms</a>
            <a href="/contact" className="hover:underline">Contact</a>
          </div>
        </div>
      </Container>
    </footer>
  )
}

export default Footer
