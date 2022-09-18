import * as types from './types';

interface IActionMenu {
  type: typeof types.OPEN_MAINMENU;
  payload: {
    isMenuOpen: boolean;
  };
}

interface IActionDrawer {
  type: typeof types.OPEN_DRAWER;
  payload: {
    isDrawerOpen: string;
  };
}

interface IActionModalVideo {
  type: typeof types.OPEN_MODAL_VIDEO;
  payload: {
    isModalVideoOpen: boolean;
  };
}

export const setMenuOpen = (isMenuOpen: boolean): IActionMenu => {
  return {type: types.OPEN_MAINMENU, payload: {isMenuOpen}};
};

export const setDrawerOpen = (isDrawerOpen: string): IActionDrawer => {
  return {type: types.OPEN_DRAWER, payload: {isDrawerOpen}};
};

export const setModalVideoOpen = (isModalVideoOpen: boolean): IActionModalVideo => {
  return {type: types.OPEN_MODAL_VIDEO, payload: {isModalVideoOpen}};
};

export type IAction = IActionMenu | IActionDrawer | IActionModalVideo;
