import { Controller, Get, Logger } from '@nestjs/common';
import { Cron, Interval, Timeout } from '@nestjs/schedule';
import { NestarBatchService } from './batch.service';
import { BATCH_ROLLBACK, BATCH_TOP_AGENTS, BATCH_TOP_PROPERTIES } from './lib/config';

@Controller()
export class BatchController {
  private logger: Logger = new Logger('BatchController')
  constructor(private readonly batchService: NestarBatchService) {}


  
  @Timeout(1000)
  handleTimeout(){
    this.logger.debug("Batch is ready ")
  }

  @Cron("00 00 * * * *", {name: BATCH_ROLLBACK})
  public async batchRollBack() {
    try{
      this.logger["context"] = BATCH_ROLLBACK
    this.logger.debug("Executed ")
     await this.batchService.batchRollback()
    } catch(err) {
      this.logger.error(err);
    }
  }

  @Cron("20 00 * * * *", {name: BATCH_TOP_PROPERTIES})
  public batchProperties() {
    try{

    } catch(err) {
      this.logger.error(err);
    }
    this.logger["context"] = BATCH_TOP_PROPERTIES
    this.logger.debug("exxecuted ")
  }

  @Cron("40 00 * * * *", {name: BATCH_TOP_AGENTS})
  public cronTest() {
    try{

    } catch(err) {
      this.logger.error(err);
    }
    this.logger["context"] =  BATCH_TOP_AGENTS
    this.logger.debug("Executed ")
  }


  




  // @Interval(1000)
  // handleInterval(){
  //   this.logger.debug("Interval Test")
  // }

  @Get()
  getHello(): string {
    return this.batchService.getHello();
  }
}
