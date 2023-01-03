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
export const isTaskPage = (path: string, id: string) => {
  if (path.includes(ROUTES.TASK) && id) return true;
  return false;
};
