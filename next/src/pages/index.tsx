import useSWR from "swr";
import { fetcher } from "@/lib/fetcher";
import LoadingIndicator from "@/components/ui/LoadingIndicator";
import { info } from "./api/hello";



export default function Home() {
  const { data, error } = useSWR<info>('/api/hello', fetcher)

  if (error) return <div>Failed to load</div>
  if (!data) return <LoadingIndicator />

  return (
    <div className="text-white">
      <div className="flex flex-col items-center justify-center text-center">
        <h1 className="text-4xl font-bold mb-4">
          Stay updated with <span className="bg-gradient-to-r from-pink-500 to-purple-500 text-transparent bg-clip-text">crud</span> and <span className="bg-gradient-to-r from-pink-500 to-purple-500 text-transparent bg-clip-text">notes</span>!
        </h1>
        <p className="text-lg text-gray-300 mb-6">
          Zadanie 2 z <span className="animate-pulse">reacta</span>
        </p>
      </div>

    </div>
  );
}
