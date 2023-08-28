import { useState } from 'react';
import goodsFromServer from './goods.json';
import './App.scss';

import { Header } from './components/Header/Header';
import { GoodList } from './components/GoodList';
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
  const [goods, setGoods] = useState(goodsFromServer);
  const [sortField, setSortField] = useState('');
  const [query, setQuery] = useState('');

  const visibleGoods = getPreparedGoods(
    goodsFromServer, {sortField, query}
  );
  
  const moveUp = (good) => {
    const index = goods.indexOf(good);

    if (index < 1) {
      return;
    }

    setGoods([
      ...goods.slice(0, index - 1),
      goods[index],
      goods[index - 1],
      ...goods.slice(index + 1),
    ])
  };

  const moveDown = (good) => {
    setGoods((currentGoods) => {
      console.log(currentGoods.map(g => g.name));
      const index = currentGoods.indexOf(good);

      if (index === currentGoods.length - 1) {
        return;
      }

      return [
        ...currentGoods.slice(0, index),
        currentGoods[index + 1],
        currentGoods[index],
        ...currentGoods.slice(index + 2),
      ]
    })
  };

  return (
    <div className="App">
      {false && (
        <Header
          sortField={sortField}
          sortBy={(field) => {
            setSortField(field)
          }}
          query={query}
          filterBy={(newQuery) => {
            setQuery(newQuery)
          }}
        />
      )}
      
      <GoodList
        goods={goods}
        moveUp={moveUp}
        moveDown={moveDown}
      />
    </div>
  )
}
