export interface IHighlight {
  id: number;
  title: string;
  date: string;
  thumbnail: string;
  videoUrl: string;
}

export interface IArticle {
  id: string;
  title: string;
  createdAt: string;
  image: string;
}

export interface ISocial {
  id: number;
  link: string;
  icon: string;
  name: string;
}
