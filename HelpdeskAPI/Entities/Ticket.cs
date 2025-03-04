using System;
using System.Collections.Generic;

namespace HelpdeskAPI.Entities;

public partial class Ticket
{
    public int Id { get; set; }

    public string Title { get; set; } = null!;

    public string Description { get; set; } = null!;

    public int? CreatedbyUserId { get; set; }

    public int? ResolvedbyUserId { get; set; }

    public string Status { get; set; } = null!;

    public string? Resolution { get; set; }

    public DateTime Createdtime { get; set; }

    public DateTime? Resolvedtime { get; set; }

    public virtual ICollection<Bookmark> Bookmarks { get; set; } = new List<Bookmark>();

    public virtual User? CreatedbyUser { get; set; }

    public virtual User? ResolvedbyUser { get; set; }
}
