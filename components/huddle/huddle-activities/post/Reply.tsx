// import { Video } from "./Video";

// import { TextMessage } from "./TextMessage";
// import { Sender } from "./Sender";
// import { Message } from "./Message";
// import Audio from "./Audio";
// import { MediaImage } from "./Image";
// import { MEDIA_TYPES } from "@/common/constant";
// import { useTranslations } from "next-intl";
// import { TranslationFunction } from "@/types";
// import { HuddleReplyToMessage } from "@/types/huddles";

// export const Reply = ({
//   roomId,
//   isCurrentUser,
//   ...message
// }: {
//   roomId: string;
//   isCurrentUser: boolean;
// } & HuddleReplyToMessage) => {
//   const t: TranslationFunction = useTranslations("huddles");
//   console.log("reply message", message);
//   return (
//     <div className="w-full flex flex-col md:w-3/4 lg:w-2/3  mt-8 text-xs">
//       <label className="text-secGray">{t("replied_to")} </label>
//       <section className="bg-postYellow mt-4 flex flex-col rounded border border-gray-300 p-4">
//         <Sender
//           isCurrentUser={isCurrentUser}
//           name={message.sender_name}
//           {...message}
//         />
//         <Message>
//           <TextMessage message={message.message} />
//           {message?.media_type === MEDIA_TYPES.IMAGE && (
//             <MediaImage
//               {...message}
//               messageId={message.message_id}
//               roomId={roomId}
//               type={message.message_type}
//               mediaUrl={message.media}
//               thumbnail={message.media}
//             />
//           )}
//           {message?.media_type === MEDIA_TYPES.VIDEO && (
//             <Video
//               {...message}
//               messageId={message.message_id}
//               roomId={roomId}
//               thumbnail={message?.thumbnail_url}
//             />
//           )}
//           {message?.media_type === MEDIA_TYPES.AUDIO && (
//             <div className="flex justify-center items-center w-full ">
//               <Audio
//                 {...message.media_meta}
//                 messageId={message.message_id}
//                 roomId={roomId}
//               />
//             </div>
//           )}
//         </Message>
//       </section>
//     </div>
//   );
// };


import React from 'react'

const Reply = () => {
  return (
    <div>
      Reply
    </div>
  )
}

export default Reply

