export default function robots() {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: [
        "/api/",
        // Old WordPress paths
        "/wp-content/",
        "/wp-admin/",
        "/wp-includes/",
        "/feed/",
        "/xmlrpc.php",
      ],
    },
    sitemap: "https://www.pixeltoonzacademy.com/sitemap.xml",
  };
}
