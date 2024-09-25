import Calculator from "./Calculator";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";


test('renders the calculator display', () => {
  render(<Calculator />);
  expect(screen.getByPlaceholderText('0')).toBeInTheDocument();
});

test('displays the number 1 on the calculator display when the 1 button is clicked', () => {
  render(<Calculator />);
  const button = screen.getByText('1');
  fireEvent.click(button);
  expect(screen.getByPlaceholderText('0')).toHaveValue('1');
});
test('deletes the last character when DEL is clicked', () => {
  render(<Calculator />);
  fireEvent.click(screen.getByText('1'));
  fireEvent.click(screen.getByText('2'));
  fireEvent.click(screen.getByText('DEL'));
  expect(screen.getByPlaceholderText('0')).toHaveValue('1');
});

test('displays the + operator on the calculator display when the + button is clicked', () => {
  render(<Calculator />);
  const button = screen.getByText('+');
  fireEvent.click(button); 
  expect(screen.getByPlaceholderText('0')).toHaveValue('+');
});


test('displays number 1 and + operator ,when the 1 and + buttons are clicked', () => {
  render(<Calculator />);
  const button1 = screen.getByText('1');
  const buttonPlus = screen.getByText('+');
  fireEvent.click(button1); 
  fireEvent.click(buttonPlus);
  expect(screen.getByPlaceholderText('0')).toHaveValue('1+');
});



// test('evaluates the expression when = is clicked', () => {
//   render(<Calculator />);
//   fireEvent.click(screen.getByText('2'));
//   fireEvent.click(screen.getByText('+'));
//   fireEvent.click(screen.getByText('3'));
//   fireEvent.click(screen.getByText('='));
//   expect(screen.getByPlaceholderText('resultBox')).toHaveValue('5');
// });

test('evaluates the expression when = is clicked', () => {
  const { container } = render(<Calculator />);
  fireEvent.click(screen.getByText('2'));
  fireEvent.click(screen.getByText('+'));
  fireEvent.click(screen.getByText('3'));
  fireEvent.click(screen.getByText('='));
  const resultBox = container.querySelector('#resultBox');
  expect(resultBox).toHaveTextContent('5');
});

test("handles API call for logging expression", async () => {
  // Mock the fetch API
  global.fetch = jest.fn().mockResolvedValueOnce({
    ok: true,
    status: 200,
    json: jest.fn().mockResolvedValueOnce({ result: 9 }), // Mock the response from the server
  });

  render(<Calculator />);

  // Simulate user interactions
  fireEvent.click(screen.getByText("4"));    // Click the button '5'
  fireEvent.click(screen.getByText("+"));    // Click the '+' operator
  fireEvent.click(screen.getByText("5"));    // Click the button '2'
  fireEvent.click(screen.getByText("="));    // Click the '=' button

  // Use querySelector to select the resultBox div by its ID
  const resultBox = document.querySelector("#resultBox");

  // Wait for the result to update in the resultBox
  await waitFor(() => expect(resultBox).toHaveTextContent("9")); 

  // Check if fetch was called with the correct parameters
  expect(fetch).toHaveBeenCalledWith("http://localhost:5000/api/logs", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      expression: "4+5", // Ensure this matches the input expression
      isValid: true,
      output: 9,
    }),
  });
});