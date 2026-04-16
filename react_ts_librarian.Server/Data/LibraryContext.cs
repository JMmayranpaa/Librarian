using Microsoft.EntityFrameworkCore;
using react_ts_librarian.Server.Models;
using System.Reflection.Emit;

namespace react_ts_librarian.Server.Data
{
    public class LibraryContext : DbContext
    {
        public LibraryContext(DbContextOptions<LibraryContext> options) : base(options)
        {

        }

        public DbSet<Book> Books { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // Seed data
            modelBuilder.Entity<Book>().HasData(
                new Book
                {
                    Id = 1,
                    Title = "Clean Code",
                    Author = "Robert C. Martin",
                    ISBN = "978-0132350884",
                    PublicationYear = 2008,
                    Genre = "Programming",
                    IsAvailable = true
                },
                new Book
                {
                    Id = 2,
                    Title = "The Pragmatic Programmer",
                    Author = "Andrew Hunt",
                    ISBN = "978-0201616224",
                    PublicationYear = 1999,
                    Genre = "Programming",
                    IsAvailable = true
                },
                new Book
                {
                    Id = 3,
                    Title = "Design Patterns",
                    Author = "Gang of Four",
                    ISBN = "978-0201633610",
                    PublicationYear = 1994,
                    Genre = "Software Engineering",
                    IsAvailable = false
                }
            );
        }
    }
}