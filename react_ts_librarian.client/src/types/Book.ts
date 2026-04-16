export interface Book {
    id: number;
    title: string;
    author: string;
    isbn: string;
    publicationYear: number;
    genre: string;
    isAvailable: boolean;
}

export interface NewBook {
    title: string;
    author: string;
    isbn: string;
    publicationYear: number;
    genre: string;
    isAvailable: boolean;
}