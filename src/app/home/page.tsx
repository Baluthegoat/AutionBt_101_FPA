"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Modal from "@/components/Modal";

interface Room {
  name: string;
  users: number;
  highestBid: number;
}

function Page() {
  const [data, setData] = useState<Room[]>([]);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3000/auctions", {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });
        console.log("Response status:", response.status);

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        console.log("Fetched Data:", data);

        setData(data);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Error fetching data");
      }
    };
    fetchData();
  }, []);

  // const handleCreateRoom = () => {
  //   router.push("/create-room");
  // };

  const Button: React.FC<{
    onClick?: () => void;
    className?: string;
    children: React.ReactNode;
  }> = ({ onClick, className, children }) => (
    <button
      onClick={onClick}
      className={`px-4 py-2 rounded-lg transition duration-100 ${className}`}
    >
      {children}
    </button>
  );

  const Home = () => {
    const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);

    const handleSignOut = () => {
      router.push("/");
    };

    const handleCreateRoom = () => {
      router.push("/create-room");
    };

    const handleUpload = () => {
      router.push("/upload");
    };

    const handleProfile = () =>{
      router.push("/profile");
    };
    return (
      <div className="flex flex-col min-h-screen bg-gradient-to-r from-purple-400 to-pink-500">
        {/* Header */}
        <header className="bg-white shadow-md fixed top-0 left-0 right-0 z-10">
          <div className="container mx-auto px-4 py-4 flex justify-between items-center">
            <span className="text-2xl font-bold text-purple-600">
              AuctionBT
            </span>

            <div className="flex items-center">
            <Button
                onClick={handleProfile}
                className="text-purple-600 hover:bg-purple-100 mr-2"
              >
                Profile
              </Button>
              <Button
                onClick={handleUpload}
                className="text-purple-600 hover:bg-purple-100 mr-2"
              >
                Upload Product
              </Button>
              <Button
                onClick={handleCreateRoom}
                className="text-purple-600 hover:bg-purple-100 mr-2"
              >
                Create Room
              </Button>
              <Button
                onClick={handleSignOut}
                className="bg-purple-600 text-white hover:bg-purple-700"
              >
                Sign Out
              </Button>
            </div>
          </div>
        </header>

        {/* Main content */}
        <main className="flex-grow flex flex-col items-center justify-center pt-20 px-4 fixed top-5 left-5 right-5">
          <h1 className="text-6xl font-bold text-white text-center mb-4">
            Available Rooms
          </h1>
          <p className="text-xl text-white italic mb-8 max-w-lg text-center">
            Explore our exciting auction rooms and start bidding today!
          </p>
        </main>

        {selectedRoom && (
          <Modal room={selectedRoom} onClose={() => setSelectedRoom(null)} />
        )}
      </div>
    );
  };

  return <Home />;
}

export default Page;
