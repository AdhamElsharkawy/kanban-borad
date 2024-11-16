import React, { useState, useEffect } from 'react';
import Column from './Column';
import Form from './Form';
import axios from 'axios';
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
    const updateMember = async (updatedMember: Member) => {
        console.log('xxx');

        try {
            console.log('member', updatedMember);
            const response = await axios.put(
                `http://127.0.0.1:8000/api/members/${updatedMember.id}`,
                updatedMember
            );

            if (response.status === 200) {
                // Update member in the state
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
                    <Column title="Unclaimed" members={members.filter(member => member.status === 'unclaimed')} onEdit={updateMember} onDelete={deleteMember} />
                    <Column title="First Contact" members={members.filter(member => member.status === 'first_contact')} onEdit={() => { }} onDelete={deleteMember} />
                    <Column title="Preparing Work Offer" members={members.filter(member => member.status === 'preparing_offer')} onEdit={() => { }} onDelete={deleteMember} />
                    <Column title="Sent to Therapists" members={members.filter(member => member.status === 'sent_to_therapists')} onEdit={() => { }} onDelete={deleteMember} />
                </div>
            </div>
        </div>
    );
};

export default Board;
