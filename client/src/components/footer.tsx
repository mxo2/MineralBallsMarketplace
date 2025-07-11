import { Link } from "wouter";
import { Phone, Mail, MapPin, Facebook, Instagram, Twitter } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center mb-4">
              <img 
                src="/logo_bg_1752204377370.png" 
                alt="Mineral Balls - Mithila Makhana" 
                className="h-14 w-auto"
                onError={(e) => {
                  console.log("Footer logo failed to load");
                  e.currentTarget.style.display = 'none';
                }}
              />
            </div>
            <p className="text-gray-300 mb-4">
              Premium makhana products packed with essential minerals and incredible taste.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-300 hover:text-primary transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-300 hover:text-primary transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-300 hover:text-primary transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/">
                  <span className="text-gray-300 hover:text-primary transition-colors cursor-pointer">Home</span>
                </Link>
              </li>
              <li>
                <Link href="/products">
                  <span className="text-gray-300 hover:text-primary transition-colors cursor-pointer">Products</span>
                </Link>
              </li>
              <li>
                <Link href="/about">
                  <span className="text-gray-300 hover:text-primary transition-colors cursor-pointer">About Us</span>
                </Link>
              </li>
              <li>
                <Link href="/benefits">
                  <span className="text-gray-300 hover:text-primary transition-colors cursor-pointer">Benefits</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Support */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Support</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/contact">
                  <span className="text-gray-300 hover:text-primary transition-colors cursor-pointer">Contact Us</span>
                </Link>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-primary transition-colors">Shipping Info</a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-primary transition-colors">Returns</a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-primary transition-colors">FAQ</a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Contact</h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Phone className="text-primary w-4 h-4" />
                <span className="text-gray-300">+91 9876543210</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="text-primary w-4 h-4" />
                <span className="text-gray-300">info@mineralballs.com</span>
              </div>
              <div className="flex items-start space-x-3">
                <MapPin className="text-primary w-4 h-4 mt-1" />
                <span className="text-gray-300">123 Health Street, Wellness City, India</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 text-center">
          <p className="text-gray-300">
            &copy; 2024 Mineral Balls. All rights reserved. |{" "}
            <a href="#" className="text-primary hover:underline">Privacy Policy</a> |{" "}
            <a href="#" className="text-primary hover:underline">Terms of Service</a>
          </p>
        </div>
      </div>
    </footer>
  );
}
