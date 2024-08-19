import { useRouter } from "next/router";
import AuctionForm from "../room/room";

function CreateRoom() {
  const router = useRouter();

  const handleCreateRoom = () => {
    router.push("/AuctionForm");
  };
  return (
    <div>
      <h1>Create Room</h1>
      <button
        onClick={handleCreateRoom}
        className="bg-purple-600 text-white hover:bg-purple-700"
      >
        Create Room
      </button>
    </div>
  );
}
export default CreateRoom;
