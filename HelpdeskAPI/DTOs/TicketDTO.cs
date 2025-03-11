using HelpdeskAPI.Entities;

namespace HelpdeskAPI.DTOs
{
    public class TicketDTO
    {
        public int Id { get; set; }

        public string Title { get; set; } = null!;

        public string Description { get; set; } = null!;

        public int? CreatedbyUserId { get; set; }

        public int? ResolvedbyUserId { get; set; } = null;

        public string? Createdby { get; set; }

        public string? Resolvedby { get; set; }

        public string Status { get; set; } = null!;

        public string? Resolution { get; set; }

        public DateTime Createdtime { get; set; }

        public DateTime? Resolvedtime { get; set; }


    }
}
