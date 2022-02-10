import React, { useState } from "react";
import { nanoid } from 'nanoid';
import { useSelector, useDispatch } from "react-redux";
import toast from 'react-hot-toast';
import actions from '../../redux/contacts/contacts-actions';
import { InputStyled, Btn } from '../Phonebook.styled';

export default function Form() {
    const contacts = useSelector(state => state.contacts.items);
    const dispatch = useDispatch();
    const [name, setName] = useState('');
    const [number, setNumber] = useState('');
    const nameInputId = nanoid();
    const numberInputId = nanoid();

    const handleChange = event => {
        const { name, value } = event.currentTarget;
        switch (name) {
            case 'name':
                setName(value);
                break;
            case 'number':
                setNumber(value);
                break;
            default:
                return;
        }
    }

    const handleSubmit = event => {
        event.preventDefault();

        if (contacts.some(contact =>
            contact.name.toLocaleLowerCase().includes(name.toLocaleLowerCase()))) {
            setName('');
            setNumber('');
            return toast.error(`${name} is already in contacts.`)
        }
        dispatch(actions.addContact({ name, number }));
        setName('');
        setNumber('');
    }

    return (
        <form onSubmit={handleSubmit}>
            <label htmlFor={nameInputId}> Name
                <InputStyled
                    id={nameInputId}
                    type="text"
                    value={name}
                    onChange={handleChange}
                    name="name"
                    pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
                    title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
                    required
                />
            </label>
            <label htmlFor={numberInputId}>Number
                <InputStyled
                    id={numberInputId}
                    type="tel"
                    name="number"
                    value={number}
                    onChange={handleChange}
                    pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
                    title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
                    required
                />
            </label>
        <Btn type="submit">Add contact</Btn>
        </form>
        )
};