// src/components/ContactList.tsx

import React from 'react';
import { useSelector } from 'react-redux';

const ContactList: React.FC = () => {
  const contacts = useSelector((state: any) => state.contacts);

  return (
    <ul>
      {contacts.map((contact: any) => (
        <li key={contact.id}>
          <span>{contact.name}</span>
          <span>{contact.email}</span>
        </li>
      ))}
    </ul>
  );
};

export default ContactList;
