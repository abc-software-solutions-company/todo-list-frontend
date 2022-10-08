import {MouseSensor, useSensor, useSensors} from '@dnd-kit/core';

export const useMouseSensor = () => {
  return useSensors(
    useSensor(MouseSensor, {
      activationConstraint: {
        distance: 10
        // delay: 7,
        // tolerance: 1
      }
    })
  );
};
