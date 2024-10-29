const filterContainer = document.querySelector(".gallery-filter"),
      galleryItems = document.querySelectorAll(".gallery-item");

filterContainer.addEventListener("click", (event) => {
    if(event.target.classList.contains("filter-item")){
        filterContainer.querySelector(".active").classList.remove("active");
        event.target.classList.add("active");
        const filterValue = event.target.getAttribute("data-filter");
        galleryItems.forEach((item) => {
            if(item.classList.contains(filterValue) || filterValue === 'all'){
                item.classList.remove("hide");
                item.classList.add("show");
            } else {
                item.classList.remove("show");
                item.classList.add("hide");
            }
        });
    }
});

// Lightbox feature
let currentImageIndex = 0;
const lightbox = document.createElement("div");
lightbox.classList.add("lightbox");
document.body.appendChild(lightbox);
lightbox.innerHTML = `
    <div class="lightbox-content">
        <span class="close-btn">&times;</span>
        <img class="lightbox-img" src="" alt="gallery image">
        <span class="prev-btn">&#10094;</span>
        <span class="next-btn">&#10095;</span>
    </div>
`;

// Get elements for navigation
const lightboxImg = lightbox.querySelector(".lightbox-img");
const closeBtn = lightbox.querySelector(".close-btn");
const prevBtn = lightbox.querySelector(".prev-btn");
const nextBtn = lightbox.querySelector(".next-btn");

// Function to show image in lightbox
function showImage(index) {
    currentImageIndex = index;
    const selectedImageSrc = galleryItems[currentImageIndex].querySelector("img").src;
    lightboxImg.src = selectedImageSrc;
    lightbox.style.display = "flex";
}

// Open lightbox when clicking on a gallery image
galleryItems.forEach((item, index) => {
    item.addEventListener("click", () => showImage(index));
});

// Close lightbox
closeBtn.addEventListener("click", () => {
    lightbox.style.display = "none";
});

// Show previous image
prevBtn.addEventListener("click", () => {
    currentImageIndex = (currentImageIndex === 0) ? galleryItems.length - 1 : currentImageIndex - 1;
    showImage(currentImageIndex);
});

// Show next image
nextBtn.addEventListener("click", () => {
    currentImageIndex = (currentImageIndex === galleryItems.length - 1) ? 0 : currentImageIndex + 1;
    showImage(currentImageIndex);
});
