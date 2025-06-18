import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useState } from 'react';
import { log } from 'console';

const gdTimeOptions = [
  2,
  5,
  10,
  15,
]

const gdSuggestions = [
  "Is AI a threat to human jobs?",
  "Should social media be regulated?",
  "Is online education as effective as traditional learning?",
  "Is remote work here to stay?",
  "Should voting be mandatory?"
];

const gdStarterOptions = [
  "You",
  "Bot",
]

const Setup = () => {
  const [gdTopic, setGdTopic] = useState('');
  const [gdTime, setGdTime] = useState(0);
  const [gdStarter, setGdStarter] = useState(''); 
  const [showDropDown, setShowDropDown] = useState(false)
  console.log(gdTime, "  " , gdStarter)
  return (
    <div className=' flex flex-col justify-center items-center border-2'>
      <Card className=' flex justify-center items-center p-16'>
        <h1 className='h1'>Group Discussion Setup</h1>
        <div className=' flex flex-col gap-2 justify-center items-center'>
          <h3 className='h3 text-muted-foreground'>Select Time</h3>
          <div className=' flex gap-4'>
            {gdTimeOptions.map((time) => (
              <Button
                variant={'outline'} 
                className={gdTime === time 
                  ?' bg-foreground text-background hover:bg-foreground hover:text-background'
                  :' bg-background text-foreground hover:bg-foreground hover:text-background'
                }
                
                onClick={() => setGdTime(time)}
              >
                {time} Minutes
              </Button>
            ))}
          </div>
        </div>
        <div className='flex flex-col gap-2 justify-center items-center'>
          <h3 className='h3 text-muted-foreground'>Select or Type a GD Topic</h3>
          <div className='relative w-96'>
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
                  .filter(suggestion =>
                    suggestion.toLowerCase().includes(gdTopic.toLowerCase())
                  )
                  .map((suggestion, index) => (
                    <div
                      key={index}
                      onMouseDown={() => {
                        setGdTopic(suggestion)
                        setShowDropDown(false)
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

        <div className=' flex flex-col gap-2 justify-center items-center'>
          <h3 className='h3 text-muted-foreground'>Who will start the GD?</h3>
          <div className=' flex gap-4'>
            {gdStarterOptions.map((starter) => (
              <Button 
                variant={'outline'} 
                className={gdStarter === starter 
                  ?' bg-foreground text-background hover:bg-foreground hover:text-background'
                  :' bg-background text-foreground hover:bg-foreground hover:text-background'
                }
                onClick={() => setGdStarter(starter)}
              >
                {starter}
              </Button>
            ))}
          </div>
        </div>
        <Button>
          Start GD
        </Button>
      </Card>
    </div>
  )
}

export default Setup