interface IObjectPool {
  spawn(data: IPoolItem): void;
  clear(): void;
  info(): string[];
}

interface IPoolItem {
  inUse: boolean;
  lifeTime: number;
  id?: string | number;
}

export default class ObjectPool implements IObjectPool {
  private objPool: IPoolItem[];

  maxItems: number;

  forceCreateNew: boolean;

  constructor(maxItems: number, forceCreateNew: boolean) {
    this.maxItems = maxItems;
    this.forceCreateNew = forceCreateNew;
    this.objPool = [];
  }

  spawn(data: IPoolItem) {
    let poolItem: IPoolItem;
    if (this.objPool.length < this.maxItems) {
      poolItem = this.create(data);
    } else {
      poolItem = this.get();
      if (poolItem) {
        delete data.id;
        poolItem = Object.assign(poolItem, data);
        this.recycle(poolItem);
      } else {
        if (this.forceCreateNew) {
          poolItem = this.create(data);
        } else {
          console.log('ObjectPool: limit is reached. Try with forceCreateNew is True');
        }
      }
    }
    return poolItem;
  }

  clear() {
    this.objPool.map(x => (x.inUse = false));
  }

  info(): string[] {
    return this.objPool.map(x => JSON.stringify(x) + '\n');
  }

  private get() {
    const items = this.objPool.filter(x => x.inUse === false);
    return items[0];
  }

  private create(data: IPoolItem) {
    this.recycle(data);
    this.objPool.push(data);
    return data;
  }

  private recycle(data: IPoolItem) {
    data.inUse = true;
    if (data.lifeTime !== Infinity) {
      setTimeout(() => {
        data.inUse = false;
      }, data.lifeTime);
    }
  }
}
