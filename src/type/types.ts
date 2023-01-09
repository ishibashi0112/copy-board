export type Contents = {
  id: string;
  title: string;
  body: string;
  tagId: string;
};

export type Tag = {
  id: string;
  name: string;
  contents: Contents[];
};
