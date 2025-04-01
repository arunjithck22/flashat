import Image from "next/image";

import googleIcon from "../../../public/icons/google-icon.png";
import { signinWithGoogle } from "./actions";
export default function Login() {
  return (
    <main className="flex justify-center items-center w-full ">
      <section className="flex justify-center items-center sm:w-3/4 md:w-1/2 flex-col">
        <div className="font-extrabold w-full text-start text-xl"> Login</div>

        <form className="w-full my-3" action={signinWithGoogle}>
          <button
            className="flex gap-2 w-full text-xs font-bold border-2 justify-center items-center py-3 shadow-sm"
            name="google"
            value="google"
            type="submit"
          >
            <Image width={20} height={20} src={googleIcon} alt="google" />
            Continue with Google
          </button>
        </form>
        <div className="w-full text-xs font-bold pb-3 flex justify-center items-center gap-1">
          Dont have an account? <span className="text-primary">Sign Up</span>
        </div>
      </section>
    </main>
  );
}
