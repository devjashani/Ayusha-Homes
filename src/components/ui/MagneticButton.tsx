import React, { useRef, useState } from 'react';
import { motion } from 'motion/react';

interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  href?: string;
  strength?: number;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
}

export const MagneticButton: React.FC<MagneticButtonProps> = ({
  children,
  className = '',
  onClick,
  href,
  strength = 18,
  type = 'button',
  disabled = false,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (disabled || !ref.current) return;
    const { clientX, clientY } = e;
    const { height, width, left, top } = ref.current.getBoundingClientRect();
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);
    // Limit displacement to max 8px
    const factor = strength / 100;
    const maxPull = 8;
    const x = Math.max(-maxPull, Math.min(maxPull, middleX * factor));
    const y = Math.max(-maxPull, Math.min(maxPull, middleY * factor));
    setPosition({ x, y });
  };

  const handlePointerLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  const content = (
    <motion.div
      ref={ref}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: 'spring', stiffness: 280, damping: 20, mass: 0.2 }}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      className="inline-block"
    >
      {href ? (
        <a
          href={href}
          onClick={onClick}
          className={`inline-flex items-center justify-center font-medium transition-transform duration-200 active:scale-[0.97] ${className}`}
        >
          {children}
        </a>
      ) : (
        <button
          type={type}
          disabled={disabled}
          onClick={onClick}
          className={`inline-flex items-center justify-center font-medium transition-transform duration-200 active:scale-[0.97] ${className}`}
        >
          {children}
        </button>
      )}
    </motion.div>
  );

  return content;
};
