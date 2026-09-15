const topics = {


tawhid: {
    title: "তাওহীদ ও আকীদাহ",
    description: "আল্লাহর একত্ব, ঈমান ও সঠিক আকীদাহ সম্পর্কে প্রয়োজনীয় শিক্ষা।",
    content: [
        {
            title: "তাওহীদের পরিচয়",
            description: "তাওহীদের অর্থ, গুরুত্ব ও মুসলিম জীবনে এর প্রয়োজনীয়তা।",
            type: "প্রবন্ধ",
            link: "#",
            linkText: "বিস্তারিত দেখুন →"
        }
    ]
},

islam: {
    title: "ইসলাম সম্পর্কে জানুন",
    description: "ইসলামের মৌলিক বিষয়, শিক্ষা ও জীবনব্যবস্থা সম্পর্কে জানুন।",
    content: [
        {
            title: "ইসলাম কী?",
            description: "ইসলামের পরিচয় ও এর মৌলিক শিক্ষাগুলো।",
            type: "প্রবন্ধ",
            link: "#",
            linkText: "বিস্তারিত দেখুন →"
        }
    ]
},

quran: {
    title: "কুরআন",
    description: "কুরআনের পরিচয়, মর্যাদা, শিক্ষা ও হিদায়াত।",
    content: [

        {
            title: "কুরআন কী?",
            description: "আল-কুরআনের পরিচয় ও মুসলিম জীবনে এর গুরুত্ব।",
            type: "প্রবন্ধ",
            link: "#",
            linkText: "বিস্তারিত দেখুন →"
        },

        {
            title: "কুরআন থেকে হিদায়াত",
            description: "কুরআনের শিক্ষা কীভাবে আমাদের জীবনে প্রয়োগ করা যায়।",
            type: "প্রবন্ধ",
            link: "#",
            linkText: "বিস্তারিত দেখুন →"
        },

        {
            title: "পবিত্র কুরআন পাঠের মর্যাদা",
            description: "পবিত্র কুরআন পাঠের মর্যাদা ও গুরুত্ব সম্পর্কে আলোচনা।",
            type: "অডিও",
            link: "audio.html",
            linkText: "অডিও শুনুন →"
        }

    ]
},

sunnah: {
    title: "রাসূল ﷺ ও সুন্নাহ",
    description: "রাসূলুল্লাহ ﷺ-এর জীবন, সুন্নাহ ও সহিহ হাদীস সম্পর্কে শিক্ষা।",
    content: [
        {
            title: "সুন্নাহর গুরুত্ব",
            description: "মুসলিম জীবনে সুন্নাহ অনুসরণের গুরুত্ব।",
            type: "প্রবন্ধ",
            link: "#",
            linkText: "বিস্তারিত দেখুন →"
        }
    ]
},

ibadah: {
    title: "ইবাদত",
    description: "সালাত, সিয়াম, যাকাত, হজ ও অন্যান্য ইবাদত সম্পর্কে শিক্ষা।",
    content: [
        {
            title: "সালাতের গুরুত্ব",
            description: "মুমিনের জীবনে সালাতের গুরুত্ব ও মর্যাদা।",
            type: "প্রবন্ধ",
            link: "#",
            linkText: "বিস্তারিত দেখুন →"
        }
    ]
},

akhlaq: {
    title: "আখলাক ও জীবন",
    description: "উত্তম চরিত্র, আদব ও সুন্দর মুসলিম জীবনযাপনের শিক্ষা।",
    content: [
        {
            title: "উত্তম চরিত্রের গুরুত্ব",
            description: "ইসলামে সুন্দর চরিত্র ও উত্তম আচরণের গুরুত্ব।",
            type: "প্রবন্ধ",
            link: "#",
            linkText: "বিস্তারিত দেখুন →"
        }
    ]
},

questions: {
    title: "প্রশ্ন ও সংশয়",
    description: "ইসলাম সম্পর্কে প্রচলিত প্রশ্ন, সংশয় ও তার উত্তর।",
    content: [
        {
            title: "ইসলাম সম্পর্কে কিছু সাধারণ প্রশ্ন",
            description: "ইসলাম নিয়ে প্রচলিত কিছু প্রশ্নের সংক্ষিপ্ত উত্তর।",
            type: "প্রবন্ধ",
            link: "#",
            linkText: "বিস্তারিত দেখুন →"
        }
    ]
},

"new-muslim": {
    title: "নও-মুসলিম",
    description: "নতুন মুসলিম ভাই-বোনদের জন্য প্রয়োজনীয় প্রাথমিক শিক্ষা।",
    content: [
        {
            title: "নও-মুসলিমদের জন্য প্রাথমিক শিক্ষা",
            description: "ইসলামের মৌলিক বিষয়গুলো ধাপে ধাপে শেখার নির্দেশনা।",
            type: "প্রবন্ধ",
            link: "#",
            linkText: "বিস্তারিত দেখুন →"
        }
    ]
}


};

const urlParams = new URLSearchParams(window.location.search);
const topicKey = urlParams.get("topic");

const topic = topics[topicKey];

const topicTitle = document.getElementById("topicTitle");
const topicDescription = document.getElementById("topicDescription");
const topicContent = document.getElementById("topicContent");
const filters = document.querySelectorAll(".topic-filter");

if (!topic) {


topicTitle.textContent = "বিষয় পাওয়া যায়নি";
topicDescription.textContent = "দুঃখিত, আপনি যে বিষয়টি খুঁজছেন তা পাওয়া যায়নি।";

topicContent.innerHTML = `
    <article class="card">
        <h3>বিষয় পাওয়া যায়নি</h3>
        <p>দয়া করে বিষয়সমূহ পেজ থেকে একটি বিষয় নির্বাচন করুন।</p>
        <a href="topics.html">← সব বিষয় দেখুন</a>
    </article>
`;


} else {

```
topicTitle.textContent = topic.title;
topicDescription.textContent = topic.description;


function renderContent(type = "all") {

    const filteredContent =
        type === "all"
            ? topic.content
            : topic.content.filter(item => item.type === type);


    if (filteredContent.length === 0) {

        topicContent.innerHTML = `
            <article class="card">
                <h3>কোনো কনটেন্ট পাওয়া যায়নি</h3>
                <p>এই ধরনের কনটেন্ট এখনো যোগ করা হয়নি।</p>
            </article>
        `;

        return;
    }


    topicContent.innerHTML = filteredContent.map(item => `

        <article class="card">

            <span class="content-type">
                ${item.type}
            </span>

            <h3>
                ${item.title}
            </h3>

            <p>
                ${item.description}
            </p>

            <a href="${item.link}">
                ${item.linkText}
            </a>

        </article>

    `).join("");

}


filters.forEach(filter => {

    filter.addEventListener("click", function () {

        filters.forEach(btn => {
            btn.classList.remove("active");
        });

        this.classList.add("active");

        const selectedType = this.getAttribute("data-type");

        renderContent(selectedType);

    });

});


renderContent("all");


}
