const fs = require('fs');
const path = require('path');

const routes = [
  'collections',
  'collections/[category]',
  'journal',
  'cart',
  'auth/login',
  'account/wishlist',
  'about',
  'contact',
  'shipping',
  'returns',
  'bespoke',
  'faq',
  'privacy-policy',
  'terms-of-service',
  'corporate',
  'products/[id]'
];

const basePath = path.join(__dirname, 'frontend', 'src', 'app');

const template = "import ComingSoon from '@/components/layout/ComingSoon';\n\nexport default function Page() {\n  return <ComingSoon />;\n}\n";

routes.forEach(route => {
  const dirPath = path.join(basePath, route);
  const filePath = path.join(dirPath, 'page.js');
  
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
  
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, template, 'utf8');
    console.log("Created " + filePath);
  } else {
    console.log("Skipped " + filePath + " (already exists)");
  }
});

console.log('Done scaffolding pages.');
