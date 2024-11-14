import React, { useState } from 'react';
import { Member } from './types';
import EditMemberModal from './EditMemberModal';

interface CardProps {
  member: Member;
  onEdit: (updatedMember: Member) => void;
  onDelete: (id: number) => void;
}

const Card: React.FC<CardProps> = ({ member, onEdit, onDelete }) => {
  const [isEditModalOpen, setEditModalOpen] = useState(false);

  const handleEditClick = () => {
    setEditModalOpen(true);
  };

  const handleModalClose = () => {
    setEditModalOpen(false);
  };

  const handleSave = (updatedMember: Member) => {
    onEdit(updatedMember);
    setEditModalOpen(false);
  };

  return (
    <>
      <div className="bg-white rounded-lg shadow-md p-4 mb-2 text-gray-800 border border-gray-200">
        <div className="flex justify-between items-center">
          <h3 className="font-bold text-gray-900">{member.name}</h3>
          <span className="text-gray-500 text-sm">{member.age} yo</span>
        </div>
        <p className="text-gray-500">{member.email}</p>
        <p className="text-gray-500">{member.mobile}</p>
        <button onClick={handleEditClick} className="text-blue-500 mt-2">Edit</button>
        <button onClick={() => onDelete(member.id)} className="text-red-500 ml-4">Delete</button>
      </div>
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
