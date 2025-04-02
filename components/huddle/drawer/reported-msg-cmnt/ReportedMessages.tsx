// import {
//   ReportedMessagesResponse,
//   useReportedMessages,
// } from "@/app/hooks/huddles/useReportedMessages";
// import { API_STATUS } from "@/common/constant";
// import { useTranslations } from "next-intl";

// import React, { useEffect } from "react";
// import { useInView } from "react-intersection-observer";
// import HuddleSkelton from "../../HuddleSkelton";
// import ReportCard from "./ReportCard";
// import { HttpResponse, TranslationFunction } from "@/types";
// import { useHuddleProvider } from "@/contexts/huddles/HuddleProvider";
// import { Report } from "@/types/huddles";


// const ReportedMessages = ({ active }: { active: string }) => {
//   const { state } = useHuddleProvider();
//   const t: TranslationFunction = useTranslations("huddles");
//   const {
//     data: reportedMessages,
//     status,
//     isFetching,
//     fetchNextPage,
//     hasNextPage,
//     isFetchingNextPage,
//   } = useReportedMessages(state.currentHuddle || "");

//   console.log("reported messages", reportedMessages);
//   const { ref, inView } = useInView();
//   useEffect(() => {
//     if (inView && hasNextPage) {
//       fetchNextPage();
//     }
//   }, [inView]);
//   return (
//     <section
//       ref={ref}
//       style={{ height: "calc(100vh - 180px)" }}
//       className="w-full relative h-auto mt-1  border-bgray border- 2 custom-scrollbar  overflow-y-auto pb-28  flex flex-col gap-5 mb-2 px-2"
//     >
//       {API_STATUS.PENDING === status && (
//         <>
//           <HuddleSkelton />
//           <HuddleSkelton />
//           <HuddleSkelton />
//           <HuddleSkelton />
//           <HuddleSkelton />
//         </>
//       )}
//       {API_STATUS?.SUCCESS &&
//         reportedMessages?.pages?.map(
//           (page: HttpResponse<ReportedMessagesResponse>) =>
//             page?.result?.reports?.map((report: Report, index: number) => {
//               return (
//                 <ReportCard
//                   key={index}
//                   huddleId={state?.currentHuddle}
//                   active={active}
//                   message={report?.message}
//                   sendBy={report?.sender_name}
//                   reportedParticpants={report?.reports_count}
//                   reportedDate={report?.message_sent}
//                   reporterImage={report?.thumbnail}
//                   messageId={report?.message_id}
//                   status={report?.status}
//                   roomId={report?.room_id}
//                 />
//               );
//             })
//         )}
//       {isFetchingNextPage && (
//         <>
//           <HuddleSkelton />
//           <HuddleSkelton />
//           <HuddleSkelton />
//           <HuddleSkelton />
//           <HuddleSkelton />
//           <HuddleSkelton />
//           <HuddleSkelton />
//           <HuddleSkelton />
//           <HuddleSkelton />
//           <HuddleSkelton />
//           <HuddleSkelton />
//           <HuddleSkelton />
//         </>
//       )}
//       {hasNextPage && !isFetching && (
//         <div ref={ref}>
//           <HuddleSkelton />
//           <HuddleSkelton />
//         </div>
//       )}
//       {reportedMessages?.pages.every(
//         (page: HttpResponse<ReportedMessagesResponse>) =>
//           !page?.result?.reports?.length
//       ) && (
//         <p className="text-center flex justify-center items-center text-gray-500 mt-4">
//           {t("empty_message_5")}
//         </p>
//       )}
//     </section>
//   );
// };

// export default ReportedMessages;
import React from 'react'

interface ReportedMessagesProps {
  active: string;
}

const ReportedMessages = ({ active }: ReportedMessagesProps) => {
  return (
    <div>
      ReportedMessages
    </div>
  )
}

export default ReportedMessages
