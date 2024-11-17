import fs from 'fs';
import express from 'express';

const debugRouter = express.Router();

debugRouter.get('/debug', (req, res) => {
  try {
    const testDir = '/tmp/test-dir';
    if (!fs.existsSync(testDir)) {
      fs.mkdirSync(testDir, { recursive: true });
      console.log('Debug directory created:', testDir);
    }
    res.send('Directory creation succeeded!');
  } catch (err) {
    console.error('Debug error:', err);
    res.status(500).send(err.toString());
  }
});

export default debugRouter;
