export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <main className="lg:pr-8 lg:pl-8 xl:px-10  max-h-screen flex overflow-hidden">
        <aside className="border-bgray border-2 border-t-0 flex flex-col w-4/12 ">
          {/* <Header/>
           <HuddleList/> */}
        </aside>
        {children}
      </main>
    </>
  );
}
