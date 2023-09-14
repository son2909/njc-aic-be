import { Logger } from '@nestjs/common';
import { Lambda, AWSError } from 'aws-sdk';
import { PromiseResult } from 'aws-sdk/lib/request';

const lambda = new Lambda({});

export const Invoke = (
  fn: string,
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  params: any,
): Promise<PromiseResult<Lambda.InvocationResponse, AWSError>> =>
  lambda
    .invoke({
      FunctionName: fn,
      InvocationType: 'RequestResponse',
      Payload: JSON.stringify(params),
    })
    .promise();

export const InvokeAsync = (
  fn: string,
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  params: any,
  action: string,
): Promise<PromiseResult<Lambda.InvocationResponse, AWSError>> => {
  const data = {
    key: action.toLowerCase(),
    data: params,
  };
  Logger.debug(
    'Invoke async function',
    fn,
    ' with params:',
    JSON.stringify(data),
  );
  return lambda
    .invoke({
      FunctionName: fn,
      InvocationType: 'Event',
      Payload: JSON.stringify(data),
    })
    .promise();
};
