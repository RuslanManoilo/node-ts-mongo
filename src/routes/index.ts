import { ReadingRoute } from '@routes/reading.route';
import { CommentRoute } from './comment.route';

const routes = [new ReadingRoute(), new CommentRoute()];

export default routes;
