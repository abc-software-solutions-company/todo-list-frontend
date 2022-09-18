import ObjectPool from '../utils/pooling';

export interface IToast {
  show(data: IToastItem): void;
  info(data: IToastItem): void;
  success(data: IToastItem): void;
  danger(data: IToastItem): void;
  error(data: IToastItem): void;
  warning(data: IToastItem): void;
  clear(): void;
}

export interface IToastItem {
  type?: 'info' | 'danger' | 'success' | 'warning';
  title?: string;
  content?: string;
  icon?: string;
  id?: string | number;
  inUse?: boolean;
  lifeTime?: number;
}

class Toast implements IToast {
  private static instance: IToast;
  private static icon: string;
  private elementPool: ObjectPool;
  private toaster: HTMLElement;

  constructor(maxItems = 5, forceCreateNew = true) {
    console.log('[Site] - Init Script Toast');
    this.elementPool = new ObjectPool(maxItems, forceCreateNew);
    this.toaster = this.addSpawner();
  }

  static getInstance(): IToast {
    if (!this.instance) {
      this.instance = new this();
    }

    return this.instance;
  }

  setIcon(icon: string) {
    Toast.icon = icon;
  }

  show(data: IToastItem) {
    this.showItem(data);
  }

  info(data: IToastItem) {
    this.showItem({...data, type: 'info'});
  }

  success(data: IToastItem) {
    this.showItem({...data, type: 'success'});
  }

  danger(data: IToastItem) {
    this.showItem({...data, type: 'danger'});
  }

  error(data: IToastItem) {
    this.showItem({...data, type: 'danger'});
  }

  warning(data: IToastItem) {
    this.showItem({...data, type: 'warning'});
  }

  clear() {
    this.elementPool.clear();

    Array.from(this.toaster.children).map(x => {
      x.classList.remove('abc-toast__item--show');
      x.classList.add('abc-toast__item--hide');
    });
  }

  private addItem(data: IToastItem) {
    const toast: HTMLDivElement = this.toaster.querySelector(`#abc-toast-${data.id}`) ?? document.createElement('div');
    this.drawItem(toast, data);
    this.toaster.appendChild(toast);

    toast.addEventListener('click', (event: any) => {
      if (event.target.classList.contains('abc-toast__close')) this.hideItem(toast);
    });

    if (data.lifeTime !== Infinity) setTimeout(() => this.hideItem(toast), data.lifeTime);
  }

  private drawItem(element: HTMLDivElement, data: IToastItem) {
    const renderIcon = () => {
      const icon = data.icon ?? Toast.icon;
      return icon ? `<div class="abc-toast__icon"><img src="${icon}"/></div>` : '';
    };
    const renderHead = () => {
      return `<div class="abc-toast__head">${data.title}</div>`;
    };
    const renderBody = () => {
      return `<div class="abc-toast__body">${data.content}</div>`;
    };

    const renderType = (type: string | undefined) => {
      if (type === 'error') type = 'danger';
      return type || 'info';
    };

    const template = `<div class="abc-toast__inner bg-${renderType(data.type)}">
      ${renderIcon()}
      <div class="abc-toast__content">
        ${renderHead()}
        ${renderBody()}
      </div>
      <button type="button" class="abc-toast__close btn-close btn-close-white" aria-label="Close">&times;</button>
    </div>
    <div class="abc-toast__spacer"><div>
    `;
    element.id = 'abc-toast-' + data.id;
    element.className = 'abc-toast__item abc-toast__item--show';
    element.setAttribute('role', 'alert');
    element.innerHTML = template;
  }

  private showItem(data: IToastItem) {
    const newData = {
      id: new Date().getTime().toString(),
      inUse: true,
      lifeTime: 5000,
      ...data
    };
    const toastData = this.elementPool.spawn(newData);
    if (toastData) this.addItem(toastData);
  }

  private hideItem(element: HTMLDivElement) {
    element.classList.remove('abc-toast__item--show');
    element.classList.add('abc-toast__item--hide');
  }

  private addSpawner() {
    const toastWrapper = document.createElement('div');
    toastWrapper.className = 'abc-toast';
    document.body.appendChild(toastWrapper);
    return toastWrapper;
  }
}

export default Toast;
