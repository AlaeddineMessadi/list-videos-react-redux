export interface Category {
  id: number;
  name: string;
}

export interface Video {
  id: number;
  catIds: number[];
  name: string;
  formats: Format[];
  date: string;
}

export interface Author {
  id: number;
  name: string;
  videos: Video[];
}

export interface Format {
  name: string;
  res: string;
  size: number;
}
export interface ProcessedVideo {
  id: number;
  name: string;
  author: string;
  categories: string[];
  formats: Format[];
  date: string;
}

export interface FormErrors {
  videoName: boolean;
  author: boolean;
  categoryNames: boolean;
}
