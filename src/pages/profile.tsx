import styles from '../styles/pages/Profile.module.css';


import { useState } from 'react';
import Head from 'next/head';
import Layout from '@/components/layout';
import Input from '@/components/input';
import { useUserContext } from '@/providers/user-provider';
import withAuth from '@/hooks/with-auth';


const Profile = () => {
  const { user } = useUserContext();

  const [firstName, setFirstName] = useState(user?.metadata?.firstName ?? '');
  const [lastName, setLastName] = useState(user?.metadata?.lastName ?? '');

  const isFirstNameDirty = firstName !== user?.metadata?.firstName;
  const isLastNameDirty = lastName !== user?.metadata?.lastName;
  const isProfileFormDirty = isFirstNameDirty || isLastNameDirty;

  const updateUserProfile = async (e: any) => {
    e.preventDefault();
  };

  return (
    <Layout>
      <Head>
        <title>Profile - Nhost</title>
      </Head>

      <div className={styles.container}>
        <div className={styles.info}>
          <h2>Profile</h2>
          <p>Update your personal information.</p>
        </div>

        <div className={styles.card}>
          <form onSubmit={updateUserProfile} className={styles.form}>
            <div className={styles['form-fields']}>
              <div className={styles['input-group']}>
                <Input
                  type="text"
                  label="First name"
                  value={firstName}
                  onChange={(e: any) => setFirstName(e.target.value)}
                  required
                />
                <Input
                  type="text"
                  label="Last name"
                  value={lastName}
                  onChange={(e: any) => setLastName(e.target.value)}
                  required
                />
              </div>
              <div className={styles['input-email-wrapper']}>
                <Input
                  type="email"
                  label="Email address"
                  value={user?.email}
                  readOnly
                />
              </div>
            </div>

            <div className={styles['form-footer']}>
              <button
                type="submit"
                disabled={!isProfileFormDirty}
                className={styles.button}
              >
                Update
              </button>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default withAuth(Profile);
