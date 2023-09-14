import { Expose, Type } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsOptional, MaxLength } from 'class-validator';

export class ImportAppraisalInformationCsvDto {
  mi_id: number;

  @Type(() => Number)
  @IsNumber()
  @IsNotEmpty()
  @Expose({ name: '2' })
  idx: number;

  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  @Expose({ name: 'カルテ番号等' })
  medical_record_number: number;

  @IsOptional()
  @Expose({ name: '診療年月' })
  date_medical_treatment_str: string;

  date_medical_treatment: Date;

  date_of_medical_treatment: Date;

  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  @Expose({ name: 'レセプト番号' })
  receipt_number: number;

  @MaxLength(100)
  @IsOptional()
  @Expose({ name: '受付番号' })
  receipt_no: string;

  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  @Expose({ name: '診療科コード' })
  department_code: number;

  @MaxLength(100)
  @IsOptional()
  @Expose({ name: '特別審査委員会' })
  review_committee: string;

  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  @Expose({ name: '明細種別' })
  item_type: number;

  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  @Expose({ name: '保険者番号' })
  insurer_number: number;

  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  @Expose({ name: '老人市町村番号' })
  elderly_municipal_number: number;

  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  @Expose({ name: '第一公費負担者番号' })
  payer_number_1: number;

  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  @Expose({ name: '第二公費負担者番号' })
  payer_number_2: number;

  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  @Expose({ name: '第三公費負担者番号' })
  payer_number_3: number;

  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  @Expose({ name: '第四公費負担者番号' })
  payer_number_4: number;

  @IsOptional()
  @Expose({ name: '区分' })
  // @IsEnum(DivisionTypeEnum)
  division_enum: string;

  // @Type(() => Number)
  // @IsNumber()
  // @IsEnum(BurdenCategoryEnum)
  @IsOptional()
  @Expose({ name: '高額療養費負担区分' })
  burden_category: string;

  @MaxLength(100)
  @IsOptional()
  @Expose({ name: '職務上の事由' })
  reason_job: string;

  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  @Expose({ name: '老人減免区分' })
  exemption_category: number;

  @MaxLength(100)
  @IsOptional()
  @Expose({ name: '氏名' })
  family_name: string;

  @MaxLength(100)
  @IsOptional()
  @Expose({ name: '箇所１' })
  point_1: string;

  @MaxLength(100)
  @IsOptional()
  @Expose({ name: '箇所２' })
  point_2: string;

  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  @Expose({ name: '法別番号' })
  legal_number: number;

  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  @Expose({ name: '増減点数（金額）' })
  score_increase_decrease: number;

  @MaxLength(100)
  @IsOptional()
  @Expose({ name: '事由' })
  reason: string;

  @MaxLength(100)
  @IsOptional()
  @Expose({ name: '負担（請求内容）' })
  load: string;

  @MaxLength(100)
  @IsOptional()
  @Expose({ name: '請求内容' })
  billing_summary: string;

  @IsOptional()
  @MaxLength(100)
  @Expose({ name: '負担（補正・査定後内容）' })
  post_assessment_burden: string;

  @IsOptional()
  @MaxLength(100)
  @IsOptional()
  @Expose({ name: '補正・査定後内容' })
  post_assessment_content: string;

  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  @Expose({ name: '検索番号' })
  search_number: number;

  @MaxLength(100)
  @IsOptional()
  @Expose({ name: '請求情報' })
  billing_information: string;

  // abbreviated_kanji, abbreviated_kana?/ 診療行為省略名称
  key_medical_practice_m: string;

  // abbreviated_kanji, abbreviated_kana
  value_medical_practice_m: number;

  // kanji_name/漢字名称
  key_pharmaceutical: string;

  // drug_code/医薬品コード
  value_pharmaceutical: number;

  // kanji_name/漢字名称
  key_specific_equipment: string;

  // specified_equipment_code/特定器材コード
  value_specific_equipment: number;

  clinical_identification: number;

  insurance: string;

  ward: string;

  sex: string;

  date_of_birth: string;

  insurance_benefit_ratio: number;
}
