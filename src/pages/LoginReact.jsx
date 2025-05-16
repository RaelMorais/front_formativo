import { Link } from 'react-router-dom';

export function LoginReact() {
    return (
        <>
            {/* component */}
            <div className="bg-gray-100 flex justify-center items-center h-screen">
                {/* Left: Image */}
                <div className="w-1/2 h-screen hidden lg:block">
                    <img
                        src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YWJzdHJhY3R8ZW58MHx8MHx8fDA%3D"
                        alt="Background"
                        className="object-cover w-full h-full"
                    />
                </div>

                {/* Right: Login Form */}
                <div className="lg:p-36 md:p-52 sm:20 p-8 w-full lg:w-1/2">
                    <h1 className="text-6xl font-semibold mb-4 text-center">Educar</h1>
                    <form action="#" method="POST">
                        {/* Username Input */}
                        <div className="mb-4">
                            <label htmlFor="username" className="block text-gray-600">
                                Username
                            </label>
                            <input
                                type="text"
                                id="username"
                                name="username"
                                className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
                                autoComplete="off"
                            />
                        </div>

                        {/* Password Input */}
                        <div className="mb-4">
                            <label htmlFor="password" className="block text-gray-800">
                                Password
                            </label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
                                autoComplete="off"
                            />
                        </div>

                        {/* Login Button */}
                        <Link to="/home">
                        <button
                            type="submit"
                            className="bg-red-500 hover:bg-blue-600 text-white font-semibold rounded-md py-2 px-4 w-full"
                        >
                            Login
                        </button>
                        </Link>
                    </form>

                    {/* Sign up
                    <div className="mt-6 text-green-500 text-center">
                        <Link to="/signup" className="hover:underline">
                            Sign up Here
                        </Link>
                    </div> */}
                </div>
            </div>
        </>
    );
}
