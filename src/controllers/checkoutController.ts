import { Request, Response } from 'express';

export const done = (req: Request, res: Response) => {

   res.json({ data: req.body });
};