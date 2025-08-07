export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center px-4">
      <div className="max-w-2xl text-center">
        <h1 className="text-4xl font-bold mb-4">Welcome to Expense Tracker</h1>
        <p className="text-gray-600 text-lg mb-8">
          Track your spending, analyze habits, and take control of your
          finances.
        </p>
        <div className="flex gap-4 justify-center">
          <button className="bg-black text-white px-5 py-2 rounded-xl hover:bg-gray-800">
            Add Expense
          </button>
          <button className="border border-gray-300 px-5 py-2 rounded-xl hover:bg-gray-100">
            View Analytics
          </button>
        </div>
      </div>
    </main>
  );
}
