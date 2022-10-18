import {MouseSensor, TouchSensor, useSensor, useSensors} from '@dnd-kit/core';

export const useSensorGroup = () => {
  return useSensors(
    useSensor(MouseSensor, {
      activationConstraint: {
        distance: {y: 10}
      }
    }),
    useSensor(TouchSensor, {
      activationConstraint: {
        delay: 250,
        tolerance: {y: 15, x: 5}
      }
    })
  );
};
