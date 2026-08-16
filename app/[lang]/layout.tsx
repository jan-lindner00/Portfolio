import { i18nConfig, Locale } from '@/app/i18n/config'
import { Sora, Inter } from "next/font/google";
import "@/app/globals.css"
import Footer from '@/components/Footer';
import { createTranslator, loadTranslations } from '../i18n/utils';

const sora = Sora({
    weight: ["400", "500", "600", "700"],
    subsets: ["latin"],
    variable: "--sora"
})

const inter = Inter({
    weight: ["400", "500", "600", "700"],
    subsets: ["latin"],
    variable: "--inter"
})

export async function generateStaticParams() {
  console.log(`Generating static params for ${i18nConfig.localesToPrerender.length} locales...`)

  return i18nConfig.localesToPrerender.map((locale) => ({
    lang: locale,
  }))
}

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ lang: string }>
}) {
  const translations = await loadTranslations((await params).lang as Locale, ["common"])
  const t = createTranslator(translations)
  return (
    <html 
        lang={(await params).lang} 
        className={`${inter.variable} ${sora.variable}`} 
        data-scroll-behavior="smooth"
    >
      <body 
        className="antialiased font-inter text-neutral-50"
    >
        {children}
        <Footer lang={(await params).lang as Locale} t={t} />
    </body>
    </html>
  );
}

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }) {
  return {
    icons:{
      icon: ["/public/favicon-96x96.png"],
      apple: "/apple-touch-icon.png",
      shortcut: "/favicon.ico"
    },
    title: `Jan Niklas Lindner — Portfolio`,
    description: (await params).lang === "de" ? "Portfolio von Jan Niklas Lindner, einem angehenden Full Stack Developer, der mit React Next.js, Typescript und Supabase arbeitet." :
    "Portfolio of Jan Niklas Lindner, an aspiring fullstack developer working with React, Next.js, TypeScript and Supabase.",
    alternates: {
      canonical: `${process.env.SITE_URL}/${(await params).lang}`,
      languages: {
        'en': `${process.env.SITE_URL}/en`,
        'de': `${process.env.SITE_URL}/de`
      },
    },
    openGraph: {
      locale: (await params).lang,
      alternateLocale: i18nConfig.locales.filter(async l => l !== (await params).lang),
    }
  }
}