'use client'

import Image from 'next/image';
import InteractiveCard from './InteractiveCard';
import { Rating } from "@mui/material";
import Button from '@mui/material';
import { useRouter } from "next/navigation";

import { deleteCampground } from "@/libs/campgroundFunction/deleteCampground";

type CardProps = {
    campgroundName: string;
    rating?: number;
    onRatingChange?: (campgroundName: string, newRating: number) => void;
    id:string;
    token:string;
    role:string;
};

export default function Card({ campgroundName, rating, onRatingChange, id ,token,role}: CardProps) {

    const router = useRouter();

    const handleRatingChange = (_event: React.SyntheticEvent, newValue: number | null) => {
        if (onRatingChange) {
            const newRating = newValue ?? 0;
            onRatingChange(campgroundName, newRating);
        }
    };
    //console.log(role)
    return (
        <InteractiveCard>
            <div className='text-amber-800 font-medium text-lg p-2.5 bg-white'>
                <div>{campgroundName}</div>

                {role === "admin" && (
                    <>
                        <button
                            className="bg-amber-500 hover:bg-orange-500 hover:scale-105 text-white font-medium py-2 px-4 mx-2 rounded-md shadow-md transition-transform duration-200 mt-4"
                            onClick={(event) => {
                                event.preventDefault();
                                event.stopPropagation();
                                router.push(`/campground/${id}/update`);
                            }}
                        >
                            Update
                        </button>
                        <button
                            className="bg-red-400 hover:bg-red-600 hover:scale-105 text-white font-medium py-2 px-4 mx-2 rounded-md shadow-md transition-transform duration-200 mt-4"
                            onClick={async (event) => {
                                event.preventDefault();
                                event.stopPropagation();

                                const isConfirmed = window.confirm("Are you sure you want to delete this campground?");
                                if (!isConfirmed) return;

                                await deleteCampground(id, token);
                                window.location.reload();
                            }}
                        >
                            Delete
                        </button>
                    </>
                )}

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
