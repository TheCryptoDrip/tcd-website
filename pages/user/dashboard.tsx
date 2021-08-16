import { useState } from 'react';
import { signIn, signOut, useSession } from 'next-auth/client'

import Layout from '../../components/layout';
import { NamiWalletCard } from '../../components/Nami';

export default function Dashboard() {
  const [session, loadingSession] = useSession();
  const [submittedEmail, setSubmittedEmail] = useState(false);

  const handleSetName = async (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    const name = data.get('name');

    if (name) {
      const res = await fetch('/api/user', {
        method: 'PUT',
        body: JSON.stringify({
          name,
          email: session.user.email
        })
      });

      console.log(res);
    }
  }

  if (loadingSession) {
    return <p>Fetching details...</p>
  }

  if (submittedEmail) {
    return <p>Check your email for your secure login link!</p>
  }

  return session ? (
    <>
      <p>Signed in as {session?.user?.email}</p>
      <button onClick={() => signOut()}>Sign out</button>
      <h2 className={`font-semibold text-4xl`}>Wallet Data</h2>
      <NamiWalletCard />
      <hr/>
      <form onSubmit={handleSetName}>
          <input style={{ color: '#000' }} type="text" name="name" defaultValue={session?.user?.name} />
          <input style={{ color: '#000' }} type="submit" value="Update" />
      </form>
    </>
  ) : (
    <>
      <form onSubmit={(event) => {
        event.preventDefault();
        const data = new FormData(event.target as HTMLFormElement);
        const email = data.get('email');
        signIn('email', { email, redirect: false });
        setSubmittedEmail(true);
      }}>
        <input style={{ color: '#000' }} name="email" type="email" placeholder={`hello@example.com`} />
        <input style={{ color: '#000' }} type="submit" value="Send Sign-In Link" />
      </form>
      <NamiWalletCard />
    </>
  );
}

Dashboard.layout = Layout;
