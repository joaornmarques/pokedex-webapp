import './../assets/styles/table-cell.css';

interface TableCellProps {
  children?: React.ReactNode;
  size?: string | null;
  variant?: string | null;
  onClick?: () => void;
}

function TableCell({ children, size, variant, onClick }: TableCellProps) {
  return (
    <td onClick={onClick} className={`table-cell ${size ? `table-cell--${size}` : ''} ${variant ? `table-cell--${variant}` : ''}`}>
      {children}
    </td>
  );
}

export default TableCell;