using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Persistence.Migrations
{
    /// <inheritdoc />
    public partial class PhotoEntityAdded3 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_PostPhotos_Posts_PostId1",
                table: "PostPhotos");

            migrationBuilder.DropIndex(
                name: "IX_PostPhotos_PostId1",
                table: "PostPhotos");

            migrationBuilder.DropColumn(
                name: "PostId1",
                table: "PostPhotos");

            migrationBuilder.CreateIndex(
                name: "IX_PostPhotos_PostId",
                table: "PostPhotos",
                column: "PostId");

            migrationBuilder.AddForeignKey(
                name: "FK_PostPhotos_Posts_PostId",
                table: "PostPhotos",
                column: "PostId",
                principalTable: "Posts",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_PostPhotos_Posts_PostId",
                table: "PostPhotos");

            migrationBuilder.DropIndex(
                name: "IX_PostPhotos_PostId",
                table: "PostPhotos");

            migrationBuilder.AddColumn<Guid>(
                name: "PostId1",
                table: "PostPhotos",
                type: "TEXT",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_PostPhotos_PostId1",
                table: "PostPhotos",
                column: "PostId1");

            migrationBuilder.AddForeignKey(
                name: "FK_PostPhotos_Posts_PostId1",
                table: "PostPhotos",
                column: "PostId1",
                principalTable: "Posts",
                principalColumn: "Id");
        }
    }
}
