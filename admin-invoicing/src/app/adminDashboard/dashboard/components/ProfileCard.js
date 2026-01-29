export default function ProfileCard() {
  return (
    <div className="rounded-xl bg-white p-6 text-center shadow-sm h-full min-h-[320px]">
      <div className="mx-auto mb-3 h-20 w-20 rounded-full bg-gray-200" />

      <h3 className="text-sm font-semibold">
        Charles Robbie
      </h3>
      <p className="text-xs text-gray-400">
        New York, USA
      </p>

      <div className="mt-4 flex justify-around">
        <div>
          <p className="text-sm font-semibold">28</p>
          <p className="text-xs text-gray-400">
            Projects
          </p>
        </div>
        <div>
          <p className="text-sm font-semibold">643</p>
          <p className="text-xs text-gray-400">
            Followers
          </p>
        </div>
        <div>
          <p className="text-sm font-semibold">76</p>
          <p className="text-xs text-gray-400">
            Following
          </p>
        </div>
      </div>
    </div>
  );
}
