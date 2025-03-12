namespace HelpdeskAPI.DTOs
{
    public class RecordCountDTO
    {
        public int? OpenTicketCount { get; set; }
        public int? ClosedTicketCount { get; set; }
        public int? BookmarkedTicketCount { get; set; }
    }
}
