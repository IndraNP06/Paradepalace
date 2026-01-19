import data from './placeholder-images.json';

export type ImagePlaceholder = {
  id: string;
  description: string;
  imageUrl: string;
  imageHint: string;
  additionalImages?: string[];
  date?: string;
};

export const PlaceHolderImages: ImagePlaceholder[] = data.placeholderImages;
