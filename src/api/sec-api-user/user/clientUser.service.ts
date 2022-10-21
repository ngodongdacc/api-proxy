import { Injectable } from '@nestjs/common';
import * as _ from 'lodash';
import { ConfigService } from '@nestjs/config';
import { ClientService } from 'src/common/service/client.service';
import configuration from '../config/configuration';

const configService = new ConfigService({ app: configuration });
const config = configService.get('app')();
const url = _.get(config, 'sec_user.api', '');

@Injectable()
export class ClientUserService extends ClientService(url) {}
