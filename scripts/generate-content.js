const fs = require("fs");
const path = require("path");

const ROOT = process.cwd();
const CONTENT_DIR = path.join(ROOT, "content");
const OUTPUT_FILE = path.join(ROOT, "content-manifest.json");

const topicNames = {
tawhid: "তাওহীদ ও আকীদাহ",
islam: "ইসলাম সম্পর্কে জানুন",
quran: "কুরআন",
sunnah: "রাসূল ﷺ ও সুন্নাহ",
ibadah: "ইবাদত",
akhlaq: "আখলাক ও জীবন",
questions: "প্রশ্ন ও সংশয়",
"new-muslim": "নও-মুসলিম"
};

const metadata = {
"bn_Pabitra_Kuraana_Pathera_Maryada.mp3": {
title: "পবিত্র কুরআন পাঠের মর্যাদা",
description: "পবিত্র কুরআন পাঠের মর্যাদা ও গুরুত্ব সম্পর্কে আলোচনা।",
speaker: "মুহাম্মাদ মর্তুজা ইবন আয়েশ মুহাম্মাদ",
publisher: "ইসলাম প্রচার ব্যুরো, রাবওয়াহ, রিয়াদ",
sourceName: "IslamHouse",
sourceUrl: "https://islamhouse.com/bn/"
},


"tawhid.pdf": {
    title: "তাওহীদ",
    description: "তাওহীদ ও আকীদাহ সম্পর্কিত একটি বই।",
    author: "ড. সালেহ ইবন ফাওযান আল-ফাওযান",
    source: "https://islamhouse.com/bn/"
}
,
"al tawhid.pdf": {
    title: "কিতাবুত তাওহীদ ",
    description: "কিতাবুত তাওহীদ যা বান্দার ওপর আল্লাহর হক।",
    author: "শাইখ মুহাম্মাদ ইবন আব্দুল ওয়াহহাব",
    source: "https://islamhouse.com/bn/"
}

};

function getFiles(dir, extensions) {
if (!fs.existsSync(dir)) {
return [];
}


const results = [];

function walk(currentDir) {
    const items = fs.readdirSync(currentDir, { withFileTypes: true });

    for (const item of items) {
        const fullPath = path.join(currentDir, item.name);

        if (item.isDirectory()) {
            walk(fullPath);
        } else if (
            extensions.includes(path.extname(item.name).toLowerCase())
        ) {
            results.push(fullPath);
        }
    }
}

walk(dir);

return results;


}

function getTopicFromPath(filePath, contentType) {
const relative = path.relative(
CONTENT_DIR,
filePath
);


const parts = relative.split(path.sep);

if (parts.length >= 3 && parts[0] === contentType) {
    const folder = parts[1];

    if (topicNames[folder]) {
        return folder;
    }
}

return "general";


}

function cleanTitle(fileName) {
return path
.basename(fileName, path.extname(fileName))
.replace(/[_-]+/g, " ")
.replace(/\s+/g, " ")
.trim();
}

function createItem(filePath, type, extensions) {
const fileName = path.basename(filePath);
const relativePath = path
.relative(ROOT, filePath)
.split(path.sep)
.join("/");


const topic = getTopicFromPath(filePath, type);

const item = {
    title: cleanTitle(fileName),
    description: "",
    type: type === "books" ? "বই" : "অডিও",
    topic: topic,
    topicName: topicNames[topic] || "অন্যান্য",
    file: relativePath
};

if (metadata[fileName]) {
    Object.assign(item, metadata[fileName]);
}

return item;


}

const bookFiles = getFiles(
path.join(CONTENT_DIR, "books"),
[".pdf"]
);

const audioFiles = getFiles(
path.join(CONTENT_DIR, "audio"),
[".mp3", ".wav", ".ogg", ".m4a"]
);

const books = bookFiles.map(file =>
createItem(file, "books")
);

const audio = audioFiles.map(file =>
createItem(file, "audio")
);

const topics = {};

for (const key of Object.keys(topicNames)) {
topics[key] = {
name: topicNames[key],
books: books.filter(book => book.topic === key),
audio: audio.filter(item => item.topic === key)
};
}

const manifest = {
generatedAt: new Date().toISOString(),


books: books,

audio: audio,

topics: topics


};

fs.writeFileSync(
OUTPUT_FILE,
JSON.stringify(manifest, null, 2),
"utf8"
);

console.log("Content manifest generated successfully.");
console.log(`Books: ${books.length}`);
console.log(`Audio: ${audio.length}`);
console.log(`Manifest: ${OUTPUT_FILE}`);

