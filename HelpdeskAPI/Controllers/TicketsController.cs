using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using HelpdeskAPI.Entities;
using HelpdeskAPI.DTOs;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.CodeAnalysis;

namespace HelpdeskAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TicketsController : ControllerBase
    {
        private readonly HelpdeskDbContext _context;

        public TicketsController(HelpdeskDbContext context)
        {
            _context = context;
        }

        // GET: api/Tickets
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Ticket>>> GetTickets()
        {
            var tickets = await _context.Tickets
                .Include(t => t.CreatedbyUser)
                .Include(t => t.ResolvedbyUser)
                .Select(t => new TicketDTO
                {
                    Id = t.Id,
                    Title = t.Title,
                    Description = t.Description,
                    CreatedbyUserId = t.CreatedbyUserId,
                    Createdby = t.CreatedbyUser.FirstName + t.CreatedbyUser.LastName,
                    Resolvedby = t.ResolvedbyUser != null ? t.ResolvedbyUser.FirstName + " " + t.ResolvedbyUser.LastName : null,
                    Status = t.Status,
                    Resolution = t.Resolution,
                    Createdtime = t.Createdtime,
                    Resolvedtime = t.Resolvedtime
                } ).ToListAsync();
            return Ok(tickets);
        }

        // GET: api/Tickets/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Ticket>> GetTicket(int id)
        {
            var ticket = await _context.Tickets
                .Include(t => t.CreatedbyUser)
                .Include(t => t.ResolvedbyUser)
                .FirstOrDefaultAsync(t => t.Id == id);

            if (ticket == null)
            {
                return NotFound();
            }
            var ticketDTO = new TicketDTO()
            {
                Id = ticket.Id,
                Title = ticket.Title,
                Description = ticket.Description,
                CreatedbyUserId = ticket.CreatedbyUserId,
               ResolvedbyUserId = ticket.ResolvedbyUserId,
                Createdby = ticket.CreatedbyUser.FirstName + ticket.CreatedbyUser.LastName,
                Resolvedby = ticket.ResolvedbyUser != null ? ticket.ResolvedbyUser.FirstName + " " + ticket.ResolvedbyUser.LastName : null,
                Status = ticket.Status,
                Resolution = ticket.Resolution,
                Createdtime = ticket.Createdtime,
                Resolvedtime = ticket.Resolvedtime
            };
            return Ok(ticketDTO);
        }

        // PUT: api/Tickets/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutTicket(int id, UpdateTicketDTO UpdatTicketDTO)
        {
            var ticket = await _context.Tickets.FindAsync(id);

            if (ticket == null)
            {
                return BadRequest("Ticket not found");
            }
            ticket.Title = UpdatTicketDTO.Title;
            ticket.Description = UpdatTicketDTO.Description;
            ticket.Status = UpdatTicketDTO.Status;
            ticket.ResolvedbyUserId = UpdatTicketDTO.ResolvedbyUserId;
            ticket.Resolution = UpdatTicketDTO.Resolution;
            if (UpdatTicketDTO.Status == "Closed")
            {
                ticket.Resolvedtime = DateTime.Now;
            }
            else
            {
                ticket.Resolvedtime = null;
            }
           
                _context.Tickets.Update(ticket);
                await _context.SaveChangesAsync();
                return NoContent(); // 204 No Content for successful updateawait _context.SaveChangesAsync();
        }

        // POST: api/Tickets
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Ticket>> PostTicket(CreateTicketDTO createTicketDTO)
        {
            if (createTicketDTO == null)
            {
                return BadRequest("Invalid Data");
            }
            /*var currentUser = await _context.Users.FindAsync(createTicketDTO.CreatedbyUserId);
            if (currentUser == null)
            {
                return NotFound("User not found.");
            }*/

            // Create a new Ticket object
            var newTicket = new Ticket
            {
                Title = createTicketDTO.Title,
                Description = createTicketDTO.Description,
                CreatedbyUserId = createTicketDTO.CreatedbyUserId,
                Status = "Open",
                Createdtime = DateTime.Now
            };
            _context.Tickets.Add(newTicket);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetTicket", new { id = newTicket.Id }, newTicket);
        }

        [HttpGet("validate-user/{userId}")]
        public async Task<IActionResult> ValidateUser(int userId)
        {
            var user = await _context.Users.FindAsync(userId);

            if (user == null)
            {
                return Ok("false"); // User not found
            }

            return Ok("true"); // User found
        }
        // DELETE: api/Tickets/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTicket(int id)
        {
            var ticket = await _context.Tickets.FindAsync(id);
            if (ticket == null)
            {
                return NotFound();
            }

            _context.Tickets.Remove(ticket);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool TicketExists(int id)
        {
            return _context.Tickets.Any(e => e.Id == id);
        }
    }
}
