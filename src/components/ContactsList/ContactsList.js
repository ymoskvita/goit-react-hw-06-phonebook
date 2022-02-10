import React from "react";
import { useSelector, useDispatch } from "react-redux";
import actions from '../../redux/contacts/contacts-actions';
import IconButton from "../IconButton/IconButton";
import { List, Item } from '../Phonebook.styled';
import { ReactComponent as DeleteIcon } from '../../icons/close.svg'


const getVisibleContacts = (contacts, filter) => {
    const normalizedFilter = filter.toLocaleLowerCase();
    const visibleContacts = contacts.filter(contact =>
      contact.name.toLocaleLowerCase().includes(normalizedFilter),
    );
    return visibleContacts;
};

export default function ContactsList() {
    const contacts = useSelector(state => getVisibleContacts(state.contacts.items, state.contacts.filter));
    const dispatch = useDispatch();
    return (
        <List>
            {contacts.map(({ id, name, number }) => (
                <Item key={id}>
                    <>
                        <p>{name}</p>
                        <p>{number}</p>
                        <IconButton onClick={() => dispatch(actions.deleteContact(id))} aria-label="Delete contact">
                            <DeleteIcon width="15" height="15" />
                        </IconButton>
                    </>
                </Item>
            ))}
        </List>
    );
};