import React from "react";
import { Helmet } from "react-helmet-async";
import { SITE_URL } from "../config/constants";
const SEO = ({
  title,
  description,
  keywords,
  canonicalUrl,
  ogImage,
  ogType = "website",
  schemaData = null,
}) => {
  const siteTitle = "HourMaker - Time Tracking Software";
  const fullTitle = title || siteTitle;
  const siteUrl = SITE_URL;
  const fullCanonical = canonicalUrl ? `${siteUrl}${canonicalUrl}` : siteUrl;
  const keywordContent = Array.isArray(keywords)
    ? keywords.join(", ")
    : keywords;

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="title" content={fullTitle} />
      <meta name="description" content={description} />
      {keywordContent && <meta name="keywords" content={keywordContent} />}
      <link rel="canonical" href={fullCanonical} />

      {/* Open Graph */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={fullCanonical} />
      <meta
        property="og:image"
        content={ogImage || `${siteUrl}/assets/og-image.jpg`}
      />
      <meta property="og:site_name" content="HourMaker" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta
        name="twitter:image"
        content={ogImage || `${siteUrl}/assets/og-image.jpg`}
      />

      {/* Schema Markup */}
      {schemaData && (
        <script type="application/ld+json">{JSON.stringify(schemaData)}</script>
      )}
    </Helmet>
  );
};

export default SEO;
