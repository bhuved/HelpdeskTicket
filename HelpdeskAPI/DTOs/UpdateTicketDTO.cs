namespace HelpdeskAPI.DTOs
{
    public class UpdateTicketDTO
    {
        public string Title { get; set; } = null!;

        public string Description { get; set; } = null!;
        public int? ResolvedbyUserId { get; set; }

        public string Status { get; set; } = null!;

        public string? Resolution { get; set; }

    }
}
