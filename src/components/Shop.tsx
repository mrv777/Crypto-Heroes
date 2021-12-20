import React, { ReactElement, useEffect, useState } from 'react';
import Modal from 'react-modal';

import { getStoreAssets } from '../utils/ardorInterface';

const Shop = (): ReactElement => {
  const [items, setItems] = useState<any>(null);
  const [item, setItem] = useState<any>(null);
  const [modalItemIsOpen, setItemIsOpen] = React.useState(false);

  const customStyles = {
    overlay: {
      backgroundColor: 'rgba(0, 0, 0, 0.75)',
    },
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      background: 'black',
      border: '3px solid white',
      textAlign: 'center',
    },
  };

  function closeItemModal() {
    setItemIsOpen(false);
  }

  const handleBuy = (item: object) => {
    setItem(item);
    setItemIsOpen(true);
  };

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
            <button key={entry.asset} onClick={() => handleBuy(entry)}>
              {entry.description}
              <br />
              {entry.price} GIL
            </button>
          ))
        )}
      </div>
      <Modal
        isOpen={modalItemIsOpen}
        style={customStyles}
        onRequestClose={closeItemModal}
        contentLabel="Item modal">
        <p className="text-xl">{item?.description}</p>
        <p>Sold Out</p>
        <div className="w-full grid grid-cols-2 gap-3">
          <button disabled>buy</button>
          <button onClick={closeItemModal}>close</button>
        </div>
      </Modal>
    </div>
  );
};

export default Shop;
