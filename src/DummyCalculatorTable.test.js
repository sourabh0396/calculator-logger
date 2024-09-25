import { render, screen } from '@testing-library/react';
import DummyCalculatorTable from './DummyCalculatorTable';

test('render dummy  data headers', () => {
    render(<DummyCalculatorTable />);
    expect(screen.getByText('ID')).toBeInTheDocument();
    expect(screen.getByText('Expression')).toBeInTheDocument();
    expect(screen.getByText('Valid')).toBeInTheDocument();
    expect(screen.getByText('Output')).toBeInTheDocument();
    expect(screen.getByText('Created On')).toBeInTheDocument();
});

test('renders the calculator table with correct number of rows', () => {
    render(<DummyCalculatorTable />);
    // Check if the header is rendered
    const header = screen.getByRole('heading', { level: 1 });
    expect(header).toHaveTextContent(/dummy data calculator table/i);
  });

test('renders dummy data rows', () => {
    render(<DummyCalculatorTable />);
    const rows = screen.getAllByTestId('table-row');
    expect(rows.length).toBe(20); 
});

test('renders the correct data in each row', () => {
    render(<DummyCalculatorTable />);
    const DataRow = screen.getAllByTestId('table-row')[0];//first line firstDataRow
    expect(DataRow).toHaveTextContent('1');
    expect(DataRow).toHaveTextContent('5 + 3');
    expect(DataRow).toHaveTextContent('True'); 
    expect(DataRow).toHaveTextContent('8');
    expect(DataRow).toHaveTextContent(/09\/01\/2024|9\/1\/2024/);
});
test('renders the correct data in each row', () => {
    render(<DummyCalculatorTable />);
    const secondDataRow = screen.getAllByTestId('table-row')[1];//second line
    expect(secondDataRow).toHaveTextContent('2');
    expect(secondDataRow).toHaveTextContent('10 / 2');
    expect(secondDataRow).toHaveTextContent('True'); 
    expect(secondDataRow).toHaveTextContent('5');
    expect(secondDataRow).toHaveTextContent(/09\/02\/2024|9\/2\/2024/);
});