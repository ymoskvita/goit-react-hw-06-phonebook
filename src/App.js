import { Toaster } from 'react-hot-toast';
import { useSelector, useDispatch } from "react-redux";
import actions from './redux/contacts/contacts-actions';
import Section from "./components/Section/Section";
import ContactsList from "./components/ContactsList/ContactsList";
import Form from "./components/Form/Form";
import Filter from "./components/Filter/Filter";

const getVisibleContacts = (contacts, filter) => {
    const normalizedFilter = filter.toLocaleLowerCase();
    const visibleContacts = contacts.filter(contact =>
      contact.name.toLocaleLowerCase().includes(normalizedFilter),
    );
    return visibleContacts;
  };

export default function App() {
  const contacts = useSelector(state => getVisibleContacts(state.contacts.items, state.contacts.filter));
  const filter = useSelector(state => state.contacts.filter);
  const dispatch = useDispatch();

  return (
    <>
      <Toaster />
      <Section title="Phonebook">
        <Form onSubmit={({ name, number }) => dispatch(actions.addContact({ name, number }))}/>
      </Section>
      <Section title="Contacts">
        <Filter value={filter} onChange={(e) => dispatch(actions.changeFilter(e.currentTarget.value))} />
        <ContactsList
          contacts={contacts}
          onDeleteContact={id => dispatch(actions.deleteContact(id))}
        />
      </Section>
    </>
  );
}