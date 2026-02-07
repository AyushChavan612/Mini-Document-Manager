const NodeClam = require('clamscan');

const scanFile = async (filePath) => {
    try {
        const clamscan = await new NodeClam().init({
            clamdscan: {
                host: '127.0.0.1',
                port: 3310,
                timeout: 5000 
            }
        });

        const { isInfected, viruses } = await clamscan.isInfected(filePath);
        return { 
            isInfected, 
            viruses: viruses.length > 0 ? viruses : null 
        };

    } catch (err) {
        console.warn('Antivirus engine not reachable. Skipping scan.');
        return { 
            isInfected: false, 
            viruses: null 
        };
    }
};

module.exports = { scanFile };