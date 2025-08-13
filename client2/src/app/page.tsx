import { poppins, roboto } from "@/lib/font";

export default function Home() {
  return (
    <div className="w-full flex justify-center items-center h-screen flex-col gap-4">
      HOME PAGE
      <div className="">
        <p className={poppins.className}>This text is Poppins</p>
        <p className={`${roboto.className} text-xl`}>This text is Roboto</p>
      </div>
    </div>
  );
}
