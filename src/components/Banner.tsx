'use client'

import Image from 'next/image';
import { useState } from 'react';
import { useSession } from 'next-auth/react';

export default function Banner() {

    const covers = ['/img/cover.jpg', '/img/cover2.jpg', '/img/cover3.jpg'];
    const [indexImg, setIndexImg] = useState(0);
    const { data: session } = useSession();

    return (
        <div className="relative w-screen h-[100vh] overflow-hidden" 
        onClick={() => setIndexImg((indexImg + 1) % covers.length)}>

            <Image 
                src={covers[indexImg]} 
                alt="cover"
                fill
                priority
                className="object-cover"
                role='img'
            />
            
            <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-transparent"></div>

        </div>
    );
}