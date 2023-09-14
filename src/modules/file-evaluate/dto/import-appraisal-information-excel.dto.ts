import { Expose, Type } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsOptional, MaxLength } from 'class-validator';
import { ExcelColumn } from '../../../utils/excel/excel-column.decorator';

export class ImportAppraisalInformationExcelDto {
  @ExcelColumn(9)
  @Type(() => Number)
  @IsNumber()
  @IsNotEmpty()
  @Expose()
  medical_record_number: number;

  // 病棟
  // @ExcelColumn(4)
  // @IsNotEmpty()
  // @Expose()
  // date_of_medical_treatment: Date;

  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  @Expose()
  receipt_no: number;

  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  @Expose()
  receipt_number: number;

  // 診療科
  // @ExcelColumn(0)
  // @Type(() => Number)
  // @IsNumber()
  // @IsOptional()
  // @Expose()
  department_code: number;

  @ExcelColumn(0)
  @IsOptional()
  @Expose()
  department_content: string;

  @MaxLength(100)
  @IsOptional()
  @Expose()
  review_committee: string;

  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  @Expose()
  item_type: number;

  @ExcelColumn(14)
  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  @Expose()
  insurer_number: number;

  @ExcelColumn(14)
  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  @Expose()
  elderly_municipal_number: number;

  @ExcelColumn(27)
  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  @Expose()
  payer_number_1: number;

  @ExcelColumn(28)
  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  @Expose()
  payer_number_2: number;

  @ExcelColumn(29)
  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  @Expose()
  payer_number_3: number;

  @ExcelColumn(30)
  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  @Expose()
  payer_number_4: number;

  // @ExcelColumn(6)
  // @Type(() => Number)
  // @IsNumber()
  // @IsOptional()
  // @Expose()
  division: number;

  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  @Expose()
  burden_category: number;

  @MaxLength(100)
  @IsOptional()
  @Expose()
  reason_job: string;

  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  @Expose()
  exemption_category: number;

  @ExcelColumn(10)
  @MaxLength(100)
  @IsOptional()
  @Expose()
  family_name: string;

  @ExcelColumn(16)
  @MaxLength(100)
  @IsOptional()
  @Expose()
  point_1: string;

  @MaxLength(100)
  @IsOptional()
  @Expose()
  point_2: string;

  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  @Expose()
  legal_number: number;

  @ExcelColumn(17)
  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  @Expose()
  score_increase_decrease: number;

  @ExcelColumn(19)
  @MaxLength(100)
  @IsOptional()
  @Expose()
  reason: string;

  @MaxLength(100)
  @IsOptional()
  @Expose()
  load: string;

  @ExcelColumn(20)
  @MaxLength(100)
  @IsNotEmpty()
  @Expose()
  billing_summary: string;

  @IsOptional()
  @MaxLength(100)
  @Expose()
  post_assessment_burden: string;

  @ExcelColumn(21)
  @MaxLength(100)
  @IsNotEmpty()
  @Expose()
  post_assessment_content: string;

  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  @Expose()
  search_number: number;

  @MaxLength(100)
  @IsOptional()
  @Expose()
  billing_information: string;

  // 医師CD
  @Type(() => Number)
  @IsNumber()
  @ExcelColumn(1)
  @IsOptional()
  @Expose()
  doctor_id: number;

  // 医師名
  @MaxLength(60)
  @ExcelColumn(2)
  @IsOptional()
  @Expose()
  doctor_name: string;

  @ExcelColumn(3)
  @MaxLength(60)
  @IsOptional()
  @Expose()
  ward: string;

  // @ExcelColumn(4)
  // @IsOptional()
  // @Expose()
  // date_medical_treatment: Date;

  @ExcelColumn(4)
  @IsOptional()
  @Expose()
  date_medical_treatment_str: string;

  @ExcelColumn(11)
  @MaxLength(60)
  @IsOptional()
  @Expose()
  sex: string;

  @ExcelColumn(12)
  @MaxLength(60)
  @IsOptional()
  @Expose()
  date_of_birth: string;

  @ExcelColumn(15)
  // @Type(() => Number)
  // @IsNumber()
  @IsOptional()
  @Expose()
  insurance_benefit_ratio: string;

  @ExcelColumn(23)
  @MaxLength(100)
  @IsOptional()
  @Expose()
  report: string;

  @ExcelColumn(7)
  @MaxLength(60)
  @IsOptional()
  @Expose()
  insurance: string;

  @MaxLength(300)
  @IsOptional()
  @Expose()
  memo: string;

  mi_id: number;
}
