'use client'

import Image from 'next/image';
import InteractiveCard from './InteractiveCard';
import { Rating } from "@mui/material";
import Button from '@mui/material';

import { deleteCampground } from "@/libs/campgroundFunction/deleteCampground";

type CardProps = {
    campgroundName: string;
    rating?: number;
    onRatingChange?: (campgroundName: string, newRating: number) => void;
    id:string;
    token:string;
};

export default function Card({ campgroundName, rating, onRatingChange, id ,token}: CardProps) {

    const handleRatingChange = (_event: React.SyntheticEvent, newValue: number | null) => {
        if (onRatingChange) {
            const newRating = newValue ?? 0;
            onRatingChange(campgroundName, newRating);
        }
    };

    return (
        <InteractiveCard>
            <div className='text-amber-800 font-medium text-lg p-2.5 bg-white'>
                <div>{campgroundName}</div>
                
                <button
                className="bg-sky-600 hover:bg-indigo-600 hover:scale-105 text-white font-medium py-2 px-4 rounded-md shadow-md transition-transform duration-200 mt-4"
                onClick={async (event) => {
                    event.preventDefault();  // Prevent default behavior (useful for buttons inside forms or links)
                    event.stopPropagation();
                    await deleteCampground(id, token);
                    window.location.reload();
                }}
                >
                Delete
                </button>
                {rating !== undefined && onRatingChange && (
                    <Rating
                        id={campgroundName}
                        name={campgroundName}
                        data-testid={`${campgroundName} Rating`}
                        value={rating}
                        onChange={handleRatingChange}
                        onClick={(event) => event.stopPropagation()}
                    />
                )}
            </div>
        </InteractiveCard>
    );
}
