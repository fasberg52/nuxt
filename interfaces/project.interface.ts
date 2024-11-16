export interface IProject {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  images?: string[];
  tags?: string[];
  categories?: string[];
  createdAt?: Date;
  updatedAt?: Date | null;
}
