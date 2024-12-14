const fs = require('fs');

async function updatePosts() {
  const postsFilePath = './posts.json';

  if (!fs.existsSync(postsFilePath)) {
    console.error('posts.json not found');
    process.exit(1);
  }

  const posts = JSON.parse(fs.readFileSync(postsFilePath, 'utf8'));

  // Add a new post (for example purposes)
  const newPost = {
    title: "New Post Title",
    content: "This is the content of the new post."
  };

  posts.push(newPost);

  fs.writeFileSync(postsFilePath, JSON.stringify(posts, null, 2), 'utf8');
  console.log('posts.json updated successfully');
}

updatePosts().catch(err => {
  console.error('Error updating posts:', err);
  process.exit(1);
});
