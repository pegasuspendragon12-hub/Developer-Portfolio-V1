const footerLinks = [
  { label: "INSTAGRAM", href: "https://instagram.com" },
  { label: "GITHUB", href: "https://github.com" },
  { label: "EMAIL", href: "#get-in-touch" },
  { label: "LINKEDIN", href: "https://linkedin.com" },
];

export function FooterSection() {
  return (
    <footer className="site-footer">
      <div className="site-footer-inner">
        <nav className="site-footer-links" aria-label="Footer links">
          {footerLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target={link.href.startsWith("http") ? "_blank" : undefined}
              rel={link.href.startsWith("http") ? "noreferrer" : undefined}
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="site-footer-meta">
          <span>Located in India</span>
          <span className="site-footer-name">@Pegasus</span>
          <span>5231 visits</span>
        </div>
      </div>
    </footer>
  );
}
