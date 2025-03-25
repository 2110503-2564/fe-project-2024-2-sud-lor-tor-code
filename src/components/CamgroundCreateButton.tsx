'use client'
import Link from "next/link";

export default function CampgroundCreateAddButton() {
    return (
        <Link
            href="/campground/manage"
            className="fixed bottom-6 right-6 z-50"
        >
            <button
                aria-label="add"
                className="bg-teal-700 hover:bg-teal-600 shadow-lg w-12 h-12 rounded-full flex items-center justify-center text-white text-2xl"
            >
                +
            </button>


        </Link>
    );
}