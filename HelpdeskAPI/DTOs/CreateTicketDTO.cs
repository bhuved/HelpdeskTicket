namespace HelpdeskAPI.DTOs
{
    public class CreateTicketDTO
    {
        public string Title { get; set; } = null!;

        public string Description { get; set; } = null!;

        public int? CreatedbyUserId { get; set; }
    }
}
