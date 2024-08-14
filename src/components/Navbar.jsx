import { Link } from 'react-router-dom';

export default function Navbar() {
    return (
        <>
            <div className="navbar bg-transparent fixed top-0 left-0 right-0 z-50 px-20">
                <Link className='hover:bg-gray-800 p-2 rounded-lg' to={'/'}>
                    <h1 className="text-xl text-white font-semibold">LingoLand Saga</h1>
                </Link>
            </div>
        </>
    );
}
