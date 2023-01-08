export function layout(title, content) {
  return `
  <html>
  <head>
    <title>${title}</title>
    <style>
      body {
        padding: 80px;
        font: 16px Helvetica, Arial;
        color:White;
        background-color:Lightblue
      }
  
      h1 {
        font-size: 2em;
      }
  
      h2 {
        font-size: 1.2em;
      }
  
      #posts {
        margin: 0;
        padding: 0;
      }
  
      #posts li {
        margin: 40px 0;
        padding: 0;
        padding-bottom: 20px;
        border-bottom: 1px solid #eee;
        list-style: none;
      }
  
      #posts li:last-child {
        border-bottom: none;
      }
  
      textarea {
        width: 500px;
        height: 300px;
      }
  
      input[type=text],input[type=password],
      textarea {
        border: 1px solid #eee;
        border-top-color: #ddd;
        border-left-color: #ddd;
        border-radius: 2px;
        padding: 15px;
        font-size: .8em;
      }
  
      input[type=text],input[type=password] {
        width: 500px;
      }
    </style>
  </head>
  <body>
    <section id="content">
      ${content}
    </section>
  </body>
  </html>
  `
}

export function loginUi() {
  return layout('Login', `
  <h1>登入</h1>
  <form action="/login" method="post">
    <p><input type="text" placeholder="用戶名稱" name="username"></p>
    <p><input type="password" placeholder="密碼" name="password"></p>
    <p><input type="submit" value="登入"></p>
    <p>新用戶? <a href="/signup">創建帳號</p>
  </form>
  `)
}

export function signupUi() {
  return layout('Signup', `
  <h1>註冊</h1>
  <form action="/signup" method="post">
    <p><input type="text" placeholder="用戶名稱" name="username"></p>
    <p><input type="password" placeholder="密碼" name="password"></p>
    <p><input type="text" placeholder="電子郵件" name="email"></p>
    <p><input type="submit" value="註冊"></p>
  </form>
  `)
}

export function success() {
  return layout('Success', `
  <h1>註冊成功!</h1>
   歡迎!'+user.username+'<a href="/">查看所有貼文</a> / <a href="/login">登入</a>  !
  `)
}

export function fail() {
  return layout('Fail', `
  <h1>註冊失敗!</h1>
  你可能 <a href="/">查看所有貼文</a> or <a href="JavaScript:window.history.back()">返回</a> !
  `)
}

export function list(posts, user) {
  console.log('list: user=', user)
  let list = []
  for (let post of posts) {
    list.push(`
    <li>
      <h2>${ post.title } -- by ${post.username}</h2>
      <p><a href="/post/${post.id}">查看貼文</a></p>
    </li>
    `)
  }
  let content = `
  <h1>貼文版</h1>
  <p>${(user==null)?'<a href="/login">登入</a> 以發佈貼文':'歡迎 '+user.username+', 你可以 <a href="/post/new">發布貼文</a> 或 <a href="/logout">登出</a> !'}</p>
  <p>共有 <strong>${posts.length}</strong> 篇貼文!</p>
  <a href="https://yagmai0409.github.io/wp110b/HW/MIDEXAM/code.html">遊玩小遊戲<a/>
  <ul id="posts">
    ${list.join('\n')}
  </ul>
  `
  return layout('Posts', content)
}

export function newPost() {
  return layout('New Post', `
  <h1>新貼文</h1>
  <p>發布貼文</p>
  <form action="/post" method="post">
    <p><input type="text" placeholder="標題" name="title"></p>
    <p><textarea placeholder="想說些什麼..." name="body"></textarea></p>
    <p><input type="submit" value="發布"></p>
  </form>
  `)
}

export function show(post) {
  return layout(post.title, `
    <h1>${post.title} -- by ${post.username}</h1>
    <p>${post.body}</p>
    <p><a href="/del/${post.id}">刪除資料</a></p>
  `)
}
