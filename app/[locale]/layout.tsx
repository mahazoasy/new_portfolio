import type { Metadata } from 'next';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ScrollProgress from '@/components/ScrollProgress';
import ScrollToTop from '@/components/ScrollToTop';   
import ThemeProvider from '@/components/ThemeProvider';
import '../globals.css';

export const metadata: Metadata = {
  title: 'Mahazoasy Heritiana Judicaël | Développeur Web Junior Full-Stack',
  description:
    'Portfolio de Mahazoasy Heritiana Judicaël, développeur web junior full-stack basé à Toamasina, Madagascar.'
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  setRequestLocale(locale);
  const messages = await getMessages();

  return (
    <html lang={locale} suppressHydrationWarning data-scroll-behavior="smooth">
      <body className="relative">
        <ThemeProvider>
          <NextIntlClientProvider messages={messages}>
            <ScrollToTop />          
            <ScrollProgress />
            <Navbar />
            <main>{children}</main>
            <Footer />
          </NextIntlClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}