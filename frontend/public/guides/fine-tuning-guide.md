# Fine Tuning Guide

0. If you just want to try this out, there is demo file in frontend/src/mocks -> data.jsonl as an example

1. Create a .jsonl file, and name it appropriately to represent what you're optimizing for. For example, "sql_tune.jsonl".

2. A .jsonl file is a collection of JSON lines. File should be formatted like this:
```
{"prompt":"Question\n\n###\n\n","completion":" Answer END"}
```
```
{"prompt":"Question2\n\n###\n\n","completion":" Answer2 END"}
```

3. There are rules for formatting prompts and completions:
    - Add `'\n\n###\n\n'` to the end of the question for a separator.
    - Add `' END'` to the end of completion, with 1 whitespace before the answer.
    - It's recommended to create at least 500 lines to have a successful tuning.

4. Open the chat or create a new one.

5. Click the "upload" button in the bottom right corner and upload the .jsonl file.

6. Click tick icon to send file for tuning

7. Wait until the file finishes uploading, which can take up to 5 minutes. Do not refresh or close the page during this time.

8. The file will show up in the tunes list. You can click on it to use it in the current chat.

### If you strugle with creating .jsonl file, here is the gui for that:

[JSONL GUI creator](http://localhost:3000/create-fine-tune)