import { PageOptionsDto } from 'src/common/dto';
import { EntityRepository, Repository, getManager } from 'typeorm';
import { MedicalDepartment } from '../master/medical-department/medical-department.entity';
import { MedicalPractice } from '../master/medical-practice/entities/medical-practice.entity';
import { PharmaceuticalM } from '../master/pharmaceutical/pharmaceutical.entity';
import { SpecificEquipmentM } from '../master/specific-equipment/specific-equipment.entity';
import { MedicalInstitution } from '../medical-institution/entities/medical-institution.entity';
import { IY } from '../uke/IY/IY.entity';
import { SI } from '../uke/SI/SI.entity';
import { TO } from '../uke/TO/TO.entity';
import { AppraisalConditionSettingDto } from './dto/appraisal-condition-setting.dto';
import { AppraisalConditionSetting } from './entities/appraisal-condition-setting.entity';
import { IdentificationInfoEnum } from './enum/identification-info.enum';

@EntityRepository(AppraisalConditionSetting)
export class AppraisalConditionSettingRepository extends Repository<AppraisalConditionSetting> {
  async getClinicalIdentification(
    tbl_identification_info: IdentificationInfoEnum,
  ) {
    return getManager()
      .createQueryBuilder(this.getTblName(tbl_identification_info), 'tbl')
      .select('DISTINCT(tbl.clinical_identification)')
      .where('tbl.clinical_identification IS NOT NULL')
      .orderBy('tbl.clinical_identification')
      .getRawMany();
  }

  async getComputer(tbl_identification_info: IdentificationInfoEnum) {
    switch (tbl_identification_info) {
      case IdentificationInfoEnum.SI:
        return this.getSI();
      case IdentificationInfoEnum.IY:
        return this.getIY();
      case IdentificationInfoEnum.TO:
        return this.getTO();
    }
  }

  async getSI() {
    return getManager()
      .createQueryBuilder(MedicalPractice, 'mp')
      .select('mp.medical_practice_code', 'computer_code')
      .addSelect('mp.abbreviated_kanji', 'computer_name')
      .innerJoin(
        SI,
        'si',
        'si.medical_practice_code = mp.medical_practice_code',
      )
      .groupBy('mp.medical_practice_code')
      .orderBy('mp.abbreviated_kanji')
      .getRawMany();
  }

  async getIY() {
    return getManager()
      .createQueryBuilder(PharmaceuticalM, 'pm')
      .select('pm.drug_code', 'computer_code')
      .addSelect('pm.kanji_name_1', 'computer_name')
      .innerJoin(IY, 'iy', 'iy.drug_code = pm.drug_code')
      .groupBy('pm.drug_code')
      .orderBy('pm.kanji_name_1')
      .getRawMany();
  }

  async getTO() {
    return getManager()
      .createQueryBuilder(SpecificEquipmentM, 'sem')
      .select('sem.specified_equipment_code', 'computer_code')
      .addSelect('sem.kanji_name_1', 'computer_name')
      .innerJoin(
        TO,
        'to',
        'to.specified_equipment_code = sem.specified_equipment_code',
      )
      .groupBy('sem.specified_equipment_code')
      .orderBy('sem.kanji_name_1')
      .getRawMany();
  }

  getTblName(tbl_identification_info: IdentificationInfoEnum) {
    switch (tbl_identification_info) {
      case IdentificationInfoEnum.SI:
        return SI;
      case IdentificationInfoEnum.IY:
        return IY;
      case IdentificationInfoEnum.TO:
        return TO;
    }
  }

  search(pageOpt: PageOptionsDto) {
    return this.createQueryBuilder('acst')
      .select('acst.*')
      .leftJoin(MedicalInstitution, 'mi', 'mi.mi_id = acst.mi_id')
      .addSelect('mi.medical_institution_name', 'medical_institution_name')
      .leftJoin(MedicalDepartment, 'mdm', 'mdm.code = acst.clinical_department')
      .addSelect('mdm.content', 'medical_department_name')
      .orderBy('acst.created_date', 'DESC')
      .offset(pageOpt.page - 1)
      .limit(pageOpt.limit)
      .getRawMany<AppraisalConditionSettingDto>();
  }

  getById(setting_id: number) {
    return this.createQueryBuilder('acst')
      .select('acst.*')
      .leftJoin(MedicalInstitution, 'mi', 'mi.mi_id = acst.mi_id')
      .addSelect('mi.medical_institution_name', 'medical_institution_name')
      .leftJoin(MedicalDepartment, 'mdm', 'mdm.code = acst.clinical_department')
      .addSelect('mdm.content', 'medical_department_name')
      .where('acst.setting_id = :setting_id', { setting_id })
      .getRawOne<AppraisalConditionSettingDto>();
  }
}
