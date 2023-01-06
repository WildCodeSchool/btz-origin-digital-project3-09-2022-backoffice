export type TNewUser = {
  firstname: string;
  lastname: string;
  username: string;
  email: string;
  imageUrl?: string | null;
  role: string;
  password: string;
};

export type TUser = {
  id: string;
  firstname: string;
  lastname: string;
  username: string;
  email: string;
  imageUrl: string | null;
  role: string;
  createdAt: Date;
  updatedAt: Date;
};

export type TVideo = {
  id: string;
  title: string;
  description: string;
  display: boolean;
  thumbnailUrl: string;
  videoUrl: string;
  teaserUrl: string;
  isPublic: boolean;
  createdAt: Date;
  updatedAt: Date;
  nbViews: number;
  duration: number;
  categoryId: string;
};

export type TNewVideo = {
  title: string;
  description: string;
  display: boolean;
  thumbnailUrl: string;
  videoUrl: string;
  teaserUrl: string;
  isPublic: boolean;
  duration: number;
  categoryId: string;
};
