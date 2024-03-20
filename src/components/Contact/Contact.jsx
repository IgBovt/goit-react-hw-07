import { FaUserAlt } from 'react-icons/fa';
import { FaPhoneAlt } from 'react-icons/fa';
import { FaPhoneVolume } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import { deleteContact } from '../../redux/contactsSlice';
import css from './Contact.module.css';

export default function Contact({ id, name, number }) {
  const dispatch = useDispatch();
  return (
    <div className={css.container}>
      <div className={css.phoneContainer}>
        <div>
          <p>
            <FaUserAlt className={css.icon} size={14} />
            {name}
          </p>
          <p>
            <FaPhoneAlt className={css.icon} size={14} />
            {number}
          </p>
        </div>

        <a className={css.phoneLink} href={`tel:${number}`}>
          <FaPhoneVolume className={css.phoneIcon} size={20} />
        </a>
      </div>
      <hr className={css.line} />
      <button className={css.btn} onClick={() => dispatch(deleteContact(id))}>
        Delete
      </button>
    </div>
  );
}
