import { getClassCodes, createClassCode } from '../../services/database.mjs';
import { unstable_getServerSession } from 'next-auth/next';
import { authOptions } from './auth/[...nextauth]';

export default async (req, res) => {
  const session = await unstable_getServerSession(req, res, authOptions);

  
  if (!session || !session.user || !session.user.name) {
    return res.status(401).json({ message: 'Unauthorized' });
  }


  const username = session.user.name;

  
  if (req.method === 'GET') {
    const classCodes = await getClassCodes(username);
    return res.status(200).json(classCodes);
  }


  if (req.method === 'POST') {
    const { id } = req.body;

    
    if (!id) {
      return res.status(400).json({ message: 'Bad Request: Missing id field' });
    }

   
    const newClassCode = await createClassCode({ id, owner: username });
    return res.status(201).json(newClassCode);
  }

 
  return res.status(405).json({ message: 'Method Not Allowed' });
};
