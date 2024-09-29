export interface ExampleWork {
  id: string;
  title: string;
  description: string;
  image: string;
  url: string;
}

export interface PortfolioItem {
    id: number;
    featured_media: string;
    title: { rendered: string };
    excerpt: { rendered: string };
    link: string;
  }