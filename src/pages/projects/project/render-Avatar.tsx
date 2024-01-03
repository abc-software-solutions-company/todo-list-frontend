import {FC} from 'react';

interface AvatarsProps {
  names: string[];
}

const Avatars: FC<AvatarsProps> = ({names}) => {
  const avatarStyles = [
    'absolute z-10 h-[32px] w-[32px] shrink-0 rounded-full bg-red-500',
    'absolute left-[16px] z-20 h-[32px] w-[32px] shrink-0 rounded-full bg-orange-500',
    'absolute left-[32px] z-30 h-[32px] w-[32px] shrink-0 rounded-full bg-yellow-500',
    'absolute left-[48px] z-40 h-[32px] w-[32px] shrink-0 rounded-full bg-green-500',
    'absolute left-[64px] z-50 h-[32px] w-[32px] shrink-0 rounded-full bg-blue-500'
  ];

  return (
    <div>
      {names.map((name, index) => {
        if (index < 5) {
          const avatarStyle = avatarStyles[index];
          const avatarInitial = name.charAt(0).toUpperCase();

          return (
            <div key={index} className={avatarStyle}>
              <p className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transform text-center text-white">
                {avatarInitial}
              </p>
            </div>
          );
        } else if (index === 5) {
          return (
            <div
              key={index}
              className="absolute left-[80px] z-[60] flex h-[32px] w-[32px] shrink-0 items-center justify-center rounded-full bg-white"
            >
              <p className="absolute"> +{name.length - index}</p>
            </div>
          );
        }
        return null;
      })}
    </div>
  );
};

export default Avatars;
