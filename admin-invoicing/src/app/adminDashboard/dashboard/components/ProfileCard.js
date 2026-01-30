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
          />
        </div>
      </div>
      <div className="mt-6">
        {/* Name */}
        <h3 className="text-sm font-semibold text-secondary-darkGrey-900">
          Charles Robbie
        </h3>

        {/* Location */}
        <div className="mt-1 flex items-center justify-center gap-1 text-xs text-gray-400">
          <MapPin size={12} />
          <span>New York, USA</span>
        </div>
      </div>


      {/* Stats */}
      <div className="mt-12 flex justify-around">
        <div>
          <p className="text-xs text-gray-400">Projects</p>
          <p className="text-sm font-semibold text-secondary-darkGrey-900">28</p>
        </div>
        <div>
          <p className="text-xs text-gray-400">Followers</p>
          <p className="text-sm font-semibold text-secondary-darkGrey-900">643</p>
        </div>
        <div>
          <p className="text-xs text-gray-400">Following</p>
          <p className="text-sm font-semibold text-secondary-darkGrey-900">76</p>
        </div>
      </div>
    </div>
  );
}
