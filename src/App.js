import React, { useState, useEffect } from "react";
import { nanoid } from 'nanoid';
import toast, { Toaster } from 'react-hot-toast';
import Section from "./components/Section/Section";
import ContactsList from "./components/ContactsList/ContactsList";
import Form from "./components/Form/Form";
import Filter from "./components/Filter/Filter";

export default function App() {
  const [contacts, setContacts] = useState(() => {
    return JSON.parse(localStorage.getItem('contacts')) ?? [];
  });
  const [filter, setFilter] = useState('');

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const addContact = ({ name, number }) => {
    const newContact = {
      id: nanoid(),
      name,
      number,
    }
    const normalizedName = name.toLocaleLowerCase();

    if (contacts.some(contact =>
      contact.name.toLocaleLowerCase().includes(normalizedName))) {
      return toast.error(`${name} is already in contacts.`)
    }

    setContacts(prevState => ([...prevState, newContact]));
  };

  const deleteContact = contactId => {
    setContacts(prevState => (prevState.filter(contact => contact.id !== contactId)
    ));
  };

  const changeFilter = event => {
    setFilter(event.currentTarget.value);
  }

  const getVisibleContacts = () => {
    const normalizedFilter = filter.toLocaleLowerCase();
    const visibleContacts = contacts.filter(contact =>
      contact.name.toLocaleLowerCase().includes(normalizedFilter),
    );
    return visibleContacts;
  };

  return (
    <>
      <Toaster />
      <Section title="Phonebook">
        <Form onSubmit={addContact}/>
      </Section>
      <Section title="Contacts">
        <Filter value={filter} onChange={changeFilter} />
        <ContactsList
          contacts={getVisibleContacts()}
          onDeleteContact={deleteContact}
        />
      </Section>
    </>
  );
}