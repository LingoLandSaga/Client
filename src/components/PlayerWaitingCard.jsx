export default function PlayerWaitingCard({ userName }) {
  return (
    <div className={"w-full text-white rounded p-5 text-2xl flex items-center justify-center" + (userName ? " bg-primary" : " bg-[#0C1E1A]")}>
      <p className="font-semibold text-center">{userName ? userName : "No User"}</p>
    </div>
  );
}
