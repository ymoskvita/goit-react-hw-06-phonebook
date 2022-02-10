import { Toaster } from 'react-hot-toast';
import Section from "./components/Section/Section";
import ContactsList from "./components/ContactsList/ContactsList";
import Form from "./components/Form/Form";
import Filter from "./components/Filter/Filter";

export default function App() {
  return (
    <>
      <Toaster />
      <Section title="Phonebook">
        <Form />
      </Section>
      <Section title="Contacts">
        <Filter />
        <ContactsList />
      </Section>
    </>
  );
}