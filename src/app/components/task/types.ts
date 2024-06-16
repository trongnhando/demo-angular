export type Task = {
  id: number;
  title: string;
  body?: string;
  userId?: number;
};

export const dummy = [
  {
    id: 1,
    title: 'Hello world',
  },
  {
    id: 2,
    title: 'My name is Hello',
  },
  {
    id: 3,
    title: 'World is my friend',
  },
];
