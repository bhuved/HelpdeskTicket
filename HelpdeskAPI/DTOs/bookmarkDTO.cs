using HelpdeskAPI.Entities;

namespace HelpdeskAPI.DTOs
{
    public class bookmarkDTO
    {
        public int Id { get; set; }

        public int? TicketId { get; set; }

        public int? UserId { get; set; }

        public string Title { get; set; }

        public string Description { get; set; }

        public string? Createdby { get; set; }

        public string? Resolvedby { get; set; }

        public string Status { get; set; } = null!;

        public string? Resolution { get; set; }

        public DateTime Createdtime { get; set; }

        public DateTime? Resolvedtime { get; set; }
         public string UserName { get; set; }
    }
}
