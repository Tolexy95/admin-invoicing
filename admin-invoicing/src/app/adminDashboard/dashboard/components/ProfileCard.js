import Image from "next/image";
import { MapPin } from "lucide-react";

export default function ProfileCard() {
  return (
    <div className="rounded-[20px] bg-white p-6 shadow-sm h-full text-center">

      {/* Avatar wrapper */}
      <div className="mx-auto mb-3 h-20 w-20 rounded-full bg-gray-200 flex items-center justify-center">
        <div className="relative h-16 w-16">
          <Image
            src="/Avatar.png"
            alt="Charles Robbie"
            fill
            className="rounded-full object-cover"
            sizes="(max-width: 768px) 100vw, 120px"
          />
        </div>
      </div>
      <div className="mt-6">
        <h3 className=" text-2xl font-bold text-secondary-darkGrey-900">
          Charles Robbie
        </h3>

        <div className="mt-1 flex items-center justify-center gap-1 text-sm text-secondary-grey-600">
          <MapPin size={12} />
          <span>New York, USA</span>
        </div>
      </div>


      {/* Stats */}
      <div className="mt-12 flex justify-around">
        <div>
          <p className="text-base text-secondary-grey-600 font-normal">Projects</p>
          <p className="text-2xl font-bold text-secondary-darkGrey-900">28</p>
        </div>
        <div>
          <p className="text-base text-secondary-grey-600 font-normal">Followers</p>
          <p className="text-2xl font-bold text-secondary-darkGrey-900">643</p>
        </div>
        <div>
          <p className="text-base text-secondary-grey-600 font-normal">Following</p>
          <p className="text-2xl font-bold text-secondary-darkGrey-900">76</p>
        </div>
      </div>
    </div>
  );
}
