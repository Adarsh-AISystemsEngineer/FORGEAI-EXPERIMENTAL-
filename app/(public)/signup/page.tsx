export default function SignupPage() {
  return (
    <main className="min-h-screen bg-black text-white font-mono flex items-center justify-center">
      <div className="bg-gray-900/50 backdrop-blur-sm rounded-lg p-8 w-full max-w-md">
        <h2 className="text-3xl font-bold mb-6 text-center">
          Sign Up for <span className="text-orange-500">ForgeAI</span>
        </h2>
        <form className="space-y-6">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-300"
            >
              Email Address
            </label>
            <input
              type="email"
              id="email"
              className="mt-1 block w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded focus:ring-orange-500 focus:border-orange-500"
              placeholder="Enter your email"
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-300"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              className="mt-1 block w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded focus:ring-orange-500 focus:border-orange-500"
              placeholder="Enter your password"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
          >
            Sign Up
          </button>
        </form>
      </div>
    </main>
  );
}
