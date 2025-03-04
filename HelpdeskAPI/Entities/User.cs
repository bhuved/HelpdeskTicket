using System;
using System.Collections.Generic;

namespace HelpdeskAPI.Entities;

public partial class User
{
    public int Id { get; set; }

    public string FirstName { get; set; } = null!;

    public string LastName { get; set; } = null!;

    public string Email { get; set; } = null!;

    public virtual ICollection<Bookmark> Bookmarks { get; set; } = new List<Bookmark>();

    public virtual ICollection<Ticket> TicketCreatedbyUsers { get; set; } = new List<Ticket>();

    public virtual ICollection<Ticket> TicketResolvedbyUsers { get; set; } = new List<Ticket>();
}
