"use client";
import { useVerifyUserRedirect } from "@/app/hooks/useVerifyUserRedirect";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Loading from "@/app/loading";
import { useRouter } from "next/navigation";

const VerifyUser = () => {
  const [access_token, setAccess_token] = useState("");
  const [typePackage, setTypePackage] = useState("");
  const searchParam = useSearchParams();
  const token = searchParam.get("access_token");

  const router = useRouter();
  const packageType = searchParam.get("packageType");

  useEffect(() => {
    if (token) {
      setAccess_token(token);
    }
    if (packageType) {
      setTypePackage(packageType);
    }
  }, [packageType, token]);
  console.log(access_token);
  const {
    data: userdata,
    isLoading,
    isError,
    isSuccess,
  } = useVerifyUserRedirect(token || "");
  console.log("user data", userdata);
  if (isError) {
    router.push("/");
  }
  if (isSuccess) {
    if (typePackage === "flix") {
      router.push("/buy-FLiX");
    }
    if (typePackage === "coins") {
      router.push("/buy-COiNS");
    }
  }
  if (isLoading) {
    return (
      <div className="flex w-full justify-center items-center">
        <Loading />
      </div>
    );
  }
};

export default VerifyUser;
