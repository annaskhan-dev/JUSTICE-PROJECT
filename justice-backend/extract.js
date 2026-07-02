const fs = require('fs');
const path = require('path');
const pdf = require('pdf-parse');

const run = async () => {
    const pdfPath = path.join(__dirname, './Pakistan Penal Code.pdf'); 
    if (!fs.existsSync(pdfPath)) {
        console.error("❌ Cannot find 'Pakistan Penal Code.pdf' inside this folder!");
        return;
    }

    console.log("⏳ Reading entire PDF binary elements directly... please wait...");
    const dataBuffer = fs.readFileSync(pdfPath);
    
    try {
        const data = await pdf(dataBuffer);
        const lines = data.text.split(/\r?\n/);
        
        const parsedLaws = [];
        let currentChapter = "CHAPTER I";
        let currentSectionNum = null;
        let currentTitle = "";
        let currentDescriptionLines = [];

        const saveSection = () => {
            if (currentSectionNum) {
                let cleanTitle = currentTitle.replace(/^"+|"+$/g, '').trim();
                let cleanDesc = currentDescriptionLines.join(' ').replace(/\s+/g, ' ').replace(/^"+|"+$/g, '').trim();
                
                parsedLaws.push({
                    chapter: currentChapter,
                    sectionNumber: currentSectionNum,
                    title: cleanTitle || "Section Details",
                    description: cleanDesc
                });
            }
        };

        for (let line of lines) {
            line = line.trim();
            if (!line) continue;

            if (/^CHAPTER\s+[IIVXLCDM]+/i.test(line) && line.length < 50) {
                currentChapter = line.toUpperCase();
                continue;
            }

            const sectionMatch = line.match(/^(\d+)\.\s*(.*)/);
            if (sectionMatch) {
                saveSection();
                currentSectionNum = sectionMatch[1];
                currentTitle = sectionMatch[2];
                currentDescriptionLines = [];
            } else if (currentSectionNum) {
                if (!line.includes("--- PAGE") && !line.toLowerCase().includes("pakistan penal code")) {
                    currentDescriptionLines.push(line);
                }
            }
        }
        
        saveSection(); 

        fs.writeFileSync(
            path.join(__dirname, './lawsData.json'), 
            JSON.stringify(parsedLaws, null, 2)
        );
        
        console.log(`\n🎉 SUCCESS! Deep extraction pulled ${parsedLaws.length} sections into 'lawsData.json'!`);

    } catch (error) {
        console.error("❌ Extraction failed:", error.message);
    }
};

run();