import WebDevelopment from './WebDevelopment';

export const metadata = {
  title: 'Web Development Services | Evolkun',
  description: 'Professional web development services. Build modern, scalable websites and web applications that drive business growth.',
  keywords: 'web development, website design, react, next.js, full stack development',
  openGraph: {
    title: 'Web Development Services | Evolkun',
    description: 'Professional web development services for modern businesses',
    images: ['/images/web-dev-og.jpg'],
  },
};

export default function Page() {
  return <WebDevelopment />;
}