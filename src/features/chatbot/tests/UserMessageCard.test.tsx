import React from 'react';
import { render, screen } from '@testing-library/react';
import { ThemeProvider, createTheme } from '@mui/material/styles';

import { mockMessages } from '../../../constants/mock';
import UserMessageCard from '../components/UserMessageCard';

describe('UserMessageCard Component', () => {
  const userMessage = mockMessages[0];
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
    renderWithTheme(<UserMessageCard message={userMessage} />);
    expect(screen.getByText(userMessage.text)).toBeInTheDocument();
  });

  test('applies the correct background color to the Paper element', () => {
    renderWithTheme(<UserMessageCard message={userMessage} />);
    const paperElement = screen.getByLabelText("user-message-card")
    expect(paperElement).toHaveStyle(`background-color: ${theme.palette.primary.main}`);
  });

  test('renders an avatar with a Person icon', () => {
    renderWithTheme(<UserMessageCard message={userMessage} />);
    expect(screen.getByLabelText('person-icon')).toBeInTheDocument();
  });
});
