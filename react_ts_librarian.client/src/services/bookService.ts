import type { Book, NewBook } from '../types/Book';

const API_BASE_URL = '/api/books';

export const bookService = {
    async getAll(): Promise<Book[]> {
        const response = await fetch(API_BASE_URL);
        if (!response.ok) throw new Error('Failed to fetch books');
        return response.json();
    },

    async getById(id: number): Promise<Book> {
        const response = await fetch(`${API_BASE_URL}/${id}`);
        if (!response.ok) throw new Error('Failed to fetch book');
        return response.json();
    },

    async create(book: NewBook): Promise<Book> {
        const response = await fetch(API_BASE_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(book),
        });
        if (!response.ok) throw new Error('Failed to create book');
        return response.json();
    },

    async update(id: number, book: Book): Promise<void> {
        const response = await fetch(`${API_BASE_URL}/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(book),
        });
        if (!response.ok) throw new Error('Failed to update book');
    },

    async delete(id: number): Promise<void> {
        const response = await fetch(`${API_BASE_URL}/${id}`, {
            method: 'DELETE',
        });
        if (!response.ok) throw new Error('Failed to delete book');
    },
};