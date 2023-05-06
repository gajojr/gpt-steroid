# Guide for using 32K token output with OpenAI API:

1. Navigate to `server/openai/askQuestion.js`.
2. Go to the `askQuestion` function.
3. For the `createChatCompletion` function, use the following configuration:

```
{
    model: 'gpt-4-32k',
    max_tokens: 32000,
    messages
}
```

This configuration sets the model to `gpt-4-32k` and the `max_tokens` parameter to `32000`, allowing you to generate a maximum of 32,000 tokens in the API response.