import { DATA_TYPE_COIN, DATA_TYPE_STOCK } from '@/constants/index';
import ajax from '@/utils/ajax';
import { useEffect, useState } from 'react';
import Price from './Comp/Price';

interface ListItem {
  id: string;
  name: string;
  data_type: typeof DATA_TYPE_COIN | typeof DATA_TYPE_STOCK;
}
const HomePage: React.FC = () => {
  const [list, setList] = useState<ListItem[]>([]);

  useEffect(() => {
    const fn = async () => {
      const res = await ajax('/api/get_item_list');
      if (res.code === 0) {
        setList(res.data);
      }
    };

    fn();
  }, []);

  return (
    <div>
      {list.map((x) => (
        <Price {...x} />
      ))}
    </div>
  );
};

export default HomePage;
