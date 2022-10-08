import {MouseSensor, useSensor, useSensors} from '@dnd-kit/core';

export const useMouseSensor = () => {
  const sensors = useSensors(
    useSensor(MouseSensor, {
      activationConstraint: {
        distance: 10
        // delay: 7,
        // tolerance: 1
      }
    })
  );
  return sensors;
};
