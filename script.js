// Load Header
fetch('header.html')
    .then(response => response.text())
    .then(data => {
        document.querySelector('header').outerHTML = data;
    });

document.addEventListener("DOMContentLoaded", () => {
    const video = document.getElementById("droneVideo");

    let playForward = true;

    video.addEventListener("ended", () => {
        video.pause();

        // Toggle playback direction
        playForward = !playForward;
        if (!playForward) {
            video.playbackRate = -1; // Play in reverse
        } else {
            video.playbackRate = 1; // Play forward
        }

        video.currentTime = playForward ? 0 : video.duration;
        video.play();
    });

    // Ensure the video is ready for reverse playback
    video.addEventListener("loadedmetadata", () => {
        video.currentTime = 0; // Start at the beginning
    });
});


// Load Footer
fetch('footer.html')
    .then(response => response.text())
    .then(data => {
        document.querySelector('footer').outerHTML = data;
    });

// Smooth Scrolling for Anchor Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// Dynamically load AOS CSS and JS
function loadAOS() {
    // Add AOS CSS
    const aosCSS = document.createElement('link');
    aosCSS.rel = 'stylesheet';
    aosCSS.href = 'https://cdnjs.cloudflare.com/ajax/libs/aos/2.3.4/aos.css';
    document.head.appendChild(aosCSS);

    // Add AOS JS
    const aosJS = document.createElement('script');
    aosJS.src = 'https://cdnjs.cloudflare.com/ajax/libs/aos/2.3.4/aos.js';
    aosJS.defer = true;

    // Initialize AOS once the script is loaded
    aosJS.onload = () => {
        AOS.init({
            duration: 1000, // Animation duration (in ms)
            once: true,     // Whether animation should happen only once
        });
    };

    document.head.appendChild(aosJS);
}

// Call the function to load AOS
document.addEventListener("DOMContentLoaded", loadAOS);

// Load Product Data and Render Dynamically
const products = [
    { name: "Hoopoe", description: "Lightweight and agile drones for exploration missions in tough environments.", image: "assets/Hoopoe.webp" },
    { name: "Pigeon", description: "Compact drones designed for short-range operations with precision.", image: "assets/Pigeon.webp" },
    { name: "Crow", description: "Reliable drones for surveillance and monitoring tasks.", image: "assets/Crow.webp" },
    { name: "Eagle", description: "High-performance drones for long-distance operations.", image: "assets/Eagle.webp" },
    { name: "Bee", description: "Small and efficient drones for precision tasks.", image: "assets/Bees.webp" },
    { name: "Sparrow", description: "Versatile drones for general-purpose use.", image: "assets/Sparow.webp" },
    { name: "Phoenix", description: "Resilient drones designed for extreme weather conditions.", image: "assets/Pheonix.webp" },
    { name: "Goshawk", description: "Advanced drones for security and defense applications.", image: "assets/Goshawk.webp" },
    { name: "Falcon", description: "High-speed drones for rapid response and emergencies.", image: "assets/Falcon.webp" },
    { name: "Owl", description: "Night vision-equipped drones for low-light environments.", image: "assets/Owl.webp" },
];

function renderProducts() {
    const productGrid = document.querySelector('.product-grid');
    if (productGrid) {
        // Clear existing products
        productGrid.innerHTML = '';

        // Render products dynamically
        products.forEach((product, index) => {
            const productHTML = `
                <div class="product-item" data-aos="fade-up" data-aos-delay="${100 + index * 50}">
                    <img src="${product.image}" alt="${product.name} Drone">
                    <h3>${product.name}</h3>
                    <p>${product.description}</p>
                </div>
            `;
            productGrid.innerHTML += productHTML;
        });
    }
}

// Enable Modal View for Product Details
function enableProductModal() {
    document.querySelectorAll('.product-item').forEach((item) => {
        item.addEventListener('click', () => {
            const productName = item.querySelector('h3').innerText;
            const productDescription = item.querySelector('p').innerText;
            const productImage = item.querySelector('img').src;

            const modalContainer = document.querySelector('.modal-container');
            const modalContent = `
                <div class="modal">
                    <span class="close">&times;</span>
                    <img src="${productImage}" alt="${productName}">
                    <h3>${productName}</h3>
                    <p>${productDescription}</p>
                </div>
            `;
            modalContainer.innerHTML = modalContent;
            modalContainer.classList.add('open');

            document.querySelector('.close').addEventListener('click', () => {
                modalContainer.classList.remove('open');
            });
        });
    });
}

