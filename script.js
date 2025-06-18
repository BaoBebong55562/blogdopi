// Trang chủ - hiển thị danh sách bài viết
if (document.getElementById('posts-container')) {
  const container = document.getElementById('posts-container');
  posts.forEach(post => {
    const div = document.createElement('div');
    div.className = 'post-card';
    div.innerHTML = `
      <div class="content">
        <h2><a href="post.html?id=${post.id}">${post.title}</a></h2>
        <p>${post.description}</p>
      </div>
    `;
    container.appendChild(div);
  });
}

// Trang chi tiết bài viết
if (document.getElementById('post-detail')) {
  const params = new URLSearchParams(window.location.search);
  const postId = parseInt(params.get('id'));
  const post = posts.find(p => p.id === postId);
  const detail = document.getElementById('post-detail');

  if (post) {
    detail.innerHTML = `
      <div class="post-card">
        <div class="content">
          <h1>${post.title}</h1>
          ${post.content}
        </div>
      </div>
    `;
  } else {
    detail.innerHTML = `<p>Không tìm thấy bài viết.</p>`;
  }
}

// Dark mode toggle
const toggle = document.getElementById('darkModeToggle');
if (toggle) {
  toggle.addEventListener('click', () => {
    document.body.classList.toggle('dark');
    toggle.textContent = document.body.classList.contains('dark') ? '☀️ Light Mode' : '🌙 Dark Mode';
  });
}
// Tìm kiếm bài viết theo tiêu đề
const searchInput = document.getElementById("searchInput");
if (searchInput) {
  searchInput.addEventListener("input", () => {
    const keyword = searchInput.value.toLowerCase();
    renderPosts(keyword, filterSelect?.value || "all");
  });
}// Bộ lọc chủ đề
const filterSelect = document.getElementById("filterSelect");
if (filterSelect) {
  filterSelect.addEventListener("change", () => {
    const keyword = searchInput?.value.toLowerCase() || "";
    renderPosts(keyword, filterSelect.value);
  });
}
// Đồng hồ thời gian thực
const clock = document.getElementById("clock");
if (clock) {
  setInterval(() => {
    const now = new Date();
    const timeString = now.toLocaleTimeString("vi-VN");
    clock.textContent = `🕒 ${timeString}`;
  }, 1000);
}
function renderPosts(keyword = "", category = "all") {
  const container = document.getElementById("posts-container");
  if (!container) return;

  container.innerHTML = "";

  posts.forEach(post => {
    const matchKeyword = post.title.toLowerCase().includes(keyword.toLowerCase());
    const matchCategory = category === "all" || (post.category || "").toLowerCase() === category;

    if (matchKeyword && matchCategory) {
      const div = document.createElement("div");
      div.className = "post-card";

      div.innerHTML = `
        ${post.image ? `<img src="${post.image}" alt="${post.title}">` : ""}
        <div class="content">
          <h2><a href="post.html?id=${post.id}">${post.title}</a></h2>
          <p>${post.description}</p>
        </div>
      `;

      container.appendChild(div);
    }
  });
}

// Tự động render ngay khi trang tải
if (document.getElementById("posts-container")) {
  renderPosts();
}

