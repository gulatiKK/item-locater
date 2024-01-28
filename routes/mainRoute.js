const express = require('express');
const router = express.Router()
const fs = require('fs');
const path = require('path');

router.get('/', async (req, res) => {

    let filePath = '.' + req.url;
    if (filePath === './') {
        filePath = '../item-list.html';
    }
    
    filePath = path.join(__dirname, filePath);
    // Read the HTML file
    fs.readFile(filePath, (err, content) => {
        if (err) {
          if (err.code === 'ENOENT') {
            console.log(`File Not Found: ${filePath}`);
            res.writeHead(404);
            res.end('File Not Found');
          } else {
            console.error(`Server Error: ${err}`);
            res.writeHead(500);
            res.end('Server Error');
          }
        } else {
          res.writeHead(200, { 'Content-Type': 'text/html' });
          res.end(content, 'utf-8');
        }
      });
})

router.get('/newuibase.html', async (req, res) => {
  let filePath = '..' + req.url;
  filePath = path.join(__dirname, filePath);
  
  // Read the file
  fs.readFile(filePath, (err, content) => {
      if (err) {
          res.writeHead(500, { 'Content-Type': 'text/plain' });
          res.end('Internal Server Error');
        } else {
          res.writeHead(200, { 'Content-Type': 'text/html' });
          res.end(content, 'utf-8');
        }
      });
});

router.get('/newuibase.js', async (req, res) => {
  let filePath = '..' + req.url;
  filePath = path.join(__dirname, filePath);
  
  // Read the file
  fs.readFile(filePath, (err, content) => {
      if (err) {
          res.writeHead(500, { 'Content-Type': 'text/plain' });
          res.end('Internal Server Error');
        } else {
          res.writeHead(200, { 'Content-Type': 'text/javascript' });
          res.end(content, 'utf-8');
        }
      });
});

router.get('/newuibase.css', async (req, res) => {
  let filePath = '..' + req.url;
  filePath = path.join(__dirname, filePath);
  
  // Read the file
  fs.readFile(filePath, (err, content) => {
      if (err) {
          res.writeHead(500, { 'Content-Type': 'text/plain' });
          res.end('Internal Server Error');
        } else {
          res.writeHead(200, { 'Content-Type': 'text/css' });
          res.end(content, 'utf-8');
        }
      });
});

router.get('/item-list.js', async (req, res) => {
    let filePath = '..' + req.url;
    filePath = path.join(__dirname, filePath);
    
    // Read the file
    fs.readFile(filePath, (err, content) => {
        if (err) {
            res.writeHead(500, { 'Content-Type': 'text/plain' });
            res.end('Internal Server Error');
          } else {
            res.writeHead(200, { 'Content-Type': 'text/javascript' });
            res.end(content, 'utf-8');
          }
        });

});

router.get('/item-relation.js', async (req, res) => {
    let filePath = '..' + req.url;
    filePath = path.join(__dirname, filePath);
    
    // Read the file
    fs.readFile(filePath, (err, content) => {
        if (err) {
            res.writeHead(500, { 'Content-Type': 'text/plain' });
            res.end('Internal Server Error');
          } else {
            res.writeHead(200, { 'Content-Type': 'text/javascript' });
            res.end(content, 'utf-8');
          }
        });

});
router.get('/item-modal.js', async (req, res) => {
    let filePath = '..' + req.url;
    filePath = path.join(__dirname, filePath);
    
    // Read the file
    fs.readFile(filePath, (err, content) => {
        if (err) {
            res.writeHead(500, { 'Content-Type': 'text/plain' });
            res.end('Internal Server Error');
          } else {
            res.writeHead(200, { 'Content-Type': 'text/javascript' });
            res.end(content, 'utf-8');
          }
        });

});

router.get('/item-list.css', async (req, res) => {
    let filePath = '..' + req.url;
    filePath = path.join(__dirname, filePath);
    
    // Read the file
    fs.readFile(filePath, (err, content) => {
        if (err) {
            res.writeHead(500, { 'Content-Type': 'text/plain' });
            res.end('Internal Server Error');
          } else {
            res.writeHead(200, { 'Content-Type': 'text/css' });
            res.end(content, 'utf-8');
          }
        });

});

router.get('/item-login.js', async (req, res) => {
    let filePath = '..' + req.url;
    filePath = path.join(__dirname, filePath);
    
    // Read the file
    fs.readFile(filePath, (err, content) => {
        if (err) {
            res.writeHead(500, { 'Content-Type': 'text/plain' });
            res.end('Internal Server Error');
          } else {
            res.writeHead(200, { 'Content-Type': 'text/javascript' });
            res.end(content, 'utf-8');
          }
        });

});

router.get('/item-info.js', async (req, res) => {
    let filePath = '..' + req.url;
    filePath = path.join(__dirname, filePath);
    
    // Read the file
    fs.readFile(filePath, (err, content) => {
        if (err) {
            res.writeHead(500, { 'Content-Type': 'text/plain' });
            res.end('Internal Server Error');
          } else {
            res.writeHead(200, { 'Content-Type': 'text/javascript' });
            res.end(content, 'utf-8');
          }
        });

});

router.get('/item-status.js', async (req, res) => {
    let filePath = '..' + req.url;
    filePath = path.join(__dirname, filePath);
    
    // Read the file
    fs.readFile(filePath, (err, content) => {
        if (err) {
            res.writeHead(500, { 'Content-Type': 'text/plain' });
            res.end('Internal Server Error');
          } else {
            res.writeHead(200, { 'Content-Type': 'text/javascript' });
            res.end(content, 'utf-8');
          }
        });

});
module.exports = router;
