// 搜索关键词与页面映射关系
const keywordMap = {
    "晶体": "w1.html",
    "培养": "w1.html",
    "晶体培养": "w1.html",         
    "硫酸铜": "04.html",       
    "摄影": "06.html",
    "晶体摄影": "06.html",
    "拍照": "06.html",           
    "安全": "001.html",
    "须知": "001.html",        
    "投稿": "002.html",
    "提交": "002.html",        
    "图书馆": "08.html",
    "书刊": "08.html",
    "电子书刊": "08.html",
    "电子书": "08.html",
    "文献": "08.html",       
    "鸣谢": "09.html", 
    "特谢": "09.html",
    "团队": "09.html", 
    "成员": "09.html",
    "感谢": "09.html",       
    "溶液": "05.html",
    "溶液配置": "05.html",
    "溶液配比": "05.html"        
};

// 搜索建议
let allKeywords = Object.keys(keywordMap).map(key => ({
    keyword: key,
    url: keywordMap[key]
}));

function showSuggestions(input) {
    const suggestions = document.getElementById('searchSuggestions');
    suggestions.innerHTML = '';
    
    if (!input) {
        suggestions.style.display = 'none';
        return;
    }

    const filtered = allKeywords.filter(item => 
        item.keyword.toLowerCase().includes(input.toLowerCase())
    );

    filtered.forEach(item => {
        const div = document.createElement('div');
        div.className = 'suggestion-item';
        div.innerHTML = `
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor">
                <path d="M12 2a8 8 0 1 0 0 16 8 8 0 0 0 0-16z"></path>
                <path d="m21 21-4.35-4.35"></path>
            </svg>
            ${item.keyword}
        `;
        div.onclick = () => window.location.href = item.url;
        suggestions.appendChild(div);
    });

    suggestions.style.display = filtered.length ? 'block' : 'none';
}

document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('searchInput');
    const searchButton = document.getElementById('searchButton');
    const suggestions = document.createElement('div');
    const mobileSearchBtn = document.getElementById('mobileSearch');
    const searchContainer = document.querySelector('.search-container');
    suggestions.id = 'searchSuggestions';
    suggestions.className = 'search-suggestions';
    document.querySelector('.search-container').appendChild(suggestions);

    mobileSearchBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        searchContainer.classList.toggle('active');
        document.querySelector('.nav-links').classList.remove('active');
        document.querySelector('.hamburger').classList.remove('active');
        
        if (searchContainer.classList.contains('active')) {
            setTimeout(() => { 
                document.getElementById('searchInput').focus();
                document.getElementById('searchInput').click();
            }, 50);
        }
    });

    // 实时搜索建议
    searchInput.addEventListener('input', (e) => {
        showSuggestions(e.target.value);
    });

    // 点击外部关闭建议
    document.addEventListener('click', (e) => {
        const isSearchElement = e.target.closest('.search-container') || 
                               e.target.closest('#mobileSearch') ||
                               e.target.closest('.search-suggestions');
    
        if (!isSearchElement) {
            searchContainer.classList.remove('active');
            suggestions.style.display = 'none';
        }
    });

    document.getElementById('searchInput').addEventListener('click', (e) => {
        e.stopPropagation();
    });

    // 键盘处理
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            searchContainer.classList.remove('active');
            document.querySelector('.nav-links').classList.remove('active');
        }
    });

    // 执行搜索跳转
    function performSearch() {
        const query = searchInput.value.trim().toLowerCase();
        if (!query) return;

        // 全匹配跳转
        if (keywordMap[query]) {
            window.location.href = keywordMap[query];
            return;
        }

        // 模糊搜索
        const matchedKey = Object.keys(keywordMap).find(key => 
            key.toLowerCase().includes(query)
        );

        if (matchedKey) {
            window.location.href = keywordMap[matchedKey];
        } else {
            alert('未找到相关指南，试试其他关键词~');
            searchInput.focus();
        }
    }

    // 事件监听
    searchButton.addEventListener('click', performSearch);
    searchInput.addEventListener('keypress', e => {
        if (e.key === 'Enter') performSearch();
    });
});