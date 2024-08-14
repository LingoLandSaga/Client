import Heart from "../components/Heart";
export default function PlayerCard(isPlaying) {
  return (
    <>
      <div className={"w-full text-white rounded p-5 text-2xl " + (isPlaying ? "bg-primary " : "bg-[#0C1E1A]")}>
        <div className="h-1/4 flex justify-between">
          <p className="font-semibold">{"NAMA PLAYER"}</p>
          <div className="flex">
            <Heart />
            <Heart />
            <Heart />
          </div>
        </div>
        <div className="h-1/4"></div>
        <div className="h-2/4 flex flex-1 items-center">
          <input type="text" className="input input-bordered w-full" name="" id="" />
        </div>
      </div>
    </>
  );
}
