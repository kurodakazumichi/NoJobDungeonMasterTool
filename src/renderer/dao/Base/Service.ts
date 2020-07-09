/******************************************************************************
 * Imports
 *****************************************************************************/
import { computed, action } from 'mobx';
import env from '@/helpers/env';
import { IRepository } from '../Base/Repository';

/******************************************************************************
 * Service Base
 *****************************************************************************/
export default class ServiceBase<T1, T2 extends IRepository<T1>> 
{
  protected repo:T2;

  constructor(name:string, repository:T2) 
  {
    this.repo = repository;
    env.setDAO(name, this);
  }

  @computed get count() {
    return this.repo.count;
  }

  @action save(item:T1) 
  {
    return this.repo.save(item);
  }

  findAll() {
    return this.repo.findAll();
  }

  search(query:string) {
    return this.repo.search(query);
  }
}