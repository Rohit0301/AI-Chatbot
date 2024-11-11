import React from 'react';
import { render, screen } from '@testing-library/react';
import { ThemeProvider, createTheme } from '@mui/material/styles';

import UserMessageCard from '../components/UserMessageCard';

describe('UserMessageCard Component', () => {
  const testMessage = "Hello, this is a user message.";
  const theme = createTheme({
    palette: {
      primary: {
        main: '#0D92F4',
      },
    },
  });

  const renderWithTheme = (component: React.ReactNode) => {
    return render(<ThemeProvider theme={theme}>{component}</ThemeProvider>);
  };

  test('renders the component with the correct message', () => {
    renderWithTheme(<UserMessageCard message={testMessage} />);
    expect(screen.getByText(testMessage)).toBeInTheDocument();
  });

  test('applies the correct background color to the Paper element', () => {
    renderWithTheme(<UserMessageCard message={testMessage} />);
    const paperElement = screen.getByLabelText("user-message-card")
    expect(paperElement).toHaveStyle(`background-color: ${theme.palette.primary.main}`);
  });

  test('renders an avatar with a Person icon', () => {
    renderWithTheme(<UserMessageCard message={testMessage} />);
    expect(screen.getByLabelText('person-icon')).toBeInTheDocument();
  });
});