// Add Filter/Search Functionality for Products
function enableProductSearch() {
    const searchInput = document.querySelector('#product-search');
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            const searchQuery = e.target.value.toLowerCase();
            document.querySelectorAll('.product-item').forEach((item) => {
                const productName = item.querySelector('h3').innerText.toLowerCase();
                if (productName.includes(searchQuery)) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                } +
            });
        });
    }
}

// Testimonial Data
const testimonials = [
    { quote: "The Pigeon drone revolutionized our light delivery operations with unmatched reliability!", author: "Drone Company Owner" },
    { quote: "The Eagle's long-range monitoring capabilities are a game-changer for environmental research.", author: "University Technical Lead" },
    { quote: "The Crow drone has made short-range surveillance incredibly efficient and cost-effective.", author: "Software Systems Expert" },
    { quote: "The Hoopoe's reconnaissance capabilities have greatly improved our field data collection.", author: "Artificial Intelligence Professor" },
    { quote: "The Owl's night vision capabilities set it apart for low-light operations.", author: "Robotics Professor" },
    { quote: "The Sparrow drone's inspection precision is unmatched in its class.", author: "Physics Expert" },
    { quote: "The Falcon's speed is unparalleled for rapid response scenarios.", author: "Academic " }
];

// Render Testimonials Dynamically
function renderTestimonials() {
    const testimonialGrid = document.querySelector('.testimonial-grid');
    if (testimonialGrid) {
        testimonials.forEach((testimonial, index) => {
            const testimonialHTML = `
                <div class="testimonial-item" data-aos="fade-up" data-aos-delay="${100 + index * 50}">
                    <p>${testimonial.quote}</p>
                    <cite>- ${testimonial.author}</cite>
                </div>
            `;
            testimonialGrid.innerHTML += testimonialHTML;
        });
    }
}

// Initialize Testimonials on DOMContentLoaded
document.addEventListener("DOMContentLoaded", () => {
    renderTestimonials();
});

// News Data (Dynamic Content)
const newsData = [
    {
        title: "New Drone Technology Released",
        description: "Discover the latest advancements in drone technology from our team.",
        pdf: "assets/news/drone-tech-release.pdf",
    },
    {
        title: "Partnership with Agriculture Leaders",
        description: "We are partnering with industry leaders to enhance agricultural efficiency.",
        pdf: "assets/news/agriculture-partnership.pdf",
    },
    {
        title: "Environmental Monitoring Innovation",
        description: "Our drones are revolutionizing environmental data collection worldwide.",
        pdf: "assets/news/environment-monitoring.pdf",
    },
    {
        title: "Customer Success: Logistics Optimization",
        description: "See how our drones helped optimize logistics for our top clients.",
        pdf: "assets/news/logistics-success.pdf",
    },
    {
        title: "Safety Features for Surveillance Drones",
        description: "Explore our cutting-edge safety features for surveillance drones.",
        pdf: "assets/news/surveillance-safety.pdf",
    },
];

// Render News Items Dynamically
function renderNews() {
    const newsGrid = document.querySelector('.news-grid');
    if (newsGrid) {
        newsData.forEach((news, index) => {
            const newsHTML = `
                <div class="news-item" data-aos="fade-up" data-aos-delay="${100 + index * 50}">
                    <h3>${news.title}</h3>
                    <p>${news.description}</p>
                    <a href="${news.pdf}" download>Download PDF</a>
                </div>
            `;
            newsGrid.innerHTML += newsHTML;
        });
    }
}

