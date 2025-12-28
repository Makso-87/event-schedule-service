import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitialMigration1766836057504 implements MigrationInterface {
    name = 'InitialMigration1766836057504';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `CREATE TABLE \`event\` (\`id\` varchar(255) NOT NULL, \`createdAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deletedAt\` timestamp(6) NULL, \`name\` varchar(255) NOT NULL, \`startDate\` datetime NOT NULL, \`endDate\` datetime NULL, \`startTime\` varchar(255) NULL, \`endTime\` varchar(255) NULL, \`place\` varchar(255) NOT NULL, \`url\` varchar(255) NULL, \`lent\` varchar(255) NULL, \`categoryId\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
        );
        await queryRunner.query(
            `CREATE TABLE \`event_category\` (\`id\` varchar(255) NOT NULL, \`createdAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deletedAt\` timestamp(6) NULL, \`name\` varchar(255) NOT NULL, \`description\` varchar(255) NOT NULL, \`color\` varchar(255) NOT NULL, UNIQUE INDEX \`IDX_d2c138089f45f7c3fa916ffb68\` (\`name\`), UNIQUE INDEX \`IDX_203473f69aad0db3ab36224e3b\` (\`color\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
        );
        await queryRunner.query(
            `CREATE TABLE \`user\` (\`id\` varchar(255) NOT NULL, \`createdAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deletedAt\` timestamp(6) NULL, \`firstName\` varchar(255) NOT NULL, \`middleName\` varchar(255) NOT NULL, \`lastName\` varchar(255) NOT NULL, \`email\` varchar(255) NOT NULL, \`phone\` varchar(255) NOT NULL, \`password\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
        );
        await queryRunner.query(
            `ALTER TABLE \`event\` ADD CONSTRAINT \`FK_d44e52c4ca04619ef9b61a11982\` FOREIGN KEY (\`categoryId\`) REFERENCES \`event_category\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`event\` DROP FOREIGN KEY \`FK_d44e52c4ca04619ef9b61a11982\``);
        await queryRunner.query(`DROP TABLE \`user\``);
        await queryRunner.query(`DROP INDEX \`IDX_203473f69aad0db3ab36224e3b\` ON \`event_category\``);
        await queryRunner.query(`DROP INDEX \`IDX_d2c138089f45f7c3fa916ffb68\` ON \`event_category\``);
        await queryRunner.query(`DROP TABLE \`event_category\``);
        await queryRunner.query(`DROP TABLE \`event\``);
    }
}
