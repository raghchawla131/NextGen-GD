import Container from '@/components/layout/Container'
import PageContainer from '@/components/layout/PageContainer'
import { Button } from '@/components/ui/button'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Setup = () => {
  const [selectedTime, setSelectedTime] = useState<number | null>(10);
  const [selectedTopic, setSelectedTopic] = useState<string | null>("Is AI a threat to human jobs?");
  const [starter, setStarter] = useState<'user' | 'bot' | null>("bot");
  const navigate = useNavigate();

  const handleStartGD = () => {
    if (selectedTime && selectedTopic && starter) {
      const topic = encodeURIComponent(selectedTopic);
      navigate(`/simulation/${selectedTime}?topic=${topic}&starter=${starter}`);
    }
  };

  const gdTopics = [
    "Is AI a threat to human jobs?",
    "Should social media be regulated?",
    "Is online education as effective as traditional learning?"
  ];

  return (
    <Container>
      <PageContainer>
        <div className="w-full max-w-2xl mx-auto p-4 md:p-8 rounded-2xl shadow-lg border bg-background space-y-6">
          <h1 className="text-3xl font-semibold text-center">Group Discussion Setup</h1>

          {/* Time Selection */}
          <div className="space-y-2 text-center">
            <h2 className="text-xl font-medium">Select Time</h2>
            <div className="flex flex-wrap justify-center gap-4">
              {[5, 10, 15].map((time) => (
                <Button
                  key={time}
                  onClick={() => setSelectedTime(time)}
                  variant={selectedTime === time ? 'default' : 'outline'}
                >
                  {time} minutes
                </Button>
              ))}
            </div>
          </div>

          {/* Topic Selection */}
          <div className="space-y-2 text-center">
            <h2 className="text-xl font-medium">Select GD Topic</h2>
            <div className="flex flex-col sm:flex-row sm:flex-wrap sm:justify-center gap-2">
              {gdTopics.map((topic) => (
                <Button
                  key={topic}
                  onClick={() => setSelectedTopic(topic)}
                  variant={selectedTopic === topic ? 'default' : 'outline'}
                  className="text-sm text-wrap text-center whitespace-normal px-4 py-7 sm:py-4"
                >
                  {topic}
                </Button>
              ))}
            </div>
          </div>

          {/* Starter Selection */}
          <div className="space-y-2 text-center">
            <h2 className="text-xl font-medium">Who will start the GD?</h2>
            <div className="flex justify-center gap-4">
              <Button
                onClick={() => setStarter('user')}
                variant={starter === 'user' ? 'default' : 'outline'}
              >
                You
              </Button>
              <Button
                onClick={() => setStarter('bot')}
                variant={starter === 'bot' ? 'default' : 'outline'}
              >
                Bot
              </Button>
            </div>
          </div>

          <div className="flex justify-center">
            <Button
              onClick={handleStartGD}
              disabled={selectedTime === null || selectedTopic === null || starter === null}
              className="w-full sm:w-auto"
            >
              Start GD
            </Button>
          </div>
        </div>
      </PageContainer>
    </Container>
  );
};

export default Setup;
