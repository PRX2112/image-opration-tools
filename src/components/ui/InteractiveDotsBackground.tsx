'use client';

import { useEffect, useRef } from 'react';

const InteractiveDotsBackground = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const mouseRef = useRef({ x: -1000, y: -1000 });

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let animationFrameId: number;
        let dots: { x: number; y: number; baseX: number; baseY: number; size: number }[] = [];

        const spacing = 30;
        const baseSize = 2;
        const effectRadius = 200;
        const effectStrength = 5;

        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            initDots();
        };

        const initDots = () => {
            dots = [];
            const cols = Math.ceil(canvas.width / spacing);
            const rows = Math.ceil(canvas.height / spacing);

            for (let i = 0; i < cols; i++) {
                for (let j = 0; j < rows; j++) {
                    const x = i * spacing;
                    const y = j * spacing;
                    dots.push({
                        x,
                        y,
                        baseX: x,
                        baseY: y,
                        size: baseSize,
                    });
                }
            }
        };

        const draw = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            const time = Date.now() * 0.001;

            dots.forEach((dot) => {
                // Calculate distance to mouse
                const dx = mouseRef.current.x - dot.baseX;
                const dy = mouseRef.current.y - dot.baseY;
                const dist = Math.sqrt(dx * dx + dy * dy);

                // Wave effect
                let scale = 1;
                let shiftX = 0;
                let shiftY = 0;
                let color = 'rgba(173, 216, 230, 0.3)'; // Default light blue

                if (dist < effectRadius) {
                    const force = (effectRadius - dist) / effectRadius;

                    // "3D" displacement
                    const angle = Math.atan2(dy, dx);

                    // Push dots away slightly to create a ripple/magnify effect
                    const push = force * effectStrength * 1.5;
                    shiftX = Math.cos(angle) * push;
                    shiftY = Math.sin(angle) * push;

                    // Scale size up for the "closer" feel
                    scale = 1 + force * 1.5; // Max 2.5x size

                    // Brighten color
                    const opacity = 0.3 + (force * 0.7);
                    color = `rgba(135, 206, 235, ${opacity})`;
                }

                const x = dot.baseX - shiftX;
                const y = dot.baseY - shiftY;

                ctx.fillStyle = color;
                ctx.beginPath();
                // Circular dot
                ctx.arc(x, y, dot.size * scale, 0, Math.PI * 2);
                ctx.fill();
            });

            animationFrameId = requestAnimationFrame(draw);
        };

        const handleMouseMove = (e: MouseEvent) => {
            mouseRef.current.x = e.clientX;
            mouseRef.current.y = e.clientY;
        };

        const handleMouseLeave = () => {
            mouseRef.current.x = -1000;
            mouseRef.current.y = -1000;
        }

        window.addEventListener('resize', resizeCanvas);
        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mouseleave', handleMouseLeave);

        resizeCanvas();
        draw();

        return () => {
            window.removeEventListener('resize', resizeCanvas);
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseleave', handleMouseLeave);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="fixed inset-0 pointer-events-none z-0"
            aria-hidden="true"
        />
    );
};

export default InteractiveDotsBackground;
