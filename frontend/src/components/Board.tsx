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
        const response = await axios.get('https://api.mockfly.dev/mocks/3e95620e-e775-4f6c-8714-0b5cbbc44e36/api/members');
        setMembers(response.data);
    };

    //update the member 
    const updateMember = async (updatedMember: Member) => {
        console.log('xxx');
        
        try {
            console.log('member',updatedMember);

            // Use POST instead of PUT if Mockfly does not support PUT
            const response = await axios.put(
                `https://api.mockfly.dev/mocks/3e95620e-e775-4f6c-8714-0b5cbbc44e36/edit-member`, 
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
        const response = await axios.post('https://api.mockfly.dev/mocks/3e95620e-e775-4f6c-8714-0b5cbbc44e36/api/members', member);
        console.log('response',response);
            
        setMembers([...members, response.data]);
    };

    const deleteMember = async (id: number) => {
        await axios.delete(`/api/members/${id}`);
        setMembers(members.filter(member => member.id !== id));
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
