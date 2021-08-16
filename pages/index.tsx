import Link from 'next/link'
import { useSession } from 'next-auth/client';

import Layout from '../components/layout';

export default function Home({ allPostsData }) {
  const [session, loadingSession] = useSession();
  return (
    <section>
      <p>This is the start of an awesome future.</p>
      {!loadingSession && (
        <Link href="/user/dashboard">
          <a>{session?.user ? 'See Profile' : 'Login'}</a>
        </Link>
      )}
    </section>
  )
}

export async function getStaticProps() {
  const allPostsData = [];
  return {
    props: {
      allPostsData
    }
  }
}

Home.layout = Layout;
