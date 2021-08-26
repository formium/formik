export * from './exports';

import { unstable_batchedUpdates } from 'react-dom';
import { setBatch } from './helpers/batch-helpers';

// Formik for web uses react-dom batches.
setBatch(unstable_batchedUpdates);
