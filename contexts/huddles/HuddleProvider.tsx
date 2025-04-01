// import ActivityContainer from "@components/Activity/ActivityContainer";
"use client";

import React, { useContext, createContext, useReducer, ReactNode } from "react";

enum ACTIONS {
  UPDATE_CURRENT_HUDDLE = "update_current_huddle",
  UPDATE_POST_ID = "update_post_ID",
  TOGGLE_VISIBILITY = "toggle_visibility",
  SET_CURRENT_TAB = "set_current_tab",
  RESET_STATES = "reset_states",
  TOGGLE_DRAWER = "toggle_drawer",
  OPEN_FROM_OUTSIDE = "open_from_outside",
  UPDATE_SENDER_ID = "update_sender_id",
  REPLY_POST = "reply_post",
  EDIT_POST = "edit_post",
}

interface State {
  currentHuddle: string | null;
  currentSender: string | null;
  postId: string | null;
  visibility: {
    createPostForm: boolean;
    huddleInfo: boolean;
    reqInvites: boolean;
    participants: boolean;
    reported: boolean;
    commentsListing: boolean;
    cloudIdcard: boolean;
  };
  drawerOpen: boolean;
  openFromOutsideDrawer: boolean;
  currentTab: string | null;
  replyPost: boolean;
  editPost: boolean;
}

interface Action {
  type: ACTIONS;
  payload?: any;
}

const initialState: State = {
  currentHuddle: null,
  currentSender: null,
  postId: null,
  visibility: {
    createPostForm: false,
    huddleInfo: false,
    reqInvites: false,
    participants: false,
    reported: false,
    commentsListing: false,
    cloudIdcard: false,
  },
  drawerOpen: false,
  openFromOutsideDrawer: false,
  currentTab: null,
  replyPost: false,
  editPost: false,
};

interface HuddleContextType {
  state: State;
  actions: {
    updateCurrentHuddle: (sender: string | null | undefined) => void;
    updateCurrentSender: (userId: string | null | undefined) => void;
    updatePostId: (postId: string | null | undefined) => void;
    toggleVisibility: (
      target: keyof State["visibility"],
      value?: boolean
    ) => void;
    toggleDrawer: (isOpen: boolean) => void;
    openFromOutsideOptions: (isOpen: boolean) => void;
    setCurrentTab: (tab: string | null) => void;
    resetStates: () => void;
    replyPostUI: (isOpen: boolean) => void;
    editPostUI: (isOpen: boolean) => void;
  };
}

const HuddleContext = createContext<HuddleContextType | null>(null);

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case ACTIONS.UPDATE_CURRENT_HUDDLE:
      return { ...state, currentHuddle: action.payload };
    case ACTIONS.UPDATE_SENDER_ID:
      return { ...state, currentSender: action.payload };
    case ACTIONS.UPDATE_POST_ID:
      return { ...state, postId: action.payload };

    case ACTIONS.TOGGLE_VISIBILITY:
      const { target, value } = action.payload;
      return {
        ...state,

        visibility: {
          ...state.visibility,
          createPostForm: false,
          huddleInfo: false,
          reqInvites: false,
          participants: false,
          reported: false,
          commentsListing: false,
          cloudIdcard: false,

          [target]: value,
        },
      };

    case ACTIONS.TOGGLE_DRAWER:
      // When closing the drawer, reset all visibility states to their initial values
      return {
        ...state,
        drawerOpen: action.payload,
        // visibility: {
        //   ...initialState.visibility,
        // },
      };
    case ACTIONS.REPLY_POST:
      // When closing the drawer, reset all visibility states to their initial values
      return {
        ...state,
        replyPost: action.payload,
        // visibility: {
        //   ...initialState.visibility,
        // },
      };
    case ACTIONS.EDIT_POST:
      // When closing the drawer, reset all visibility states to their initial values
      return {
        ...state,
        editPost: action.payload,
        // visibility: {
        //   ...initialState.visibility,
        // },
      };
    case ACTIONS.OPEN_FROM_OUTSIDE:
      // When closing the drawer, reset all visibility states to their initial values
      return {
        ...state,
        openFromOutsideDrawer: action.payload,
        // visibility: {
        //   ...initialState.visibility,
        // },
      };

    case ACTIONS.SET_CURRENT_TAB:
      return { ...state, currentTab: action.payload };

    case ACTIONS.RESET_STATES:
      return {
        ...state, // Preserve the current state
        ...initialState, // Reset all fields
        currentHuddle: state.currentHuddle, // Preserve `currentHuddle`
      };

    default:
      return state;
  }
}

interface HuddleProviderProps {
  children: ReactNode;
}

export const HuddleProvider: React.FC<HuddleProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const updateCurrentHuddle = (huddleId: string | null | undefined) => {
    dispatch({ type: ACTIONS.UPDATE_CURRENT_HUDDLE, payload: huddleId });
  };
  const updateCurrentSender = (userId: string | null | undefined) => {
    dispatch({ type: ACTIONS.UPDATE_SENDER_ID, payload: userId });
  };
  const updatePostId = (postId: string | null | undefined) => {
    dispatch({ type: ACTIONS.UPDATE_POST_ID, payload: postId });
  };

  const toggleVisibility = (
    target: keyof State["visibility"],
    value = true
  ) => {
    dispatch({ type: ACTIONS.TOGGLE_VISIBILITY, payload: { target, value } });
  };

  const toggleDrawer = (isOpen: boolean) => {
    dispatch({ type: ACTIONS.TOGGLE_DRAWER, payload: isOpen });
  };
  const replyPostUI = (isOpen: boolean) => {
    dispatch({ type: ACTIONS.REPLY_POST, payload: isOpen });
  };
  const editPostUI = (isOpen: boolean) => {
    dispatch({ type: ACTIONS.EDIT_POST, payload: isOpen });
  };
  const openFromOutsideOptions = (isOpen: boolean) => {
    dispatch({ type: ACTIONS.OPEN_FROM_OUTSIDE, payload: isOpen });
  };

  const setCurrentTab = (tab: string | null) => {
    dispatch({ type: ACTIONS.SET_CURRENT_TAB, payload: tab });
  };

  const resetStates = () => {
    dispatch({ type: ACTIONS.RESET_STATES });
  };

  return (
    <HuddleContext.Provider
      value={{
        state,
        actions: {
          updateCurrentHuddle,
          updateCurrentSender,
          toggleVisibility,
          toggleDrawer,
          setCurrentTab,
          replyPostUI,
          editPostUI,
          resetStates,
          updatePostId,
          openFromOutsideOptions,
        },
      }}
    >
      {children}
    </HuddleContext.Provider>
  );
};

export const useHuddleProvider = (): HuddleContextType => {
  const context = useContext(HuddleContext);
  if (!context) throw new Error("HuddleProvider is missing");
  return context;
};
