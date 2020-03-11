export function setTheme(themeName) {
  localStorage.setItem('theme', themeName);
  document.body.className = `theme ${themeName}`;
}

export function toggleTheme() {
  if (localStorage.getItem('theme') === 'theme_color_dark') {
    setTheme('theme_color_light');
  } else {
    setTheme('theme_color_dark');
  }
}
