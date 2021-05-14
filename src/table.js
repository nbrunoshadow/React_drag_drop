import React, { useCallback, useMemo, useState } from 'react';
import { uniq } from 'lodash';
import { Grid } from 'react-virtualized';

export function Table({ data }) {
  // [{}]
  const countries = useMemo(
    () => uniq(data.map((item) => item[1])).filter((t) => t !== 'Country'),
    [data],
  );
  const [country, setCountry] = useState();
  const products = useMemo(
    () => uniq(data.map((item) => item[2]).filter((t) => t !== 'Item Type')),
    [data],
  );
  const [product, setProduct] = useState();

  const filtered = useMemo(() => {
    let [head, ...tail] = data;
    if (country) {
      tail = tail.filter((item) => country === item[1]);
    }

    if (product) {
      tail = tail.filter((item) => product === item[2]);
    }
    return [head, ...tail];
  }, [data, country, product]);

  const cellRenderer = useCallback(
    ({ columnIndex, key, rowIndex, style }) => {
      return (
        <div key={key} style={{ ...style, border: '1px black solid' }}>
          {filtered[rowIndex][columnIndex]}
        </div>
      );
    },
    [filtered],
  );

  const onSelectCountry = useCallback((e) => {
    const value = e.target.value;
    setCountry(value);
  }, []);

  const onSelectProduct = useCallback((e) => {
    const value = e.target.value;
    setProduct(value);
  }, []);

  if (!data.length) {
    return null;
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'row' }}>
      <Grid
        cellRenderer={cellRenderer}
        columnCount={filtered[0].length}
        rowCount={filtered.length}
        columnWidth={200}
        rowHeight={60}
        height={600}
        width={1200}
        style={{ fontSize: '20px' }}
      />
      <div style={{ height: '100%', width: '300px' }}>
        <form>
          <label htmlFor="countries">Country</label>
          <br />
          <select id="countries" onChange={onSelectCountry}>
            <option />
            {countries.map((c) => (
              <option value={c}>{c}</option>
            ))}
          </select>
          
          <br /><br />

          <label htmlFor="product">Product</label>
          <br />
          <select id="product" onChange={onSelectProduct}>
            <option />
            {products.map((c) => (
              <option value={c}>{c}</option>
            ))}
          </select>
        </form>
      </div>
    </div>
  );
}
