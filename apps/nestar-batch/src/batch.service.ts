import { Injectable } from '@nestjs/common';

@Injectable()
export class NestarBatchService {
  getHello(): string {
    return 'Welcome to Batch Api Server';
  }

  public async batchRollback():Promise<void> {

  }

  public async batchTopProperties():Promise<void> {
    
  }

  public async batchTopAgents():Promise<void> {
    
  }
}
