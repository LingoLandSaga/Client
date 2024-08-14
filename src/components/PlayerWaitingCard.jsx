export default function PlayerWaitingCard({ name }) {
  return (
    <div className={"w-full text-white rounded p-5 text-2xl flex items-center justify-center" + (name ? " bg-primary" : " bg-[#0C1E1A]")}>
      <p className="font-semibold text-center">{name ? name : "No User"}</p>
    </div>
  );
}
