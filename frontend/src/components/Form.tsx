import React, { useState } from 'react';
import { Member } from './types';
import { parsePhoneNumberFromString } from 'libphonenumber-js';

interface FormProps {
  onSubmit: (data: Member) => Promise<void>;
}

const Form: React.FC<FormProps> = ({ onSubmit }) => {
  const [title, setTitle] = useState('');
  const [name, setName] = useState('');
  const [age, setAge] = useState<number | ''>('');
  const [email, setEmail] = useState('');
  const [mobile, setPhone] = useState('');
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const validate = () => {
    const newErrors: { [key: string]: string } = {};
    if (!title) newErrors.title = 'Title is required';
    if (!name) newErrors.name = 'Name is required';
    if (!age || age < 18 || age > 120) newErrors.age = 'Age must be between 18 and 120';
    if (!/^\S+@\S+\.\S+$/.test(email)) newErrors.email = 'Enter a valid email address';

    const phoneNumber = parsePhoneNumberFromString(mobile);
    if (!phoneNumber || !phoneNumber.isValid()) {
      newErrors.phone = 'Enter a valid phone number with country code (e.g., +1234567890)';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      onSubmit({
        id: Math.floor(Math.random() * 1000),
        title,
        name,
        age: Number(age),
        email,
        mobile,
        status: 'unclaimed',
      });
      setTitle('');
      setName('');
      setAge('');
      setEmail('');
      setPhone('');
    }
  };

  return (
    <div className="flex flex-col gap-4 m-8">
      <b>Form</b>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            name="title"
            className="ml-2 p-1 border rounded-md text-[#000]"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          {errors.title && <p className="text-red-500">{errors.title}</p>}
        </div>
        <div>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            className="ml-2 p-1 border rounded-md text-[#000]"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          {errors.name && <p className="text-red-500">{errors.name}</p>}
        </div>
        <div>
          <label htmlFor="age">Age:</label>
          <input
            type="text"
            id="age"
            name="age"
            className="ml-2 p-1 border rounded-md text-[#000]"
            value={age}
            onChange={(e) => setAge(Number(e.target.value) || '')}
          />
          {errors.age && <p className="text-red-500">{errors.age}</p>}
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="text"
            id="email"
            name="email"
            className="ml-2 p-1 border rounded-md text-[#000]"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {errors.email && <p className="text-red-500">{errors.email}</p>}
        </div>
        <div>
          <label htmlFor="phone">Phone:</label>
          <input
            type="text"
            id="phone"
            name="phone"
            className="ml-2 p-1 border rounded-md text-[#000]"
            value={mobile}
            onChange={(e) => setPhone(e.target.value)}
          />
          {errors.phone && <p className="text-red-500">{errors.mobile}</p>}
        </div>

        <button type="submit" className="bg-blue-500 text-white p-2 rounded-md mt-4">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Form;
