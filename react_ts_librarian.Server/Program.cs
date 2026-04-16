using Microsoft.EntityFrameworkCore;
using react_ts_librarian.Server.Data;


// Add services to the container.

var builder = WebApplication.CreateBuilder(args);

// Add DbContext (in-memory for now)
//builder.Services.AddDbContext<LibraryContext>(options =>
//    options.UseInMemoryDatabase("LibraryDb"));

if (builder.Environment.IsDevelopment())
{
    builder.Services.AddDbContext<LibraryContext>(options =>
    options.UseInMemoryDatabase("LibraryDb"));
}
else
{
    var connectionSring = builder.Configuration.GetConnectionString("DefaultConnection");
    builder.Services.AddDbContext<LibraryContext>(options =>
        options.UseSqlServer(connectionSring));
}

// Add services to the container.
builder.Services.AddControllers();

// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
builder.Services.AddOpenApi();

var app = builder.Build();

app.UseDefaultFiles();
app.MapStaticAssets();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.MapFallbackToFile("/index.html");

app.Run();
