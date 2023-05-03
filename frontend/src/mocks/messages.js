const messages = [
	{
		id: 1,
		chatId: 1,
		creationDate: new Date('2022-10-01T12:00:00Z'),
		messageType: 'question',
		messageContent: 'Can you recommend a good book on programming?',
	},
	{
		id: 2,
		chatId: 1,
		creationDate: new Date('2022-10-01T12:01:00Z'),
		messageType: 'answer',
		messageContent:
			'Sure! "Clean Code" by Robert C. Martin is a must-read for any programmer.',
	},
	{
		id: 3,
		chatId: 1,
		creationDate: new Date('2022-10-02T16:30:00Z'),
		messageType: 'question',
		messageContent: 'What are some good exercises to improve flexibility?',
	},
	{
		id: 4,
		chatId: 1,
		creationDate: new Date('2022-10-02T16:31:00Z'),
		messageType: 'answer',
		messageContent:
			'Some good exercises to improve flexibility include yoga, stretching, and pilates.',
	},
	{
		id: 5,
		chatId: 2,
		creationDate: new Date('2022-10-03T09:45:00Z'),
		messageType: 'question',
		messageContent: 'What are the best restaurants in New York City?',
	},
	{
		id: 6,
		chatId: 2,
		creationDate: new Date('2022-10-03T09:46:00Z'),
		messageType: 'answer',
		messageContent:
			'Some of the best restaurants in New York City include Le Bernardin, Eleven Madison Park, and Per Se.',
	},
];

export default messages;
