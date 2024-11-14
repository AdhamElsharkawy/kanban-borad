import React, { useState } from 'react';
import Modal from 'react-modal';
import { EditMember } from './types';
import { parsePhoneNumberFromString } from 'libphonenumber-js';


interface EditMemberModalProps {
    member: EditMember;
    onSave: (updatedMember: EditMember) => void;
    onClose: () => void;
}

const EditMemberModal: React.FC<EditMemberModalProps> = ({ member, onSave, onClose }) => {
    const [form, setForm] = useState({
        status: member.status,
        name: member.name,
        title: member.title,
        age: member.age.toString(),
        email: member.email,
        mobile: member.mobile,
    });

    const [errors, setErrors] = useState<{ [key: string]: string }>({}); // Add state for form errors

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    };

    const validateForm = () => {
        const errors: { [key: string]: string } = {};

        if (!form.status) {
            errors.status = 'Status is required';
        }
        
        if (!['sent_to_therapists', 'preparing_offer', 'first_contact', 'unclaimed'].includes(form.status)) {
            errors.status = 'Status is not valid';
        }

        if (!form.name) {
            errors.name = 'Name is required';
        }

        if (!form.title) {
            errors.title = 'Title is required';
        }

        if (!form.age) {
            errors.age = 'Age is required';
        } else if (parseInt(form.age, 10) < 18) {
            errors.age = 'Age must be at least 18';
        }

        if (!form.email) {
            errors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(form.email)) {
            errors.email = 'Email is invalid';
        }

        if (!form.mobile) {
            errors.mobile = 'Mobile is required';
        } else if (!parsePhoneNumberFromString(form.mobile)?.isValid()) {
            errors.mobile = 'Mobile is invalid';
        }

        setErrors(errors);
        return Object.keys(errors).length === 0;
    }


    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!validateForm()) {
            console.log('fprm is invalid');
            
            return 'Form is invalid';
        }
        onSave({
            ...member,
            status: form.status,
            name: form.name,
            title: form.title,
            age: parseInt(form.age, 10),
            email: form.email,
            mobile: form.mobile,
        });
        onClose();
    };

    return (
        <Modal
            isOpen
            onRequestClose={onClose}
            className="bg-white rounded-lg p-6 shadow-lg max-w-lg mx-auto my-16"
            overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
            ariaHideApp={false} // Only necessary for accessibility
        >
            <h2 className="text-xl font-semibold mb-4">Edit Member Details</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-gray-700">Status</label>
                    <select
                        name="status"
                        value={form.status}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border rounded"
                    >
                        <option value="sent_to_therapists">Sent to Therapists</option>
                        <option value="preparing_offer">Preparing Offer</option>
                        <option value="first_contact">First Contact</option>
                        <option value="unclaimed">Unclaimed</option>
                    </select>
                    {errors.status && <p className="text-red-500">{errors.status}</p>}
                </div>
                <div>
                    <label className="block text-gray-700">Name</label>
                    <input
                        type="text"
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border rounded"
                    />
                    {errors.name && <p className="text-red-500">{errors.name}</p>}
                </div>              
                <div>
                    <label className="block text-gray-700">Title</label>
                    <input
                        type="text"
                        name="title"
                        value={form.title}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border rounded"
                    />
                    {errors.title && <p className="text-red-500">{errors.title}</p>}
                </div>
                <div>
                    <label className="block text-gray-700">Age</label>
                    <input
                        type="number"
                        name="age"
                        value={form.age}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border rounded"
                    />
                    {errors.age && <p className="text-red-500">{errors.age}</p>}
                </div>
                <div>
                    <label className="block text-gray-700">Email</label>
                    <input
                        type="email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border rounded"
                    />
                    {errors.email && <p className="text-red-500">{errors.email}</p>}
                </div>
                <div>
                    <label className="block text-gray-700">Mobile</label>
                    <input
                        type="tel"
                        name="mobile"
                        value={form.mobile}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border rounded"
                    />
                    {errors.mobile && <p className="text-red-500">{errors.mobile}</p>}
                </div>
                <div className="flex justify-end space-x-2 mt-4">
                    <button
                        type="button"
                        onClick={onClose}
                        className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                    >
                        Save
                    </button>
                </div>
            </form>
        </Modal>
    );
};

export default EditMemberModal;
