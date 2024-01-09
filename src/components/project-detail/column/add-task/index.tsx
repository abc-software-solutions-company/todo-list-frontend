import React, {FC} from 'react';

interface IAddTaskProps {
  className?: string | undefined;
  isShow: boolean;
  onClick?: () => void;
}

const AddTask: FC<IAddTaskProps> = ({className, isShow, onClick}) => {
  return (
    <div
      className={`${
        isShow ? 'block' : 'hidden'
      } absolute flex h-screen w-screen items-center justify-center bg-gray-900 opacity-40`}
      onClick={onClick}
    >
      <div className="left-0 top-0 inline-flex h-52 flex-col items-start justify-start gap-3 rounded-lg bg-slate-50 p-6 opacity-100">
        <div className="flex h-28 flex-col items-start justify-start gap-6 self-stretch">
          <div className="flex flex-col items-start justify-start gap-2">
            <div className="inline-flex w-28 items-center justify-start gap-3">
              <div className="flex items-center justify-start gap-1">
                <div className="font-['Roboto'] text-xl font-bold leading-normal text-gray-500">Task name</div>
              </div>
            </div>
            <div className="w-72 font-['Roboto'] text-sm font-normal leading-tight text-gray-500">Description</div>
          </div>
          <div className="inline-flex items-start justify-start gap-3 self-stretch">
            <div className="flex items-center justify-center gap-2 rounded-lg border border-gray-500 p-1">
              <div className="font-['Roboto'] text-sm font-normal leading-tight text-blue-800">Today</div>
              <div className="relative h-6 w-6" />
            </div>
            <div className="flex items-center justify-center gap-2 rounded-lg border border-gray-500 p-1">
              <div className="relative h-6 w-6" />
              <div className="font-['Roboto'] text-sm font-normal leading-tight text-gray-500">Priotity</div>
            </div>
            <div className="flex items-center justify-center gap-2 rounded-lg border border-gray-500 p-1">
              <div className="font-['Roboto'] text-sm font-normal leading-tight text-gray-500">17h30</div>
              <div className="relative h-6 w-6" />
            </div>
            <div className="flex items-center justify-center gap-2 rounded-lg border border-gray-500 p-1">
              <div className="relative h-6 w-6" />
            </div>
          </div>
        </div>
        <div className="h-px self-stretch"></div>
        <div className="inline-flex items-center justify-between self-stretch">
          <div className="flex items-center justify-center gap-2 rounded-lg p-1">
            <div className="font-['Roboto'] text-sm font-normal leading-tight text-blue-800">Task pro</div>
            <div className="relative h-6 w-6" />
          </div>
          <div className="flex items-center justify-end gap-1">
            <div className="flex items-center justify-center gap-2 rounded-lg bg-gray-200 p-1">
              <div className="font-['Roboto'] text-sm font-normal leading-tight text-gray-700">Cancel</div>
              <div className="relative h-6 w-6" />
            </div>
            <div className="flex items-center justify-center gap-2 rounded-lg bg-blue-800 p-1 opacity-40">
              <div className="font-['Roboto'] text-sm font-normal leading-tight text-gray-200">Add task</div>
              <div className="relative h-6 w-6" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddTask;
