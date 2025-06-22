// src/pages/SimulationWrapper.tsx
import { useSearchParams, useParams } from 'react-router-dom';
import Simulation from './Simulation';
import { SimulationProvider } from '@/context/SimulationContext';

const SimulationWrapper = () => {
  const { time } = useParams();
  const [searchParams] = useSearchParams();

  const topic = searchParams.get("topic") || "Default Topic";
  const starter = searchParams.get("starter") || "bot";

  return (
    <SimulationProvider topic={topic} starter={starter}>
      <Simulation />
    </SimulationProvider>
  );
};

export default SimulationWrapper;
