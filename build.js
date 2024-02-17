import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import ejs from 'ejs';
import chokidar from 'chokidar';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const shouldWatch = process.argv.includes('-w');

const files = [
    'index',
    'contact',
    'portfolio/furryfriends',
    'portfolio/lascrud',
    'portfolio/shoeconverter',
    'portfolio/southwest',
];

const cleanHTMLFrom = (dir) => {
    const oldHTMLFiles = fs.readdirSync(dir);
    oldHTMLFiles.forEach(file => {
        if(file.split('.')[1] === 'html') {
            fs.unlinkSync(path.join(dir, file));
        }
    });
}

const build = async () => {
    cleanHTMLFrom(path.join(__dirname, 'static'));
    cleanHTMLFrom(path.join(__dirname, 'static', 'portfolio'));

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
};

const main = async () => {
    if (shouldWatch) {
        console.log(`Building then watching for changes`);
        await build();
        const watcher = chokidar.watch(
            path.join(__dirname, 'views'),
            {
                ignored: /^\./,
                persistent: true,
                ignoreInitial: true,
            }
        );

        watcher
            .on('add', file => {
                console.log(`file added: ${file}`);
                build();
            })
            .on('change', file => {
                console.log(`file updated: ${file}`);
                build();
            })
            .on('unlink', file => {
                console.log(`file removed: ${file}`);
                build();
            })
            .on('error', (error) => console.error('Watcher error', error))
    } else {
        console.log(`Building`);
        await build();
        process.exit(0);
    }
};

main();