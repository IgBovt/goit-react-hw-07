import Contact from '../Contact/Contact';
import { useSelector } from 'react-redux';
import { selectContacts } from '../../redux/contactsSlice';
import css from './ContactList.module.css';

export default function ContactList() {
  const contacts = useSelector(selectContacts);

  return contacts.length === 0 ? (
    <p className={css.text}>We haven`t found any contacts</p>
  ) : (
    <ul className={css.list}>
      {contacts.map(({ name, number, id }) => (
        <li key={id}>
          <Contact name={name} number={number} id={id} />
        </li>
      ))}
    </ul>
  );
}
