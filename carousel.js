// 英雄区域轮播图功能
document.addEventListener('DOMContentLoaded', function() {
    initCarousel();
});

function initCarousel() {
    const carouselContainer = document.querySelector('.carousel-container');
    const slides = document.querySelectorAll('.carousel-slide');
    const prevBtn = document.querySelector('.carousel-btn.prev');
    const nextBtn = document.querySelector('.carousel-btn.next');
    const dots = document.querySelectorAll('.dot');
    
    if (!carouselContainer || slides.length === 0) return;
    
    let currentSlide = 0;
    let slideInterval;
    const totalSlides = slides.length;
    
    // 初始化轮播图
    function init() {
        // 显示第一张幻灯片
        showSlide(currentSlide);
        
        // 设置自动轮播
        startAutoSlide();
        
        // 添加事件监听器
        if (prevBtn) prevBtn.addEventListener('click', showPrevSlide);
        if (nextBtn) nextBtn.addEventListener('click', showNextSlide);
        
        // 添加指示点事件
        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => goToSlide(index));
        });
        
        // 鼠标悬停时暂停自动轮播
        carouselContainer.addEventListener('mouseenter', pauseAutoSlide);
        carouselContainer.addEventListener('mouseleave', startAutoSlide);
    }
    
    // 显示指定幻灯片
    function showSlide(index) {
        // 确保索引在有效范围内
        if (index < 0) index = totalSlides - 1;
        if (index >= totalSlides) index = 0;
        
        // 隐藏所有幻灯片
        slides.forEach(slide => {
            slide.classList.remove('active');
        });
        
        // 显示当前幻灯片
        slides[index].classList.add('active');
        
        // 更新指示点
        dots.forEach(dot => {
            dot.classList.remove('active');
        });
        dots[index].classList.add('active');
        
        currentSlide = index;
    }
    
    // 显示下一张幻灯片
    function showNextSlide() {
        showSlide(currentSlide + 1);
        resetAutoSlide();
    }
    
    // 显示上一张幻灯片
    function showPrevSlide() {
        showSlide(currentSlide - 1);
        resetAutoSlide();
    }
    
    // 跳转到指定幻灯片
    function goToSlide(index) {
        showSlide(index);
        resetAutoSlide();
    }
    
    // 开始自动轮播
    function startAutoSlide() {
        if (slideInterval) clearInterval(slideInterval);
        slideInterval = setInterval(showNextSlide, 5000); // 5秒切换一次
    }
    
    // 暂停自动轮播
    function pauseAutoSlide() {
        if (slideInterval) clearInterval(slideInterval);
    }
    
    // 重置自动轮播
    function resetAutoSlide() {
        pauseAutoSlide();
        startAutoSlide();
    }
    
    // 初始化轮播图
    init();
    
    // 添加键盘控制
    document.addEventListener('keydown', function(e) {
        if (e.key === 'ArrowLeft') {
            showPrevSlide();
        } else if (e.key === 'ArrowRight') {
            showNextSlide();
        }
    });
    
    // 添加触摸滑动支持
    let touchStartX = 0;
    let touchEndX = 0;
    
    carouselContainer.addEventListener('touchstart', function(e) {
        touchStartX = e.changedTouches[0].screenX;
    });
    
    carouselContainer.addEventListener('touchend', function(e) {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    });
    
    function handleSwipe() {
        const swipeThreshold = 50; // 最小滑动距离
        
        if (touchEndX < touchStartX - swipeThreshold) {
            // 向左滑动，显示下一张
            showNextSlide();
        } else if (touchEndX > touchStartX + swipeThreshold) {
            // 向右滑动，显示上一张
            showPrevSlide();
        }
    }
}
