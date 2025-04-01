interface KababOptionsProps extends Partial<SenderDetails> {
  pinned: boolean;
  isCurrentUser: boolean;
  messageId: string;
  user_status?: string;
  sender?: number;
} 