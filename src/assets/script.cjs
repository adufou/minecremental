const fs = require('fs');
const path = require('path');

function renameFilesInDirectory(directory) {
    fs.readdir(directory, (err, files) => {
        if (err) {
            console.error('Could not list the directory.', err);
            process.exit(1);
        }

        files.forEach((file, index) => {
            if (path.extname(file) === '.png') {
                const oldPath = path.join(directory, file);
                const newPath = path.join(
                    directory,
                    file.toLowerCase().replace(/ /g, '_'),
                );

                fs.rename(oldPath, newPath, (err) => {
                    if (err) {
                        console.error(
                            'There was an error renaming the file.',
                            err,
                        );
                    } else {
                        console.log(
                            `Successfully renamed ${oldPath} to ${newPath}`,
                        );
                    }
                });
            }
        });
    });
}

// Replace 'your_directory' with the directory you want to process
renameFilesInDirectory('.');
