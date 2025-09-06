import Link from "next/link";

export default function RootPage() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">Welcome to Neutone</h1>
        <p className="text-xl mb-8">Music Generation AI Platform</p>
        <Link 
          href="/dashboard" 
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg inline-block transition-colors"
        >
          Enter App
        </Link>
      </div>
    </div>
  );
}