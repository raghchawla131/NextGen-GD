import Container from '@/components/layout/Container'
import PageContainer from '@/components/layout/PageContainer'
import { Button } from '@/components/ui/button'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Setup = () => {
  const [selectedTime, setSelectedTime] = useState<number | null>(null);
  const navigate = useNavigate();

  const handleTimeSelect = (time: number) => {
    setSelectedTime(time)
  }

  const handleStartGD = () => {
    navigate(`/simulation/${selectedTime}`)
  }

  return (
    <>
      <Container>
        <PageContainer>
          <div className=' flex flex-col items-center border-4'>
            <h1 className=' text-3xl font-semibold'>Group Discussion Setup</h1>
            <div className=' border-2 flex flex-col items-center'>
              <h2 className=' text-xl border-2'>Select Time</h2>
              <div>
                {[5, 10, 15].map((time) => (
                  <Button key={time} onClick={() => handleTimeSelect(time)}>
                    {time} minutes
                  </Button>
                ))}
              </div>
            </div>
            <Button onClick={handleStartGD} disabled= {selectedTime === null}>
              Start GD
            </Button>
          </div>
        </PageContainer>
      </Container>
    </>
  )
}

export default Setup