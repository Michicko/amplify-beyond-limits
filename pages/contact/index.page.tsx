import GuestLayout from '@/components/GuestLayout/GuestLayout';
import React from 'react'
import { ReactElement } from "react"
import styles from './Contact.module.css';

function Contact() {
  return (
    <div className="mainContainer">
      <div
        className={styles.contactHead}
        style={{
          backgroundImage: `linear-gradient(0deg, rgba(4, 48, 91, 54%), rgba(64, 84, 102, 27%)), url(/images/contact.jpg)`,
          backgroundSize: 'cover',
          backgroundPosition: 'top',
        }}
      >
        <h1>CONTACT US</h1>
      </div>

      <div className={styles.contactCard}>
        <h1>WRITE TO US</h1>
        <p>Please send us an email to this address: <a href="mailto:info@beyondlimitsfa.com">info@beyondlimitsfa.com</a></p>
        </div>
      </div>
  )
}
Contact.getLayout = function getLayout(page: ReactElement) {
  return <GuestLayout>{page}</GuestLayout>;
};
export default Contact