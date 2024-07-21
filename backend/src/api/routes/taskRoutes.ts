import { index, store } from '@api/controllers/taskController';
import { Router } from 'express';

const router = Router();
router.get('/', index);
// router.get('/:id', show);
router.post('/', store);
// router.patch('/', update);
// router.delete('/:id', destroy);
export default router;
