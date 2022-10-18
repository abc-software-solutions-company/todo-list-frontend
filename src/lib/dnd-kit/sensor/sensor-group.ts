import {MouseSensor, TouchSensor, useSensor, useSensors} from '@dnd-kit/core';

export const useMouseSensor = () => {
  return useSensors(
    useSensor(MouseSensor, {
      activationConstraint: {
        distance: 10
      }
    }),
    useSensor(TouchSensor, {
      activationConstraint: {
        delay: 300,
        tolerance: {y: 15, x: 5}
      }
    })
  );
};
