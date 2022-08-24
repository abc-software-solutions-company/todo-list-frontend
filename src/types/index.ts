export interface IPropsBase {
  className?: string;
  theme?: 'dark' | 'light';
}

export interface IAppContext {
  menuVisible: boolean;
  modalCreateNewVisible: boolean;
  setting: {
    name: string;
  };
}

export interface IAnyObj {
  [k: string]: any;
}

export interface IQueryOptions {
  page: number;
  pageSize: number;
}

export interface IPagination {
  page: number;
  pageSize: number;
  pageCount: number;
  total: number;
}

interface IMeta {
  pagination: IPagination;
}

interface IBastAttributes {
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  locale: string;
}

export interface IData<T> {
  id: number;
  attributes: T;
}

interface IError {
  status: number;
  name: string;
  message: string;
  details: IAnyObj;
}

export interface IAxiosResponse<T> {
  data: T;
  meta: IMeta | IAnyObj;
  error: IError;
}

export interface IImageFormat {
  ext: string;
  hash: string;
  height: number;
  mime: string;
  name: string;
  path: unknown;
  size: number;
  url: string;
  width: number;
}

export interface IImageFormatList {
  large: IImageFormat;
  medium: IImageFormat;
  small: IImageFormat;
  thumbnail: IImageFormat;
}

export interface IImageAttributes extends IBastAttributes {
  alternativeText: string;
  caption: string;
  ext: string;
  url: string;
  formats: IImageFormatList;
  height: number;
  width: number;
  placeholder: string;
}

export interface IImageAttrs {
  data: IData<IImageAttributes>;
}

export interface IArrayImage {
  data: IData<IImageAttributes>[];
}

export interface IPost {
  data: IData<IPostAttributes>[];
}

export interface ISectionItem {
  data: IData<ISectionItemAttributes>[];
}

export interface ICategory {
  name: string;
  slug: string;
}
export interface IAuthor {
  fullName: string;
  avatar: IImageAttrs;
}

interface ICategoryDataForPost<T> {
  data: T;
}

interface ICategoryDataForProject<T> {
  data: T;
}
interface IAuthorDataForPost<T> {
  data: T;
}

interface IAuthorDataForProject<T> {
  data: T;
}
interface IPostsDataForPost<T> {
  data: T;
}
interface IProjectsDataForProject<T> {
  data: T;
}

export interface ISectionItemAttributes extends IBastAttributes {
  body: string;
  title: string;
  description: string;
  url: string;
  image: IImageAttrs;
  order: number;
}

export interface ICategoryAttributes extends IBastAttributes {
  name: string;
  description: string;
  posts: IPost;
  slug: string;
  type: string;
}

export interface ISectionAttributes extends IBastAttributes {
  name: string;
  description: string;
  items: ISectionItem;
  body: string;
  cover: IImageAttrs;
}

export interface IPostAttributes extends IBastAttributes {
  title: string;
  description: string;
  slug: string;
  body: string;
  categories: ICategoryDataForPost<IData<ICategory>[]>;
  cover: IArrayImage;
  author: IAuthorDataForPost<IData<IAuthor>>;
  relatedPosts: IPostsDataForPost<IData<IPostAttributes>[]>;
}

export interface IProjectAttributes extends IBastAttributes {
  title: string;
  description: string;
  slug: string;
  body: string;
  location: string;
  yearOfCompletion: string;
  floorArea: string;
  categories: ICategoryDataForProject<IData<ICategory>[]>;
  cover: IArrayImage;
  author: IAuthorDataForProject<IData<IAuthor>>;
  relatedProjects: IProjectsDataForProject<IData<IProjectAttributes>[]>;
}
export interface ISettingAttributes extends IBastAttributes {
  id: string;
  name: string;
  email: string;
  socials: JSON;
}
export type ICategoriesResponse = IAxiosResponse<IData<ICategoryAttributes>[]>;
export type ICategoryResponse = ICategoriesResponse; // Strapi always return an array instead object

export type IProjectsResponse = IAxiosResponse<IData<IProjectAttributes>[]>;
export type IProjectResponse = IProjectsResponse; // Strapi always return an array instead object

export type IPostsResponse = IAxiosResponse<IData<IPostAttributes>[]>;
export type IPostResponse = IPostsResponse; // Strapi always return an array instead object

export type ISectionResponse = IAxiosResponse<IData<ISectionAttributes>>;
export type ISectionsResponse = IAxiosResponse<IData<ISectionAttributes>[]>;

export type ISettingResponse = IAxiosResponse<IData<ISettingAttributes>>;
