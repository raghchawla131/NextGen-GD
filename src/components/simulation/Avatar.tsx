import '../../animations/speakAnimations.css'

const Avatar = ({ imgSrc }: { imgSrc: string }) => {
  return (
    <div className="flex flex-col items-center justify-center border-2">
      {/* Avatar Image */}
      <div className='flex flex-col justify-center items-center border-8'>

        <div
          className="w-32 h-32 bg-background hover:bg-gray-900 transition ease-linear rounded-full flex items-center justify-center overflow-hidden"
          style={{
            boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)', // Optional: Adds a shadow effect
          }}
        >
          <img src={imgSrc} alt="Avatar" className="w-full h-full object-cover" />
        </div>

        {/* Speak Animation Below Avatar */}
        <div id="bars" className="mt-6">
          <div className="bar"></div>
          <div className="bar"></div>
          <div className="bar"></div>
          <div className="bar"></div>
          <div className="bar"></div>
        </div>
      </div>
    </div>
  );
};

export default Avatar;
