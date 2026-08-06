import React, { useState, useEffect } from "react";
import { Phone, Mail, ArrowRight, Menu, X, ChevronRight, ChevronDown } from "lucide-react";
import { NavLink } from "react-router-dom";

export default function SiteHeader() {
    const [open, setOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [openMobile, setOpenMobile] = useState({});

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 12);
        window.addEventListener("scroll", onScroll);

        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    const toggleMobile = (name) => {
        setOpenMobile((prev) => ({ ...prev, [name]: !prev[name] }));
    };

    const links = [
        { name: "Home", path: "/" },
        { name: "About Us", path: "/About_us" },
        {
            name: "Services",
            dropdown: [
                {
                    name: "Data Recovery",
                    dropdown: [
                        { name: "Hard Disk Data Recovery", path: "/services/hard-disk-data-recovery" },
                        { name: "Laptop Data Recovery", path: "/services/laptop-data-recovery" },
                        { name: "Data Recovery for MacBook®", path: "/services/macbook-data-recovery" },
                        { name: "SSD Data Recovery", path: "/services/ssd-data-recovery" },
                        { name: "Removable Media Recovery", path: "/services/removable-media-recovery" },
                        { name: "CCTV Footage Recovery", path: "/services/cctv-footage-recovery" },
                        { name: "NAS Data Recovery", path: "/services/nas-data-recovery" },
                        { name: "RAID Server Recovery", path: "/services/raid-server-recovery" },
                    ],
                },
                {
                    name: "Laptop Repair Service",
                    path: "/services/laptop-repair",
                },
            ],
        },
       
        

        { name: "Blogs", path: "/Blog" },
        { name: "Contact", path: "/Contact_us" },
    ];

    return (
        <>
            {/* Top Bar */}
            <div className="bg-neutral-950 text-neutral-300 font-mono text-xs">
                <div className="max-w-7xl mx-auto px-5 py-2 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse"></span>
                        <span>Emergency drop-off & free diagnostics — Every Day, 10 AM – 8 PM</span>
                    </div>

                    <div className="hidden sm:flex items-center gap-5">

                        <a href="tel:+919876543210"
                            className="flex items-center gap-2 hover:text-orange-400"
                        >
                            <Phone size={14} />
                            +91 98765 43210
                        </a>


                        <a href="mailto:help@swetayantech.in"
                            className="flex items-center gap-2 hover:text-orange-400"
                        >
                            <Mail size={14} />
                            help@swetayantech.in
                        </a>
                    </div>
                </div>
            </div>

            {/* Header */}
            <header
                className={`sticky top-0 z-50 transition-all duration-300 ${scrolled
                    ? "bg-white shadow-md"
                    : "bg-white"
                    }`}
            >
                <div className="max-w-7xl mx-auto px-5 py-4 flex items-center justify-between">

                    {/* Logo */}
                    <NavLink to="/" className="flex items-center">
                        <img
                            src="/swetayan-tech.png"
                            alt="Swetayan Technologies"
                            className="w-56 object-contain"
                        />
                    </NavLink>

                    {/* Desktop Menu */}
                    <nav className="hidden lg:flex items-center gap-8">

                        {links.map((link) => (

                            link.dropdown ? (

                                <div key={link.name} className="relative group">

                                    <button className="font-medium text-gray-800 hover:text-orange-500">
                                        {link.name}
                                    </button>

                                    <div className="absolute left-0 top-full mt-2 w-64 bg-white rounded-lg shadow-xl border opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50 py-2">

                                        {link.dropdown.map((item) =>

                                            item.dropdown ? (

                                                <div key={item.name} className="relative group/inner">

                                                    <button
                                                        type="button"
                                                        className="w-full flex items-center justify-between px-5 py-3 text-gray-700 hover:bg-orange-50 hover:text-orange-500"
                                                    >
                                                        {item.name}
                                                        <ChevronRight size={16} />
                                                    </button>

                                                    <div className="absolute left-full top-0 -mt-2 ml-1 w-64 bg-white rounded-lg shadow-xl border opacity-0 invisible group-hover/inner:opacity-100 group-hover/inner:visible transition-all duration-300 z-50 py-2">

                                                        {item.dropdown.map((sub) => (
                                                            <NavLink
                                                                key={sub.name}
                                                                to={sub.path}
                                                                className="block px-5 py-3 text-gray-700 hover:bg-orange-50 hover:text-orange-500"
                                                            >
                                                                {sub.name}
                                                            </NavLink>
                                                        ))}

                                                    </div>

                                                </div>

                                            ) : (

                                                <NavLink
                                                    key={item.name}
                                                    to={item.path}
                                                    className="block px-5 py-3 text-gray-700 hover:bg-orange-50 hover:text-orange-500"
                                                >
                                                    {item.name}
                                                </NavLink>

                                            )

                                        )}

                                    </div>

                                </div>

                            ) : (

                                <NavLink
                                    key={link.name}
                                    to={link.path}
                                    className={({ isActive }) =>
                                        `font-medium transition-colors ${isActive
                                            ? "text-orange-500"
                                            : "text-gray-800 hover:text-orange-500"
                                        }`
                                    }
                                >
                                    {link.name}
                                </NavLink>

                            )

                        ))}

                    </nav>

                    {/* CTA Button */}
                    <NavLink
                        to="/contact"
                        className="hidden lg:flex items-center gap-2 bg-[#ff8904] hover:bg-orange-600 text-white px-5 py-3 rounded-md transition"
                    >
                        Get Free Diagnosis
                        <ArrowRight size={18} />
                    </NavLink>

                    {/* Mobile Button */}
                    <button
                        onClick={() => setOpen(!open)}
                        className="lg:hidden"
                    >
                        {open ? (
                            <X size={28} className="text-black" />
                        ) : (
                            <Menu size={28} className="text-black" />
                        )}
                    </button>
                </div>

                {/* Mobile Menu */}
                {open && (
                    <div className="lg:hidden border-t bg-white">
                        <div className="flex flex-col p-5 space-y-4">

                            {links.map((link) => (

                                link.dropdown ? (

                                    <div key={link.name}>

                                        <p className="font-semibold text-gray-900 mb-2">
                                            {link.name}
                                        </p>

                                        <div className="ml-4 flex flex-col gap-2">

                                            {link.dropdown.map((item) =>

                                                item.dropdown ? (

                                                    <div key={item.name}>

                                                        <button
                                                            type="button"
                                                            onClick={() => toggleMobile(item.name)}
                                                            className="w-full flex items-center justify-between text-gray-800 font-medium"
                                                        >
                                                            {item.name}
                                                            <ChevronDown
                                                                size={16}
                                                                className={`transition-transform ${openMobile[item.name] ? "rotate-180" : ""
                                                                    }`}
                                                            />
                                                        </button>

                                                        {openMobile[item.name] && (
                                                            <div className="ml-4 mt-2 flex flex-col gap-2">
                                                                {item.dropdown.map((sub) => (
                                                                    <NavLink
                                                                        key={sub.name}
                                                                        to={sub.path}
                                                                        onClick={() => setOpen(false)}
                                                                        className="text-gray-600 hover:text-orange-500"
                                                                    >
                                                                        {sub.name}
                                                                    </NavLink>
                                                                ))}
                                                            </div>
                                                        )}

                                                    </div>

                                                ) : (

                                                    <NavLink
                                                        key={item.name}
                                                        to={item.path}
                                                        onClick={() => setOpen(false)}
                                                        className="text-gray-700 hover:text-orange-500"
                                                    >
                                                        {item.name}
                                                    </NavLink>

                                                )

                                            )}

                                        </div>

                                    </div>

                                ) : (

                                    <NavLink
                                        key={link.name}
                                        to={link.path}
                                        onClick={() => setOpen(false)}
                                        className={({ isActive }) =>
                                            isActive
                                                ? "text-orange-500 font-semibold"
                                                : "text-gray-700 hover:text-orange-500"
                                        }
                                    >
                                        {link.name}
                                    </NavLink>

                                )

                            ))}
                            <NavLink
                                to="/contact"
                                onClick={() => setOpen(false)}
                                className="bg-orange-500 text-white text-center py-3 rounded-md"
                            >
                                Get Free Diagnosis
                            </NavLink>
                        </div>
                    </div>
                )}
            </header>
        </>
    );
}