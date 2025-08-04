import React from 'react';

interface StructuredDataProps {
  type: 'service' | 'breadcrumb' | 'faq';
  data: any;
}

const StructuredData: React.FC<StructuredDataProps> = ({ type, data }) => {
  const generateStructuredData = () => {
    switch (type) {
      case 'service':
        return {
          "@context": "https://schema.org",
          "@type": "Service",
          "name": data.name,
          "description": data.description,
          "provider": {
            "@type": "LocalBusiness",
            "name": "Axie Studio",
            "url": "https://axiestudio.se"
          },
          "areaServed": {
            "@type": "Country",
            "name": "Sverige"
          },
          "hasOfferCatalog": {
            "@type": "OfferCatalog",
            "name": data.name,
            "itemListElement": data.offers || []
          }
        };
        
      case 'breadcrumb':
        return {
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          "itemListElement": Array.isArray(data) ? data.map((item: any, index: number) => ({
            "@type": "ListItem",
            "position": index + 1,
            "name": item.name,
            "item": item.url
          })) : []
        };
        
      case 'faq':
        return {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "mainEntity": Array.isArray(data) ? data.map((faq: any) => ({
            "@type": "Question",
            "name": faq.question,
            "acceptedAnswer": {
              "@type": "Answer",
              "text": faq.answer
            }
          })) : []
        };
        
      default:
        return {};
    }
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(generateStructuredData())
      }}
    />
  );
};

export default StructuredData;