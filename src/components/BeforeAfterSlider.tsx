'use client';

import { useState, useRef, useCallback, useEffect } from 'react';

interface BeforeAfterSliderProps {
    beforeSrc: string;
    afterSrc: string;
    beforeLabel?: string;
    afterLabel?: string;
    beforeSubLabel?: string;
    afterSubLabel?: string;
}

export default function BeforeAfterSlider({
    beforeSrc,
    afterSrc,
    beforeLabel = 'Before',
    afterLabel = 'After',
    beforeSubLabel,
    afterSubLabel,
}: BeforeAfterSliderProps) {
    const [position, setPosition] = useState(50);
    const [isDragging, setIsDragging] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    const updatePosition = useCallback((clientX: number) => {
        const container = containerRef.current;
        if (!container) return;
        const rect = container.getBoundingClientRect();
        const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
        setPosition((x / rect.width) * 100);
    }, []);

    const onMouseDown = (e: React.MouseEvent) => {
        setIsDragging(true);
        updatePosition(e.clientX);
    };

    const onTouchStart = (e: React.TouchEvent) => {
        setIsDragging(true);
        updatePosition(e.touches[0].clientX);
    };

    useEffect(() => {
        const onMouseMove = (e: MouseEvent) => { if (isDragging) updatePosition(e.clientX); };
        const onTouchMove = (e: TouchEvent) => { if (isDragging) updatePosition(e.touches[0].clientX); };
        const onUp = () => setIsDragging(false);

        window.addEventListener('mousemove', onMouseMove);
        window.addEventListener('mouseup', onUp);
        window.addEventListener('touchmove', onTouchMove);
        window.addEventListener('touchend', onUp);
        return () => {
            window.removeEventListener('mousemove', onMouseMove);
            window.removeEventListener('mouseup', onUp);
            window.removeEventListener('touchmove', onTouchMove);
            window.removeEventListener('touchend', onUp);
        };
    }, [isDragging, updatePosition]);

    return (
        <div
            ref={containerRef}
            className="relative select-none overflow-hidden rounded-2xl shadow-2xl cursor-col-resize"
            style={{ touchAction: 'none' }}
            onMouseDown={onMouseDown}
            onTouchStart={onTouchStart}
        >
            {/* After image (full width, underneath) */}
            <img src={afterSrc} alt="After" className="block w-full h-auto object-cover" draggable={false} />

            {/* Before image (clipped) */}
            <div
                className="absolute inset-0 overflow-hidden"
                style={{ width: `${position}%` }}
            >
                <img
                    src={beforeSrc}
                    alt="Before"
                    className="block h-full object-cover"
                    style={{ width: containerRef.current?.offsetWidth ?? '100%' }}
                    draggable={false}
                />
            </div>

            {/* Divider line */}
            <div
                className="absolute top-0 bottom-0 w-0.5 bg-white shadow-lg"
                style={{ left: `${position}%`, transform: 'translateX(-50%)' }}
            >
                {/* Handle */}
                <div
                    className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white shadow-xl flex items-center justify-center z-10 transition-transform ${isDragging ? 'scale-110' : 'scale-100'}`}
                >
                    <svg className="w-5 h-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M8 9l-4 3 4 3M16 9l4 3-4 3" />
                    </svg>
                </div>
            </div>

            {/* Labels */}
            <div className="absolute top-4 left-4 pointer-events-none">
                <span className="px-3 py-1.5 rounded-full bg-black/60 text-white text-sm font-semibold backdrop-blur-sm">
                    {beforeLabel}
                    {beforeSubLabel && <span className="ml-1 text-gray-300 text-xs">{beforeSubLabel}</span>}
                </span>
            </div>
            <div className="absolute top-4 right-4 pointer-events-none">
                <span className="px-3 py-1.5 rounded-full bg-purple-600/80 text-white text-sm font-semibold backdrop-blur-sm">
                    {afterLabel}
                    {afterSubLabel && <span className="ml-1 text-purple-200 text-xs">{afterSubLabel}</span>}
                </span>
            </div>
        </div>
    );
}
