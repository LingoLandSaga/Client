import PlayerCard from "../components/PlayerCard";

export default function Room() {
  return (
    <>
      <div className="relative h-screen overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-no-repeat transform scale-x-[-1] bg-[url('https://images.unsplash.com/photo-1605429201125-37e867327609?q=80&w=2952&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')]"></div>
        <div className="absolute inset-0 bg-black/50 backdrop-blur-sm"></div>
        <div className="relative h-full px-20 w-screen">
          <div className="flex flex-col w-full h-full justify-center py-16 gap-10">
            <div className="h-1/3 text-white w-full text-center flex items-center justify-center">
              <p className="text-6xl font-semibold text-white">Kata Soal</p>
            </div>
            <div className="h-2/3 grid grid-cols-2 w-full gap-10 text-center">
              <PlayerCard />
              <PlayerCard />
              <PlayerCard />
              <PlayerCard />
            </div>
          </div>
          <div className="text-white">1</div>
        </div>
      </div>
    </>
  );
}
