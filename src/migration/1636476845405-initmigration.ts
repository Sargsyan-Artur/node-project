import {MigrationInterface, QueryRunner} from "typeorm";

export class initmigration1636476845405 implements MigrationInterface {
    name = 'initmigration1636476845405'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "user_name" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "status" character varying, "created" character varying NOT NULL, "updated" character varying, "membership" text, "boards" text, CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "board" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" character varying NOT NULL, "status" character varying NOT NULL, "members_count" integer NOT NULL, "created" character varying NOT NULL, "updated" character varying, "lists" text, "owner_id" character varying NOT NULL, "user_id" uuid, CONSTRAINT "PK_865a0f2e22c140d261b1df80eb1" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "list" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" character varying NOT NULL, "status" character varying NOT NULL, "created" character varying NOT NULL, "updated" character varying, "cards" text, "board_id" uuid, "user_id" uuid, CONSTRAINT "PK_d8feafd203525d5f9c37b3ed3b9" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "card" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" character varying NOT NULL, "description" character varying, "estimate" integer, "status" character varying NOT NULL, "created" character varying NOT NULL, "updated" character varying, "listId" character varying NOT NULL, "user_id" uuid, "list_id" uuid, "board_id" uuid, CONSTRAINT "PK_9451069b6f1199730791a7f4ae4" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "comment" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "creator_id" character varying NOT NULL, "context" character varying NOT NULL, "status" character varying NOT NULL, "created" character varying NOT NULL, "updated" character varying, "card_id" uuid, "user_id" uuid, "board_id" uuid, "list_id" uuid, CONSTRAINT "PK_0b0e4bbc8415ec426f87f3a88e2" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "session" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "userId" uuid NOT NULL, CONSTRAINT "PK_f55da76ac1c3ac420f444d2ff11" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "board" ADD CONSTRAINT "FK_b157cf902abe253a55961e8920b" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "list" ADD CONSTRAINT "FK_a4715a0db205a551ccce490fb2d" FOREIGN KEY ("board_id") REFERENCES "board"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "list" ADD CONSTRAINT "FK_a842f768ec87a346b0ee61fabba" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "card" ADD CONSTRAINT "FK_00ec72ad98922117bad8a86f980" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "card" ADD CONSTRAINT "FK_8cbe92f56490af05ce9bb9be12a" FOREIGN KEY ("list_id") REFERENCES "list"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "card" ADD CONSTRAINT "FK_4478da9f6086f99e300ad21db4f" FOREIGN KEY ("board_id") REFERENCES "board"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "comment" ADD CONSTRAINT "FK_cac3cdcb214d37b8cfd6a7128d1" FOREIGN KEY ("card_id") REFERENCES "card"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "comment" ADD CONSTRAINT "FK_bbfe153fa60aa06483ed35ff4a7" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "comment" ADD CONSTRAINT "FK_77a3101cc141a4046264ce59d6d" FOREIGN KEY ("board_id") REFERENCES "board"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "comment" ADD CONSTRAINT "FK_d7b38d2a3329495a99fc064ecf0" FOREIGN KEY ("list_id") REFERENCES "list"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "comment" DROP CONSTRAINT "FK_d7b38d2a3329495a99fc064ecf0"`);
        await queryRunner.query(`ALTER TABLE "comment" DROP CONSTRAINT "FK_77a3101cc141a4046264ce59d6d"`);
        await queryRunner.query(`ALTER TABLE "comment" DROP CONSTRAINT "FK_bbfe153fa60aa06483ed35ff4a7"`);
        await queryRunner.query(`ALTER TABLE "comment" DROP CONSTRAINT "FK_cac3cdcb214d37b8cfd6a7128d1"`);
        await queryRunner.query(`ALTER TABLE "card" DROP CONSTRAINT "FK_4478da9f6086f99e300ad21db4f"`);
        await queryRunner.query(`ALTER TABLE "card" DROP CONSTRAINT "FK_8cbe92f56490af05ce9bb9be12a"`);
        await queryRunner.query(`ALTER TABLE "card" DROP CONSTRAINT "FK_00ec72ad98922117bad8a86f980"`);
        await queryRunner.query(`ALTER TABLE "list" DROP CONSTRAINT "FK_a842f768ec87a346b0ee61fabba"`);
        await queryRunner.query(`ALTER TABLE "list" DROP CONSTRAINT "FK_a4715a0db205a551ccce490fb2d"`);
        await queryRunner.query(`ALTER TABLE "board" DROP CONSTRAINT "FK_b157cf902abe253a55961e8920b"`);
        await queryRunner.query(`DROP TABLE "session"`);
        await queryRunner.query(`DROP TABLE "comment"`);
        await queryRunner.query(`DROP TABLE "card"`);
        await queryRunner.query(`DROP TABLE "list"`);
        await queryRunner.query(`DROP TABLE "board"`);
        await queryRunner.query(`DROP TABLE "user"`);
    }

}
