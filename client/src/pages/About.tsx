import React from 'react'
import Container from '@/components/layout/Container'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'

const About = () => {
  return (
    <Container>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-16 py-16 items-start">
        {/* LEFT SIDE - Static Content */}
        <div className="flex flex-col justify-center items-center space-y-6 sticky top-20">
          <h1 className="text-5xl font-semibold tracking-tight leading-tight text-primary text-center">
            Elevate Your <span className="text-blue-500">GD Preparation</span>
          </h1>
          <p className="text-lg text-muted-foreground text-center">
            Our AI-powered GD simulator creates a realistic group discussion environment with intelligent bot participants. Perfect for students, job seekers, and professionals to sharpen communication and critical thinking.
          </p>
          <div className="text-sm text-gray-500 text-center">
            Powered by <span className="font-medium">React</span>, <span className="font-medium">Node.js</span>, <span className="font-medium">Gemini AI</span>. Styled with <span className="font-medium">Tailwind</span> and <span className="font-medium">shadcn/ui</span>.
          </div>
        </div>

        {/* RIGHT SIDE - Accordion */}
        <div className="rounded-xl border border-border bg-muted/10 p-6 backdrop-blur min-h-[400px]">
          <Accordion type="single" collapsible className="w-full space-y-2">
            <AccordionItem value="item-1">
              <AccordionTrigger className="text-lg">🎯 Real-Time Countdown</AccordionTrigger>
              <AccordionContent className="text-sm text-muted-foreground">
                Simulates a time-bound GD session, helping you manage speaking time and build composure under pressure.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger className="text-lg">🤖 AI Bot Responses</AccordionTrigger>
              <AccordionContent className="text-sm text-muted-foreground">
                Bots generate intelligent responses using Gemini AI to simulate real participants in a GD.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger className="text-lg">🎤 Mic Control</AccordionTrigger>
              <AccordionContent className="text-sm text-muted-foreground">
                Toggle your mic and receive animated visual feedback while you speak.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-4">
              <AccordionTrigger className="text-lg">📱 Responsive Design</AccordionTrigger>
              <AccordionContent className="text-sm text-muted-foreground">
                Fully responsive layout optimized for mobile, tablet, and desktop.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-5">
              <AccordionTrigger className="text-lg">⚙️ Robust Backend</AccordionTrigger>
              <AccordionContent className="text-sm text-muted-foreground">
                Built with Node.js, REST APIs and SQL for fast, real-time performance.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
    </Container>
  )
}

export default About
