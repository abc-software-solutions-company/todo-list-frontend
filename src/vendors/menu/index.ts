interface IMenu {
  init(): void;
  destroy(): void;
}

interface IMenuOptions {
  hasSubClass: string;
  arrowClass: string;
  hoverClass: string;
  activeClass: string;
}

export default class Menu implements IMenu {
  private configs: IMenuOptions = {
    hasSubClass: 'menu-has-sub',
    arrowClass: 'menu-arrow',
    hoverClass: 'hover',
    activeClass: 'active'
  };

  private menu: HTMLElement;

  private items: HTMLElement[] = [];

  private itemHasChild: HTMLElement[] = [];

  private itemHasActiveClass: HTMLElement[] = [];

  constructor(menu: HTMLElement, options?: IMenuOptions) {
    this.configs = {
      ...this.configs,
      ...options
    };
    this.menu = menu;
    this.items = this.getAllItems();
    this.itemHasChild = this.getItemsIncludesSubItem();
    this.itemHasActiveClass = this.getItemsHasActiveClassName();

    this.init();
  }

  init() {
    this.itemHasChild.map((element: HTMLElement) => {
      this.addArrow(element);
      this.addSubClass(element);
    });
    this.addActiveClass();
    this.menu.addEventListener('touchstart', this.keydownHandle, false);
    this.menu.addEventListener('keydown', this.keydownHandle, false);
  }

  destroy() {
    this.removeArrow();
    this.removeSubClass();
    this.menu.removeEventListener('touchstart', this.keydownHandle, false);
    this.menu.removeEventListener('keydown', this.keydownHandle, false);
  }

  private keydownHandle = (event: any) => {
    const item = event.target.parentElement;
    if (event.key === 'Enter') {
      this.getItemsExceptSelected(event.target).map(x => x.classList.remove(this.configs.hoverClass));
      if (item && item.nodeName.toLowerCase() === 'li') item.classList.toggle(this.configs.hoverClass);
    }
  };

  private getAllItems() {
    return Array.from(this.menu.querySelectorAll('li'));
  }

  private getItemsIncludesSubItem() {
    return this.items.filter(x => x.querySelector('ul,div'));
  }

  private getItemsHasActiveClassName() {
    return this.items.filter((element: HTMLElement) => element.classList.contains(this.configs.activeClass));
  }

  private getItemsExceptSelected(currentItem: HTMLElement) {
    return this.items.filter(x => !x.contains(currentItem));
  }

  private addSubClass(item: HTMLElement) {
    item.classList.add(this.configs.hasSubClass);
  }

  private removeSubClass() {
    this.itemHasChild.map(x => x.classList.remove(this.configs.hasSubClass));
  }

  private addArrow(item: HTMLElement) {
    const arrowElm = document.createElement('i');
    const anchorElm = item.querySelector('a');
    arrowElm.classList.add(this.configs.arrowClass);
    if (anchorElm) anchorElm.appendChild(arrowElm);
  }

  private removeArrow() {
    Array.from(this.menu.querySelectorAll('.' + this.configs.arrowClass)).map(x => x.remove());
  }

  private addActiveClass() {
    if (!this.itemHasActiveClass) return;

    this.itemHasActiveClass.map((element: HTMLElement) => {
      while (element.parentElement !== null) {
        if (element.matches('li')) element.classList.add(this.configs.activeClass);
      }
    });
  }
}
