import React, { useState } from 'react';
import { Member } from './types';
import EditMemberModal from './EditMemberModal';
import Modal from 'react-modal';


interface CardProps {
  member: Member;
  onEdit: (updatedMember: Member) => void;
  onDelete: (id: number) => void;
}

const Card: React.FC<CardProps> = ({ member, onEdit, onDelete }) => {
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  //show card details
  const [showDetails, setShowDetails] = useState(false);

  const handleEditClick = () => {
    setEditModalOpen(true);
  };

  const handleDetailsClick = () => {
    setShowDetails(true);
  }

  const handleModalClose = () => {
    setEditModalOpen(false);
  };

  const handleDetailsModalClose = () => {
    setShowDetails(false);
  };



  const handleSave = (updatedMember: Member) => {
    onEdit(updatedMember);
    setEditModalOpen(false);
  };

  return (
    <>
      <div className="bg-white rounded-lg shadow-md p-4 mb-2 text-gray-800 border border-gray-200">
        <div className="flex justify-between items-center">
          <h3 className="font-bold text-gray-900">{member.title} {member.name}</h3>
          <span className="text-gray-500 text-sm">{member.age} yo</span>
        </div>
        <p className="text-gray-500">{member.email}</p>
        <p className="text-gray-500">{member.mobile}</p>
        <button onClick={handleDetailsClick} className="text-black m-2">Details</button>
        <button onClick={handleEditClick} className="text-blue-500 mt-2">Edit</button>
        <button onClick={() => onDelete(member.id)} className="text-red-500 ml-4">Delete</button>
      </div>

      {showDetails && <Modal
        isOpen
        onRequestClose={handleDetailsModalClose}
        className="bg-white rounded-lg p-6 shadow-lg max-w-lg mx-auto my-16"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
        ariaHideApp={false} // Only necessary for accessibility
      >
        <h2 className="text-xl font-semibold mb-4">Edit Member Details</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-gray-700">Status</label>
            <div className="px-3 py-2 border rounded">
              <p className="text-gray-700">{member.status}</p>
            </div>
          </div>
          <div>
            <label className="block text-gray-700">Name</label>
            <input
              disabled
              type="text"
              name="name"
              value={member.name}
              className="w-full px-3 py-2 border rounded"
            />
          </div>
          <div>
            <label className="block text-gray-700">Title</label>
            <input
              disabled
              type="text"
              name="title"
              value={member.title}
              className="w-full px-3 py-2 border rounded"
            />
          </div>
          <div>
            <label className="block text-gray-700">Age</label>
            <input
              disabled
              type="number"
              name="age"
              value={member.age}
              className="w-full px-3 py-2 border rounded"
            />
          </div>
          <div>
            <label className="block text-gray-700">Email</label>
            <input
              disabled
              type="email"
              name="email"
              value={member.email}
              className="w-full px-3 py-2 border rounded"
            />
          </div>
          <div>
            <label className="block text-gray-700">Mobile</label>
            <input
              disabled
              type="tel"
              name="mobile"
              value={member.mobile}
              className="w-full px-3 py-2 border rounded"
            />
          </div>
          <div className="flex justify-end space-x-2 mt-4">
            <button
              type="button"
              onClick={handleDetailsModalClose} // Close the modal
              className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
            >
              Cancel
            </button>
          </div>
        </div>

      </Modal>
      }

      {isEditModalOpen && (
        <EditMemberModal
          member={member}
          onSave={handleSave}
          onClose={handleModalClose}
        />
      )}

    </>
  );
};

export default Card;
