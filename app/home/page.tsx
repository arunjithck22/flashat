import Image  from "next/image"
import logo from "../../public/logo/flashat-logo.png";

export default async function Home() {
    return (
        <>
        <section className="flex items-center justify-center flex-1">
            <div className="flex flex-col items-center">
               <Image src={logo} alt="" />
            </div>
          
        </section>
        </>

    )
}