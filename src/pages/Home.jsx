export default function Home() {
    return (
        <>
            <div className="relative h-screen overflow-hidden">
                <div
                    className="absolute inset-0 bg-cover bg-no-repeat transform scale-x-[-1] bg-[url('https://images.unsplash.com/photo-1605429201125-37e867327609?q=80&w=2952&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')]"
                ></div>
                 <div className="absolute inset-0 bg-black/50 backdrop-blur-sm"></div>
                <div className="relative flex h-full px-20">
                    <div className="flex flex-col w-1/2 h-full justify-end py-16 gap-10">
                        <div className="text-white">
                            <h1 className="text-4xl select-none cursor-default font-medium">
                                Welcome to,
                            </h1>
                            <h1 className="text-6xl select-none cursor-default font-bold">
                                LingoLand Saga
                            </h1>
                        </div>
                        <div className="flex gap-5">
                            <button className="btn bg-primary hover:bg-[#0B3D2E] text-white rounded-full w-32">
                                Join Room
                            </button>
                            <button className="btn bg-primary bg-opacity-40 hover:bg-[#0B3D2E] text-white rounded-full w-32">
                                Create Room
                            </button>
                        </div>
                    </div>
                    <div className="w-1/2"></div>
                </div>
            </div>
        </>
    );
}
