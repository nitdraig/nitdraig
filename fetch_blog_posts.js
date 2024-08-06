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

    const readmePath = 'README.md';
    let readmeContent = fs.readFileSync(readmePath, 'utf8');

    const startMarker = '<!-- BLOG-POSTS-START -->';
    const endMarker = '<!-- BLOG-POSTS-END -->';

    const startIndex = readmeContent.indexOf(startMarker) + startMarker.length;
    const endIndex = readmeContent.indexOf(endMarker);

    if (startIndex === -1 || endIndex === -1) {
      console.error('Markers not found in README.md');
      return;
    }

    const updatedContent = readmeContent.slice(0, startIndex) + '\n' + markdown + '\n' + readmeContent.slice(endIndex);

    fs.writeFileSync(readmePath, updatedContent);
  } catch (error) {
    console.error('Error fetching blog posts:', error);
  }
}

fetchBlogPosts();
