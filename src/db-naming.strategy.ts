import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { snakeCase } from './utils/utils';

export class DbNamingStrategy {
  static get strategy() {
    const namingStrategy = new SnakeNamingStrategy();

    namingStrategy.joinTableName = (ft, st, ff, sf) => {
      return snakeCase(ft.slice(0, ft.length - 1) + '_' + ff);
    };

    namingStrategy.tableName = (name, customName) => {
      if (customName) {
        return customName;
      }
      return snakeCase(name + 's');
    };

    return namingStrategy;
  }
}
