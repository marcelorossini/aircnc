const fs = require('fs');

module.exports = {
    createFile(path, content) {
        fs.writeFile(path,content, err => {
            if (err) throw err;         
        });
    },
    createFileFromBase64(path, content) {
        fs.writeFile(path,content, 'base64', err => {
            if (err) throw err;    
        });
        // Ultimo do array é o nome
        let paths = path.split('/');
        let [filename] = paths.reverse();
        return filename;
    },
    findExtensionBase64File(content) {
        // Decodifica a imagem
        let decodedFile = Buffer.from(content,'base64').toString('ascii');

        // if the file extension is unknown
        let extension = undefined;
        
        // do something like this
        decodedFile = decodedFile.toLowerCase();
        if (decodedFile.indexOf('png') !== -1) 
           extension = 'png'
        else if (decodedFile.indexOf('gif') !== -1)
           extension = 'jpg';
        else if (decodedFile.indexOf('jpg') !== -1 || decodedFile.indexOf('jpeg') !== -1)
           extension = 'jpg';
        else 
           extension = 'tiff';

        return extension;       
    },
    pathCount(path) {
        let files = fs.readdirSync(path).length;        
        return files;
    }
}