using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

namespace backend.Migrations
{
    public partial class M2 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_SubtireddUser_User_UsersID",
                table: "SubtireddUser");

            migrationBuilder.RenameColumn(
                name: "ID",
                table: "User",
                newName: "Id");

            migrationBuilder.RenameColumn(
                name: "UsersID",
                table: "SubtireddUser",
                newName: "UsersId");

            migrationBuilder.RenameIndex(
                name: "IX_SubtireddUser_UsersID",
                table: "SubtireddUser",
                newName: "IX_SubtireddUser_UsersId");

            migrationBuilder.AddColumn<int>(
                name: "AdminId",
                table: "Subtiredds",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateTable(
                name: "Post",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    Title = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Text = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Score = table.Column<int>(type: "int", nullable: false),
                    AuthorId = table.Column<int>(type: "int", nullable: false),
                    SubtireddId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Post", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Post_Subtiredds_SubtireddId",
                        column: x => x.SubtireddId,
                        principalTable: "Subtiredds",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Post_User_AuthorId",
                        column: x => x.AuthorId,
                        principalTable: "User",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateIndex(
                name: "IX_Subtiredds_AdminId",
                table: "Subtiredds",
                column: "AdminId");

            migrationBuilder.CreateIndex(
                name: "IX_Post_AuthorId",
                table: "Post",
                column: "AuthorId");

            migrationBuilder.CreateIndex(
                name: "IX_Post_SubtireddId",
                table: "Post",
                column: "SubtireddId");

            migrationBuilder.AddForeignKey(
                name: "FK_Subtiredds_User_AdminId",
                table: "Subtiredds",
                column: "AdminId",
                principalTable: "User",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_SubtireddUser_User_UsersId",
                table: "SubtireddUser",
                column: "UsersId",
                principalTable: "User",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Subtiredds_User_AdminId",
                table: "Subtiredds");

            migrationBuilder.DropForeignKey(
                name: "FK_SubtireddUser_User_UsersId",
                table: "SubtireddUser");

            migrationBuilder.DropTable(
                name: "Post");

            migrationBuilder.DropIndex(
                name: "IX_Subtiredds_AdminId",
                table: "Subtiredds");

            migrationBuilder.DropColumn(
                name: "AdminId",
                table: "Subtiredds");

            migrationBuilder.RenameColumn(
                name: "Id",
                table: "User",
                newName: "ID");

            migrationBuilder.RenameColumn(
                name: "UsersId",
                table: "SubtireddUser",
                newName: "UsersID");

            migrationBuilder.RenameIndex(
                name: "IX_SubtireddUser_UsersId",
                table: "SubtireddUser",
                newName: "IX_SubtireddUser_UsersID");

            migrationBuilder.AddForeignKey(
                name: "FK_SubtireddUser_User_UsersID",
                table: "SubtireddUser",
                column: "UsersID",
                principalTable: "User",
                principalColumn: "ID",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
