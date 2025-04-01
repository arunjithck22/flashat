"use client";

import Link from "next/link";
import { useParams } from "next/navigation";

const CreateNewButton = () => {
  const params = useParams();
  return (
    <Link
      className="w-12 h-12 absolute  bottom-5 right-3 text-white rounded-full hover:-translate-y-0.5 flex items-center justify-center"
      style={{
        background: "linear-gradient(95.22deg, #D8B303 1.65%, #FAE101 104.92%)",
      }}
      href={`/huddles/${params.type}/create-new-huddle`}
    >
      +
    </Link>
  );
};

export default CreateNewButton;
