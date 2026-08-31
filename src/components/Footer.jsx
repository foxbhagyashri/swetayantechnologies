import React from "react";
import { Phone, Mail, MapPin } from "lucide-react";

// Simple WhatsApp SVG icon (lucide doesn't ship brand icons)
function WhatsAppIcon({ className }) {
    return (
        <svg viewBox="0 0 24 24" className={className} fill="currentColor">
            <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.46 1.32 4.96L2 22l5.25-1.38a9.9 9.9 0 0 0 4.79 1.22h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.87 9.87 0 0 0 12.04 2zm0 18.13h-.01a8.2 8.2 0 0 1-4.19-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.18 8.18 0 0 1-1.26-4.36c0-4.54 3.7-8.24 8.25-8.24 2.2 0 4.27.86 5.83 2.42a8.18 8.18 0 0 1 2.41 5.82c0 4.55-3.7 8.24-8.24 8.24zm4.52-6.16c-.25-.12-1.47-.72-1.69-.81-.23-.08-.39-.12-.56.13-.17.24-.64.81-.78.97-.14.17-.29.19-.53.06-.25-.12-1.05-.39-1.99-1.23-.74-.66-1.24-1.47-1.38-1.72-.15-.24-.02-.37.11-.5.11-.11.25-.29.37-.43.13-.14.17-.24.25-.4.08-.17.04-.31-.02-.43-.06-.12-.56-1.34-.76-1.84-.2-.48-.4-.42-.56-.42h-.48c-.17 0-.43.06-.66.31-.22.24-.87.85-.87 2.08s.89 2.41 1.02 2.58c.12.17 1.74 2.66 4.22 3.73.59.25 1.05.4 1.41.52.59.19 1.13.16 1.55.1.47-.07 1.47-.6 1.68-1.18.2-.58.2-1.08.14-1.18-.06-.1-.22-.16-.47-.28z" />
        </svg>
    );
}

