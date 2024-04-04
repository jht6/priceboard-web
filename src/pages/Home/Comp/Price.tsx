import { DATA_TYPE_COIN, DATA_TYPE_STOCK } from '@/constants/index';
import ajax from '@/utils/ajax';
import { useEffect, useState } from 'react';
import styles from './Price.less';

const REFRESH_INTERVAL = 10 * 1000;

interface Props {
  id: string;
  name: string;
  data_type: typeof DATA_TYPE_COIN | typeof DATA_TYPE_STOCK;
}
interface State {
  current: number; // 现价
  percent: number; // 涨跌幅
  change: number; // 涨跌价格
  currency: String; // 货币类型
}
const Comp: React.FC<Props> = ({ id, name, data_type }) => {
  const [state, setState] = useState<State>({
    current: 0,
    percent: 0,
    change: 0,
    currency: '-',
  });

  useEffect(() => {
    const fn = async () => {
      const urlMap = {
        [DATA_TYPE_COIN]: '/api/get_coin_data',
        [DATA_TYPE_STOCK]: '/api/get_stock_data',
      };

      let body = {};
      if (data_type === DATA_TYPE_COIN) {
        body = {
          coin_name: id,
        };
      } else if (data_type === DATA_TYPE_STOCK) {
        body = {
          stock_code: id,
        };
      }

      const res = await ajax(urlMap[data_type], body);
      if (res.code === 0) {
        setState(res.data);
      }
    };

    fn();

    const handler = setInterval(() => {
      fn();
    }, REFRESH_INTERVAL);

    return () => {
      clearInterval(handler);
    };
  }, []);

  return (
    <div className={styles.price}>
      <div className={styles.name}>{name}</div>
      <div className={styles.current}>
        <span>{state.current.toFixed(2)}</span>
        <span className={styles.currency}>{state.currency}</span>
      </div>
      <div className={styles.percent}>{state.percent.toFixed(2)}%</div>
    </div>
  );
};

export default Comp;
