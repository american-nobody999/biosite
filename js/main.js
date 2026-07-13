/*This is the main JavaScript file for the Biosite template. It handles language toggling and scrollable gallery functionality.*/

document.addEventListener("DOMContentLoaded", () => {
	initLanguageToggle();
	initMobileNavToggle();
	initScrollableGallery();
});
/*left the hamburger only visible on mobile, and the nav links are hidden until the hamburger is clicked. The hamburger will disappear when the screen is resized to desktop size, and the nav links will be visible again.*/

function initMobileNavToggle() {
	const menuToggleButton = document.getElementById("menu-toggle");
	const nav = document.querySelector("header nav");

	if (!menuToggleButton || !nav) {
		return;
	}

	const closeNav = () => {
		nav.classList.remove("is-open");
		menuToggleButton.setAttribute("aria-expanded", "false");
	};

	menuToggleButton.addEventListener("click", () => {
		const isOpen = nav.classList.toggle("is-open");
		menuToggleButton.setAttribute("aria-expanded", String(isOpen));
	});

	window.addEventListener("resize", () => {
		if (window.innerWidth >= 1024) {
			closeNav();
		}
	});
}
/*This function initializes the language toggle functionality. It switches between English and Arabic content on the page when the toggle button is clicked. It also updates the document's language and text direction attributes accordingly to remove extra html. lang-en and lang-ar are the respective span classes*/
function initLanguageToggle() {
	const toggleButton = document.getElementById("lang-toggle");
	if (!toggleButton) {
		return;
	}

	let isArabic = false;

	const applyLanguageState = () => {
		document.querySelectorAll(".lang-en").forEach((item) => {
			item.classList.toggle("hidden", isArabic);
		});

		document.querySelectorAll(".lang-ar").forEach((item) => {
			item.classList.toggle("hidden", !isArabic);
		});

		document.documentElement.lang = isArabic ? "ar" : "en";
		document.documentElement.dir = isArabic ? "rtl" : "ltr";
		toggleButton.setAttribute("aria-pressed", String(isArabic));
	};

	toggleButton.addEventListener("click", () => {
		isArabic = !isArabic;
		applyLanguageState();
	});

	applyLanguageState();
}
/*This function initializes the scrollable gallery functionality. It allows users to scroll through gallery items using mouse wheel, arrow keys, and drag gestures. It also ensures that the gallery is accessible via keyboard navigation for accessibility. Pop baby pop.*/

function initScrollableGallery() {
	const galleries = document.querySelectorAll(".scrolling-gallery");

	galleries.forEach((gallery) => {
		if (!gallery.hasAttribute("tabindex")) {
			gallery.setAttribute("tabindex", "0");
		}

		let isDragging = false;
		let pointerStartX = 0;
		let startScrollLeft = 0;

		gallery.addEventListener(
			"wheel",
			(event) => {
				if (Math.abs(event.deltaY) <= Math.abs(event.deltaX)) {
					return;
				}

				event.preventDefault();
				gallery.scrollBy({ left: event.deltaY, behavior: "auto" });
			},
			{ passive: false }
		);

		gallery.addEventListener("keydown", (event) => {
			if (event.key === "ArrowRight") {
				gallery.scrollBy({ left: 280, behavior: "smooth" });
				event.preventDefault();
			}

			if (event.key === "ArrowLeft") {
				gallery.scrollBy({ left: -280, behavior: "smooth" });
				event.preventDefault();
			}
		});

		gallery.addEventListener("pointerdown", (event) => {
			isDragging = true;
			pointerStartX = event.clientX;
			startScrollLeft = gallery.scrollLeft;
			gallery.classList.add("is-dragging");
			gallery.setPointerCapture(event.pointerId);
		});

		gallery.addEventListener("pointermove", (event) => {
			if (!isDragging) {
				return;
			}

			const delta = event.clientX - pointerStartX;
			gallery.scrollLeft = startScrollLeft - delta;
		});

		const stopDragging = () => {
			isDragging = false;
			gallery.classList.remove("is-dragging");
		};

		gallery.addEventListener("pointerup", stopDragging);
		gallery.addEventListener("pointercancel", stopDragging);
		gallery.addEventListener("pointerleave", stopDragging);
	});
}

