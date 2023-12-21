export type BlogPost = {
  title: string;
  image: string;
  imageAlt: string;
  description: string;
  date: Date;
  slug: string;
  author: Author
};


export type Author = {
  name: string;
  image: string;
  imageAlt: string;
  github: string;
}
