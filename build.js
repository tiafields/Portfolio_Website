import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import ejs from 'ejs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const files = [
    'index',
    'contact',
    'portfolio/furryfriends',
    'portfolio/lascrud',
    'portfolio/shoeconverter',
    'portfolio/southwest',
];

const main = async () => {
    if (!fs.existsSync(path.join(__dirname, 'static', 'portfolio'))) {
        fs.mkdirSync(path.join(__dirname, 'static', 'portfolio'));
    }

    for(let file of files) {
        const output = await ejs.renderFile(
            path.join(__dirname, 'views', `${file}.ejs`),
            {},
            {
                root: path.join(__dirname, 'views'),
                views: path.join(__dirname, 'views'),
            }
        );
    
        console.log(`creating file: ${file}.html`);
        fs.writeFileSync(path.join(__dirname, 'static', `${file}.html`), output);
    }
    
    process.exit(0);
};

main();