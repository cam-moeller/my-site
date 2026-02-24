export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  description: string;
  tags: string[];
  published: boolean;
}

export interface Project {
  slug: string;
  title: string;
  description: string;
  tags: string[];
  github?: string;
  url?: string;
  date: string;
  featured: boolean;
}
