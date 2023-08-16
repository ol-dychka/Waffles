using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Persistence.Migrations
{
    /// <inheritdoc />
    public partial class AppUserPostRelationship : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_AppUserPost_AspNetUsers_LikesId",
                table: "AppUserPost");

            migrationBuilder.DropForeignKey(
                name: "FK_AppUserPost_Posts_PostsId",
                table: "AppUserPost");

            migrationBuilder.RenameColumn(
                name: "PostsId",
                table: "AppUserPost",
                newName: "PostId");

            migrationBuilder.RenameColumn(
                name: "LikesId",
                table: "AppUserPost",
                newName: "AppUserId");

            migrationBuilder.RenameIndex(
                name: "IX_AppUserPost_PostsId",
                table: "AppUserPost",
                newName: "IX_AppUserPost_PostId");

            migrationBuilder.AddColumn<bool>(
                name: "IsCreator",
                table: "AppUserPost",
                type: "INTEGER",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddForeignKey(
                name: "FK_AppUserPost_AspNetUsers_AppUserId",
                table: "AppUserPost",
                column: "AppUserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_AppUserPost_Posts_PostId",
                table: "AppUserPost",
                column: "PostId",
                principalTable: "Posts",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_AppUserPost_AspNetUsers_AppUserId",
                table: "AppUserPost");

            migrationBuilder.DropForeignKey(
                name: "FK_AppUserPost_Posts_PostId",
                table: "AppUserPost");

            migrationBuilder.DropColumn(
                name: "IsCreator",
                table: "AppUserPost");

            migrationBuilder.RenameColumn(
                name: "PostId",
                table: "AppUserPost",
                newName: "PostsId");

            migrationBuilder.RenameColumn(
                name: "AppUserId",
                table: "AppUserPost",
                newName: "LikesId");

            migrationBuilder.RenameIndex(
                name: "IX_AppUserPost_PostId",
                table: "AppUserPost",
                newName: "IX_AppUserPost_PostsId");

            migrationBuilder.AddForeignKey(
                name: "FK_AppUserPost_AspNetUsers_LikesId",
                table: "AppUserPost",
                column: "LikesId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_AppUserPost_Posts_PostsId",
                table: "AppUserPost",
                column: "PostsId",
                principalTable: "Posts",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
