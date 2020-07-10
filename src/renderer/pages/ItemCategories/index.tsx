/******************************************************************************
 * Imports
 *****************************************************************************/
import * as React from 'react';
import { observer } from 'mobx-react';

import Layout from '@/layout';

import * as InputText from '@/components/atoms/Input/Text';
import * as Icon from '@/components/atoms/Icon';

import Store from './store';

import './styles.scss';

/******************************************************************************
 * Interface
 *****************************************************************************/
/** Props */
export interface IProps {}

/******************************************************************************
 * pItemCategoriesコンポーネント
 *****************************************************************************/
@observer
class pItemCategories extends React.Component<IProps>
{
  /** ページ専用ストア */
  private store:Store;

  constructor(props:IProps) 
  {
    super(props);
    this.store = new Store();
  }

  render() 
  {
    return (
      <div className="p-item-categories">

        <h1>アイテムカテゴリ (全{this.store.count}件)</h1>

        <div className="search">
          <label>検索</label>:
          <InputText.default 
            value={this.store.query}
            onChange={this.store.onChangeQuery}
          />
        </div>

        <div className="add-form">
          <InputText.default 
            value={this.store.newItemCategory.name}
            onChange={ this.store.onChangeNewName }
          />
          <Icon.default
            type={Icon.Type.PlusCircle}
            onClick={this.store.onClickSaveNew}
          />
        </div>


        { (0 < this.store.categories.length) && (
          <table className="categories-form">
            <thead>
              <tr>
                <th>ID</th>
                <th>名前</th>
              </tr>
            </thead>
            <tbody>
              {this.store.categories.map((e) => {
                return (
                  <tr key={e.id}>
                    <td>{e.id}</td>
                    <td>
                      <InputText.default 
                        value={e.name}
                        onChange={ (value:string) => {
                          e.setName(value);
                        }}
                      />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    );
  }

}

export default Layout(pItemCategories);