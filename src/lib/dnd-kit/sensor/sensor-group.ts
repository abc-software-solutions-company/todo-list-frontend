import {MouseSensor, TouchSensor, useSensor, useSensors} from '@dnd-kit/core';

export const useSensorGroup = () => {
  return useSensors(
    useSensor(MouseSensor, {
      activationConstraint: {
        distance: 10
      }
    }),
    useSensor(TouchSensor, {
      activationConstraint: {
        distance: 10
      }
    })
  );
};
