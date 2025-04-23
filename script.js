document.addEventListener('DOMContentLoaded', function() {
    // ナビゲーションのスクロール処理
    const navLinks = document.querySelectorAll('.nav-links a');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            window.scrollTo({
                top: targetSection.offsetTop - 70,
                behavior: 'smooth'
            });
        });
    });
    
    // スクロール時のナビゲーションハイライト
    const sections = document.querySelectorAll('section');
    window.addEventListener('scroll', function() {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (pageYOffset >= sectionTop - 100) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
    
    // カードのアニメーション
    const cards = document.querySelectorAll('.card');
    
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });
    
    cards.forEach(card => {
        observer.observe(card);
        
        // カードにanimation-delayを設定
        const index = Array.from(cards).indexOf(card);
        card.style.animationDelay = `${index * 0.1}s`;
    });
    
    // タイムラインアニメーション
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    const timelineObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('appear');
                timelineObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });
    
    timelineItems.forEach(item => {
        timelineObserver.observe(item);
        
        // タイムラインアイテムにanimation-delayを設定
        const index = Array.from(timelineItems).indexOf(item);
        item.style.animationDelay = `${index * 0.2}s`;
    });
    
    // モバイルナビゲーションの表示/非表示（CSSでデフォルト非表示）
    const mobileMenuBtn = document.createElement('button');
    mobileMenuBtn.className = 'mobile-menu-btn';
    mobileMenuBtn.innerHTML = '≡';
    
    const nav = document.querySelector('nav');
    const navContainer = document.querySelector('.nav-container');
    
    // 768px以下の画面幅でのみボタンを表示
    if (window.innerWidth <= 768) {
        navContainer.appendChild(mobileMenuBtn);
        
        mobileMenuBtn.addEventListener('click', function() {
            const navLinks = document.querySelector('.nav-links');
            navLinks.classList.toggle('show');
        });
        
        // モバイルメニューのリンクをクリックしたらメニューを閉じる
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                document.querySelector('.nav-links').classList.remove('show');
            });
        });
    }
    
    // スクロールでヘッダーの背景を変更
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
    });
    
    // スキルアイコンのアニメーション
    const skillIcons = document.querySelectorAll('.skill-icon');
    
    skillIcons.forEach(icon => {
        icon.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.2)';
            this.style.transition = 'transform 0.3s ease';
        });
        
        icon.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });
    
    // プロジェクトカードのホバーエフェクト強化
    const projectCards = document.querySelectorAll('#projects .card');
    
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            const cardImg = this.querySelector('.card-img');
            cardImg.style.transform = 'scale(1.05)';
            cardImg.style.transition = 'transform 0.3s ease';
        });
        
        card.addEventListener('mouseleave', function() {
            const cardImg = this.querySelector('.card-img');
            cardImg.style.transform = 'scale(1)';
        });
    });
    
    // スムーススクロールのトップボタン
    const scrollTopBtn = document.createElement('button');
    scrollTopBtn.className = 'scroll-top-btn';
    scrollTopBtn.innerHTML = '↑';
    scrollTopBtn.style.display = 'none';
    document.body.appendChild(scrollTopBtn);
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 500) {
            scrollTopBtn.style.display = 'block';
        } else {
            scrollTopBtn.style.display = 'none';
        }
    });
    
    scrollTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // CSSでスクロールトップボタンのスタイルを追加するための処理
    const style = document.createElement('style');
    style.innerHTML = `
        .scroll-top-btn {
            position: fixed;
            bottom: 30px;
            right: 30px;
            width: 50px;
            height: 50px;
            border-radius: 50%;
            background-color: var(--primary);
            color: white;
            border: none;
            font-size: 24px;
            cursor: pointer;
            box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
            z-index: 9999;
            transition: background-color 0.3s;
        }
        
        .scroll-top-btn:hover {
            background-color: var(--primary-dark);
        }
        
        .nav-links.show {
            display: flex;
            flex-direction: column;
            position: absolute;
            top: 70px;
            left: 0;
            width: 100%;
            background-color: white;
            padding: 1rem;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }
        
        .mobile-menu-btn {
            display: none;
            background: none;
            border: none;
            font-size: 1.5rem;
            cursor: pointer;
        }
        
        @media (max-width: 768px) {
            .mobile-menu-btn {
                display: block;
            }
            
            .nav-links {
                display: none;
            }
        }
        
        .scrolled {
            background-color: rgba(255, 255, 255, 0.95);
            box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
        }
        
        .card.visible, .timeline-item.appear {
            animation: fadeInUp 0.6s forwards;
        }
        
        @keyframes fadeInUp {
            from {
                opacity: 0;
                transform: translateY(30px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        .nav-links a.active {
            color: var(--primary);
            font-weight: 700;
        }
    `;
    document.head.appendChild(style);
});