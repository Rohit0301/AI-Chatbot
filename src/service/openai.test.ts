import axios from 'axios';

import { generateAIResponse } from './openai';

jest.mock('axios');

describe('generateAIResponse', () => {
  it('should return AI response when API call is successful', async () => {
    const mockResponse = {
      data: {
        choices: [
          {
            message: { content: 'Hello, how can I assist you?' },
          },
        ],
      },
    };
    (axios.post as jest.Mock).mockResolvedValue(mockResponse);

    const message = 'Hello!';
    const result = await generateAIResponse(message);

    // Assert: Ensure the response is as expected
    expect(result).toBe('Hello, how can I assist you?');
  });

  it('should throw an error when API call fails', async () => {
    (axios.post as jest.Mock).mockRejectedValue(new Error('API call failed'));

    const message = 'Hello!';

    // Assert: Make sure the function throws an error when the request fails
    await expect(generateAIResponse(message)).rejects.toThrow('API call failed');
  });
});
