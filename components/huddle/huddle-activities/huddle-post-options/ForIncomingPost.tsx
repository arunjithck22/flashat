import React, { useState } from "react";
import {
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";

import { useParams } from "next/navigation";
import { HUDDLES_TABS } from "@/common/constant";
import useRemoveFromHuddle from "@/app/hooks/huddles/useRemoveFromHuddle";
import useBlockOrUnblockFromHuddle from "@/app/hooks/huddles/useBlockOrUnblockFromHuddle";
import { useQueryClient } from "@tanstack/react-query";
import { QKEY_HUDDLE_MESSAGES } from "@/app/hooks/huddles/useHuddleMessages";
import { HUDDLE_POST_SENDER_ROLES } from "@/constants/huddles";
import usePinHuddlePost from "@/app/hooks/huddles/usePinHuddlePost";

import { useTranslations } from "next-intl";
import { TranslationFunction } from "@/types";
import { SenderDetails } from "@/types/huddles";
import { useHuddleProvider } from "@/contexts/huddles/HuddleProvider";

interface ForIncomingPostProps {
  pinned: boolean;
  messageId: string;
  sender: number | undefined;
  blocked_by_admin?: boolean; // Make this optional
  blocked_by_leader?: boolean; // Make this optional
  huddle_admin_blocked?: boolean; // Make this optional
  role: string;
  // Other fields can be included as needed
}

const ForIncomingPost = ({
  pinned,
  messageId,
  sender,
  blocked_by_admin,
  blocked_by_leader,
  huddle_admin_blocked,

  role,
  ...message
}: ForIncomingPostProps & SenderDetails) => {
  const t: TranslationFunction = useTranslations("huddles");
  const { actions } = useHuddleProvider();

  console.log("1message", message);

  const params = useParams();
  const queryClient = useQueryClient();

  const removeFromHuddleMuation = useRemoveFromHuddle();
  const blockOrUnBlockMutation = useBlockOrUnblockFromHuddle();
  const pinPostMutation = usePinHuddlePost();
  // const appointAdminMutation = useAppointAsAdmin();

  const [isPinned, setIsPinned] = useState(pinned);
  const dropdownItems = [
    // {
    //   label: "Share this Post",
    //   onClick: () => console.log("Sharing post..."),
    //   condition: message.is_premium || message.role === "admin",
    // },
    // {
    //   label:
    //     role !== HUDDLE_POST_SENDER_ROLES.ADMIN
    //       ? "Appoint as admin"
    //       : "Dismiss Admin",
    //   onClick: () => {
    //     appointAsAdmin();
    //   },
    //   condition:
    //     params.type === HUDDLES_TABS.USER_MANAGED &&
    //     message.is_premium &&
    //     role !== null,
    // },
    // {
    //   label: "Send private Message",
    //   onClick: () => console.log("Replying to post..."),
    //   condition: true,
    // },
    {
      label: t("view_info"),
      onClick: () => {
        actions.updateCurrentSender(sender?.toString());
        actions.toggleDrawer(true);
        actions.toggleVisibility("cloudIdcard", true);
      },
      condition: true,
    },
    {
      label: t("reply_to_this_post"),
      onClick: () => {
        actions.updatePostId(messageId);
        actions.replyPostUI(true);
      },
      condition: true,
    },
    {
      label: isPinned ? t("unpin_this_post") : t("pin_this_post"),
      onClick: () => {
        handlePinPost();
      },
      condition: params.type === HUDDLES_TABS.USER_MANAGED,
    },
    // {
    //   label: "Report this Post",
    //   onClick: () => console.log("Reporting to post..."),
    //   condition: true,
    // },
    {
      label:
        blocked_by_admin || blocked_by_leader || huddle_admin_blocked
          ? t("unblock_from_huddle")
          : t("block_from_huddle"),
      onClick: () => {
        const action =
          blocked_by_leader || blocked_by_admin || huddle_admin_blocked
            ? "unblock"
            : "block";
        blockOrUnblock(action);
      },
      condition: role !== null,
    },
    // {
    //   label: "Ban from Posting",
    //   onClick: () => console.log("ban from posting"),
    //   condition: true,
    // },
    // {
    //   label: "Ban from Replying",
    //   onClick: () => console.log("ban reply"),
    //   condition: true,
    // },
    // {
    //   label: "Ban from writing Comment",
    //   onClick: () => console.log("ban comments"),
    //   condition: true,
    // },
    {
      label: t("remove_from_huddle"),
      onClick: () => {
        removeFromHuddleFn();
      },
      condition:
        role !== HUDDLE_POST_SENDER_ROLES.MANAGER &&
        role !== null &&
        (params?.type === HUDDLES_TABS.ADMIN ||
          params.type === HUDDLES_TABS.USER_MANAGED),
    },
  ];
  const blockOrUnblock = (action: string) => {
    blockOrUnBlockMutation.mutateAsync(
      {
        huddleId: params?.id?.toString(),
        data: {
          block_user_ids: [sender],
          action: action,
        },
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
  const removeFromHuddleFn = () => {
    removeFromHuddleMuation.mutateAsync(
      {
        huddleId: params?.id?.toString(),
        data: {
          member_id: sender,
        },
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

  const handlePinPost = () => {
    pinPostMutation.mutateAsync(
      {
        huddleId: params?.id?.toString(),
        data: { message_id: messageId, pin: !isPinned },
      },
      {
        onSuccess: () => {
          setIsPinned(!isPinned);
          queryClient.invalidateQueries({
            queryKey: [QKEY_HUDDLE_MESSAGES, params?.id],
          });
        },
      }
    );
  };

  // const appointAsAdmin = () => {
  //   appointAdminMutation.mutateAsync(
  //     {
  //       huddleId: params?.id,
  //       data: { member_id: [sender] },
  //     },
  //     {
  //       onSuccess: (data) => {
  //         queryClient.invalidateQueries({
  //           queryKey: [QKEY_HUDDLE_MESSAGES, params?.id],
  //         });
  //       },
  //     }
  //   );
  // };
  return (
    <DropdownMenuContent className=" bg-white text-black py-2 text-md font-medium ">
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

export default ForIncomingPost;
