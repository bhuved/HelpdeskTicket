using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using HelpdeskAPI.Entities;
using HelpdeskAPI.DTOs;
using System.Drawing;

namespace HelpdeskAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BookmarksController : ControllerBase
    {
        private readonly HelpdeskDbContext _context;

        public BookmarksController(HelpdeskDbContext context)
        {
            _context = context;
        }

        // GET: api/Bookmarks
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Bookmark>>> GetBookmarks()
        {
            var bookmark = await _context.Bookmarks
                .Include(b => b.Ticket)
                 .ThenInclude(t => t.CreatedbyUser)
                .Include(b => b.Ticket)
                 .ThenInclude(t => t.ResolvedbyUser)
                .Include(b => b.User)
                .ToListAsync();

            var bookmarkdetailsDTO = bookmark.Select(b => new bookmarkDTO
            {
                Id = b.Id,
                TicketId = b.TicketId,
                UserId = b.UserId,
                Title = b.Ticket.Title,
                Description = b.Ticket.Description,
                Status = b.Ticket.Status,
                Resolution = b.Ticket.Resolution,
                // Handle null for CreatedbyUser and ResolvedbyUser safely.
                Createdby = b.Ticket.CreatedbyUser != null ? b.Ticket.CreatedbyUser.FirstName + " " + b.Ticket.CreatedbyUser.LastName : "Unknown",
                Resolvedby = b.Ticket.ResolvedbyUser != null ? b.Ticket.ResolvedbyUser.FirstName + " " + b.Ticket.ResolvedbyUser.LastName : "Not Resolved",
                Createdtime = b.Ticket.Createdtime,
                Resolvedtime = b.Ticket.Resolvedtime,
                UserName = b.User.FirstName + " " + b.User.LastName
            }).ToList();
            return Ok(bookmarkdetailsDTO);

        }

        // GET: api/Bookmarks/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Bookmark>> GetBookmark(int id)
        {
            var bookmark = await _context.Bookmarks.FindAsync(id);

            if (bookmark == null)
            {
                return NotFound();
            }

            return bookmark;
        }

        // PUT: api/Bookmarks/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutBookmark(int id, Bookmark bookmark)
        {
            if (id != bookmark.Id)
            {
                return BadRequest();
            }

            _context.Entry(bookmark).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!BookmarkExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Bookmarks
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Bookmark>> PostBookmark(Bookmark bookmark)
        {
            _context.Bookmarks.Add(bookmark);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetBookmark", new { id = bookmark.Id }, bookmark);
        }

        // DELETE: api/Bookmarks/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteBookmark(int id)
        {
            var bookmark = await _context.Bookmarks.FindAsync(id);
            if (bookmark == null)
            {
                return NotFound();
            }

            _context.Bookmarks.Remove(bookmark);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool BookmarkExists(int id)
        {
            return _context.Bookmarks.Any(e => e.Id == id);
        }
    }
}
