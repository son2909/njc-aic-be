import { ConfigService } from '@nestjs/config';
import { ApiGatewayManagementApi } from 'aws-sdk';

const ApiGProvider = {
  provide: 'APIG-CLIENT',
  useFactory: (configService: ConfigService) => {
    let apiG: ApiGatewayManagementApi;
    if (configService.get<string>('OFFLINE') === 'true') {
      apiG = new ApiGatewayManagementApi({
        endpoint: configService.get<string>('GATEWAY_ENDPOINT'),
        credentials: {
          accessKeyId: configService.get<string>('GATEWAY_ACCESS_KEY'),
          secretAccessKey: configService.get<string>(
            'GATEWAY_SECRETACCESS_KEY',
          ),
        },
      });
    } else {
      apiG = new ApiGatewayManagementApi({
        apiVersion: '2023-01-01',
        endpoint: configService.get<string>('GATEWAY_ENDPOINT'),
      });
    }
    return apiG;
  },
  inject: [ConfigService],
};

export default ApiGProvider;
