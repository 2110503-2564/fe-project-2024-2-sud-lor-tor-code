'use client'

import Image from 'next/image';
import InteractiveCard from './InteractiveCard';
import { Rating } from "@mui/material";

type CardProps = {
    campgroundName: string;
    imgSrc: string;
    rating?: number;
    onRatingChange?: (campgroundName: string, newRating: number) => void;
};

export default function Card({ campgroundName, imgSrc, rating, onRatingChange }: CardProps) {

    const handleRatingChange = (_event: React.SyntheticEvent, newValue: number | null) => {
        if (onRatingChange) {
            const newRating = newValue ?? 0;
            onRatingChange(campgroundName, newRating);
        }
    };

    return (
        <InteractiveCard>
            <div className='w-full h-[70%] relative rounded-t-lg'>
                <Image 
                    src={imgSrc}
                    alt={`${campgroundName} image`}
                    fill={true}
                    className='object-cover rounded-t-lg'
                    sizes="(max-width: 640px) 100vw, 50vw"
                />
            </div>
            <div className='text-amber-800 font-medium text-lg h-[30%] p-2.5 bg-white'>
                <div className='mb-3'>{campgroundName}</div>
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
