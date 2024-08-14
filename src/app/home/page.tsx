"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Modal from "@/components/Modal";

interface Room {
  name: string;
  users: number;
  highestBid: number;
}

const Rooms: Room[] = [];

const Page: React.FC = () => {
  const [data, setData] = useState<Room[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3000/auctions', {
          method: 'GET',
          headers: { 'Content-Type': 'application/json'},
          body: JSON.stringify(Rooms)
        }
        )
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        console.log('Fetched Data:', data);
        setData(data);
      } catch (error) {
        console.error('Error fetching data:', error);
        // setError(error.message);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Available Rooms</h1>
        {error && <p>Error: {error}</p>}
        <ul>
          {data.map((room) => (
            <li key={room.name}>{room.name}</li>
          ))}
        </ul>
      </header>
    </div>
  );
};


const Button: React.FC<{
  onClick?: () => void;
  className?: string;
  children: React.ReactNode;
}> = ({ onClick, className, children }) => (
  <button
    onClick={onClick}
    className={`px-4 py-2 rounded-lg transition duration-300 ${className}`}
  >
    {children}
  </button>
);

const RoomCard: React.FC<{ room: Room; onClick: () => void }> = ({
  room,
  onClick,
}) => (
  <div
    className="p-6 bg-white rounded-xl shadow-lg cursor-pointer"
    onClick={onClick}
  >
    <h3 className="text-xl font-semibold mb-2">{room.name}</h3>
    <p className="text-gray-600">Users: {room.users}</p>
    <p className="text-gray-600">Highest Bid: ${room.highestBid}</p>
  </div>
);

export default function Home() {
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);
  const router = useRouter();

  const handleSignOut = () => {
    // Implement your sign out logic here
    // For now, we'll just clear the username and redirect
    router.push("/"); // Redirect to the starting page
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-r from-purple-400 to-pink-500">
      {/* Header */}
      <header className="bg-white shadow-md fixed top-0 left-0 right-0 z-10">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <span className="text-2xl font-bold text-purple-600">
            RabsAuction
          </span>
          <div className="flex items-center">
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
      <main className="flex-grow flex flex-col items-center justify-center pt-20 px-4">
        <h1 className="text-6xl font-bold text-white text-center mb-4">
          RabsAuction Rooms
        </h1>
        <p className="text-xl text-white italic mb-8 max-w-lg text-center">
          Explore our exciting auction rooms and start bidding today!
        </p>

        {/* Auction Rooms Grid */}
        <section className="w-full max-w-6xl bg-white rounded-xl shadow-lg p-8 mb-16">
          <h2 className="text-3xl font-semibold mb-4 text-gray-800">
            Auction Rooms
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* {mockRooms.map((room) => (
              <RoomCard
                key={room.name}
                room={room}
                onClick={() => setSelectedRoom(room)}
              />
            ))} */}
          </div>
        </section>
      </main>

      {selectedRoom && (
        <Modal room={selectedRoom} onClose={() => setSelectedRoom(null)} />
      )}
    </div>
  );
}
function useEffect(arg0: () => void, arg1: never[]) {
  throw new Error("Function not implemented.");
}

