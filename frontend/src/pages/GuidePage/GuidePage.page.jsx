import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import { useParams } from 'react-router-dom';

function GuidePage() {
	const [markdown, setMarkdown] = useState('');
	const { fileName } = useParams();

	useEffect(() => {
		(async () => {
			const response = await fetch(`/guides/${fileName}.md`);
			const text = await response.text();
			setMarkdown(text);
		})();
	}, [fileName]);

	return (
		<div style={{ padding: '20px 50px' }}>
			<ReactMarkdown>{markdown}</ReactMarkdown>
		</div>
	);
}

export default GuidePage;
