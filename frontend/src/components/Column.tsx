import React  from 'react';
import { Droppable } from "react-beautiful-dnd";
import styles from './Column.module.css';
import Card from './Card';
import { Member } from './types';

interface ColumnProps {
  title: string;
  members: Member[];
  onEdit: (member: Member) => void;
  onDelete: (id: number) => void;
  droppableId: string;
}

const Column: React.FC<ColumnProps> = ({ title, members, onEdit, onDelete, droppableId }) => {
  return (
    <Droppable droppableId={droppableId}>
      {(provided) => (
        <div
          className="bg-blue-100 rounded-lg shadow-md p-4 w-72 text-left"
          {...provided.droppableProps}
          ref={provided.innerRef}
        >
          <div className="flex justify-between items-center mb-4">
            <h2 className="font-semibold text-gray-700">{title}</h2>
            <span className="bg-gray-200 text-gray-600 text-sm font-medium px-2 py-0.5 rounded-full">
              {members.length}
            </span>
          </div>
          <div className="space-y-2">
            {members.map((member, index) => (
              <Card
                key={member.id}
                member={member}
                index={index}
                onEdit={onEdit}
                onDelete={onDelete}
              />
            ))}
            {provided.placeholder}
          </div>
        </div>
      )}
    </Droppable>
  );
};

export default Column; 


