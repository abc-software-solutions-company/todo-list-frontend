import Image from 'next/image';
import {FC, useState} from 'react';

export interface ITaskCard {
  title: string;
  dueDate: string;
  completedTaskCount: number;
  totalTaskCount: number;
  bgColor?: string;
  members: {name: string}[];
}

const defaultImageSrc =
  'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 64 64" fill="none"%3E%3Ccircle cx="32" cy="32" r="28" fill="%23030712" /%3E%3Cpath fill-rule="evenodd" clip-rule="evenodd" d="M30.8906 12.3359C31.5624 11.888 32.4376 11.888 33.1094 12.3359L51.1094 24.3359C51.6658 24.7068 52 25.3313 52 26V38C52 38.6687 51.6658 39.2932 51.1094 39.6641L33.1094 51.6641C32.4376 52.112 31.5624 52.112 30.8906 51.6641L12.8906 39.6641C12.3342 39.2932 12 38.6687 12 38V26C12 25.3313 12.3342 24.7068 12.8906 24.3359L30.8906 12.3359ZM16 29.737L19.3944 32L16 34.263V29.737ZM17.6056 38L30 46.263V39.0704L23 34.4037L17.6056 38ZM26.6056 32L32 35.5963L37.3944 32L32 28.4037L26.6056 32ZM34 24.9296L41 29.5963L46.3944 26L34 17.737V24.9296ZM30 17.737V24.9296L23 29.5963L17.6056 26L30 17.737ZM48 29.737L44.6056 32L48 34.263V29.737ZM46.3944 38L41 34.4037L34 39.0704V46.263L46.3944 38Z" fill="%23FAFAFA" /%3E%3C/svg%3E';

const TaskCard: FC<ITaskCard> = ({
  title,
  dueDate,
  completedTaskCount,
  totalTaskCount,
  bgColor = 'bg-gray-300',
  members
}) => {
  const renderAvatars = () => {
    const avatarStyles = [
      'absolute z-10 h-[32px] w-[32px] shrink-0 rounded-full bg-red-500',
      'absolute left-[16px] z-20 h-[32px] w-[32px] shrink-0 rounded-full bg-orange-500',
      'absolute left-[32px] z-30 h-[32px] w-[32px] shrink-0 rounded-full bg-yellow-500',
      'absolute left-[48px] z-40 h-[32px] w-[32px] shrink-0 rounded-full bg-green-500',
      'absolute left-[64px] z-50 h-[32px] w-[32px] shrink-0 rounded-full bg-blue-500'
    ];
    const avatars = members.map((member, index) => {
      if (index < 5) {
        const avatarStyle = avatarStyles[index];
        const avatarInitial = member.name.charAt(0).toUpperCase();

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
            <p className="absolute"> +{members.length - index}</p>
          </div>
        );
      }
      return null;
    });

    return avatars;
  };

  const [showImageInput, setShowImageInput] = useState<boolean>(false);
  const [imageSrc, setImageSrc] = useState<string | null>(null);

  const handleImageClick = () => {
    setShowImageInput(true);
  };

  const handleImageInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = e => {
        if (e.target) {
          setImageSrc(e.target.result as string);
          setShowImageInput(false);
        }
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  };
  const percent = Math.round((completedTaskCount / totalTaskCount) * 100);
  return (
    <>
      <div className={`flex w-[446px] flex-col gap-[44px] rounded-[8px] ${bgColor} p-[40px]`}>
        <div className="flex items-center justify-between self-stretch">
          <div className="flex w-[313.5px] flex-col items-start gap-[12px]">
            <h3 className="text-gray-950 text-20 font-roboto leading-24 font-normal">{title}</h3>
            <p>Due date: {dueDate}</p>
          </div>
          <div className="h-[64] w-[64px]" onClick={handleImageClick} style={{cursor: 'pointer'}}>
            {showImageInput ? (
              <input type="file" onChange={handleImageInputChange} accept="image/*" />
            ) : (
              <Image
                src={imageSrc || defaultImageSrc}
                alt="Task Image"
                width={64}
                height={64}
                objectFit="cover"
                className="rounded-full"
              />
            )}
          </div>
        </div>
        <div className="flex-start flex flex-col gap-[24px] self-stretch">
          <div className="flex items-center justify-between self-stretch">
            <div className="mb-6">
              <div className="relative flex">
                <p>{renderAvatars()}</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="8" height="8" viewBox="0 0 8 8" fill="none">
                <circle cx="4" cy="4" r="4" fill={percent < 100 ? '#FF9900' : '#22C55E'} />
              </svg>
              {percent < 100 ? (
                <span className="text-orange-500">In Progress</span>
              ) : (
                <span className="text-[#22C55E]">Complete</span>
              )}
            </div>
          </div>
          <div className="status">
            <div
              className="h-1 w-full rounded-md"
              style={{
                background: `linear-gradient(to right, ${percent < 100 ? '#FF9900' : '#22C55E'} ${
                  (completedTaskCount / totalTaskCount) * 100
                }%, #7B8794 0%)`
              }}
            ></div>
            <div className="flex items-center justify-between self-stretch">
              <div>
                <p>
                  {completedTaskCount}/{totalTaskCount}
                </p>
              </div>
              <div>
                <p>{percent}%</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TaskCard;
