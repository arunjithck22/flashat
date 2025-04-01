import { SenderDetails } from "@/types/huddles/index";

export interface KababOptionsProps extends Partial<SenderDetails > {
  pinned: boolean;
  isCurrentUser: boolean;
  messageId: string;
  user_status?: string;
  sender?: number;
} 