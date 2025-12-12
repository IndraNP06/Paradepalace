'use client';

import { motion, useMotionValue, useTransform, animate, useInView } from 'framer-motion';
import { useEffect, useRef } from 'react';

interface CountUpProps {
    to: number;
    from?: number;
    duration?: number;
    className?: string;
    separator?: string;
}

export function CountUp({
    to,
    from = 0,
    duration = 2,
    className,
    separator = ',',
}: CountUpProps) {
    const nodeRef = useRef<HTMLSpanElement>(null);
    const isInView = useInView(nodeRef, { once: true, margin: '-50px' });

    const count = useMotionValue(from);
    const rounded = useTransform(count, (latest) => Math.round(latest));

    useEffect(() => {
        if (isInView) {
            const controls = animate(count, to, { duration, ease: 'easeOut' });
            return controls.stop;
        }
    }, [count, to, duration, isInView]);

    return (
        <motion.span ref={nodeRef} className={className}>
            {useTransform(rounded, (latest) => latest.toLocaleString('en-US').replace(/,/g, separator))}
        </motion.span>
    );
}
