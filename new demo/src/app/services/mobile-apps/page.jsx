import AppDevelopment from './AppDevelopment';

export const metadata = {
  title: 'Mobile App Development Services | Evolkun',
  description: 'Professional iOS and Android app development. Build native and cross-platform mobile applications that users love.',
  keywords: 'mobile app development, iOS development, Android development, React Native, Flutter, app design',
  openGraph: {
    title: 'Mobile App Development Services | Evolkun',
    description: 'Transform your idea into a powerful mobile app',
    images: ['/images/app-dev-og.jpg'],
  },
};

export default function Page() {
  return <AppDevelopment />;
}