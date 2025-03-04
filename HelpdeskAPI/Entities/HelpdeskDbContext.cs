using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace HelpdeskAPI.Entities;

public partial class HelpdeskDbContext : DbContext
{
    public HelpdeskDbContext(DbContextOptions<HelpdeskDbContext> options)
        : base(options)
    {
    }

    public virtual DbSet<Bookmark> Bookmarks { get; set; }

    public virtual DbSet<Ticket> Tickets { get; set; }

    public virtual DbSet<User> Users { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Bookmark>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Bookmark__3214EC07E7E31495");

            entity.ToTable("Bookmark");

            entity.HasOne(d => d.Ticket).WithMany(p => p.Bookmarks)
                .HasForeignKey(d => d.TicketId)
                .HasConstraintName("FK__Bookmark__Ticket__403A8C7D");

            entity.HasOne(d => d.User).WithMany(p => p.Bookmarks)
                .HasForeignKey(d => d.UserId)
                .HasConstraintName("FK__Bookmark__UserId__412EB0B6");
        });

        modelBuilder.Entity<Ticket>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Ticket__3214EC07EA2FC82E");

            entity.ToTable("Ticket");

            entity.Property(e => e.Createdtime)
                .HasDefaultValueSql("(getdate())")
                .HasColumnType("datetime");
            entity.Property(e => e.Description).HasMaxLength(100);
            entity.Property(e => e.Resolution).HasMaxLength(250);
            entity.Property(e => e.Resolvedtime).HasColumnType("datetime");
            entity.Property(e => e.Status)
                .HasMaxLength(10)
                .HasDefaultValue("Open");
            entity.Property(e => e.Title).HasMaxLength(20);

            entity.HasOne(d => d.CreatedbyUser).WithMany(p => p.TicketCreatedbyUsers)
                .HasForeignKey(d => d.CreatedbyUserId)
                .HasConstraintName("FK__Ticket__Createdb__398D8EEE");

            entity.HasOne(d => d.ResolvedbyUser).WithMany(p => p.TicketResolvedbyUsers)
                .HasForeignKey(d => d.ResolvedbyUserId)
                .HasConstraintName("FK__Ticket__Resolved__3A81B327");
        });

        modelBuilder.Entity<User>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Users__3214EC074B2C19FB");

            entity.Property(e => e.Email).HasMaxLength(50);
            entity.Property(e => e.FirstName).HasMaxLength(30);
            entity.Property(e => e.LastName).HasMaxLength(30);
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
