import { useState, useEffect } from 'react';
import type { Book, NewBook } from './types/Book';
import { bookService } from './services/bookService';
import './App.css';

function App() {
    const [books, setBooks] = useState<Book[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [showAddForm, setShowAddForm] = useState(false);
    const [editingBook, setEditingBook] = useState<Book | null>(null);

    // Form state
    const [formData, setFormData] = useState<NewBook>({
        title: '',
        author: '',
        isbn: '',
        publicationYear: new Date().getFullYear(),
        genre: '',
        isAvailable: true,
    });

    useEffect(() => {
        loadBooks();
    }, []);

    const loadBooks = async () => {
        try {
            setLoading(true);
            const data = await bookService.getAll();
            setBooks(data);
            setError(null);
        } catch (err) {
            setError('Failed to load books');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            if (editingBook) {
                await bookService.update(editingBook.id, { ...formData, id: editingBook.id });
            } else {
                await bookService.create(formData);
            }
            await loadBooks();
            resetForm();
        } catch (err) {
            setError('Failed to save book');
            console.error(err);
        }
    };

    const handleDelete = async (id: number) => {
        if (!confirm('Are you sure you want to delete this book?')) return;
        try {
            await bookService.delete(id);
            await loadBooks();
        } catch (err) {
            setError('Failed to delete book');
            console.error(err);
        }
    };

    const handleEdit = (book: Book) => {
        setEditingBook(book);
        setFormData({
            title: book.title,
            author: book.author,
            isbn: book.isbn,
            publicationYear: book.publicationYear,
            genre: book.genre,
            isAvailable: book.isAvailable,
        });
        setShowAddForm(true);
    };

    const resetForm = () => {
        setFormData({
            title: '',
            author: '',
            isbn: '',
            publicationYear: new Date().getFullYear(),
            genre: '',
            isAvailable: true,
        });
        setEditingBook(null);
        setShowAddForm(false);
    };

    const toggleAvailability = async (book: Book) => {
        try {
            await bookService.update(book.id, { ...book, isAvailable: !book.isAvailable });
            await loadBooks();
        } catch (err) {
            setError('Failed to update book');
            console.error(err);
        }
    };

    if (loading) return <div className="loading">Loading books...</div>;

    return (
        <div className="app">
            <header className="header">
                <h1>📚 Library Management System</h1>
                <button
                    className="btn btn-primary"
                    onClick={() => setShowAddForm(!showAddForm)}
                >
                    {showAddForm ? 'Cancel' : '+ Add New Book'}
                </button>
            </header>

            {error && <div className="error">{error}</div>}

            {showAddForm && (
                <div className="form-container">
                    <h2>{editingBook ? 'Edit Book' : 'Add New Book'}</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label>Title:</label>
                            <input
                                type="text"
                                value={formData.title}
                                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label>Author:</label>
                            <input
                                type="text"
                                value={formData.author}
                                onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label>ISBN:</label>
                            <input
                                type="text"
                                value={formData.isbn}
                                onChange={(e) => setFormData({ ...formData, isbn: e.target.value })}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label>Publication Year:</label>
                            <input
                                type="number"
                                value={formData.publicationYear}
                                onChange={(e) => setFormData({ ...formData, publicationYear: parseInt(e.target.value) })}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label>Genre:</label>
                            <input
                                type="text"
                                value={formData.genre}
                                onChange={(e) => setFormData({ ...formData, genre: e.target.value })}
                                required
                            />
                        </div>

                        <div className="form-group checkbox">
                            <label>
                                <input
                                    type="checkbox"
                                    checked={formData.isAvailable}
                                    onChange={(e) => setFormData({ ...formData, isAvailable: e.target.checked })}
                                />
                                Available
                            </label>
                        </div>

                        <div className="form-actions">
                            <button type="submit" className="btn btn-primary">
                                {editingBook ? 'Update' : 'Add'} Book
                            </button>
                            <button type="button" className="btn btn-secondary" onClick={resetForm}>
                                Cancel
                            </button>
                        </div>
                    </form>
                </div>
            )}

            <div className="books-grid">
                {books.map((book) => (
                    <div key={book.id} className={`book-card ${!book.isAvailable ? 'unavailable' : ''}`}>
                        <h3>{book.title}</h3>
                        <p className="author">by {book.author}</p>
                        <div className="book-details">
                            <p><strong>ISBN:</strong> {book.isbn}</p>
                            <p><strong>Year:</strong> {book.publicationYear}</p>
                            <p><strong>Genre:</strong> {book.genre}</p>
                            <p className="availability">
                                <span className={`status ${book.isAvailable ? 'available' : 'unavailable'}`}>
                                    {book.isAvailable ? '✓ Available' : '✗ Checked Out'}
                                </span>
                            </p>
                        </div>
                        <div className="book-actions">
                            <button
                                className="btn btn-small btn-secondary"
                                onClick={() => handleEdit(book)}
                            >
                                Edit
                            </button>
                            <button
                                className="btn btn-small btn-info"
                                onClick={() => toggleAvailability(book)}
                            >
                                {book.isAvailable ? 'Check Out' : 'Return'}
                            </button>
                            <button
                                className="btn btn-small btn-danger"
                                onClick={() => handleDelete(book.id)}
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {books.length === 0 && !loading && (
                <div className="empty-state">
                    <p>No books in the library yet. Add your first book!</p>
                </div>
            )}
        </div>
    );
}

export default App;