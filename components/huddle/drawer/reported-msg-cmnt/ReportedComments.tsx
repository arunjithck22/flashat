import {
  ReportedCommentsResponse,
  useReportedComments,
} from "@/app/hooks/huddles/useReportedComments";
import { API_STATUS } from "@/common/constant";
import { useTranslations } from "next-intl";
import React, { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import HuddleSkelton from "../../HuddleSkelton";
import ReportCard from "./ReportCard";
import { HttpResponse, TranslationFunction } from "@/types";
import { useHuddleProvider } from "@/contexts/huddles/HuddleProvider";
import { CommentReport } from "@/types/huddles";

const ReportedComments = ({ active }: { active: string }) => {
  const t: TranslationFunction = useTranslations("huddles");
  const { state } = useHuddleProvider();
  const { ref, inView } = useInView();
  const {
    data: reportedComments,
    status,
    isFetching,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useReportedComments(state?.currentHuddle || "");

  console.log("reported comments", reportedComments);
  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView]);
  return (
    <section
      ref={ref}
      style={{ height: "calc(100vh - 170px)" }}
      className="w-full relative h-auto mt-1  border-bgray border- 2 pb-28 custom-scrollbar  overflow-y-auto  flex flex-col gap-5  mb-2 px-2"
    >
      {API_STATUS.PENDING === status && (
        <>
          <HuddleSkelton />
          <HuddleSkelton />
          <HuddleSkelton />
          <HuddleSkelton />
          <HuddleSkelton />
        </>
      )}
      {API_STATUS.SUCCESS === status &&
        reportedComments?.pages?.map(
          (page: HttpResponse<ReportedCommentsResponse>) =>
            page?.result?.reports?.map(
              (report: CommentReport, index: number) => {
                return (
                  <ReportCard
                    key={index}
                    huddleId={state?.currentHuddle}
                    active={active}
                    comment={report?.comment}
                    commentSendBy={report?.sender_name}
                    commentReportedCount={report?.reports_count}
                    commentReportedDate={report?.message_sent}
                    commentReporterImage={report?.thumbnail}
                    commentId={report?.comment_id}
                    messageId={report?.post_id}
                    status={report?.status}
                    // refetch={refetch}
                  />
                );
              }
            )
        )}
      {isFetchingNextPage && (
        <>
          <HuddleSkelton />
          <HuddleSkelton />
          <HuddleSkelton />
          <HuddleSkelton />
          <HuddleSkelton />
          <HuddleSkelton />
          <HuddleSkelton />
          <HuddleSkelton />
          <HuddleSkelton />
          <HuddleSkelton />
          <HuddleSkelton />
          <HuddleSkelton />
        </>
      )}
      {hasNextPage && !isFetching && (
        <div ref={ref}>
          <HuddleSkelton />
          <HuddleSkelton />
        </div>
      )}
      {API_STATUS.SUCCESS === status &&
        reportedComments?.pages.every(
          (page: HttpResponse<ReportedCommentsResponse>) =>
            !page?.result?.reports?.length
        ) && (
          <p className="text-center flex justify-center items-center text-gray-500 mt-4">
            {t("empty_message_6")}
          </p>
        )}
    </section>
  );
};

export default ReportedComments;
