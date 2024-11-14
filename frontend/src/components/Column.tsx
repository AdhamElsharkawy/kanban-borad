import React from 'react';
import Card from './Card';
import { Member } from './types';

interface ColumnProps {
  title: string;
  members: Member[];
  onEdit: (member: Member) => void;
  onDelete: (id: number) => void;
}

const Column: React.FC<ColumnProps> = ({ title, members, onEdit, onDelete }) => {
  return (
    <div className="bg-blue-100 rounded-lg shadow-md p-4 w-72">
      <div className="flex justify-between items-center mb-4">
        <h2 className="font-semibold text-gray-700">{title}</h2>
        <span className="bg-gray-200 text-gray-600 text-sm font-medium px-2 py-0.5 rounded-full">
          {members.length}
        </span>
      </div>
      <div className="overflow-y-auto max-h-96 pr-2">
        {members.map((member) => (
          <Card key={member.id} member={member} onEdit={onEdit} onDelete={onDelete} />
        ))}
      </div>
    </div>
  );
};

export default Column;
