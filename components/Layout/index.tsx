import { FC } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useSession } from 'next-auth/client';
import { SEO } from '../../lib/constants';
import { useRouter } from 'next/router';

interface LayoutProps {
  header?: boolean;
}

const Layout: FC<LayoutProps> = ({ children, header = true }): JSX.Element => {
  const [session, sessionLoading] = useSession();
  const router = useRouter();

  console.log(router.pathname, SEO.url)
  return (
    <div>
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <meta
          name="description"
          content={SEO.description}
        />
        {/* <meta
          property="og:image"
          content={`https://og-image.vercel.app/${encodeURI(
            siteTitle
          )}.png?theme=light&md=0&fontSize=75px&images=https%3A%2F%2Fassets.zeit.co%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fnextjs-black-logo.svg`}
        /> */}
        <meta name="og:title" content={SEO.title} />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>
      <header>
        <>
          <Image
            priority
            src="/images/profile.jpg"
            height={144}
            width={144}
            // alt={name}
          />
          <h1>{session?.user?.name}</h1>
        </>
      </header>
      <main>{children}</main>
      {'/' !== router.pathname && (
        <div>
          <Link href="/">
            <a>← Back to home</a>
          </Link>
        </div>
      )}
    </div>
  )
}

export default Layout;
