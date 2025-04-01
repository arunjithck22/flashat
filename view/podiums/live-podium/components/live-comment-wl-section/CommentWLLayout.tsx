import {  SinglePodium } from "@/types/podiums";
import CommentInput from "./CommentInput";
import LiveComments from "./comments/LiveComments";

import WaitingList from "./waiting-list/WaitingList";


const CommentWLLayout = ({
  podiumData,
}: {
  podiumData: SinglePodium | undefined;
}) => {
  // const { socket } = usePodiumSocket();
  // const [animate, setAnimate] = useState(false);
  // const [direction, setDirection] = useState(0); // Keep track of the direction for each like

  // const showLikeAnimation = async (payload: PodiumLiveChatPayload) => {
  //   if (payload?.chat_type === PODIUM_LIVE_CHAT_TYPE.PAID_LIKE) {
  //     setAnimate(true);
  //     setDirection((prevDirection) => prevDirection + 1); // Change direction on each like

  //     // Reset animation after a short time (same as animation duration)
  //     setTimeout(() => setAnimate(false), 1000);
  //   }
  // };

  // const calculateRotation = (direction: number) => {
  //   if (direction % 3 === 0) {
  //     return 15; // Slight rotation on first like
  //   } else if (direction % 3 === 1) {
  //     return -15; // Opposite direction for second like
  //   }
  //   return 30; // A larger rotation for the third like, and so on
  // };
  // useEffect(() => {
  //   if (socket) {
  //     socket.on(PODIUM_EVENTS.LIVE_CHAT, showLikeAnimation);

  //     return () => {
  //       socket.off(PODIUM_EVENTS.LIVE_CHAT, showLikeAnimation);
  //     };
  //   }
  // }, [socket]);
  return (
    <div className="relative w-full h-full bg-white">
      <div className="w-full h-[40vh] lg:h-[90%] grid grid-cols-5 grid-rows-1 ">
        <div className="col-span-4 row-span-1">
          <LiveComments welcome_message={podiumData?.about || ""} />
        </div>
        <WaitingList podiumData={podiumData} />
      </div>
      {/* <motion.div
        initial={{ opacity: 0, y: 0, rotate: 0 }}
        animate={{
          opacity: animate ? 0 : 1, // Fade out as it moves
          y: animate ? -150 : 0, // Move up
          rotate: animate ? calculateRotation(direction) : 0, // Rotate to give curved path effect
        }}
        transition={{
          duration: 1,
          ease: "easeOut",
        }}
        className="absolute left-1/2 bottom-0 transform -translate-x-1/2"
      >
        <Image
          alt="Like animation"
          src="/podiums/paid-likes.svg"
          width={30}
          height={30}
        />
      </motion.div> */}
      <div className=" w-full flex items-center mt-2">
        <CommentInput
          role={podiumData?.role || ""}
          chat_disabled={podiumData?.chat_disabled}
          chat_disabled_by={podiumData?.chat_disabled_by}
        />
      </div>
    </div>
  );
};

export default CommentWLLayout;
