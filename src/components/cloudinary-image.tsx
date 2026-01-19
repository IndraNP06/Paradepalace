"use client";

import React from 'react';
import { Cloudinary } from '@cloudinary/url-gen';
import { auto } from '@cloudinary/url-gen/actions/resize';
import { autoGravity } from '@cloudinary/url-gen/qualifiers/gravity';
import { AdvancedImage } from '@cloudinary/react';

interface CloudinaryImageProps {
    publicId: string;
    width?: number;
    height?: number;
    className?: string;
    alt?: string;
}

export const CloudinaryImage = ({
    publicId,
    width = 500,
    height = 500,
    className,
    alt = "Gallery Image"
}: CloudinaryImageProps) => {
    // Gunakan cloud name dari env atau fallback ke hardcoded user
    const cld = new Cloudinary({
        cloud: {
            cloudName: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || 'dnlfhyivz'
        }
    });

    const img = cld
        .image(publicId)
        .format('auto') // Optimize delivery by resizing and applying auto-format and auto-quality
        .quality('auto')
        .resize(auto().gravity(autoGravity()).width(width).height(height)); // Transform the image

    return (
        <div className={`overflow-hidden ${className}`}>
            <AdvancedImage cldImg={img} alt={alt} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        </div>
    );
};
