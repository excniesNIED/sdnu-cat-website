document.addEventListener('DOMContentLoaded', function() {
    // 获取DOM元素
    const catsContainer = document.getElementById('cats-container');
    const colorFilter = document.getElementById('color-filter');
    const catModal = document.getElementById('cat-modal');
    const closeModal = document.querySelector('.close-modal');
    
    // 存储所有猫猫数据
    let allCats = [];
    
    // 从JSON文件加载数据
    fetch('data/cats.json')
        .then(response => response.json())
        .then(data => {
            allCats = data;
            displayCats(allCats);
        })
        .catch(error => console.error('Error loading cat data:', error));
    
    // 显示猫猫卡片
    function displayCats(cats) {
        catsContainer.innerHTML = '';
        
        cats.forEach(cat => {
            const catCard = document.createElement('div');
            catCard.className = 'cat-card';
            catCard.innerHTML = `
                <img src="${cat.avatar}" alt="${cat.name}" class="cat-avatar">
                <div class="cat-info">
                    <h3>${cat.name}</h3>
                    <div class="cat-meta">
                        <span>${cat.gender === '公' ? '♂' : '♀'} ${cat.gender}</span>
                        <span>${cat.color}</span>
                        <span>${cat.neutered ? '已绝育' : '未绝育'}</span>
                    </div>
                    <p>${cat.description.substring(0, 50)}...</p>
                </div>
            `;
            
            catCard.addEventListener('click', () => openModal(cat));
            catsContainer.appendChild(catCard);
        });
    }
    
    // 打开猫猫详情模态框
    function openModal(cat) {
        document.getElementById('modal-avatar').src = cat.avatar;
        document.getElementById('modal-name').textContent = cat.name;
        document.getElementById('modal-gender').textContent = `性别: ${cat.gender === '公' ? '♂ 公' : '♀ 母'}`;
        document.getElementById('modal-color').textContent = `花色: ${cat.color}`;
        document.getElementById('modal-neutered').textContent = `绝育状态: ${cat.neutered ? '✓ 已绝育' : '✗ 未绝育'}`;
        document.getElementById('modal-description').textContent = cat.description;
        
        const gallery = document.getElementById('modal-gallery');
        gallery.innerHTML = '';
        
        cat.photos.forEach(photo => {
            const img = document.createElement('img');
            img.src = photo;
            img.alt = `${cat.name}的照片`;
            gallery.appendChild(img);
        });
        
        catModal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    }
    
    // 关闭模态框
    function closeModalFunc() {
        catModal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
    
    // 事件监听
    colorFilter.addEventListener('change', function() {
        const selectedColor = this.value;
        
        if (selectedColor === 'all') {
            displayCats(allCats);
        } else {
            const filteredCats = allCats.filter(cat => cat.color.includes(selectedColor));
            displayCats(filteredCats);
        }
    });
    
    closeModal.addEventListener('click', closeModalFunc);
    
    window.addEventListener('click', function(event) {
        if (event.target === catModal) {
            closeModalFunc();
        }
    });
});