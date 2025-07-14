// src/features/libraryms/types.ts
import type React from "react";

export type Category = {
  label: string;
  icon: React.JSX.Element;
};

export interface Book {
  ISBN: string;
  title?: string;
  available?: number;
  author?: string;
  category?: string;
  description?: string;
  rating?: number;
  coverImage: string;
  availability?: string;
  descdown?: string;
  additionalInfo?: string;
  reviews?: string[];
  downloadUrl?: string;
}
