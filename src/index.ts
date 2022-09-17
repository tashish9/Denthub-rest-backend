import { server } from './server';
import { CONSTANTS } from './config';

const { PORT } = CONSTANTS;

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
