export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gray-600">
      <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16">
        <h1 className="text-5xl font-extrabold tracking-tight sm:text-[5rem]">
          Welcome to <span className="text-white">Neutone</span>
        </h1>
        <p className="text-xl text-white">
          Your music generation platform
        </p>
      </div>
    </main>
  );
}
