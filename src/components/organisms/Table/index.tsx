import React from "react";

interface TableColumn {
  header: string;
  dataKeys: string[];
  renderCell?: (data: any) => React.ReactNode;
}

interface TableProps {
  data: Record<string, any>[];
  columns: TableColumn[];
}

export default function Table({ data, columns }: TableProps) {
  const getColumnData = (row: Record<string, any>, dataKeys: string[]) => {
    return dataKeys.reduce((pre, cur) => {
      if (pre && pre.hasOwnProperty(cur)) {
        return pre[cur];
      }
      return pre;
    }, row[dataKeys[0]]);
  };
  return (
    <table className="lank-board">
      <thead>
        <tr>
          {columns.map((column, index) => (
            <th key={index}>{column.header}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row, rowIndex) => (
          <tr key={rowIndex}>
            {columns.map((column, colIndex) => (
              <td key={colIndex}>
                {column.renderCell ? (
                  column.renderCell(row)
                ) : (
                  <div>{getColumnData(row, column.dataKeys)}</div>
                )}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
