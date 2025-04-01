export default function HuddleSkelton() {
    return (
        <div className="shadow animate-pulse p-4  space-y-4 ">
        <div className="flex items-center justify-between  p-4 border-b-2 first:border-t-2 border-bgray">
          <div>
            <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5"></div>
            <div className="w-32 h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
          </div>
          <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-12"></div>
        </div>
      </div>
    )
}