"use client";
import { KEY_HUDDLES_QUERY } from "@/app/hooks/huddles/useHuddles";
import useSendInvitations from "@/app/hooks/huddles/useSendInvitations";
import { useHuddleProvider } from "@/contexts/huddles/HuddleProvider";
import { useQueryClient } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import DearsList from "./DearsList";
import FansList from "./FansList";
import LikersList from "./LikersList";
import { TranslationFunction } from "@/types";

const AddParticpants = ({ huddleId }: { huddleId: string }) => {
  const t: TranslationFunction = useTranslations("huddles");
  const common: TranslationFunction = useTranslations("common");
  const params = useParams();
  const queryClient = useQueryClient();
  const { actions } = useHuddleProvider();
  const router = useRouter();
  const [clicked, setClicked] = useState("dears");
  const handleClick = (tab: string) => {
    setClicked(tab);
  };
  const [dearsList, setDearsList] = useState([]);
  const [selectAllDearsSelected, setSelectAllDearsSelected] = useState(false);
  const [selectAllFansSelected, setSelectedFansSelected] = useState(false);
  const [selectAllLikersSelected, setSelectAllLikersSelected] = useState(false);
  const [fansList, setFansList] = useState([]);
  const [likersList, setLikersList] = useState([]);
  const [disabled, setDisabled] = useState(true);
  console.log("list", dearsList, fansList, likersList);

  useEffect(() => {
    if (
      dearsList?.length > 0 ||
      fansList?.length > 0 ||
      likersList?.length > 0
    ) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [dearsList, fansList, likersList]);
  const sendInvitationMutation = useSendInvitations();
  const handleInvitation = () => {
    sendInvitationMutation.mutateAsync(
      {
        huddleId: huddleId,
        data: {
          dears: dearsList,
          fanse: fansList,
          likers: likersList,
        },
      },
      {
        onSuccess: (data) => {
          console.log("onSUccess data", data);
          actions.updateCurrentHuddle(huddleId);
          setDearsList([]);
          setFansList([]);
          setLikersList([]);
          router.push(`/huddles/${params.type}/${huddleId}`);
          queryClient.invalidateQueries({
            queryKey: [KEY_HUDDLES_QUERY, params.type],
          });

          // setClickedNext(false);
        },
      }
    );
  };

  const handleFinish = () => {
    actions.updateCurrentHuddle(huddleId);
    queryClient.invalidateQueries({
      queryKey: [KEY_HUDDLES_QUERY, params.type],
    });
    router.push(`/huddles/${params.type}/${huddleId}`);
  };

  return (
    <div className="h-screen relative w-full flex flex-col justify-center items-center bg-white">
      <section className="flex-grow flex flex-col items-center px-8 py-6 pb-28">
        <header className=" fixed  base-medium text-md py-2">
          {t("send_invitations")}{" "}
        </header>
        <div className=" fixed top-40 lg:w-1/3 md:w-full xl:w-1/3 sm:w-full w-full">
          <div className="flex flex-row bg-white shadow-lg border border-gray-100 w-full">
            <button
              onClick={(e) => {
                e.preventDefault();
                handleClick("dears");
              }}
              className={`flex gap-2 w-1/3 justify-center items-center px-3 py-3  ${
                clicked === "dears" ? " text-primary" : " text-tsecond"
              }  `}
            >
              {" "}
              {clicked === "dears" ? (
                <Image
                  width={40}
                  height={40}
                  src="/tw/profile/Dears.svg"
                  alt="dears"
                />
              ) : (
                <Image
                  width={40}
                  height={40}
                  src="/tw/profile/dears-default.svg"
                  alt="dears-default"
                />
              )}
              {common("dears")}
            </button>
            <button
              onClick={(e) => {
                e.preventDefault();
                handleClick("fans");
              }}
              className={`flex gap-2 w-1/3 justify-center items-center px-3  py-3 ${
                clicked === "fans" ? "text-primary" : " text-tsecond"
              }`}
            >
              {clicked === "fans" ? (
                <Image
                  width={40}
                  height={40}
                  src="/tw/profile/Fans.svg"
                  alt="fans"
                />
              ) : (
                <Image
                  width={40}
                  height={40}
                  src="/tw/profile/fans-default.svg"
                  alt="fans-default"
                />
              )}
              {common("fans")}
            </button>
            <button
              onClick={(e) => {
                e.preventDefault();
                handleClick("likers");
              }}
              className={`flex gap-2 w-1/3 justify-center items-center  px-3 py-3 ${
                clicked === "likers" ? " text-primary" : " text-tsecond"
              }`}
            >
              {clicked === "likers" ? (
                <Image
                  width={40}
                  height={40}
                  src="/tw/profile/Likers.svg"
                  alt="fans"
                />
              ) : (
                <Image
                  width={40}
                  height={40}
                  src="/tw/profile/likers-default.svg"
                  alt="fans"
                />
              )}
              {common("likers")}
            </button>
          </div>
          <section
            className="overflow-y-auto flex flex-col pt-10 custom-scrollbar  bg-white "
            style={{ height: "calc(100vh - 360px)" }}
          >
            {clicked === "dears" && (
              <DearsList
                // setDisabled={setDisabled}

                selectAllDearsSelected={selectAllDearsSelected}
                setSelectAllDearsSelected={setSelectAllDearsSelected}
                dearsList={dearsList}
                setDearsList={setDearsList}
              />
            )}
            {clicked === "fans" && (
              <FansList
                // setDisabled={setDisabled}
                selectAllFansSelected={selectAllFansSelected}
                setSelectedFansSelected={setSelectedFansSelected}
                fansList={fansList}
                setFansList={setFansList}
              />
            )}
            {clicked === "likers" && (
              <LikersList
                // setDisabled={setDisabled}
                selectAllLikersSelected={selectAllLikersSelected}
                setSelectAllLikersSelected={setSelectAllLikersSelected}
                likersList={likersList}
                setLikersList={setLikersList}
              />
            )}
          </section>
        </div>
      </section>
      <footer className="sticky bottom-0 bg-white  lg:w-1/2 md:w-full xl:w-1/2 sm:w-full w-full flex flex-col justify-center items-center px-4 gap-2">
        <button
          disabled={disabled}
          onClick={handleInvitation}
          className={`flex items-center justify-center py-3 uppercase ${
            disabled ? "bg-primaryLight" : "bg-primary"
          } w-full rounded-lg text-white font-bold`}
        >
          {t("send_invitation")}
        </button>
        <button
          onClick={() => {
            actions.updateCurrentHuddle(huddleId);
            // navigate("/home");
            handleFinish();
          }}
          className="flex items-center justify-center py-3 uppercase bg-white w-full rounded-lg text-primary font-bold hover:bg-bgray"
        >
          {common("finish")}
        </button>
      </footer>
    </div>
  );
};

export default AddParticpants;
