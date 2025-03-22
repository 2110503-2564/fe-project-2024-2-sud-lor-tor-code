'use client'

import Image from 'next/image';
import InteractiveCard from './InteractiveCard';
import { Rating } from "@mui/material";

type CardProps = {
    campgroundName: string;
    rating?: number;
    onRatingChange?: (campgroundName: string, newRating: number) => void;
};

export default function Card({ campgroundName, rating, onRatingChange }: CardProps) {

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
