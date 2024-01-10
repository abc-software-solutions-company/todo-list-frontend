import {ROUTES} from '@/configs/routes.config';

export const isMyListPage = (path: string, id: string) => {
  if (path.includes(ROUTES.LIST) && !id) return true;
  return false;
};
export const isMyTasksPage = (path: string, id: string) => {
  if (path.includes(ROUTES.TASK) && !id) return true;
  return false;
};
export const isListDetailPage = (path: string, id: string) => {
  if (path.includes(ROUTES.LIST) && id) return true;
  return false;
};
export const isBoardPage = (path: string, id: string) => {
  if (path.includes(ROUTES.KANBAN) && id) return true;
  return false;
};

export const isDocumentPage = (path: string, id: string) => {
  if (path.includes(ROUTES.DOCUMENT) && !id) return true;
  return false;
};
export const isTaskPage = (path: string, id: string) => {
  if (path.includes(ROUTES.TASK) && !id) return true;
  return false;
};

export const isHomeNPage = (path: string, id: string) => {
  if (path.includes(ROUTES.HOMEN) && !id) return true;
  return false;
};

export const isProjectsPage = (path: string, id: string) => {
  if (path.includes(ROUTES.PROJECTS) && !id) return true;
  return false;
};

export const isProjectsDetailPage = (path: string, id: string) => {
  if (path.includes(ROUTES.PROJECTS) && id) return true;
  return false;
};

export const isTodayPage = (path: string, id: string) => {
  if (path.includes(ROUTES.TODAY) && !id) return true;
  return false;
};

export const isUpcomingPage = (path: string, id: string) => {
  if (path.includes(ROUTES.UPCOMING) && !id) return true;
  return false;
};

export const isNotificationPage = (path: string, id: string) => {
  if (path.includes(ROUTES.NOTIFICATION) && !id) return true;
  return false;
};

export const isSettingPage = (path: string, id: string) => {
  if (path.includes(ROUTES.SETTING) && !id) return true;
  return false;
};
