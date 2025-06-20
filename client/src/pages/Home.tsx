import FuzzyText from '@/animations/FuzzyText';
import Container from '@/components/layout/Container';
import SplineScene from '@/components/SplineScene';

const Home = () => {
  return (
    <div className=' bg-foreground'>

      <Container>

        <div className="relative w-full h-screen bg-foreground">
          {/* Spline as background */}
          <SplineScene />

          <div className="absolute top-0 pt-10 text-muted-foreground hidden lg:block">
            <div className="drop-shadow-[0_0_10px_#00ffff]">
              <FuzzyText
                baseIntensity={0.2}
                hoverIntensity={0.4}
                enableHover={true}
                color="#00ffff"
              >
                Reimagining
              </FuzzyText>
            </div>

            <FuzzyText baseIntensity={0.2} hoverIntensity={0.4} enableHover={true}>
              Reimagining
            </FuzzyText>

          </div>
          <div className="absolute top-0 right-0 pt-10 text-muted-foreground flex flex-col gap-3 hidden lg:block">
            <div className="drop-shadow-[0_0_10px_#00ffff]">
              <FuzzyText
                baseIntensity={0.2}
                hoverIntensity={0.4}
                enableHover={true}
                color="#00ffff"
              >
                Conversations
              </FuzzyText>
            </div>

            <FuzzyText baseIntensity={0.2} hoverIntensity={0.4} enableHover={true}>
              Conversations
            </FuzzyText>

          </div>


          {/* Overlay content (z-10 makes sure it’s above the scene) */}
          <h1 className=' absolute top-0 pt-10 text-muted-foreground h1 top-0'></h1>
        </div>
      </Container>
    </div>
  );
};

export default Home;
