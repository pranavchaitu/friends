import Image from "next/image";

export default function Home() {
  return (
    <main className="h-screen border border-black grid grid-rows-18">
      <div className="text-2xl flex justify-center items-center border border-black row-span-17">
        <div>
          it's easy to be an extrovert
        </div>
        <a href="/home">
          , <span className="underline underline-offset-4">go ahead</span>
        </a>
      </div>
      <footer className="border border-blue-500 flex justify-center items-center row-span-1">
        <div>  
          created by <a href="x.com/rustdeveloper" className="underline underline-offset-4 font-bold">
            pranav
          </a>
        </div>
      </footer>
    </main>
  );
}
