document.addEventListener("DOMContentLoaded", () => {
  console.log("DOM loaded, initializing...");

  // Register ScrollTrigger plugin first
  gsap.registerPlugin(ScrollTrigger);

  // Initialize core functionality
  initThemeToggle();
  initCursor();
  initParallax();
  initTabSystem();
  initTimelineAnimations();
  initSkillAnimations();
  init3DAvatar();

  /**
   * Initialize custom cursor
   */
  function initCursor() {
    console.log("Initializing cursor...");
    const cursor = document.querySelector(".cursor");
    const follower = document.querySelector(".cursor-follower");

    if (!cursor || !follower) {
      console.warn("Cursor elements not found");
      return;
    }

    document.addEventListener("mousemove", (e) => {
      gsap.to(cursor, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.1,
      });

      gsap.to(follower, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.3,
      });
    });

    // Add hover effect for interactive elements
    const interactives = document.querySelectorAll("a, button, .tab-link");
    interactives.forEach((el) => {
      el.addEventListener("mouseenter", () => {
        cursor.classList.add("active");
        follower.classList.add("active");
      });

      el.addEventListener("mouseleave", () => {
        cursor.classList.remove("active");
        follower.classList.remove("active");
      });
    });
  }

  /**
   * Initialize theme toggle
   */
  function initThemeToggle() {
    console.log("Initializing theme toggle...");
    const themeToggle = document.querySelector(".theme-toggle");
    if (!themeToggle) {
      console.warn("Theme toggle not found");
      return;
    }

    const currentTheme = localStorage.getItem("theme") || "light";
    document.documentElement.setAttribute("data-theme", currentTheme);

    // Update icon based on current theme
    const themeIcon = themeToggle.querySelector("i");
    if (themeIcon) {
      themeIcon.className =
        currentTheme === "light" ? "fas fa-moon" : "fas fa-sun";
    }

    themeToggle.addEventListener("click", () => {
      const newTheme =
        document.documentElement.getAttribute("data-theme") === "light"
          ? "dark"
          : "light";
      document.documentElement.setAttribute("data-theme", newTheme);
      localStorage.setItem("theme", newTheme);

      // Update icon when theme changes
      if (themeIcon) {
        themeIcon.className =
          newTheme === "light" ? "fas fa-moon" : "fas fa-sun";
      }
    });
  }

  /**
   * Initialize tab system
   */
  function initTabSystem() {
    console.log("Initializing tab system...");
    const tabLinks = document.querySelectorAll(".tab-link");
    const tabContents = document.querySelectorAll(".tab-content");

    if (!tabLinks.length || !tabContents.length) {
      console.warn("Tab elements not found");
      return;
    }

    tabLinks.forEach((link) => {
      link.addEventListener("click", () => {
        const target = link.getAttribute("data-tab");
        console.log(`Switching to tab: ${target}`);

        // Update active states
        tabLinks.forEach((l) => l.classList.remove("active"));
        tabContents.forEach((c) => c.classList.remove("active"));

        link.classList.add("active");
        const targetContent = document.querySelector(`#${target}`);

        if (targetContent) {
          targetContent.classList.add("active");

          // Animate content
          gsap.fromTo(
            targetContent,
            { y: 20, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.5, ease: "power2.out" }
          );
        }
      });
    });
  }

  /**
   * Initialize timeline animations
   */
  function initTimelineAnimations() {
    console.log("Initializing timeline animations...");
    if (!gsap || !ScrollTrigger) {
      console.error("GSAP or ScrollTrigger not loaded");
      return;
    }

    // Timeline items animation
    const timelineItems = gsap.utils.toArray(".timeline-item");
    if (timelineItems.length === 0) {
      console.warn("No timeline items found");
      return;
    }

    timelineItems.forEach((item, index) => {
      gsap.from(item, {
        scrollTrigger: {
          trigger: item,
          start: "top bottom-=100",
          toggleActions: "play none none reverse",
        },
        x: -50,
        opacity: 0,
        duration: 1,
        delay: index * 0.2,
        ease: "power3.out",
      });
    });
  }

  /**
   * Initialize skill animations
   */
  function initSkillAnimations() {
    console.log("Initializing skill animations...");

    // Skills animation
    const skillBars = gsap.utils.toArray(".skill-bar");
    if (skillBars.length === 0) {
      console.warn("No skill bars found");
      return;
    }

    skillBars.forEach((skill, index) => {
      const progressBar = skill.querySelector(".skill-progress-bar");
      if (!progressBar) return;

      const percent = progressBar.getAttribute("data-percent");

      // Set initial width to 0
      gsap.set(progressBar, { width: "0%" });

      gsap.to(progressBar, {
        scrollTrigger: {
          trigger: skill,
          start: "top bottom-=100",
          toggleActions: "play none none reverse",
        },
        width: `${percent}%`,
        duration: 1.5,
        delay: index * 0.1,
        ease: "power3.out",
      });
    });
  }

  /**
   * Initialize 3D avatar with GLB model - COMPLETE FIXED VERSION
   */
  function init3DAvatar() {
    console.log("Initializing 3D avatar...");
    const canvas = document.getElementById("avatar-canvas");
    const loadingMessage = document.getElementById("loading-message");
    
    if (!canvas) {
      console.warn("Avatar canvas not found");
      return;
    }

    // Check if THREE and GLTFLoader are available
    if (typeof THREE === 'undefined') {
      console.error("THREE.js not loaded");
      if (loadingMessage) loadingMessage.textContent = "THREE.js not loaded";
      return;
    }

    if (typeof THREE.GLTFLoader === 'undefined') {
      console.error("GLTFLoader not loaded");
      if (loadingMessage) loadingMessage.textContent = "GLTFLoader not available";
      return;
    }

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
    });

    // Set canvas size
    function resizeCanvas() {
      const container = canvas.parentElement;
      if (!container) return;

      const size = Math.min(container.clientWidth, 400); // Increased max size to 400px
      renderer.setSize(size, size);
      camera.aspect = 1;
      camera.updateProjectionMatrix();
    }

    // Handle window resize
    window.addEventListener("resize", resizeCanvas);
    resizeCanvas();

    // Add comprehensive lighting for better model visibility
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1.0);
    directionalLight.position.set(5, 10, 5);
    directionalLight.castShadow = true;
    scene.add(directionalLight);

    const pointLight1 = new THREE.PointLight(0xffffff, 0.6);
    pointLight1.position.set(5, 5, 5);
    scene.add(pointLight1);

    const pointLight2 = new THREE.PointLight(0xffffff, 0.4);
    pointLight2.position.set(-5, -5, 5);
    scene.add(pointLight2);

    // Additional lighting for character visibility
    const fillLight = new THREE.DirectionalLight(0xffffff, 0.3);
    fillLight.position.set(-5, 0, 5);
    scene.add(fillLight);

    // Load GLB model
    const loader = new THREE.GLTFLoader();
    let avatarModel = null;
    let modelContainer = null; // Container for the model to handle rotations properly
    
    // Rotation controls - Fixed variables
    let isMouseDown = false;
    let mouseX = 0;
    let mouseY = 0;
    let targetRotationX = 0;
    let targetRotationY = 0;
    let currentRotationX = 0;
    let currentRotationY = 0;
    
    // Variable to track if we're rotating the 3D model to avoid cursor conflicts
    let isRotating3D = false;

    console.log("Attempting to load model.glb...");
    
    loader.load(
      './model.glb', // Path to your GLB file
      (gltf) => {
        console.log("GLB model loaded successfully!", gltf);
        avatarModel = gltf.scene;
        
        // Create a container for the model to handle rotations properly
        modelContainer = new THREE.Group();
        scene.add(modelContainer);
        
        // Hide loading message
        if (loadingMessage) loadingMessage.style.display = 'none';
        
        // Scale the model to make it much bigger
        avatarModel.scale.set(6, 6, 6); // Increased from 4 to 6
        
        // Center the model
        const box = new THREE.Box3().setFromObject(avatarModel);
        const center = box.getCenter(new THREE.Vector3());
        avatarModel.position.sub(center);
        
        // Adjust vertical position if needed
        avatarModel.position.y += 0.5;
        
        // Set initial rotation to face forward like in your image
        // The character should face toward the camera initially
        avatarModel.rotation.y = 0; // Face forward
        avatarModel.rotation.x = 0; // Level
        avatarModel.rotation.z = 0; // Upright
        
        // Add the model to the container instead of directly to scene
        modelContainer.add(avatarModel);
        
        // Ensure model is properly lit and has shadows
        avatarModel.traverse((child) => {
          if (child.isMesh) {
            child.castShadow = true;
            child.receiveShadow = true;
            // Ensure materials are properly set up
            if (child.material) {
              child.material.needsUpdate = true;
              // Enhance material properties for better visibility
              if (child.material.map) {
                child.material.map.encoding = THREE.sRGBEncoding;
              }
            }
          }
        });

        console.log("Model added to scene successfully");
        
        // Add rotation controls after model is loaded
        setupRotationControls();
      },
      (progress) => {
        const percent = (progress.loaded / progress.total * 100).toFixed(0);
        console.log(`Loading progress: ${percent}%`);
        if (loadingMessage) {
          loadingMessage.textContent = `Loading model... ${percent}%`;
        }
      },
      (error) => {
        console.error('Error loading GLB model:', error);
        console.error('Error details:', error.message);
        
        if (loadingMessage) {
          loadingMessage.textContent = "Failed to load 3D model";
          loadingMessage.style.color = "#ff6b6b";
        }
        
        // Fallback to basic geometry if model fails to load
        console.log('Creating fallback geometry...');
        modelContainer = new THREE.Group();
        scene.add(modelContainer);
        
        const fallbackGeometry = new THREE.BoxGeometry(3, 3, 3); // Made bigger
        const fallbackMaterial = new THREE.MeshPhongMaterial({
          color: 0x9966ff,
          wireframe: false,
        });
        avatarModel = new THREE.Mesh(fallbackGeometry, fallbackMaterial);
        avatarModel.scale.set(2, 2, 2); // Increased fallback size
        modelContainer.add(avatarModel);
        
        setupRotationControls();
        
        if (loadingMessage) {
          setTimeout(() => {
            loadingMessage.style.display = 'none';
          }, 2000);
        }
      }
    );

    // Setup rotation controls function - COMPLETE FIXED VERSION
    function setupRotationControls() {
      console.log("Setting up rotation controls...");
      
      // Mouse controls for rotation
      canvas.addEventListener('mousedown', (event) => {
        event.preventDefault();
        isMouseDown = true;
        isRotating3D = true;
        mouseX = event.clientX;
        mouseY = event.clientY;
        canvas.style.cursor = 'grabbing';
        console.log("Mouse down - rotation started");
      });

      // Use document for mousemove to track outside canvas
      document.addEventListener('mousemove', (event) => {
        if (!isMouseDown || !modelContainer) return;
        
        const deltaX = event.clientX - mouseX;
        const deltaY = event.clientY - mouseY;
        
        // Adjust sensitivity for better control
        const sensitivity = 0.005;
        targetRotationY += deltaX * sensitivity;
        targetRotationX -= deltaY * sensitivity; // Inverted for natural feel
        
        // Limit vertical rotation to prevent flipping
        targetRotationX = Math.max(-Math.PI / 2, Math.min(Math.PI / 2, targetRotationX));
        
        mouseX = event.clientX;
        mouseY = event.clientY;
      });

      document.addEventListener('mouseup', () => {
        if (isMouseDown) {
          console.log("Mouse up - rotation stopped");
        }
        isMouseDown = false;
        isRotating3D = false;
        canvas.style.cursor = 'grab';
      });

      // Touch controls for mobile - COMPLETE VERSION
      canvas.addEventListener('touchstart', (event) => {
        if (event.touches.length === 1) {
          event.preventDefault();
          isMouseDown = true;
          isRotating3D = true;
          mouseX = event.touches[0].clientX;
          mouseY = event.touches[0].clientY;
          console.log("Touch started");
        }
      }, { passive: false });

      canvas.addEventListener('touchmove', (event) => {
        if (!isMouseDown || !modelContainer || event.touches.length !== 1) return;
        
        event.preventDefault();
        const deltaX = event.touches[0].clientX - mouseX;
        const deltaY = event.touches[0].clientY - mouseY;
        
        const sensitivity = 0.005;
        targetRotationY += deltaX * sensitivity;
        targetRotationX -= deltaY * sensitivity;
        
        targetRotationX = Math.max(-Math.PI / 2, Math.min(Math.PI / 2, targetRotationX));
        
        mouseX = event.touches[0].clientX;
        mouseY = event.touches[0].clientY;
      }, { passive: false });

      canvas.addEventListener('touchend', (event) => {
        event.preventDefault();
        isMouseDown = false;
        isRotating3D = false;
        console.log("Touch ended");
      });

      // Set cursor style
      canvas.style.cursor = 'grab';
      canvas.style.userSelect = 'none';
      
      console.log("Rotation controls setup complete");
    }

    // Add some particles around the avatar
    const particlesGeometry = new THREE.BufferGeometry();
    const particleCount = 75; // Increased particle count
    const posArray = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount * 3; i++) {
      posArray[i] = (Math.random() - 0.5) * 12; // Increased range
    }

    particlesGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(posArray, 3)
    );
    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.05, // Slightly bigger particles
      color: 0x00ffff, // Cyan color like in the image
      transparent: true,
      opacity: 0.8
    });

    const particlesMesh = new THREE.Points(
      particlesGeometry,
      particlesMaterial
    );
    scene.add(particlesMesh);

    // Position camera closer for bigger appearance
    camera.position.z = 6; // Moved closer from 8 to 6
    camera.position.y = 0;
    camera.lookAt(0, 0, 0);

    // Animation loop - COMPLETE FIXED VERSION
    function animate() {
      requestAnimationFrame(animate);

      // Smooth rotation interpolation - Apply to container instead of model directly
      if (modelContainer) {
        currentRotationX += (targetRotationX - currentRotationX) * 0.05;
        currentRotationY += (targetRotationY - currentRotationY) * 0.05;
        
        modelContainer.rotation.x = currentRotationX;
        modelContainer.rotation.y = currentRotationY;
      }

      // Slowly rotate particles for ambient effect
      if (particlesMesh) {
        particlesMesh.rotation.x += 0.0005;
        particlesMesh.rotation.y += 0.0008;
      }

      renderer.render(scene, camera);
    }

    animate();
    console.log("3D Avatar initialization complete with rotation controls");
  }

  /**
   * Initialize parallax effects
   */
  function initParallax() {
    console.log("Initializing parallax...");
    const header = document.querySelector(".page-header");
    if (!header) {
      console.warn("Page header not found");
      return;
    }

    window.addEventListener("scroll", () => {
      const scrolled = window.pageYOffset;
      header.style.transform = `translateY(${scrolled * 0.5}px)`;
    });

    // Modified to avoid conflicts with 3D rotation
    window.addEventListener("mousemove", (e) => {
      // Only apply parallax if not rotating 3D model
      const isRotating3D = document.querySelector('#avatar-canvas:hover') && 
                          (e.buttons === 1); // Check if mouse is pressed
      
      if (!isRotating3D) {
        const mouseX = e.clientX / window.innerWidth - 0.5;
        const mouseY = e.clientY / window.innerHeight - 0.5;

        gsap.to(header, {
          x: mouseX * 50,
          y: mouseY * 50,
          duration: 0.5,
        });
      }
    });
  }

  // Mobile menu toggle
  const hamburger = document.querySelector(".hamburger");
  const navLinks = document.querySelector(".nav-links");

  if (hamburger && navLinks) {
    hamburger.addEventListener("click", () => {
      navLinks.classList.toggle("active");
      hamburger.classList.toggle("active");
    });
  }
});