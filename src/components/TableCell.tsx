import './../assets/styles/table-cell.css';

interface TableCellProps {
  children?: React.ReactNode;
  size?: string | null;
  variant?: string | null;
}

function TableCell({ children, size, variant }: TableCellProps) {
  return (
    <td className={`table-cell ${size ? `table-cell--${size}` : ''} ${variant ? `table-cell--${variant}` : ''}`}>
      {children}
    </td>
  );
}

export default TableCell;