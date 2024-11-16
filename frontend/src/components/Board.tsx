import React, { useState, useEffect } from 'react';
import Column from './Column';
import Form from './Form';
import axios from 'axios';
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import { Member } from './types';

const Board: React.FC = () => {
    const [members, setMembers] = useState<Member[]>([]);

    useEffect(() => {
        fetchMembers();
    }, []);

    const fetchMembers = async () => {
        const response = await axios.get('http://127.0.0.1:8000/api/members');
        console.log('response', response.data);

        setMembers(response.data);
    };

    //update the member 

    const updateMemberStatus = async (id: number, newStatus: string) => {
        const updatedMember = members.find((member) => member.id === id);
        if (!updatedMember) return;
    
        try {
          await axios.put(`http://127.0.0.1:8000/api/members/${id}`, {
            ...updatedMember,
            status: newStatus,
          });
    
          setMembers((prevMembers) =>
            prevMembers.map((member) =>
              member.id === id ? { ...member, status: newStatus } : member
            )
          );
        } catch (error) {
          console.error("Error updating member status:", error);
        }
      };

    const updateMember = async (updatedMember: Member) => {
        try {
            const response = await axios.put(
                `http://127.0.0.1:8000/api/members/${updatedMember.id}`,
                updatedMember
            );

            if (response.status === 200) {
                setMembers((prevMembers) =>
                    prevMembers.map((member) =>
                        member.id === updatedMember.id ? updatedMember : member
                    )
                );
            } else {
                console.error("Failed to update member:", response.statusText);
            }
        } catch (error) {
            console.error("Error updating member:", error);
        }
    };

    const onDragEnd = (result: DropResult) => {
        const { destination, source, draggableId } = result;
    
        if (!destination) return; // If dropped outside any droppable area
        if (destination.droppableId === source.droppableId) return; // If dropped in the same column

        const memberId = parseInt(draggableId, 10); // Ensure `draggableId` is a number
        const newStatus = destination.droppableId;
    
        updateMemberStatus(Number(draggableId), destination.droppableId);
      };


    const addMember = async (member: Member) => {
        try {
            const response = await axios.post('http://127.0.0.1:8000/api/members', member);
            console.log('response', response);
            setMembers([...members, response.data]);

        } catch (error) {
            console.error("Error adding member:", error);

        }
    };

    const deleteMember = async (id: number) => {
        try {
            await axios.delete(`http://127.0.0.1:8000/api/members/${id}`);
            setMembers(members.filter(member => member.id !== id));

        } catch (error) {
            console.error("Error deleting member:", error);

        }
    };

    return (
        <div className="flex flex-row text-white">
            <Form onSubmit={addMember} />
            <div className="flex flex-col w-full text-center">
                <div className="flex flex-row h-full justify-between gap-2">
                    <DragDropContext onDragEnd={onDragEnd}>
                        <Column title="Unclaimed"
                            members={members.filter(member => member.status === 'unclaimed')}
                            droppableId="unclaimed"
                            onEdit={updateMember}
                            onDelete={deleteMember}
                        />
                        <Column
                            title="First Contact"
                            members={members.filter(member => member.status === 'first_contact')}
                            droppableId="first_contact"
                            onEdit={() => { }}
                            onDelete={deleteMember} />
                        <Column
                            title="Preparing Work Offer"
                            members={members.filter(member => member.status === 'preparing_offer')}
                            droppableId="preparing_offer"
                            onEdit={() => { }}
                            onDelete={deleteMember} />
                        <Column
                            title="Sent to Therapists"
                            members={members.filter(member => member.status === 'sent_to_therapists')}
                            droppableId="sent_to_therapists"
                            onEdit={() => { }}
                            onDelete={deleteMember} />
                    </DragDropContext>
                </div>
            </div>
        </div>
    );
};

export default Board;
