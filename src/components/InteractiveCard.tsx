'use client'
import React from 'react';

export default function InteractiveCard ({
    children
}: { 
    children: React.ReactNode
}) {

    function onCardMouseAction(event: React.SyntheticEvent) {
        const { currentTarget } = event;
        const isMouseOver = event.type === 'mouseover';
      
        currentTarget.classList.toggle('shadow-lg', !isMouseOver);
        currentTarget.classList.toggle('bg-white', !isMouseOver);
        currentTarget.classList.toggle('shadow-2xl', isMouseOver);
        currentTarget.classList.toggle('bg-neutral-200', isMouseOver);
      }      

    return (
        <div className='w-full h-[300px] rounded-lg shadow-lg bg-white overflow-hidden' 
        onMouseOver={ (e) => onCardMouseAction(e) }
        onMouseOut={ (e) => onCardMouseAction(e) }>
            { children }
        </div>
    );
}