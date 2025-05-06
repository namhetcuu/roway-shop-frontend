"use client";
import { useEffect, useState } from "react";
import { ArrowUpCircle } from "lucide-react";

const BackToTopButton: React.FC = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const toggleVisibility = () => {
            if (window.scrollY > 300) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };

        window.addEventListener("scroll", toggleVisibility);
        return () => window.removeEventListener("scroll", toggleVisibility);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    return (
        <button
            onClick={scrollToTop}
            className={`fixed bottom-5 right-5 bg-black text-white p-2 rounded-full shadow-lg transition transform ${
                isVisible ? "opacity-100 scale-100" : "opacity-0 scale-0"
            }`}
        >
            <ArrowUpCircle size={28} />
        </button>
    );
};

export default BackToTopButton;
