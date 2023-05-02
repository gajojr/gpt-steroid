import Dexie from 'dexie';

const db = new Dexie('GPT-tunner');

db.version(1).stores({
	chats: '++id, name, creationDate',
	fileUploads: '++id, fileName, uploadDate',
	messages: '++id, chatId, creationDate, messageType, messageContent',
});

export default db;

// await db.chats.add({ name: 'Chat Name', creationDate: new Date() });
// await db.fileUploads.add({ fileId: 'some-file-id', fileName: 'some-file-name', uploadDate: new Date() });
// await db.messages.add({ chatId: 1, messageId: 'some-message-id', creationDate: new Date(), messageType: 'question' });

// const chat = await db.chats.get(chatId);
// const messages = await db.messages.where('chatId').equals(chatId).toArray();
