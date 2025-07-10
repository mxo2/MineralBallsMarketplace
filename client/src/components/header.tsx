import { Link, useLocation } from "wouter";
import { ShoppingCart, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useCartStore } from "@/lib/cart";
import { useState } from "react";

export default function Header() {
  const [location] = useLocation();
  const { cartCount } = useCartStore();
  const [isOpen, setIsOpen] = useState(false);

  const navigationItems = [
    { href: "/", label: "Home" },
    { href: "/products", label: "Products" },
    { href: "/about", label: "About Makhana" },
    { href: "/benefits", label: "Benefits" },
    { href: "/contact", label: "Contact" },
  ];

  const NavItems = ({ mobile = false, onItemClick = () => {} }) => (
    <>
      {navigationItems.map((item) => (
        <Link key={item.href} href={item.href}>
          <span
            className={`${
              mobile 
                ? "block py-2 px-4 text-foreground hover:bg-muted cursor-pointer" 
                : "text-foreground hover:text-primary transition-colors cursor-pointer"
            } ${location === item.href ? "text-primary font-medium" : ""}`}
            onClick={onItemClick}
          >
            {item.label}
          </span>
        </Link>
      ))}
    </>
  );

  return (
    <header className="bg-card shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-4">
          {/* Logo */}
          <Link href="/">
            <div className="flex items-center cursor-pointer">
              <img 
                src="/ChatGPT Image Jul 6, 2025, 02_23_06 PM_1752156010011.png" 
                alt="Mineral Balls - Mithila Makhana" 
                className="h-12 w-auto"
                onError={(e) => {
                  console.log("Logo image failed to load");
                  e.currentTarget.style.display = 'none';
                }}
              />
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <NavItems />
          </nav>

          {/* Cart & Mobile Menu */}
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon" className="relative">
              <ShoppingCart className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-accent text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Button>

            {/* Mobile Menu */}
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                  <Menu className="w-5 h-5" />
                </Button>
              </SheetTrigger>
              <SheetContent>
                <nav className="flex flex-col space-y-4 mt-6">
                  <NavItems mobile onItemClick={() => setIsOpen(false)} />
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
