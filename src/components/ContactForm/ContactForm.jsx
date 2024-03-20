import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useDispatch } from 'react-redux';
import { IoIosPersonAdd } from 'react-icons/io';
import { useId } from 'react';
import { useSelector } from 'react-redux';
import * as Yup from 'yup';
import { addContact } from '../../redux/contactsSlice';
import { selectContacts } from '../../redux/contactsSlice';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import css from './ContactForm.module.css';

const notify = () => toast('Sorry, you already have same contact');

const FeedbackSchema = Yup.object().shape({
  name: Yup.string()
    .min(3, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Fill this field'),
  number: Yup.string()
    .min(3, 'Too Short!')
    .max(10, 'Too Long!')
    .required('Fill this field'),
});
const initialValues = { name: '', number: '' };

export default function ContactForm() {
  const dispatch = useDispatch();
  const contacts = useSelector(selectContacts);

  const nameID = useId();
  const numberID = useId();

  const handleSubmit = (values, actions) => {
    contacts.find(contact => contact.name === values.name)
      ? notify()
      : (dispatch(addContact(values)), actions.resetForm());
  };

  return (
    <>
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={FeedbackSchema}
      >
        <Form className={css.form}>
          <div className={css.container}>
            <label className={css.label} htmlFor={nameID}>
              Name:
            </label>
            <Field
              className={css.input}
              type="text"
              name="name"
              id={nameID}
            ></Field>
            <div className={css.error}>
              <ErrorMessage name="name" as="span" />
            </div>
          </div>

          <div className={css.container}>
            <label className={css.label} htmlFor={numberID}>
              Number:
            </label>
            <Field
              className={css.input}
              type="text"
              name="number"
              id={numberID}
            ></Field>
            <div className={css.error}>
              <ErrorMessage name="number" as="span" />
            </div>
          </div>
          <button type="submit" className={css.btn}>
            <IoIosPersonAdd className={css.icon} size={20} />
            Add contact
          </button>
        </Form>
      </Formik>
      <hr className={css.line} />
    </>
  );
}
