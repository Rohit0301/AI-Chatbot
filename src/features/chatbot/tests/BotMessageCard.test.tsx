
import userEvent from '@testing-library/user-event';
import { render, screen } from '@testing-library/react';

import BotMessageCard from '../components/BotMessageCard';

describe('BotMessageCard Component', () => {
  const testMessage = "Hello, how can I help you ?";

  test('renders the component with the correct message', () => {
    render(<BotMessageCard message={testMessage} />);
    expect(screen.getByText(testMessage)).toBeInTheDocument();
  });

  test('hides actions by default', () => {
    render(<BotMessageCard message={testMessage} />);
    const actionButtons = screen.queryByLabelText('bot-message-actions');
    expect(actionButtons).toHaveStyle({'display': 'none'})
  });

// TODO: Hover effect not working
//   test('shows actions when hovered over', async () => {
//     render(<BotMessageCard message={testMessage} />);
//     const user = userEvent.setup();
//     const messageElement = screen.getByLabelText("bot-message-card")
//     await user.hover(messageElement);

//     const actionButtons = await screen.findByLabelText('bot-message-actions');
//     expect(actionButtons).toBeVisible()
//   });
});
