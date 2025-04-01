import React from "react";
import {
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { useParams } from "next/navigation";
import { HUDDLES_TABS } from "@/common/constant";
import usePinHuddlePost from "@/app/hooks/huddles/usePinHuddlePost";
import { useQueryClient } from "@tanstack/react-query";
import { QKEY_HUDDLE_MESSAGES } from "@/app/hooks/huddles/useHuddleMessages";
import { useTranslations } from "next-intl";
import { TranslationFunction } from "@/types";
import { SenderDetails } from "@/types/huddles";
import { useHuddleProvider } from "@/contexts/huddles/HuddleProvider";

interface ForOutGoingPostProps {
  pinned: boolean;
  messageId: string;
  is_premium: boolean | undefined;
}

const ForOutGoingPost = ({
  pinned,
  messageId,
  is_premium,
}: // eslint-disable-next-line @typescript-eslint/no-unused-vars

ForOutGoingPostProps & SenderDetails) => {
  // State to manage post status
  const { actions } = useHuddleProvider();
  const t: TranslationFunction = useTranslations("huddles");
  const params = useParams();
  const queryClient = useQueryClient();

  const pinPostMutation = usePinHuddlePost();

  const dropdownItems = [
    // {
    //   label: "Share this Post",
    //   onClick: () => console.log("Sharing post..."),
    //   condition: message.is_premium,
    // },
    {
      label: t("edit_post"),
      onClick: () => {
        actions?.updatePostId(messageId);
        actions.editPostUI(true);
        actions.replyPostUI(false);
      },
      condition: is_premium,
    },
    {
      label: t("reply_to_this_post"),
      onClick: () => {
        actions.updatePostId(messageId);
        actions.replyPostUI(true);
        actions.editPostUI(false);
      },
      condition: true, // Add your condition here
    },
    {
      label: pinned ? t("unpin_this_post") : t("pin_this_post"),
      onClick: () => {
        handlePinPost();
      },
      condition: params.type === HUDDLES_TABS.USER_MANAGED, // Add your condition here
    },
  ];

  const handlePinPost = () => {
    pinPostMutation.mutateAsync(
      {
        huddleId: params?.id?.toString(),
        data: { message_id: messageId, pin: !pinned },
      },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({
            queryKey: [QKEY_HUDDLE_MESSAGES, params?.id],
          });
        },
      }
    );
  };

  return (
    <DropdownMenuContent className="bg-white text-black py-2 text-md font-medium">
      {dropdownItems
        .filter((item) => item.condition) // Filter items based on condition
        .map((item, index) => (
          <DropdownMenuItem key={index} onClick={item.onClick}>
            {item.label}
          </DropdownMenuItem>
        ))}
    </DropdownMenuContent>
  );
};

export default ForOutGoingPost;
