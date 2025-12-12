'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface TypewriterProps {
  texts: string[];
  className?: string;
  textClassName?: string;
  cursorClassName?: string;
  typingDelay?: number;
  deletingDelay?: number;
  pauseDelay?: number;
}

export function Typewriter({
  texts,
  className,
  textClassName,
  cursorClassName,
  typingDelay = 150,
  deletingDelay = 75,
  pauseDelay = 1500,
}: TypewriterProps) {
  const [textIndex, setTextIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [currentText, setCurrentText] = useState('');

  useEffect(() => {
    const handleTyping = () => {
      const fullText = texts[textIndex];
      
      if (isDeleting) {
        if (charIndex > 0) {
          setCurrentText(fullText.substring(0, charIndex - 1));
          setCharIndex(charIndex - 1);
        } else {
          setIsDeleting(false);
          setTextIndex((prevIndex) => (prevIndex + 1) % texts.length);
        }
      } else {
        if (charIndex < fullText.length) {
          setCurrentText(fullText.substring(0, charIndex + 1));
          setCharIndex(charIndex + 1);
        } else {
          setTimeout(() => setIsDeleting(true), pauseDelay);
        }
      }
    };

    const timeoutId = setTimeout(handleTyping, isDeleting ? deletingDelay : typingDelay);

    return () => clearTimeout(timeoutId);
  }, [charIndex, isDeleting, textIndex, texts, typingDelay, deletingDelay, pauseDelay]);

  // Split text for styling "Parade Palace"
  const specialText = "Parade Palace";
  const parts = currentText.split(specialText);
  
  const displayText = parts.length > 1 && currentText.includes(specialText)
    ? <>
        {parts[0]}
        <span className={textClassName}>{specialText}</span>
        {parts[1]}
      </>
    : currentText;

  return (
    <h1 className={cn("inline-block", className)}>
      {displayText}
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 1, 0] }}
        transition={{ duration: 0.8, repeat: Infinity, repeatType: 'reverse' }}
        className={cn('inline-block w-1 h-full bg-foreground ml-2', cursorClassName)}
        style={{ height: '1em', verticalAlign: 'bottom' }}
        aria-hidden="true"
      />
    </h1>
  );
}
