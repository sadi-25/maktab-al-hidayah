const searchInput =
    document.getElementById("searchInput");

const searchButton =
    document.getElementById("searchButton");

const searchResult =
    document.getElementById("searchResult");


const searchTopics = [

    {
        keywords: ["তাওহীদ", "আকীদাহ", "আকিদাহ", "শিরক", "ঈমান"],
        title: "তাওহীদ ও আকীদাহ",
        link: "topic.html?topic=tawhid"
    },

    {
        keywords: ["ইসলাম", "ইসলাম কী", "পাঁচ স্তম্ভ"],
        title: "ইসলাম সম্পর্কে জানুন",
        link: "topic.html?topic=islam"
    },

    {
        keywords: ["কুরআন", "কোরআন"],
        title: "কুরআন",
        link: "topic.html?topic=quran"
    },

    {
        keywords: ["সুন্নাহ", "রাসূল", "রাসুল", "হাদিস", "হাদীস"],
        title: "রাসূল ﷺ ও সুন্নাহ",
        link: "topic.html?topic=sunnah"
    },

    {
        keywords: ["ইবাদত", "সালাত", "নামাজ", "সাওম", "রোজা", "যাকাত", "হজ", "দুআ", "যিকর"],
        title: "ইবাদত",
        link: "topic.html?topic=ibadah"
    },

    {
        keywords: ["আখলাক", "চরিত্র", "পরিবার", "সমাজ"],
        title: "আখলাক ও জীবন",
        link: "topic.html?topic=akhlaq"
    },

    {
        keywords: ["প্রশ্ন", "সংশয়", "সন্দেহ"],
        title: "প্রশ্ন ও সংশয়",
        link: "topic.html?topic=questions"
    },

    {
        keywords: ["নও-মুসলিম", "নতুন মুসলিম"],
        title: "নও-মুসলিম",
        link: "topic.html?topic=new-muslim"
    }

];


searchButton.addEventListener("click", function () {

    const searchText =
        searchInput.value.trim().toLowerCase();


    if (searchText === "") {

        searchResult.innerHTML =
            "<p>দয়া করে কিছু লিখে খুঁজুন।</p>";

        return;
    }


    let foundTopic = null;


    for (const item of searchTopics) {

        for (const keyword of item.keywords) {

            if (searchText.includes(keyword.toLowerCase())) {

                foundTopic = item;

                break;
            }
        }

        if (foundTopic) {
            break;
        }
    }


    if (foundTopic) {

        searchResult.innerHTML = `
            <div class="search-result-card">

                <p>আপনার অনুসন্ধানের ফলাফল:</p>

                <a href="${foundTopic.link}">
                    ${foundTopic.title} →
                </a>

            </div>
        `;

    } else {

        searchResult.innerHTML = `
            <div class="search-result-card">

                <p>
                    “${searchText}” এর জন্য কোনো ফলাফল পাওয়া যায়নি।
                </p>

                <a href="topics.html">
                    সব বিষয় দেখুন →
                </a>

            </div>
        `;
    }

});


searchInput.addEventListener("keydown", function (event) {

    if (event.key === "Enter") {

        searchButton.click();

    }

});