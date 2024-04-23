'use client';

interface CardProps {
    children: any;
    className?: any;
}

const Card = ( { children, className }: CardProps ) => {
    return <div className={`bg-white rounded-lg px-4 py-2 border-2 border-gray-50 ${className}`}>
        {children}
    </div>;
}

export default Card;