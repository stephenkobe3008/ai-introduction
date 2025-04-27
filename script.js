document.addEventListener('DOMContentLoaded', function() {
    // ページロード時のアニメーション
    const pageTransition = document.createElement('div');
    pageTransition.className = 'page-transition';
    pageTransition.innerHTML = '<div class="page-loader"></div>';
    document.body.appendChild(pageTransition);
    
    // 500ms後にローディング画面を非表示
    setTimeout(() => {
        pageTransition.classList.add('loaded');
        setTimeout(() => {
            pageTransition.remove();
        }, 600);
    }, 500);
    
    // スクロール進捗インジケーター追加
    const scrollProgressContainer = document.createElement('div');
    scrollProgressContainer.className = 'scroll-progress-container';
    scrollProgressContainer.innerHTML = '<div class="scroll-progress-bar"></div>';
    document.body.appendChild(scrollProgressContainer);
    
    // スクロール進捗の更新
    window.addEventListener('scroll', () => {
        const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
        const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrollProgress = (scrollTop / scrollHeight) * 100;
        
        document.querySelector('.scroll-progress-bar').style.width = scrollProgress + '%';
    });
    
    // ダークモードトグルボタン追加
    const navContainer = document.querySelector('.nav-container');
    const darkModeToggle = document.createElement('button');
    darkModeToggle.className = 'dark-mode-toggle';
    darkModeToggle.innerHTML = '<span class="theme-icon moon">🌙</span><span class="theme-icon sun">☀️</span>';
    darkModeToggle.setAttribute('aria-label', 'Toggle Dark Mode');
    navContainer.appendChild(darkModeToggle);
    
    // ローカルストレージからダークモード設定を取得
    const isDarkMode = localStorage.getItem('darkMode') === 'true';
    if (isDarkMode) {
        document.body.classList.add('dark-mode');
    }
    
    // ダークモードトグル処理
    darkModeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        localStorage.setItem('darkMode', document.body.classList.contains('dark-mode'));
    });
    
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
            
            // モバイルメニューが開いている場合は閉じる
            if (document.querySelector('.nav-links').classList.contains('show')) {
                document.querySelector('.nav-links').classList.remove('show');
                document.querySelector('.hamburger').classList.remove('open');
            }
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
    
    // ヘッダーに波アニメーション追加
    const header = document.querySelector('header');
    const waveContainer = document.createElement('div');
    waveContainer.className = 'wave-container';
    waveContainer.innerHTML = `
        <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" class="shape-fill"></path>
        </svg>
    `;
    header.appendChild(waveContainer);
    
    // パララックスエフェクト
    document.addEventListener('mousemove', function(e) {
        const parallaxElements = document.querySelectorAll('.parallax-bg');
        const mouseX = e.clientX / window.innerWidth - 0.5;
        const mouseY = e.clientY / window.innerHeight - 0.5;
        
        parallaxElements.forEach(el => {
            const speedX = el.getAttribute('data-speed-x') || 20;
            const speedY = el.getAttribute('data-speed-y') || 20;
            
            const translateX = mouseX * speedX;
            const translateY = mouseY * speedY;
            
            el.style.transform = `translate(${translateX}px, ${translateY}px)`;
        });
    });
    
    // スクロールアニメーション
    const fadeElements = document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right, .slide-in-up, .slide-in-down, .scale-in, .fade-up');
    
    const fadeObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                fadeObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -10% 0px'
    });
    
    fadeElements.forEach(el => {
        // ランダムな遅延を設定
        const delay = Math.random() * 0.3;
        el.style.setProperty('--delay', `${delay}s`);
        fadeObserver.observe(el);
    });
    
    // スケールアニメーション（スキル、ホビー、AIツールカード）
    const scaleElements = document.querySelectorAll('.skill-card, .hobby-card, .ai-tool-card, .scale-stagger');
    
    const scaleObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                scaleObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -10% 0px'
    });
    
    scaleElements.forEach(el => {
        scaleObserver.observe(el);
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
        threshold: 0.1,
        rootMargin: '0px 0px -10% 0px'
    });
    
    timelineItems.forEach((item, index) => {
        // アニメーション遅延を設定
        item.style.transitionDelay = `${index * 0.2}s`;
        timelineObserver.observe(item);
    });
    
    // スキル進捗バーアニメーション
    const skillProgressBars = document.querySelectorAll('.skill-progress');
    
    const progressObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                progressObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -10% 0px'
    });
    
    skillProgressBars.forEach(bar => {
        progressObserver.observe(bar);
    });
    
    // カウントアップアニメーション
    const countElements = document.querySelectorAll('.count-up');
    
    const countObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                const countTo = parseInt(target.getAttribute('data-count'));
                let count = 0;
                const interval = setInterval(() => {
                    count += Math.ceil(countTo / 30);
                    if (count >= countTo) {
                        target.textContent = countTo;
                        clearInterval(interval);
                    } else {
                        target.textContent = count;
                    }
                    target.classList.add('visible');
                }, 30);
                countObserver.unobserve(target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -10% 0px'
    });
    
    countElements.forEach(el => {
        countObserver.observe(el);
    });
    
    // モバイルナビゲーションの表示/非表示
    const mobileMenuBtn = document.createElement('button');
    mobileMenuBtn.className = 'mobile-menu-btn';
    mobileMenuBtn.innerHTML = '<div class="hamburger"><span></span><span></span><span></span><span></span></div>';
    mobileMenuBtn.setAttribute('aria-label', 'Toggle Navigation Menu');
    
    const navLinks2 = document.querySelector('.nav-links');
    navContainer.insertBefore(mobileMenuBtn, navLinks2);
    
    mobileMenuBtn.addEventListener('click', function() {
        navLinks2.classList.toggle('show');
        document.querySelector('.hamburger').classList.toggle('open');
    });
    
    // スクロールでヘッダーの背景を変更
    const nav = document.querySelector('nav');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
    });
    
    // 3Dチルトエフェクト
    const tiltCards = document.querySelectorAll('.tilt-effect');
    
    tiltCards.forEach(card => {
        card.addEventListener('mousemove', function(e) {
            const cardRect = card.getBoundingClientRect();
            const cardCenterX = cardRect.left + cardRect.width / 2;
            const cardCenterY = cardRect.top + cardRect.height / 2;
            
            const mouseX = e.clientX - cardCenterX;
            const mouseY = e.clientY - cardCenterY;
            
            const rotateX = -mouseY / 10;
            const rotateY = mouseX / 10;
            
            card.style.setProperty('--tilt-x', `${rotateX}deg`);
            card.style.setProperty('--tilt-y', `${rotateY}deg`);
        });
        
        card.addEventListener('mouseleave', function() {
            card.style.setProperty('--tilt-x', '0deg');
            card.style.setProperty('--tilt-y', '0deg');
        });
    });
    
    // プロジェクトカードのモーダル表示
    const projectCards = document.querySelectorAll('#projects .card');
    const modalBackdrop = document.createElement('div');
    modalBackdrop.className = 'modal-backdrop';
    document.body.appendChild(modalBackdrop);
    
    // 各プロジェクトカードの詳細ボタンを追加
    projectCards.forEach((card, index) => {
        const cardContent = card.querySelector('.card-content');
        const cardTitle = cardContent.querySelector('h3').textContent;
        const cardDescription = cardContent.querySelector('p').textContent;
        const cardTags = Array.from(cardContent.querySelectorAll('.tag')).map(tag => tag.textContent);
        
        // 詳細ボタンを追加
        const detailBtn = document.createElement('button');
        detailBtn.className = 'card-btn';
        detailBtn.textContent = '詳細を見る';
        cardContent.appendChild(detailBtn);
        
        // モーダル表示処理
        detailBtn.addEventListener('click', function() {
            const modalContent = document.createElement('div');
            modalContent.className = 'modal-content';
            
            const imgSrc = card.querySelector('.card-img') ? card.querySelector('.card-img').getAttribute('src') : '';
            
            modalContent.innerHTML = `
                <div class="modal-header">
                    <h3>${cardTitle}</h3>
                    <button class="modal-close-btn" aria-label="Close Modal">×</button>
                </div>
                <div class="modal-body">
                    ${imgSrc ? `<img src="${imgSrc}" alt="${cardTitle}" style="width: 100%; border-radius: 8px; margin-bottom: 1rem;">` : ''}
                    <p>${cardDescription}</p>
                    <div style="margin-top: 1rem;">
                        <h4>使用技術:</h4>
                        <div class="card-tags" style="margin-top: 0.5rem;">
                            ${cardTags.map(tag => `<span class="tag">${tag}</span>`).join('')}
                        </div>
                    </div>
                    <div style="margin-top: 1.5rem;">
                        <h4>プロジェクトの課題と解決策:</h4>
                        <p>このプロジェクトでは、${['ユーザーエクスペリエンスの最適化', 'パフォーマンスの向上', 'モバイル対応の改善', 'データ構造の設計'][index % 4]}が主な課題でした。この課題に対して、${['ユーザーテストを実施し、フィードバックを取り入れたUI/UXの改良', '非同期処理の最適化とキャッシュ戦略の導入', 'レスポンシブデザインの完全実装とタッチ操作の最適化', '効率的なデータモデルの設計とクエリの最適化'][index % 4]}によって解決策を提供しました。</p>
                    </div>
                    <div style="margin-top: 1.5rem;">
                        <h4>成果:</h4>
                        <p>${['ユーザー満足度が25%向上し、セッション時間が平均2倍に増加', 'ページ読み込み時間が40%短縮し、サーバーコストを30%削減', 'モバイルユーザーのコンバージョン率が35%向上', 'データ処理速度が60%向上し、リアルタイムの分析機能を実現'][index % 4]}</p>
                    </div>
                </div>
                <div class="modal-footer">
                    <button class="btn modal-close-btn-footer">閉じる</button>
                </div>
            `;
            
            modalBackdrop.innerHTML = '';
            modalBackdrop.appendChild(modalContent);
            modalBackdrop.classList.add('active');
            document.body.style.overflow = 'hidden'; // スクロール無効化
            
            // モーダルを閉じる処理
            const closeModal = () => {
                modalBackdrop.classList.remove('active');
                setTimeout(() => {
                    modalBackdrop.innerHTML = '';
                    document.body.style.overflow = ''; // スクロール有効化
                }, 400);
            };
            
            modalContent.querySelector('.modal-close-btn').addEventListener('click', closeModal);
            modalContent.querySelector('.modal-close-btn-footer').addEventListener('click', closeModal);
            
            // モーダル外クリックで閉じる
            modalBackdrop.addEventListener('click', function(e) {
                if (e.target === modalBackdrop) {
                    closeModal();
                }
            });
            
            // ESCキーで閉じる
            document.addEventListener('keydown', function(e) {
                if (e.key === 'Escape') {
                    closeModal();
                }
            });
        });
        
        // カード画像オーバーレイ処理（モバイル対応）
        const cardImg = card.querySelector('.card-img');
        if (cardImg) {
            const imgContainer = document.createElement('div');
            imgContainer.className = 'card-img-container';
            cardImg.parentNode.insertBefore(imgContainer, cardImg);
            imgContainer.appendChild(cardImg);
            
            const overlay = document.createElement('div');
            overlay.className = 'card-img-overlay';
            overlay.innerHTML = `
                <h3>${cardTitle}</h3>
                <p>${cardDescription.substring(0, 50)}${cardDescription.length > 50 ? '...' : ''}</p>
                <button class="btn">詳細を見る</button>
            `;
            imgContainer.appendChild(overlay);
            
            overlay.querySelector('.btn').addEventListener('click', function(e) {
                e.preventDefault();
                detailBtn.click();
            });
        }
    });
    
    // スムーススクロールのトップボタン
    const scrollTopBtn = document.createElement('button');
    scrollTopBtn.className = 'scroll-top-btn';
    scrollTopBtn.innerHTML = '↑';
    scrollTopBtn.setAttribute('aria-label', 'Scroll to Top');
    document.body.appendChild(scrollTopBtn);
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 500) {
            scrollTopBtn.classList.add('visible');
        } else {
            scrollTopBtn.classList.remove('visible');
        }
    });
    
    scrollTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // ヒーローセクションにスクロールダウンインジケーター追加 (より控えめなデザイン)
    const hero = document.querySelector('.hero');
    const scrollDown = document.createElement('div');
    scrollDown.className = 'scroll-down-indicator';
    scrollDown.setAttribute('aria-label', 'Scroll Down');
    hero.appendChild(scrollDown);
    
    // インジケータークリックでスムーススクロール
    scrollDown.addEventListener('click', function() {
        const aboutSection = document.querySelector('#about');
        window.scrollTo({
            top: aboutSection.offsetTop - 70,
            behavior: 'smooth'
        });
    });
    
    // スクロール開始でインジケーターを非表示に
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            scrollDown.style.opacity = '0';
            scrollDown.style.visibility = 'hidden';
        }
    }, { once: true });
    
    // ヒーローサブタイトル追加
    const heroTitle = document.querySelector('.hero h1');
    const heroSubtitle = document.createElement('div');
    heroSubtitle.className = 'hero-subtitle';
    heroSubtitle.textContent = 'Webエンジニア / AIプロンプトデザイン';
    hero.insertBefore(heroSubtitle, heroTitle);
    
    // ヒーローにパララックス背景追加
    const heroBg = document.createElement('div');
    heroBg.className = 'parallax-bg';
    heroBg.setAttribute('data-speed-x', '30');
    heroBg.setAttribute('data-speed-y', '30');
    header.appendChild(heroBg);
    
    // 各セクションに背景パターン追加
    sections.forEach((section, index) => {
        if (index % 2 === 0) {
            const pattern = document.createElement('div');
            pattern.className = 'section-background';
            pattern.style.backgroundImage = 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%239C92AC\' fill-opacity=\'0.15\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")';
            section.appendChild(pattern);
        }
    });
    
    // テキストタイピングアニメーション
    const typingElements = document.querySelectorAll('.typing-animation');
    
    typingElements.forEach(element => {
        const text = element.textContent;
        element.textContent = '';
        
        let i = 0;
        const typingInterval = setInterval(() => {
            if (i < text.length) {
                element.textContent += text.charAt(i);
                i++;
            } else {
                clearInterval(typingInterval);
            }
        }, 100);
    });
    
    // AIインサイトセクションの強調表示
    const insightCard = document.querySelector('.insight-card');
    if (insightCard) {
        const keywords = ['生成AI', 'Webデザイン', 'テキスト', '画像', '自然言語', 'ユーザー', 'デザイン', 'AIによる', 'インタラクティブ', 'チャットボット'];
        
        const insightText = insightCard.innerHTML;
        let highlightedText = insightText;
        
        keywords.forEach(keyword => {
            const regex = new RegExp(`(${keyword})(?![^<]*>|[^<>]*</)`, 'g');
            highlightedText = highlightedText.replace(regex, '<span class="text-gradient">$1</span>');
        });
        
        insightCard.innerHTML = highlightedText;
    }
});