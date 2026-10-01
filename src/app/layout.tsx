import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: "VR GOLD BUYER'S Kadapa | Pledged Gold Release & Instant Cash for Gold",
  description:
    "VR GOLD BUYER'S in Kadapa: తాకట్టు పెట్టిన బంగారాన్ని విడిపించి ఈ రోజు మార్కెట్ రేటుకు కొనబడును. Doorstep bank loan clearance, instant spot cash, computerized Karatmeter testing at D.No. 42/1201 Near Y-Junction NGO Colony, Kadapa.",
  keywords: [
    'vr gold kadapa',
    'vr gold buyers kadapa',
    'gold buyers in kadapa',
    'pledged gold release in kadapa',
    'sell gold for cash in kadapa',
    'bank gold loan clearance kadapa',
    'gold buyers near ngo colony kadapa',
    'sell old gold kadapa',
    'doorstep gold loan release kadapa',
    'gold buyers sivalayam kadapa',
  ],
  authors: [{ name: "VR GOLD BUYER'S" }],
  openGraph: {
    title: "VR GOLD BUYER'S Kadapa | Pledged Gold Release & Spot Cash",
    description:
      'Doorstep Pledged Gold Release & Instant Cash Payouts at Daily Market Rates in Kadapa. Call 8978973576 / 8978977465.',
    url: 'https://vrgoldkadapa.com',
    siteName: "VR GOLD BUYER'S KADAPA",
    locale: 'en_IN',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': ['LocalBusiness', 'FinancialService'],
        '@id': 'https://vrgoldkadapa.com/#localbusiness',
        'name': "VR GOLD BUYER'S",
        'alternateName': ['VR Gold', 'VR Gold Buyers Kadapa'],
        'telephone': ['+918978973576', '+918978977465'],
        'priceRange': '₹₹₹',
        'openingHours': 'Mo-Su 09:00-20:30',
        'address': {
          '@type': 'PostalAddress',
          'streetAddress': 'D.No. 42/1201, Beside Mruthunjayakunta Sivalayam, Near Y-Junction, NGO Colony',
          'addressLocality': 'Kadapa',
          'addressRegion': 'Andhra Pradesh',
          'postalCode': '516002',
          'addressCountry': 'IN',
        },
        'geo': {
          '@type': 'GeoCoordinates',
          'latitude': '14.4713',
          'longitude': '78.8237',
        },
        'description':
          'Premier gold buyers and pledged gold loan clearance service in Kadapa. Doorstep bank loan release and instant cash payments at live daily bullion market rates.',
      },
    ],
  };

  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`${inter.className} min-h-screen flex flex-col font-sans selection:bg-gold-500 selection:text-white`}>
        {children}
      </body>
    </html>
  );
}
