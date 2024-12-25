export interface Board {
  id: number;
  owner_id: string | null;
  title: string | null;
  content: any; // Using any for now since content is JSONB
  created_at: string | null;
  updated_at: string | null;
  thumbnail: string | null;
}

export interface BoardsResponse {
  data: Board[] | null;
  error: Error | null;
  isLoading: boolean;
  refetch: () => Promise<void>;
}