import { useState } from 'react'
import { GoodList } from './components/GoodList'
import goodsFromServer from './goods.json'
import './App.scss'
import { Header } from './components/Header/Header';
import { SORT_FIELD } from './constants';

function getPreparedGoods(goods, { sortField, query }) {
  let preparedGoods = [...goods];

  if (query) {
    preparedGoods = preparedGoods.filter(good => good.name.includes(query))
  }

  if (sortField) {
    preparedGoods.sort((good1, good2) => {
      switch (sortField) {
        case SORT_FIELD.ID:
          return good1[sortField] - good2[sortField];
          
        case SORT_FIELD.NAME:
        case SORT_FIELD.COLOR:
          return good1[sortField].localeCompare(good2[sortField]);

        default:
          return 0;
      }
    })
  }

  return preparedGoods
}

export const App = () => {
  const [sortField, setSortField] = useState('');
  const visibleGoods = getPreparedGoods(
    goodsFromServer, {sortField, query: 'e'}
  )

  return (
    <div className="App">
      <Header
        sortField={sortField}
        sortBy={setSortField}
      />
      
      <GoodList goods={visibleGoods} />
    </div>
  )
}
