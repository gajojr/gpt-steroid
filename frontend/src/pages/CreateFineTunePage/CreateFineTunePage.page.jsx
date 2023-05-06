import React, { useState } from 'react';
import { Button, Container, Input, Label, LineItem, LineList, Row, Title, TrashIcon } from './CreateFineTunePage.style';

function CreateFineTunePage() {
	const [prompt, setPrompt] = useState('');
	const [completion, setCompletion] = useState('');
	const [lines, setLines] = useState([]);

	function handlePromptChange(event) {
		setPrompt(event.target.value);
	}

	function handleCompletionChange(event) {
		setCompletion(event.target.value);
	}

	function handleAddLine() {
		const line = { prompt: `${prompt}\n\n###\n\n`, completion: `${completion} END` };
		setLines([...lines, line]);
		setPrompt('');
		setCompletion('');
	}

	function handleDownload() {
		const data = lines.map(line => JSON.stringify(line)).join('\n');
		const blob = new Blob([data], { type: 'application/json' });
		const url = URL.createObjectURL(blob);
		const link = document.createElement('a');
		link.href = url;
		link.download = 'data.jsonl';
		link.click();
	}

	return (
		<Container>
			<Title>JSONL Creator</Title>
			<Row>
				<Label>Prompt:</Label>
				<Input type="text" value={prompt} onChange={handlePromptChange} />
			</Row>
			<Row>
				<Label>Completion:</Label>
				<Input type="text" value={completion} onChange={handleCompletionChange} />
			</Row>
			<Row>
				<Button onClick={handleAddLine}>Add Line</Button>
				<Button onClick={handleDownload}>Create JSONL File</Button>
			</Row>
			<LineList>
				{lines.map((line, idx) => {
					return (
						<LineItem>{`{"prompt":"${line.prompt.replace(/\n/g, '\\n')
							}","completion":"${line.completion}"}`} <TrashIcon onClick={() => setLines(lines.filter((_, index) => index !== idx))} /></LineItem>
					)
				})}
			</LineList>
		</Container>
	);
}

export default CreateFineTunePage;