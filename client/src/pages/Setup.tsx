import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const gdTimeOptions = [2, 5, 10, 15];
const gdSuggestions = [
  "Is AI a threat to human jobs?",
  "Should social media be regulated?",
  "Is online education as effective as traditional learning?",
  "Is remote work here to stay?",
  "Should voting be mandatory?"
];
const gdStarterOptions = ["You", "Bot"];

const Setup = () => {
  const navigate = useNavigate();

  const [gdTopic, setGdTopic] = useState('');
  const [gdTime, setGdTime] = useState(0);
  const [gdStarter, setGdStarter] = useState('');
  const [showDropDown, setShowDropDown] = useState(false);

  function handleStartGd() {
    navigate(`/simulation/${gdTime}?topic=${encodeURIComponent(gdTopic)}&starter=${gdStarter}`);
  }

  return (
    <div className=' flex justify-center items-center p-6'>
      <Card className='w-full max-w-3xl p-6 sm:p-10 flex flex-col gap-8 items-center'>
        <h1 className='text-2xl sm:text-3xl font-semibold text-center'>Group Discussion Setup</h1>

        {/* Time Selection */}
        <div className='flex flex-col gap-2 items-center w-full'>
          <h3 className='text-sm sm:text-base text-muted-foreground'>Select Time</h3>
          <div className='flex flex-wrap justify-center gap-3'>
            {gdTimeOptions.map((time) => (
              <Button
                key={time}
                variant='outline'
                className={gdTime === time
                  ? 'bg-foreground text-background hover:bg-foreground hover:text-background'
                  : 'bg-background text-foreground hover:bg-foreground hover:text-background'
                }
                onClick={() => setGdTime(time)}
              >
                {time} Minutes
              </Button>
            ))}
          </div>
        </div>

        {/* Topic Input */}
        <div className='flex flex-col gap-2 items-center w-full'>
          <h3 className='text-sm sm:text-base text-muted-foreground'>Select or Type a GD Topic</h3>
          <div className='relative w-full sm:w-96'>
            <Input
              value={gdTopic}
              onChange={(e) => setGdTopic(e.target.value)}
              onFocus={() => setShowDropDown(true)}
              onBlur={() => setTimeout(() => setShowDropDown(false), 100)}
              placeholder='Select or type a topic'
            />
            {showDropDown && (
              <div className='absolute top-full left-0 mt-1 w-full max-h-40 overflow-y-auto bg-background border border-border rounded-md shadow-lg z-50'>
                {gdSuggestions
                  .filter(s => s.toLowerCase().includes(gdTopic.toLowerCase()))
                  .map((suggestion, index) => (
                    <div
                      key={index}
                      onMouseDown={() => {
                        setGdTopic(suggestion);
                        setShowDropDown(false);
                      }}
                      className='px-4 py-2 text-sm cursor-pointer hover:bg-muted transition-colors'
                    >
                      {suggestion}
                    </div>
                  ))}
                {gdSuggestions.filter(s => s.toLowerCase().includes(gdTopic.toLowerCase())).length === 0 && (
                  <div className='px-4 py-2 text-sm text-muted-foreground'>
                    No matching topics
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Starter Selection */}
        <div className='flex flex-col gap-2 items-center w-full'>
          <h3 className='text-sm sm:text-base text-muted-foreground'>Who will start the GD?</h3>
          <div className='flex flex-wrap justify-center gap-4'>
            {gdStarterOptions.map((starter) => (
              <Button
                key={starter}
                variant='outline'
                className={gdStarter === starter
                  ? 'bg-foreground text-background hover:bg-foreground hover:text-background'
                  : 'bg-background text-foreground hover:bg-foreground hover:text-background'
                }
                onClick={() => setGdStarter(starter)}
              >
                {starter}
              </Button>
            ))}
          </div>
        </div>

        <Button
          disabled={!gdTopic || !gdTime || !gdStarter}
          onClick={handleStartGd}
        >
          Start GD
        </Button>
      </Card>
    </div>
  );
};

export default Setup;
