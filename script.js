// シンプルなブログ記事のデータ
const BLOGS = [
  {
    id: 1,
    title: "初めての記事",
    date: "2025-04-27",
    summary: "はじめまして。これからブログを書いていきます。",
    content: `
      <h2>初めての記事</h2>
      <time>2025-04-27</time>
      <p>はじめまして。これからブログを書いていきます。<br>
      このブログはシンプルなHTMLとCSS、JavaScriptで作られています。<br>
      今後も気軽に記事を書いていく予定です。</p>
    `
  },
  {
    id: 2,
    title: "2つ目の記事",
    date: "2025-04-26",
    summary: "シンプルなブログデザインを目指しています。",
    content: `
      <h2>2つ目の記事</h2>
      <time>2025-04-26</time>
      <p>できるだけ見やすく、シンプルなデザインを心がけています。<br>
      もし何かご要望があればコメントください。</p>
    `
  }
];

const blogList = document.getElementById('blog-list');
const blogDetail = document.getElementById('blog-detail');
const detailContent = document.getElementById('detail-content');
const backBtn = document.getElementById('back-btn');

// 記事リストのクリックイベント
blogList.addEventListener('click', function(e) {
  let article = e.target.closest('.blog-summary');
  if (!article) return;
  const id = Number(article.dataset.id);
  const blog = BLOGS.find(b => b.id === id);
  if (blog) {
    detailContent.innerHTML = blog.content;
    blogList.style.display = 'none';
    blogDetail.style.display = 'block';
  }
});

// 戻るボタン
backBtn.addEventListener('click', function() {
  blogDetail.style.display = 'none';
  blogList.style.display = 'block';
});