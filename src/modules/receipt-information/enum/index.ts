export enum MedicalDPCFlagEnum {
  MEDICAL = 1,
  DPC,
}

export enum MedicalDentalFlagEnum {
  MEDICAL = 1,
  DENTISTRY,
}

export enum SocialNationalFlagEnum {
  SOCIAL_INSURANCE = 1,
  HEALTH_INSURANCE,
}

export enum ReturnDestinationEnum {
  DOCTOR = 1,
  CLERK,
  BOTH,
}

export enum ErrorFlagEnum {
  ERROR = 1,
  NO_ERROR,
}

export enum AcknowledgmentFlagEnum {
  POINTED_OUT = 1,
  NOT_POINTED_OUT,
}

export enum AllocationStatusFlagEnum {
  IMPLEMENTED = 1,
  NOT_IMPLEMENTED,
}

export enum StatusCheckFlagEnum {
  IMPLEMENTED = 1,
  NOT_IMPLEMENTED,
  PENDING,
}

export enum PrintStatusFlagEnum {
  IMPLEMENTED = 1,
  NOT_IMPLEMENTED,
}

export enum DeliveryStatusFlagEnum {
  IMPLEMENTED = 1,
  NOT_IMPLEMENTED,
}

export enum AssessmentFlagEnum {
  NO = 1,
  YES,
}

export enum DelayedDeliveryFlagEnum {
  NO_DELAY = 1,
  DELAY,
}

export enum InspectionIncompleteFlagEnum {
  COMPLETED = 1,
  NOT_COMPLETED,
}

export enum InpatientOutpatientFlagEnum {
  INPATIENT = 1,
  OUTPATIENT,
}
