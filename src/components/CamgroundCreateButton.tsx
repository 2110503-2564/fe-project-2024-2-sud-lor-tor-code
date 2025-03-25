'use client'
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import Link from "next/link";


export default function CampgroundCreateAddButton() {
    return (
        <Link
            href="/campground/manage"
            className="fixed bottom-6 right-6 z-50"
        >
            <button
                aria-label="add"
                className="bg-teal-700 hover:bg-teal-600 shadow-lg p-3 rounded-full flex items-center justify-center"
            >
                <AddIcon />
            </button>
        </Link>
    );
}