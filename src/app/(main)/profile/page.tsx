import { getUserProfile } from "@/lib/actions";
import Image from "next/image";

export default async function() {
    const user = await getUserProfile()
    if (user == null) {
        <>
            loadin...
        </>
    }
    return <div className="flex justify-evenly w-full">
        <div key={user!.id} className="flex flex-col justify-center items-center py-5 gap-5">
            <p className="text-2xl">
                {user!.name}
            </p>
            <Image src={user!.images[0]} alt="img1" width={300} height={300}/>
            <p className="max-w-96" >
                {user!.about}
            </p>
            <Image src={user!.images[1]} alt="img2" width={300} height={300}/>
        </div>
    </div>
}