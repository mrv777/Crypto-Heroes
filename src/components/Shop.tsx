import React, { ReactElement, useEffect, useState } from 'react';

import { getStoreAssets } from '../utils/ardorInterface';

const Shop = (): ReactElement => {
  const [items, setItems] = useState<any>(null);

  useEffect(() => {
    async function fetchLeaders() {
      const storeItems: object[] = [];
      const itesmAPI = await getStoreAssets();
      itesmAPI!.data.assets[0].forEach(function (currentItem) {
        console.log(currentItem);
        let itemInfo = currentItem;
        if (itemInfo.description.split(' ')[0].toLowerCase() == 'uncommon') {
          itemInfo['price'] = '1000';
        } else {
          itemInfo['price'] = 'N/A';
        }
        storeItems.push(itemInfo);
      });

      setItems(storeItems);
    }

    fetchLeaders();
  }, []);

  return (
    <div className="h-full w-full flex flex-col items-center justify-center">
      <p className="text-2xl">Shop</p>
      {/* <p>The store is empty...</p> */}
      <div className="w-full grid grid-cols-3 gap-3">
        {!items ? (
          <p>Loading...</p>
        ) : (
          items.map((entry) => (
            <button key={entry.asset}>
              {entry.description}
              <br />
              {entry.price} GIL
            </button>
          ))
        )}
      </div>
    </div>
  );
};

export default Shop;
