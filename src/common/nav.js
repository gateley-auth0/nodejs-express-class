function navbar(request) {
  const items = [{ link: '/', title: 'Home' }, { link: '/books', title: 'Book' }, { link: '/authors', title: 'Author' }];
  if (request.user) {
    items.push({ link: '/auth/signout', title: 'Logout' });
  } else {
    items.push({ link: '/auth/signin', title: 'Sign in' });
    items.push({ link: '/auth/signup', title: 'Sign up' });
  }
  return items;
}
module.exports = navbar;
