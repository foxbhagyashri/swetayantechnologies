import React from "react";
import { Phone, Mail, MapPin } from "lucide-react";

export default function Footer() {
    return (
        <footer className="bg-neutral-950 text-white pt-14 pb-6">
            <div className="max-w-7xl mx-auto px-5">

                {/* Footer Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">

                    {/* Column 1 - Logo */}
                    <div>
                        <img
                            src="/ChatGPT Image Aug 8, 2026, 10_21_03 AM.png"
                            alt="Swetayan Technologies"
                            className="w-56 bg-white rounded-md p-2"
                        />

                        <p className="mt-5 text-sm text-white leading-7">
                            Swetayan Technologies provides professional laptop repair,
                            desktop repair, data recovery, and IT support services with
                            reliable solutions and quick turnaround times.
                        </p>
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

                    {/* Column 4 - Services */}
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



                    {/* Column 3 - Contact */}
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
                                <a
                                    href="tel:+919284562996"
                                    className="hover:text-orange-400"
                                >
                                    9284562996 / 8421873733
                                </a>
                            </li>

                            <li className="flex items-center gap-3">
                                <Mail className="w-5 h-5 text-[#ff8904]" />
                                <a
                                    href="mailto:swetayantechnologies@gmail.com"
                                    className="hover:text-orange-400"
                                >
                                    swetayantechnologies@gmail.com
                                </a>
                            </li>

                        </ul>
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
    );
}