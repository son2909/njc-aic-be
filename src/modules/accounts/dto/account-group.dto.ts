export class AccountGroupDto {
  account_id: number;

  nickname: string;

  first_name: string;

  given_name: string;

  account_rank: number;

  cumulative_like_points: number;

  unit_price: number;

  cumulative_number_of_proposals: number;

  created_date: Date;

  groups: Group[];

  //col_1
  total_receipt: number = 0;

  //col_2
  abs_receipt: number = 0;

  //col_3
  abs_ratio_evaluate: number = 0;

  //col_4
  abs_receipt_complete_time: number = 0;

  //col_5
  abs_one_receipt_complete_time: number = 0;

  //col_6
  abd_point_one_receipt: number = 0;

  //col_7
  count_delayed_delivery_ncomplete: number = 0;

  //col_8
  count_inspection_incomplete_ncomplete: number = 0;
}

export class Group {
  group_name: string;

  group_color: number;
}
