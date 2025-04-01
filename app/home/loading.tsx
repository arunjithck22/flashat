import HuddleSkelton from "@/components/huddle/HuddleSkelton";

export default function Loading() {
  return (
    <>
      <aside className="border-bgray border-2 border-t-0 flex flex-col w-4/12 ">
        <HuddleSkelton />
        <section className="overflow-y-auto flex flex-col">
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
        </section>
      </aside>
      <section className="flex flex-1 flex-col">
        <HuddleSkelton />
        <HuddleSkelton />
        <HuddleSkelton />
        <HuddleSkelton />
        <HuddleSkelton />
        <HuddleSkelton />
        <HuddleSkelton />
      </section>
    </>
  );
}
