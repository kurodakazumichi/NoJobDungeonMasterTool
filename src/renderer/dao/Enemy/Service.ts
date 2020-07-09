/******************************************************************************
 * Imports
 *****************************************************************************/
import { computed, action } from 'mobx';

import EnemyEntity from '@/dao/Enemy/Entity';
import EnemyRepository from '@/dao/Enemy/Repository';
import env from '@/helpers/env';

/******************************************************************************
 * Enemy Service
 *****************************************************************************/
class EnemyService
{
  constructor() {
    env.setDAO("enemy", this);
  }

  @computed get count() {
    return EnemyRepository.count;
  }

  @action save(enemy:EnemyEntity) {
    return EnemyRepository.save(enemy);
  }

  findAll() {
    return EnemyRepository.findAll();
  }

}

export default new EnemyService();