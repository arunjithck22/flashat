import CloudIdParent from "@/components/cloud-id-card/CloudIdParent";

const page = () => {
  return (
    <>
      {/* {data?.result.messages?.map((message: any, index: any) => (
          <HuddlePost index={index} key={message?.message_id} message={message} />
        ))} */}
      <div
        style={{
          height: "calc(100vh - 190px)",
        }}
        className="flex items-center justify-center w-full flex-col relative  overflow-y-auto custom-scrollbar scroll-smooth   "
      >
        <section
          //   style={{
          //     height: "calc(100vh-100px)",
          //   }}
          className="w-full  md:max-w-lg  relative  mt-1 pb-12   overflow-y-auto flex flex-col gap-3  custom-scrollbar "
        >
          <CloudIdParent />
        </section>
      </div>
    </>
  );
};

export default page;
