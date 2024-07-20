import { index, store } from '@api/controllers/taskController';
import { Router } from 'express';

const router = Router();

router.post('/', store);
// router.get('/:id', show);
router.get('/', index);
// router.patch('/', update);
// router.delete('/:id', remove);
export default router;
