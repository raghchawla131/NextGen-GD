import Container from '@/components/layout/Container'
import PageContainer from '@/components/layout/PageContainer'
import { Button } from '@/components/ui/button'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'



const Setup = () => {

    const gdTopics = [
      "Is AI a threat to human jobs?",
      "Should social media be regulated?",
      "Is online education as effective as traditional learning?",
      "Is remote work here to stay?",
      "Should voting be mandatory?"
    ];

  const [selectedTime, setSelectedTime] = useState<number | null>(10);
  const [selectedTopic, setSelectedTopic] = useState<string | null>("");
  const [starter, setStarter] = useState<'user' | 'bot' | null>("bot");
  const [showDropdown, setShowDropdown] = useState(false);

  const navigate = useNavigate();

  const handleStartGD = () => {
    if (selectedTime && selectedTopic && starter) {
      const topic = encodeURIComponent(selectedTopic);
      navigate(`/simulation/${selectedTime}?topic=${topic}&starter=${starter}`);
    }
  };

  return (
    <Container>
      <PageContainer>
        <div className="w-full max-w-2xl mx-auto p-4 md:p-8 rounded-2xl shadow-lg border bg-background space-y-6">
          <h1 className="text-3xl font-semibold text-center">Group Discussion Setup</h1>

          {/* Time Selection */}
          <div className="space-y-2 text-center">
            <h2 className="text-xl font-medium">Select Time</h2>
            <div className="flex flex-wrap justify-center gap-4">
              {[1, 5, 10, 15].map((time) => (
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
          {/* Topic Selection */}
          <div className="space-y-4 text-center relative">
            <h2 className="text-xl font-medium">Select or Type a GD Topic</h2>

            {/* Input Field */}
            <div className="relative w-full max-w-md mx-auto">
              <input
                type="text"
                placeholder="Type or select a GD topic..."
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                value={selectedTopic || ""}
                onChange={(e) => setSelectedTopic(e.target.value)}
                onFocus={() => setShowDropdown(true)}
                onBlur={() => setTimeout(() => setShowDropdown(false), 100)} // allow click
              />

              {/* Dropdown List */}
              {showDropdown && (
                <ul className="absolute z-10 w-full max-h-48 mt-1 overflow-y-auto bg-white border border-gray-200 rounded-md shadow-lg text-left">
                  {gdTopics
                    .filter((topic) =>
                      topic.toLowerCase().includes((selectedTopic || "").toLowerCase())
                    )
                    .map((topic) => (
                      <li
                        key={topic}
                        onMouseDown={() => {
                          setSelectedTopic(topic);
                          setShowDropdown(false);
                        }}
                        className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                      >
                        {topic}
                      </li>
                    ))}
                </ul>
              )}
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
