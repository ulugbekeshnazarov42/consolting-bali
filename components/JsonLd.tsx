import { site } from "@/lib/site";

export default function JsonLd() {
  const organization = {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    name: site.name,
    url: site.url,
    logo: `${site.url}/logo.png`,
    description: site.description,
    telephone: site.contact.phone,
    email: site.contact.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: site.contact.address,
      addressCountry: "UZ",
      addressLocality: "Toshkent",
    },
    sameAs: [site.social.telegram, site.social.instagram, site.social.youtube],
  };

  const website = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: site.name,
    url: site.url,
    inLanguage: "uz-UZ",
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organization) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(website) }}
      />
    </>
  );
}
