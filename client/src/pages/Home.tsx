import Container from '@/components/layout/Container'
import PageContainer from '@/components/layout/PageContainer'
import React from 'react'

const Home: React.FC = () => {
  return (
    <Container>
      <PageContainer>
        <main className="flex flex-col items-center justify-center min-h-screen text-center bg-background">
          {/* Hero Section */}
          <h1 className="text-5xl font-extrabold leading-tight text-foreground max-w-4xl">
            Welcome to Your Next-Gen Group Discussion Simulator
          </h1>
          <p className="max-w-2xl text-muted-foreground text-lg mt-4">
            Practice your discussion skills with AI-powered bots that simulate real conversations. 
            Engage, listen, and improve your speaking confidence.
          </p>
          <div className="flex gap-6 justify-center mt-8">
            <button className="rounded-md bg-primary px-6 py-3 text-primary-foreground font-semibold hover:bg-primary/90 transition">
              Get Started
            </button>
            <button className="rounded-md border border-border px-6 py-3 text-foreground font-semibold hover:bg-accent hover:text-accent-foreground transition">
              Learn More
            </button>
          </div>

          {/* Features Section */}
          <section className="mt-16 max-w-5xl w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
            <div className="flex flex-col items-center p-6 rounded-lg border border-border bg-background shadow-sm">
              <div className="mb-4 text-primary text-4xl">🤖</div>
              <h3 className="text-xl font-semibold mb-2 text-foreground">AI-Powered Bots</h3>
              <p className="text-muted-foreground text-center">
                Engage with multiple AI personalities that respond realistically.
              </p>
            </div>

            <div className="flex flex-col items-center p-6 rounded-lg border border-border bg-background shadow-sm">
              <div className="mb-4 text-primary text-4xl">🎙️</div>
              <h3 className="text-xl font-semibold mb-2 text-foreground">Voice Interaction</h3>
              <p className="text-muted-foreground text-center">
                Use speech recognition and text-to-speech to converse naturally.
              </p>
            </div>

            <div className="flex flex-col items-center p-6 rounded-lg border border-border bg-background shadow-sm">
              <div className="mb-4 text-primary text-4xl">⏱️</div>
              <h3 className="text-xl font-semibold mb-2 text-foreground">Timed Sessions</h3>
              <p className="text-muted-foreground text-center">
                Practice under real-time constraints to simulate actual group discussions.
              </p>
            </div>
          </section>
        </main>
      </PageContainer>
    </Container>
  )
}

export default Home
