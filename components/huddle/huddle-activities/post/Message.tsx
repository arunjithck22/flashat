interface MessageProps {
  children: React.ReactNode;
}

export const Message = ({ children }: MessageProps) => {
  return <div className="pl-14"> {children}</div>;
};
