// "use client";
// import React, { useEffect, useRef, ReactNode, useCallback } from "react";
// import throttle from "lodash.throttle";
// import Loader from "../Loader/Loader";

// interface DataListProps<T> {
//   data: T[];
//   CardComponent: React.ComponentType<T>;
//   height?: string;
//   width?: string;
//   onLoadMore: () => void;
//   loading: boolean;
//   hasMore: boolean;
//   loaderComponent?: ReactNode;
// }

// const DataList = <T extends { id: number | string }>({
//   data,
//   CardComponent,
//   height = "h-72",
//   width = "w-full",
//   onLoadMore,
//   loading,
//   hasMore,
//   loaderComponent,
// }: DataListProps<T>) => {
//   const observerRef = useRef<HTMLDivElement | null>(null);
//   const observerInstance = useRef<IntersectionObserver | null>(null);
//   const isFetchingRef = useRef(false); // 🔥 Prevent multiple API calls

//   // 🔥 Throttle API calls using Lodash
//   const throttledLoadMore = useCallback(
//     throttle(() => {
//       if (!loading && hasMore && !isFetchingRef.current) {
//         console.log("🛑 Throttled API Call: Fetching more data...");
//         isFetchingRef.current = true; // Prevents multiple calls
//         onLoadMore();
//       }
//     }, 1500), // 🔥 Throttle API calls to 1.5 seconds
//     [onLoadMore, loading, hasMore]
//   );

//   useEffect(() => {
//     if (!hasMore || !observerRef.current) return;

//     if (observerInstance.current) {
//       observerInstance.current.disconnect();
//     }

//     observerInstance.current = new IntersectionObserver(
//       (entries) => {
//         if (entries[0].isIntersecting) {
//           throttledLoadMore();
//         }
//       },
//       {
//         root: null,
//         rootMargin: "200px",
//         threshold: 0.5,
//       }
//     );

//     observerInstance.current.observe(observerRef.current);

//     return () => observerInstance.current?.disconnect();
//   }, [hasMore, throttledLoadMore]);

//   // 🔥 Reset `isFetchingRef` when new data is loaded
//   useEffect(() => {
//     if (!loading) {
//       console.log("✅ Data fetch complete, resetting isFetching flag.");
//       isFetchingRef.current = false;
//     }
//   }, [loading]);

//   return (
//     <div className={`mt-4 flex flex-col gap-2 ${height} ${width} overflow-y-auto custom-scrollbar-hidden`}>
//       {data.map((item, index) => (
//         <CardComponent key={`${item.id}-${index}`} {...item} />
//       ))}

//       {hasMore && (
//         <div ref={observerRef} className="w-full flex justify-center py-4">
//           {loading && (loaderComponent || <Loader />)}
//         </div>
//       )}
//     </div>
//   );
// };

// export default DataList;
