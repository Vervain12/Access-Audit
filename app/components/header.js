import Link from "next/link";
import Image from "next/image";

export default function Header() {
  const navItems = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
  ];
  
  return (
    <header className="sticky top-0 z-50 w-full bg-white backdrop-blur-sm border-b border-blue-100/50 shadow-sm">
      <nav className="max-w-6xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-3 group hover:scale-105 transition-transform duration-200">
            <Image
              src="/logo.svg"
              alt="AccessAudit Logo"
              width={40}
              height={40}
              className=""
            />
            <span className="text-xl font-display text-gray-700 tracking-tight">
              <span className="text-cyan-700">Access</span>Audit
            </span>
          </Link>
          <div className="absolute left-1/2 transform -translate-x-1/2">
            <ul className="flex items-center space-x-8">
              {navItems.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-gray-700 hover:text-cyan-700 font-inter transition-colors duration-200 font-medium"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="w-32"></div>
        </div>
      </nav>
    </header>
  );
}