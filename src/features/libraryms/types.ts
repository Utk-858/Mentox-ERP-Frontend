// src/features/libraryms/types.ts
import type React from "react";

export type Category = {
  label: string;
  icon: React.JSX.Element;
};

export type Book = {
  id: string;
  title: string;
  author: string;
  cover: string;
};
