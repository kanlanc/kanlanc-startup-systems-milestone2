import fsPromises from 'fs/promises'

/* CS5356 TODO 2a. Data Model
Fill in the methods below that will create, read, update, and delete data. All the data will be stored in ./db.json so you can view what your data looks like locally. */
export const openDb = async () => {
  // CS5356 TODO 2a Set the initial structure of your database here
  // @type {dbObject}
  let dbObject = {
    // Fill in collections
    classCodes: [{ id: 'cs5356', owner: 'ss3396' }],
    classes: {},
    questions: {}
  };

  // Don't edit below this line.
  try {
    const text = await fsPromises.readFile('./db.json')
    return JSON.parse(text)
  } catch (err) {
    await saveData(dbObject)
    return dbObject
  }
}

const getRandomNumber = () => `${Math.floor(Math.random() * 900000) + 100000}`;


export const getQuestions = async (classCode) => {
  const dbObject = await openDb()
  // Fill in below
  return dbObject.questions[classCode] || [];
};

export const getClassCodes = async (username) => {
  const dbObject = await openDb()
  // Fill in below
  return dbObject.classCodes.filter(c_code => c_code.owner === username);
};

export const createQuestionForClassCode = async (classCode, { question, name }) => {
  const dbObject = await openDb();

  if (!dbObject.classes[classCode]) {
    return null; // Class code doesn't exist
  }

  if (!dbObject.questions[classCode]) {
    dbObject.questions[classCode] = [];
  }

  const newQuestion = {
    id: getRandomNumber(),
    question,
    name,
    createdAt: new Date().toISOString(),
  };

  dbObject.questions[classCode].push(newQuestion);
  await saveData(dbObject);

  return newQuestion;
};

export const createClassCode = async (classCodeData) => {
  const id = classCodeData.id
  const owner = classCodeData.owner
  const dbObject = await openDb()
  // Fill in below
  const newClassCode = { id, owner };
  dbObject.classCodes.push(newClassCode);
  dbObject.classes[id] = newClassCode;

  await saveData(dbObject);
  return newClassCode;
};

export const deleteQuestion = async (questionId) => {
  const dbObject = await openDb();
  let deletedQuestion = null;

  for (const classCode in dbObject.questions) {
    const index = dbObject.questions[classCode].findIndex(q => q.id === questionId);

    if (index !== -1) {
      deletedQuestion = dbObject.questions[classCode].splice(index, 1)[0];
      break;
    }
  }

  if (deletedQuestion) {
    await saveData(dbObject);
    return deletedQuestion;
  }

  return null;
};

// ------------------------------- 
// Do not edit the functions below
const saveData = async (dbObject) => {
  await fsPromises.writeFile('./db.json', JSON.stringify(dbObject))
}

export const clear = async () => {
  try {
    await fsPromises.rm('./db.json')
  } catch(err) {} // ignore error if file doesnt exist
};
