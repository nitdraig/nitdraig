const fs = require('fs');
const axios = require('axios');

const BLOG_URL = 'https://en.blog.agustin.top/api/posts'; 
async function fetchBlogPosts() {
  try {
    const response = await axios.get(BLOG_URL);
    const posts = response.data;

    let markdown = `## Últimos Posts del Blog\n\n`;
    posts.forEach(post => {
      markdown += `- [${post.title}](${https://en.blog.agustin.top/posts/${post.id}})\n`;
    });

    fs.writeFileSync('blog_posts.md', markdown);
  } catch (error) {
    console.error('Error fetching blog posts:', error);
  }
}

fetchBlogPosts();
