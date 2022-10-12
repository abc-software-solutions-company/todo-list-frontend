/* eslint-disable @typescript-eslint/no-unused-vars */
import {GetStaticPaths, GetStaticProps} from 'next';
import {serverSideTranslations} from 'next-i18next/serverSideTranslations';

import apiTask from '@/api/network/task';
import apiTodo from '@/api/network/todo';
import {ITodo} from '@/api/types/todo.type';

type ParsedQueryParams = {
  id: string;
};

type PageProps = {
  roomId: string;
  title: string;
  description: string;
};

export const getStaticProps: GetStaticProps<PageProps, ParsedQueryParams> = async ({locale, params}) => {
  try {
    const {id} = params!;
    let description = '';
    let title = '';
    // Get description and 3 task in description
    await apiTask
      .getListTasks(id)
      .then(res => {
        const listData: ITodo = res.data;
        const listName = listData.name!;
        const taskList = listData!.tasks!;
        const taskFirst = taskList[0] ? `${taskList[0].name}` : '';
        const taskSecond = taskList[1] ? `- ${taskList[1].name}` : '';
        const taskThrid = taskList[2] ? `- ${taskList[2].name}` : '';
        title = listName;
        const inviteText = `Click this link to join with me and collaborate editor.`;
        if (taskFirst) description = `${listName}. ${taskFirst} ${taskSecond} ${taskThrid}. ${inviteText} `;
        else description = `${listName}. ${inviteText}`;
      })
      .catch(() => {
        title = 'List Not Available';
        description = 'This list Not Available. Check your link or use copy link button to share correct list link.';
      });
    return {
      props: {
        roomId: id,
        description,
        title,
        ...(await serverSideTranslations(locale!, ['common']))
      }
    };
  } catch (error) {
    return {
      notFound: true
    };
  }
};

export const getStaticPaths: GetStaticPaths<ParsedQueryParams> = async () => {
  const rooms = await apiTodo.getAllTodo();
  const paths = rooms.data.flatMap((room: {id: string}) => ({params: {id: `${room.id}`}}));
  return {paths, fallback: 'blocking'};
};
