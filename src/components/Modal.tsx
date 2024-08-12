// File: src/components/Modal.tsx

import { useRouter } from 'next/navigation';

interface Room {
  name: string;
  users: number;
  highestBid: number;
}

interface ModalProps {
  room: Room;
  onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ room, onClose }) => {
  const router = useRouter();

  const joinRoom = () => {
    router.push(`/rooms/${room.name}`);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-8 rounded-md shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-semibold mb-4">{room.name}</h2>
        <p className="mb-2">Users: {room.users}</p>
        <p className="mb-4">Highest Bid: ${room.highestBid}</p>
        <div className="flex space-x-4">
          <button
            onClick={onClose}
            className="p-2 bg-gray-300 rounded-md hover:bg-gray-400"
          >
            Cancel
          </button>
          <button
            onClick={joinRoom}
            className="p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            Join Room
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
