import React, { useState, useEffect } from "react";
import { Phone, Mail, ArrowRight, Menu, X, ChevronRight, ChevronDown } from "lucide-react";
import { NavLink } from "react-router-dom";

// Custom thin scrollbar for dropdown menus
const scrollbarStyles = `
.custom-scrollbar::-webkit-scrollbar {
    width: 6px;
}
.custom-scrollbar::-webkit-scrollbar-track {
    background: transparent;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
    background-color: #ff8904;
    border-radius: 10px;
}
.custom-scrollbar {
    scrollbar-width: thin;
    scrollbar-color: #ff8904 transparent;
}
`;

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
            name: "Data Recovery Service",
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
            dropdown: [
                {
                    name: "Laptop Virus Removal Service & Installation",
                    path: "/services/laptop-virus-removal-service-installation",
                },
                {
                    name: "Laptop Keyboard Repair & Replacement",
                    path: "/services/laptop-keyboard-repair-replacement",
                },
                {
                    name: "Laptop CPU Fan Repair & Replacement",
                    path: "/services/laptop-cpu-fan-repair-replacement",
                },
                {
                    name: "Laptop Not Turning On Repair",
                    path: "/services/laptop-not-turning-on-repair",
                },
                {
                    name: "Laptop Overheating Issue Repair",
                    path: "/services/laptop-overheating-issue-repair",
                },
                {
                    name: "Laptop Battery Repair & Replacement",
                    path: "/services/laptop-battery-repair-replacement",
                },
                {
                    name: "Laptop Touchpad Track pad Repair & Replacement",
                    path: "/services/laptop-touchpad-track-pad-repair-and-replacement",
                },
                {
                    name: "Laptop Back Panel / Body Replacement",
                    path: "/services/laptop-back-panel-body-replacement",
                },
                {
                    name: "Laptop Screen Repair & Replacement",
                    path: "/services/laptop-screen-repair-and-replacement",
                },
                {
                    name: "Laptop Processor Fan Noise Repair & Replacement",
                    path: "/services/laptop-processor-fan-noise-repaire-and-replacement",
                },
                {
                    name: "Laptop Not Charging Repair",
                    path: "/services/laptop-not-charging-repair",
                },
                {
                    name: "Laptop Hinges Repair & Replacement",
                    path: "/services/laptop-hinges-repair-and-replacement",
                },

                {
                    name: "Laptop SSD Installation / Setup",
                    path: "/services/laptop-SSD-Installation-Setup",
                },
                {
                    name: "Laptop Booting Issue Repair",
                    path: "/services/laptop-Booting-Issue-Repair",
                },

                {
                    name: "Laptop Charging Point Repair & Replacement",
                    path: "/services/laptop-charging-point-repair-replacement",
                },
                {
                    name: "Laptop Motherboard Repair & Replacement",
                    path: "/services/laptop-motherboard-repair-replacement",
                },
                {
                    name: "Laptop RAM Replacement Fix & Upgrade",
                    path: "/services/laptop-ram-replacement-fix-upgrade",
                },

                {
                    name: "Laptop Charger Repair & Replacement",
                    path: "/services/laptop-charger-repair-replacement",
                },
                {
                    name: "Laptop Hard Disk Repair & Replacement",
                    path: "/services/laptop-hard-disk-repair-replacement",
                },
                {
                    name: "Laptop BIOS Setup & Installation",
                    path: "/services/laptop-BIOS-setup-and-Installation",
                },
            ],
        },



        { name: "Blogs", path: "/Blog" },
        { name: "Contact Us", path: "/Contact_us" },
    ];

    return (
        <>
            <style>{scrollbarStyles}</style>

            {/* Top Bar */}
            <div className="bg-neutral-950 text-neutral-300 font-mono text-xs">
                <div className="max-w-7xl mx-auto px-5 py-2 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse"></span>
                        <span className="font-arial">Emergency drop-off & free diagnostics — Every Day, 9. 30 am To 9.30 pm</span>
                    </div>

                    <div className="hidden sm:flex items-center gap-5">

                        <a href="tel:+919284562996"
                            className="flex items-center gap-2 hover:text-orange-400"
                        >
                            <Phone size={14} />
                            +91 9284562996
                        </a>


                        <a href="mailto:swetayantechnologies@gmail.com"
                            className="flex items-center gap-2 hover:text-orange-400 font-arial"
                        >
                            <Mail size={14} />
                            swetayantechnologies@gmail.com
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
                            src="/ChatGPT Image Aug 8, 2026, 10_21_03 AM.png"
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

                                    <div className="absolute left-0 top-full mt-2 w-64 bg-white rounded-lg shadow-xl border opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50 py-2 max-h-[300px] overflow-y-auto custom-scrollbar">

                                        {link.dropdown.map((item) =>

                                            item.dropdown ? (

                                                <div key={item.name} className="relative group/inner">

                                                    <button
                                                        type="button"
                                                        className="w-full flex items-center justify-between px-5 py-3 text-gray-700 hover:bg-orange-50 hover:text-orange-500 font-arial"
                                                    >
                                                        {item.name}
                                                        <ChevronRight size={16} />
                                                    </button>

                                                    <div className="absolute left-full top-0 -mt-2 ml-1 w-64 bg-white rounded-lg shadow-xl border opacity-0 invisible group-hover/inner:opacity-100 group-hover/inner:visible transition-all duration-300 z-50 py-2 max-h-[300px] overflow-y-auto custom-scrollbar">

                                                        {item.dropdown.map((sub) => (
                                                            <NavLink
                                                                key={sub.name}
                                                                to={sub.path}
                                                                className="block px-0 py-0 text-gray-700 hover:bg-orange-50 hover:text-orange-500 font-arial"
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
                                                    className="block px-5 py-2 text-gray-700 hover:bg-orange-50 hover:text-orange-500 font-arial text-sm"
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
                                            : "text-gray-800 hover:text-orange-500 font-arial"
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
                        to="/EnquiryForm"
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
                                                            <div className="ml-4 mt-2 flex flex-col gap-2 max-h-[250px] overflow-y-auto custom-scrollbar">
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
                                to="/EnquiryForm"
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