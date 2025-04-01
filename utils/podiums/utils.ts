"use client";

import { Speaker } from "@/types/podiums";
import { IMicrophoneAudioTrack, UID } from "agora-rtc-react";

export function isCurrentUserInSpeakerList(
  speakerList: Speaker[],
  currentUID: UID | undefined
): boolean {
  return speakerList?.some((speaker) => speaker?.id === currentUID) ?? false;
}

export const muteLocalAudio = (audioTrack: IMicrophoneAudioTrack | null) => {
  if (!audioTrack) return;
  // audioTrack.setMuted(true)
  audioTrack.setVolume(0);
};

// Unmute local audio
export const unmuteLocalAudio = (audioTrack: IMicrophoneAudioTrack | null) => {
  if (!audioTrack) return;
  // audioTrack.setMuted(false)
  audioTrack.setVolume(100);

  // Set the volume to a reasonable volume level
};

export const isManagerOnline = (
  adminsList: (string | number)[],
  managerId: string
) => {
  console.log("isManager", managerId, adminsList);
  return adminsList?.includes(Number(managerId)) ?? false;
};

export const isAdmin = (
  adminsList: (string | number)[],
  user_id: string | undefined
) => {
  return adminsList?.includes(Number(user_id)) ?? false;
};

export const isAdminInvited = (
  adminInvitedList: (string | number)[],
  user_id: string | undefined
) => {
  return adminInvitedList?.includes(Number(user_id)) ?? false;
};

export function isUserInSpeakerList(
  speakerList: Speaker[],
  user_id: string | undefined
): boolean {
  return (
    speakerList?.some(
      (speaker) => speaker?.id?.toString() === user_id?.toString()
    ) ?? false
  );
}

export function isUserFrozen(
  frozenUsers: (string | number)[],
  user_id: string | undefined
): boolean {
  return frozenUsers?.includes(Number(user_id)) ?? false;
}

export function isUsersGiftPaused(
  pausedUsers: ( number | undefined )[],
  user_id: string | undefined
): boolean {
  return pausedUsers?.includes(Number(user_id)) ?? false;
}
