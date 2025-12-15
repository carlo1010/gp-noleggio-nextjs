import * as React from 'react';

// Define the shape of the props the component accepts
interface BadgePromoProps {
    // Required text props
    topText: string;
    bottomText: string;

    // Optional style/positioning props (with defaults matching your current layout)
    bgColorClass?: string;
    positionClasses?: string;
}

const BadgePromo: React.FC<BadgePromoProps> = ({
                                                   topText,
                                                   bottomText,
                                                   // Default to your current color/position if not provided
                                                   bgColorClass = 'bg-red-700',
                                                   positionClasses = 'absolute mt-5 ml-5',
                                               }) => {
    return (
        <div
            // Apply dynamic classes and fixed styling for rounding/padding
            className={`${positionClasses} ${bgColorClass} rounded-tl-xl rounded-br-xl px-3 py-2`}
        >
            <div className="text-white text-left leading-tight">

                {/* Top Text (e.g., "Fino al") */}
                <div className="text-xs font-medium">{topText}</div>

                {/* Bottom Text (e.g., "20%") */}
                <div className="text-lg font-bold">{bottomText}</div>
            </div>
        </div>
    );
};

export default BadgePromo;