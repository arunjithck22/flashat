"use client";
import useDeleteReportedComment from "@/app/hooks/huddles/useDeleteComment";
import { QKEY_HUDDLES_REPORTED_COMMENTS } from "@/app/hooks/huddles/useReportedComments";
import { QKEY_HUDDLES_REPORTED_MESSAGES } from "@/app/hooks/huddles/useReportedMessages";
import ConfirmationAlert from "@/components/shared/confirmation-alert/ConfirmationAlert";
import { useAuth } from "@/contexts/AuthContext";
import { useSocket } from "@/contexts/SocketContext";
import { useQueryClient } from "@tanstack/react-query";
import moment from "moment";
import Image from "next/image";
import React, { useState } from "react";

const ReportCard = ({
  active,
  message,
  sendBy,
  reportedParticpants,
  reportedDate,
  reporterImage,
  comment,
  commentReportedDate,
  commentReporterImage,
  commentSendBy,
  commentReportedCount,
  messageId,
  commentId,
  huddleId,
  roomId,
  status,
}: {
  active: string;
  message?: string;
  sendBy?: string;
  reportedParticpants?: number;
  reportedDate?: string;
  reporterImage?: string;
  comment?: string;
  commentSendBy?: string;
  commentReportedDate?: string;
  commentReporterImage?: string | null;
  commentReportedCount?: number;
  messageId: string;
  commentId?: string;
  huddleId: string | null;
  status: string;

  roomId?: string;
}) => {
  console?.log("messageId", messageId);

  const HuddleEventKeys = {
    MESSAGE_ID: "message_id",
    DELETE_FOR_EVERYONE: "deleteForEveryone",
    BLOCK_SENDER: "blockSender",
    ROOM_ID: "room_id",
    MESSAGES: "messages",
  };

  const [confirmDelete, setConfirmDelete] = useState(false);
  const [senderBlocked, setSenderBlocked] = useState(false);
  const [promptMessage, setPromptMessage] = useState({
    id: "",
    title: "",
    message: "",
  });
  const { user } = useAuth();
  const { socket } = useSocket();
  const queryClient = useQueryClient();
  const deleteCommentMutation = useDeleteReportedComment();

  function capitalizeFirstLetter(str: string) {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  }
  const handleDelete = () => {
    setConfirmDelete(true);

    if (active === "messages") {
      setPromptMessage({
        id: "",
        message: "Delete this message from the Huddle?",
        title: "Delete Message",
      });
    } else {
      setPromptMessage({
        id: "",
        message: "Delete this comment from the Huddle?",
        title: "Delete Comment",
      });
    }
  };

  const deleteReportedMessage = () => {
    const payload = {
      [HuddleEventKeys.DELETE_FOR_EVERYONE]: true,
      [HuddleEventKeys.MESSAGES]: [
        {
          [HuddleEventKeys.MESSAGE_ID]: messageId,
          [HuddleEventKeys.ROOM_ID]: roomId,
        },
      ],
    };
    socket.emit("huddle_chat_delete", payload);
    queryClient.invalidateQueries({
      queryKey: [QKEY_HUDDLES_REPORTED_MESSAGES, huddleId],
    });
  };

  const deleteReportedComment = async () => {
    console.log("deleting comment");
    try {
      const result = await deleteCommentMutation.mutateAsync({
        huddleId,
        commentId,
        messageId,
        userId: user,
        sender_blocked: senderBlocked,
      });

      console.log("result is", result);
      queryClient.invalidateQueries({
        queryKey: [QKEY_HUDDLES_REPORTED_COMMENTS, huddleId],
      });
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error("Error in delete:", error.message);
        throw new Error(error.message); // Re-throw the error for upstream handling
      } else {
        console.error("An unexpected error occurred", error);
        throw new Error("An unknown error occurred");
      }
    }
  };
  const okHandler = () => {
    if (active === "messages") {
      deleteReportedMessage();
    } else {
      deleteReportedComment();
    }
  };
  return (
    <>
      <div className="flex flex-col rounded-md border shadow-sm pt-2">
        <div className="flex flex-col shadow-md">
          <header className="flex max-w-[434px] flex-col items-stretch px-5 border-b-2">
            {active === "comments" && (
              <p className="text-xs text-tsecond mb-2">Comment</p>
            )}
            <p className="text-gray-700 text-xs leading-5 tracking-wide w-full">
              {active === "messages" ? message : comment}
            </p>
            <time className="text-gray-500 text-opacity-80 text-xs leading-5 tracking-normal whitespace-nowrap mt-7 self-end">
              {active === "messages"
                ? `${moment(reportedDate)?.format("DD/MM/YYYY")} | ${moment(
                    reportedDate
                  )?.format("hh:mm A")}`
                : `${moment(commentReportedDate)?.format(
                    "DD/MM/YYYY"
                  )} | ${moment(commentReportedDate)?.format("hh:mm A")}`}
            </time>
          </header>
          <section className="flex flex-col pb-2">
            <div className="flex items-center justify-items-start px-5 gap-2 pt-1 text-xs">
              <span>Sent by</span>
              <Image
                className="rounded-full"
                width={28}
                height={28}
                src={
                  active === "messages"
                    ? reporterImage
                      ? reporterImage
                      : "/tw/placeholder/placeholder-image-icon.jpg"
                    : commentReporterImage
                    ? commentReporterImage
                    : "/tw/placeholder/placeholder-image-icon.jpg"
                }
                alt="user"
              />
              <span>{active === "messages" ? sendBy : commentSendBy}</span>
            </div>
            <div className="flex flex-row-reverse">
              {status === "pending" ? (
                active === "messages" ? (
                  <span
                    onClick={handleDelete}
                    className="text-rose-500 flex-nowrap text-right text-xs font-bold cursor-pointer uppercase px-2"
                  >
                    DELETE MESSAGE
                  </span>
                ) : (
                  <span
                    onClick={handleDelete}
                    className="text-rose-500 flex-nowrap text-right text-xs font-bold cursor-pointer uppercase px-2"
                  >
                    DELETE COMMENT
                  </span>
                )
              ) : (
                <span className="text-xs italic px-2 text-gray-500">
                  {capitalizeFirstLetter(status.replace("_", " "))}
                </span>
              )}
            </div>
          </section>
        </div>
        <footer className="px-5 py-3 text-xs shadow-md ">
          <span className="italic">Reported by :</span>
          <span className="text-primary font-bold">
            {" "}
            {active === "messages"
              ? reportedParticpants
              : commentReportedCount}{" "}
            Participants
          </span>
        </footer>
      </div>
      {confirmDelete && active === "comments" && (
        <ConfirmationAlert
          confirmDelete={confirmDelete}
          setConfirmDelete={setConfirmDelete}
          onOk={okHandler}
          promptMessage="Are you sure you want to delete this item?"
          title="Confirm Delete"
          showCheckbox={true}
          checkboxLabel="Block this user from Huddle"
          isCheckboxChecked={senderBlocked}
          handleCheckboxChange={(e) => setSenderBlocked(e.target.checked)}
        />
      )}
      {confirmDelete && active === "messages" && (
        <ConfirmationAlert
          confirmDelete={confirmDelete}
          setConfirmDelete={setConfirmDelete}
          onOk={okHandler}
          showCheckbox={true}
          promptMessage={promptMessage.message}
          title={promptMessage?.title}
          isCheckboxChecked={senderBlocked}
          checkboxLabel="Block this user from Huddle"
          handleCheckboxChange={(e) => setSenderBlocked(e.target.checked)}
        />
      )}
    </>
  );
};

export default ReportCard;
