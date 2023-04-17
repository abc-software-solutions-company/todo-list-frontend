export interface IEntities<T> {
  [key: string]: T;
}

export interface IApdater<T> {
  ids: string[];
  entities: IEntities<T>;
}

export function generateEntityAdapter<T = any>(data: T[], property: keyof typeof data[0]) {
  const entities: {[key: string]: typeof data[0]} = {};
  const ids = data.map(e => {
    const id = String(e[property]);
    entities[id] = e;
    return id;
  });
  return {ids, entities};
}
