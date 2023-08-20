// src/components/ContactsPage.tsx

import React from 'react';
import ContactForm from './ContactForm';
import ContactList from './ContactList';

const ContactsPage: React.FC = () => {
  return (
    <div>
      <h2>Contact Management</h2>
      <ContactForm />
      <ContactList />
    </div>
  );
};

export default ContactsPage;
