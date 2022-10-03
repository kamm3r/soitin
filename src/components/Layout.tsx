import Head from 'next/head';
import React from 'react';

export function Layout({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className='flex mx-auto h-screen max-w-5xl flex-col'>
      <Head>
        <title>{title}</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <main className='flex flex-grow flex-col'>{children}</main>
    </div>
  );
}
