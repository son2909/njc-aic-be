import { PageOptionsDto } from 'src/common/dto';
import { EntityRepository, Repository, getManager } from 'typeorm';
import { DisplayCodeOne } from './dto/enum/announcement-display-1.enum';
import { Announcement } from './entities/announcement.entity';

@EntityRepository(Announcement)
export class AnnouncementRepository extends Repository<Announcement> {
  async countMyAnnouncement(
    display_code_1: DisplayCodeOne[],
    account_group_id: number,
  ) {
    const parmams = [];
    let sql = `SELECT COUNT(1) itemCount
                FROM announcement_information_t ait
                WHERE ait.display_expiration_date >= ? `;
    parmams.push(new Date());
    if (account_group_id) {
      sql += `AND (ait.display_code_1 IN (?) OR (EXISTS
            (SELECT 1
             FROM group_management_t gmt
             WHERE gmt.group_id IN
                 (SELECT glt1.group_id
                  FROM group_link_t glt1
                  WHERE glt1.account_id = ait.account_id
                    AND ait.display_code_1 = ?)
               AND gmt.account_id = ?)))`;
      parmams.push(display_code_1);
      parmams.push(DisplayCodeOne.GROUP);
      parmams.push(account_group_id);
    } else {
      sql += `AND ait.display_code_1 IN (?)`;
      parmams.push(display_code_1);
    }
    return getManager().query(sql, parmams);
  }

  async getMyAnnouncement(
    pageOptionsDto: PageOptionsDto,
    display_code_1: DisplayCodeOne[],
    account_group_id: number,
  ) {
    const parmams = [];
    let sql = `SELECT ait.*
                FROM announcement_information_t ait
                WHERE ait.display_expiration_date >= ? `;
    parmams.push(new Date());
    if (account_group_id) {
      sql += `AND (ait.display_code_1 IN (?) OR (EXISTS
            (SELECT 1
             FROM group_management_t gmt
             WHERE gmt.group_id IN
                 (SELECT glt1.group_id
                  FROM group_link_t glt1
                  WHERE glt1.account_id = ait.account_id
                    AND ait.display_code_1 = ?)
               AND gmt.account_id = ?)))`;
      parmams.push(display_code_1);
      parmams.push(DisplayCodeOne.GROUP);
      parmams.push(account_group_id);
    } else {
      sql += `AND ait.display_code_1 IN (?)`;
      parmams.push(display_code_1);
    }
    sql += 'ORDER BY ait.record_creation_date DESC ';
    sql += 'LIMIT ?, ?';
    parmams.push(pageOptionsDto.page - 1);
    parmams.push(pageOptionsDto.limit);
    return getManager().query(sql, parmams);
  }
}
