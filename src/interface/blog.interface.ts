export interface IBlogAuthor {
  id?: string;
  name?: string;
  profilePhoto?: string | null;
}

export interface IBlogCommentPlayer {
  userId: string;
  name?: string;
  profilePhoto?: string | null;
}

export interface IBlogComment {
  id: string;
  comment: string;
  createdAt: string;
  player?: IBlogCommentPlayer | null;
}

export interface IBlogCount {
  reactions?: number;
  comments?: number;
}

export interface IBlog {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  image?: string | null;
  createdAt: string;
  updatedAt?: string;
  category?: string | null;
  readingTime?: string | null;
  author?: IBlogAuthor | null;
  comments?: IBlogComment[];
  _count?: IBlogCount;
  hasReacted?: boolean;
  activeReactionType?: string | null;
}
