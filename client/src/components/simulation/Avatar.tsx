import { useEffect, useState } from "react";
import SpeakAnimation from "./SpeakAnimation";
import { time } from "console";

const Avatar = ({ imgSrc, isSpeaking, delay = false }: { imgSrc: string; isSpeaking: boolean; delay?: boolean }) => {

  const [showSpeakAnimation, setShowSpeakAnimation] = useState(false);

  
  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (isSpeaking) {
      if (delay) {
        timer = setTimeout(() => {
          setShowSpeakAnimation(true);
        }, 1600);
      } else {
        setShowSpeakAnimation(true);
      }
    } else {
      setShowSpeakAnimation(false);
    }

    return () => clearTimeout(timer);
  }, [isSpeaking, delay]);

  return (
    <div className="flex flex-col items-center justify-center relative">
      {/* Avatar Image */}
      <div className='flex flex-col justify-center items-center'>
        <div
          className="w-32 h-32 bg-foreground hover:bg-gray-900 transition ease-linear rounded-full flex items-center justify-center overflow-hidden"
          style={{
            boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)', // Optional: Adds a shadow effect
          }}
        >
          <img src={imgSrc} alt="Avatar" className="w-full h-full object-cover" />
        </div>
        <div className=" absolute -bottom-6">

        {showSpeakAnimation && <SpeakAnimation />}
        </div>
      </div>
    </div>
  );
};

export default Avatar;
