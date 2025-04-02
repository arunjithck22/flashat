import { HUDDLES_TABS } from "@/common/constant";
import HuddlePosts from "@/components/huddle/huddle-activities/post/HuddlePosts";
import PublicHuddlePosts from "@/components/huddle/huddle-activities/post/PublicHuddlePosts";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";

const page = async ({ params }: { params: Params }) => {
  console.log("paramtype", params?.type);
  return (
    <>
      {/* {data?.result.messages?.map((message: any, index: any) => (
        <HuddlePost index={index} key={message?.message_id} message={message} />
      ))} */}
      {params?.type !== HUDDLES_TABS.PUBLIC && <HuddlePosts />}
      {params?.type === HUDDLES_TABS.PUBLIC && <PublicHuddlePosts />}
      {/* <HuddlePosts /> */}
    </>
  );
};

export default page;