export default function Footer() {
    // 👉 update these with your real numbers/links
    const whatsappNumber = "919284562996"; // country code + number, no + or spaces
    const whatsappMessage = "Hi, I'd like to enquire about your services.";
    const whatsappLink = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;
    const callNumber = "+919284562996";

    return (
        <>
            <footer className="bg-neutral-950 text-white pt-14 pb-6">
                <div className="max-w-7xl mx-auto px-5">

                    {/* Footer Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10">

                        {/* Column 1 - Logo */}
                        <div>
                            <img
                                src="/ChatGPT Image Aug 8, 2026, 10_21_03 AM.png"
                                alt="Swetayan Technologies"
                                className="w-56 bg-white rounded-md p-2"
                            />

                            {/* <p className="mt-5 text-sm text-white leading-7">
                                Swetayan Technologies provides professional laptop repair,
                                desktop repair, data recovery, and IT support services with
                                reliable solutions and quick turnaround times.
                            </p> */}

                            <div className="mt-5 inline-flex items-center gap-2 bg-[#ff8904]/10 border border-[#ff8904]/40 rounded-full px-4 py-2">
                                <span className="flex text-[#ff8904] text-sm">★★★★★</span>
                                <span className="text-sm font-semibold text-white">
                                    4.9 <span className="text-neutral-400 font-normal">Google Rating</span>
                                </span>
                            </div>
                        </div>

                        {/* Column 2 - Quick Links */}
                        <div>
                            <h3 className="text-xl font-semibold text-[#ff8904] mb-5">
                                Quick Links
                            </h3>

                            <ul className="space-y-3 text-sm">
                                <li>
                                    <a href="/" className="hover:text-orange-400 transition">
                                        Home
                                    </a>
                                </li>

                                <li>
                                    <a href="/about" className="hover:text-orange-400 transition">
                                        About Us
                                    </a>
                                </li>

                                <li>
                                    <a href="/services" className="hover:text-orange-400 transition">
                                        Services
                                    </a>
                                </li>

                                <li>
                                    <a href="/contact" className="hover:text-orange-400 transition">
                                        Contact Us
                                    </a>
                                </li>

                                <li>
                                    <a href="/reviews" className="hover:text-orange-400 transition">
                                        Reviews
                                    </a>
                                </li>
                            </ul>
                        </div>

                        {/* Column 3 - Services */}
                        <div>
                            <h3 className="text-xl font-semibold text-[#ff8904] mb-5">
                                Our Services
                            </h3>

                            <ul className="space-y-3 text-sm">
                                <li>
                                    <a href="#" className="hover:text-orange-400 transition">
                                        Laptop Repair
                                    </a>
                                </li>

                                <li>
                                    <a href="#" className="hover:text-orange-400 transition">
                                        Desktop Repair
                                    </a>
                                </li>

                                <li>
                                    <a href="#" className="hover:text-orange-400 transition">
                                        Data Recovery
                                    </a>
                                </li>

                                <li>
                                    <a href="#" className="hover:text-orange-400 transition">
                                        SSD Upgrade
                                    </a>
                                </li>

                                <li>
                                    <a href="#" className="hover:text-orange-400 transition">
                                        Motherboard Repair
                                    </a>
                                </li>

                                <li>
                                    <a href="#" className="hover:text-orange-400 transition">
                                        AMC Support
                                    </a>
                                </li>
                            </ul>
                        </div>

                        {/* Column 4 - Contact */}
                        <div>
                            <h3 className="text-xl font-semibold text-[#ff8904] mb-5">
                                Contact Us
                            </h3>

                            <ul className="space-y-4 text-sm">

                                <li className="flex items-start gap-3">
                                    <MapPin className="w-5 h-5 text-[#ff8904] mt-1" />
                                    <span>
                                        Shop No 2 Keshavkunj Building, Opp Yashoda Medical , Nr Bank of Maharashtra , Pimple Gurav, Pune 411061
                                    </span>
                                </li>

                                <li className="flex items-center gap-3">
                                    <Phone className="w-5 h-5 text-[#ff8904]" />

                                    <a href={`tel:${callNumber}`}
                                        className="hover:text-orange-400"
                                    >
                                        9284562996 / 8421873733
                                    </a>
                                </li>

                                <li className="flex items-center gap-3">
                                    <WhatsAppIcon className="w-5 h-5 text-[#25D366]" />

                                    <a href={whatsappLink}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="hover:text-orange-400"
                                    >
                                        Chat on WhatsApp
                                    </a>
                                </li>

                                <li className="flex items-center gap-3">
                                    <Mail className="w-5 h-5 text-[#ff8904]" />

                                    <a href="mailto:swetayantechnologies@gmail.com"
                                        className="hover:text-orange-400"
                                    >
                                        swetayantechnologies@gmail.com
                                    </a>
                                </li>

                            </ul>
                        </div>

                        {/* Column 5 - Map */}
                        <div>
                            <h3 className="text-xl font-semibold text-[#ff8904] mb-5">
                                Find Us
                            </h3>

                            <div className="rounded-md overflow-hidden border border-neutral-800">
                                <iframe
                                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2880.5626221056746!2d73.81721177372236!3d18.58928456707459!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2b8c76aaaaac9%3A0x5210fbaae0c299fc!2sSwetayan%20Technologies%20Data%20Recovery%20Lab!5e1!3m2!1sen!2sin!4v1787546026229!5m2!1sen!2sin"
                                    width="100%"
                                    height="200"
                                    style={{ border: 0 }}
                                    allowFullScreen
                                    loading="lazy"
                                    referrerPolicy="strict-origin-when-cross-origin"
                                    title="Swetayan Technologies Data Recovery Lab Location"
                                />
                            </div>
                        </div>

                    </div>

                    {/* Bottom Footer */}
                    <div className="border-t border-neutral-800 mt-12 pt-6 flex flex-col md:flex-row justify-between items-center text-sm text-neutral-400">

                        <p>
                            © {new Date().getFullYear()} Swetayan Technologies. All Rights Reserved.
                        </p>

                        <div className="flex gap-6 mt-4 md:mt-0">
                            <a href="#" className="hover:text-orange-400">
                                Privacy Policy
                            </a>

                            <a href="#" className="hover:text-orange-400">
                                Terms & Conditions
                            </a>
                        </div>

                    </div>

                </div>
            </footer>

            {/* Floating WhatsApp + Call buttons — visible on every page this Footer is rendered on */}
            <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3">

                <a href={`tel:${callNumber}`}
                    aria-label="Call us"
                    className="w-14 h-14 rounded-full bg-[#2143fd] flex items-center justify-center shadow-lg hover:scale-105 transition-transform"
                >
                    <Phone className="w-6 h-6 text-white" />
                </a>


                <a href={whatsappLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Chat on WhatsApp"
                    className="w-14 h-14 rounded-full bg-[#25D366] flex items-center justify-center shadow-lg hover:scale-105 transition-transform animate-pulse"
                >
                    <WhatsAppIcon className="w-7 h-7 text-white" />
                </a>
            </div>
        </>
    );
}