// Enable News Search Functionality
function enableNewsSearch() {
    const searchInput = document.querySelector('#news-search');
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            const searchQuery = e.target.value.toLowerCase();
            document.querySelectorAll('.news-item').forEach((item) => {
                const newsTitle = item.querySelector('h3').innerText.toLowerCase();
                if (newsTitle.includes(searchQuery)) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    }
}

// Initialize News Section
document.addEventListener("DOMContentLoaded", () => {
    renderNews();
    enableNewsSearch();
    AOS.init({
        duration: 1000, // Animation duration (in ms)
        once: true,     // Animation happens only once
    });
});
// FAQ Data (Add or Remove FAQs here)
const faqData = [
    {
        question: "What is the range of the Hoopoe drone?",
        answer: "The Hoopoe drone has a range of up to 10 kilometers, ideal for reconnaissance missions."
    },
    {
        question: "What is the maximum payload for the Pigeon drone?",
        answer: "The Pigeon drone can carry loads up to 5 kilograms, making it perfect for light deliveries."
    },
    {
        question: "What makes the Crow drone unique?",
        answer: "The Crow drone is optimized for short-range monitoring and surveillance tasks with exceptional precision."
    },
    {
        question: "How long can the Eagle drone operate on a single charge?",
        answer: "The Eagle drone can operate for up to 4 hours on a single charge, making it ideal for long monitoring missions."
    },
    {
        question: "What features does the Owl drone have for night operations?",
        answer: "The Owl drone is equipped with advanced night vision cameras and low-light sensors for nighttime missions."
    },
    {
        question: "What is the maximum swarm size for the Bee drone?",
        answer: "The Bee drone supports swarm operations of up to 50 drones, enabling efficient collaboration in complex tasks."
    },
    {
        question: "What is the Sparrow drone's primary application?",
        answer: "The Sparrow drone is designed for industrial inspections, including energy, infrastructure, and manufacturing sectors."
    },
    {
        question: "What makes the Goshawk drone suitable for defense applications?",
        answer: "The Goshawk drone is built with reinforced materials and advanced navigation systems for security and defense missions."
    },
    {
        question: "How fast can the Falcon drone fly?",
        answer: "The Falcon drone can reach speeds of up to 120 km/h, making it perfect for rapid response operations."
    },
    {
        question: "What makes the Phoenix drone resilient in extreme weather?",
        answer: "The Phoenix drone is constructed with high-durability materials and an advanced stabilization system, allowing it to operate in harsh weather conditions."
    },
    {
        question: "Can I request a custom drone product for my specific needs?",
        answer: "Yes, we welcome requests for custom drone products. Contact us with your specifications, and our team will work with you to develop a tailored solution."
    },
    {
        question: "Where can I find pricing information for your drones?",
        answer: "Pricing for our drones is available upon request. Please reach out to our sales team through the contact section for a detailed quote."
    }
];

// Render FAQ dynamically
function renderFAQ() {
    const faqGrid = document.querySelector('.faq-grid');
    faqGrid.innerHTML = ""; // Clear existing FAQ items
    faqData.forEach((faq, index) => {
        const faqHTML = `
            <div class="faq-item">
                <h3 class="faq-question" data-index="${index}">${faq.question}</h3>
                <p class="faq-answer">${faq.answer}</p>
            </div>
        `;
        faqGrid.innerHTML += faqHTML;
    });

    // Add toggle functionality to FAQ questions
    document.querySelectorAll('.faq-question').forEach((question) => {
        question.addEventListener('click', () => {
            const answer = question.nextElementSibling;
            answer.classList.toggle('active'); // Toggle visibility
        });
    });
}

// Enable FAQ Search
function enableFAQSearch() {
    const searchInput = document.querySelector('#faq-search');
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            const searchQuery = e.target.value.toLowerCase();
            document.querySelectorAll('.faq-item').forEach((item) => {
                const questionText = item.querySelector('.faq-question').innerText.toLowerCase();
                if (questionText.includes(searchQuery)) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    }
}

// Initialize FAQ Features
document.addEventListener('DOMContentLoaded', () => {
    renderFAQ();
    enableFAQSearch();
});

document.addEventListener("DOMContentLoaded", () => {
    const careerItems = document.querySelectorAll(".career-item");

    careerItems.forEach((item) => {
        item.addEventListener("click", () => {
            const details = item.querySelector(".career-details");

            // Toggle visibility of the clicked item
            if (details.style.display === "block") {
                details.style.display = "none";
            } else {
                // Hide all other details first
                document.querySelectorAll(".career-details").forEach((detail) => {
                    detail.style.display = "none";
                });
                details.style.display = "block";
            }
        });
    });
});

// Dynamically Update Copyright Year
document.addEventListener("DOMContentLoaded", () => {
    const yearElement = document.querySelector("#current-year");
    if (yearElement) {
        const currentYear = new Date().getFullYear();
        yearElement.textContent = currentYear;
    }
});

// Smooth Scrolling for Footer Links
document.querySelectorAll('footer a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// Load Footer Dynamically (Optional)
fetch('footer.html')
    .then(response => response.text())
    .then(data => {
        document.querySelector('footer').outerHTML = data;
    });

// Initialize All Features on DOMContentLoaded
document.addEventListener("DOMContentLoaded", () => {
    renderProducts();
    enableProductModal();
    enableProductSearch();
    AOS.init({
        duration: 1000, // Animation duration (in ms)
        once: true,     // Animation happens only once
    });
});
