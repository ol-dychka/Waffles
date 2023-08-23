using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Persistence.Migrations
{
    /// <inheritdoc />
    public partial class PhotoEntityAdded2 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Photo_AspNetUsers_AppUserId",
                table: "Photo");

            migrationBuilder.DropForeignKey(
                name: "FK_Photo_Posts_PostId",
                table: "Photo");

            migrationBuilder.DropIndex(
                name: "IX_Photo_AppUserId",
                table: "Photo");

            migrationBuilder.DropIndex(
                name: "IX_Photo_PostId",
                table: "Photo");

            migrationBuilder.DropColumn(
                name: "AppUserId",
                table: "Photo");

            migrationBuilder.DropColumn(
                name: "PostId",
                table: "Photo");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "AppUserId",
                table: "Photo",
                type: "TEXT",
                nullable: true);

            migrationBuilder.AddColumn<Guid>(
                name: "PostId",
                table: "Photo",
                type: "TEXT",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Photo_AppUserId",
                table: "Photo",
                column: "AppUserId");

            migrationBuilder.CreateIndex(
                name: "IX_Photo_PostId",
                table: "Photo",
                column: "PostId");

            migrationBuilder.AddForeignKey(
                name: "FK_Photo_AspNetUsers_AppUserId",
                table: "Photo",
                column: "AppUserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Photo_Posts_PostId",
                table: "Photo",
                column: "PostId",
                principalTable: "Posts",
                principalColumn: "Id");
        }
    }
}
